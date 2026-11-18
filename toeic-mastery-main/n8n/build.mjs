// Generates the n8n workflow JSON files in ./workflows from the code below.
//   node n8n/build.mjs
// Secrets are never written here: every node reads THREADS_TOKEN, GEMINI_API_KEY,
// GEMINI_MODEL, SITE_URL and HELPER_URL from n8n's environment (see n8n/README.md).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "workflows");

// Shared helpers, prepended to every Code node (each node runs standalone).
const LIB = String.raw`
const E = $env;
const TH = 'https://graph.threads.net/v1.0';
const SITE = (E.SITE_URL || 'https://toeicmastery.click').replace(/\/$/, '');
const http = (o) => this.helpers.httpRequest({ json: true, timeout: 90000, ...o });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const store = $getWorkflowStaticData('global'); // persists only on scheduled (active) runs

async function gemini(prompt, { search = false, json = false } = {}) {
  const body = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 1 } };
  if (search) body.tools = [{ google_search: {} }];
  else if (json) body.generationConfig.responseMimeType = 'application/json';
  const r = await http({
    method: 'POST',
    url: 'https://generativelanguage.googleapis.com/v1beta/models/' + (E.GEMINI_MODEL || 'gemini-3.1-flash-lite') + ':generateContent',
    qs: { key: E.GEMINI_API_KEY },
    body,
  });
  const t = (r.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('').trim();
  if (!t) throw new Error('Gemini trả về rỗng');
  if (!json) return t;
  const m = t.match(/\{[\s\S]*\}/);
  return JSON.parse(m ? m[0] : t);
}

// Threads: create a container, wait until Meta finished processing it, publish.
async function threadsPost({ text, imageUrl, replyTo }) {
  const qs = { access_token: E.THREADS_TOKEN, media_type: imageUrl ? 'IMAGE' : 'TEXT', text: String(text).slice(0, 490) };
  if (imageUrl) qs.image_url = imageUrl;
  if (replyTo) qs.reply_to_id = replyTo;
  const c = await http({ method: 'POST', url: TH + '/me/threads', qs });
  for (let i = 0; i < 12; i++) {
    await sleep(5000);
    const s = await http({ url: TH + '/' + c.id, qs: { fields: 'status,error_message', access_token: E.THREADS_TOKEN } });
    if (s.status === 'FINISHED') break;
    if (s.status === 'ERROR' || s.status === 'EXPIRED') throw new Error('Threads container lỗi: ' + (s.error_message || s.status));
  }
  const p = await http({ method: 'POST', url: TH + '/me/threads_publish', qs: { access_token: E.THREADS_TOKEN, creation_id: c.id } });
  return p.id;
}

async function myRecentPosts(limit = 15) {
  const r = await http({ url: TH + '/me/threads', qs: { fields: 'id,text,timestamp,media_type,permalink', limit, access_token: E.THREADS_TOKEN } });
  return (r.data || []).filter((p) => p.text);
}

// Competitor/trend research: Gemini + Google Search when the key's plan allows it,
// otherwise an empty string (the writing prompt has built-in viral patterns).
async function research(topic) {
  try {
    return await gemini(
      'Tìm trên Threads/Facebook/TikTok các bài viral gần đây của các trang luyện thi TOEIC tại Việt Nam về chủ đề: ' + topic +
        '. Liệt kê 3-5 hook mở đầu và format bài (dạng list, confession, quiz, so sánh...) đang ăn tương tác. Mỗi ý 1 dòng, không chép nguyên văn.',
      { search: true }
    );
  } catch (e) {
    return '';
  }
}

const VOICE = [
  'Giọng văn: Gen Z Việt, tự nhiên như người thật đang nói chuyện, vui, gần gũi, hơi lầy nhưng có ích. Xưng "t"/"mình", gọi người đọc "ae"/"mấy bà"/"bạn" tuỳ ngữ cảnh.',
  'Viết tiếng Việt có dấu đầy đủ. Câu ngắn, xuống dòng nhiều, tối đa 2-3 emoji, tối đa 1 hashtag (hoặc không).',
  'KHÔNG đặt link trong bài, KHÔNG văn mẫu quảng cáo, KHÔNG bịa số liệu/điểm số/cam kết, KHÔNG nhận mình là AI hay bot.',
  'Mở đầu bằng 1 hook gây tò mò hoặc chạm nỗi đau người học TOEIC (dòng đầu là quan trọng nhất).',
].join('\n');

const VIRAL = [
  'Các mẫu bài TOEIC hay viral trên Threads: "ae nào ... thì vô đây", confession mất gốc lên 700+, list 3-5 mẹo ngắn, "sai lầm mà 90% người mới mắc",',
  'câu hỏi Part 5 thử thách "ai làm đúng câu này trong 10s", so sánh 2 từ dễ nhầm, hỏi ngược người đọc "bạn kẹt part nào nhất".',
].join(' ');
`;

const code = (body) => LIB + "\n" + body.trim() + "\n";

let nodeSeq = 0;
function node(name, type, typeVersion, parameters, x) {
  nodeSeq++;
  return { id: `n${nodeSeq}-${name.replace(/\W+/g, "-")}`, name, type, typeVersion, position: [x, 300], parameters };
}
const schedule = (name, crons, x = 0) =>
  node(name, "n8n-nodes-base.scheduleTrigger", 1.2, {
    rule: { interval: [].concat(crons).map((expression) => ({ field: "cronExpression", expression })) },
  }, x);
const codeNode = (name, body, x) => node(name, "n8n-nodes-base.code", 2, { mode: "runOnceForAllItems", jsCode: code(body) }, x);
const wait = (name, x) =>
  node(name, "n8n-nodes-base.wait", 1.1, { resume: "timeInterval", amount: "={{ $json.waitSec }}", unit: "seconds" }, x);

function workflow(id, name, nodes) {
  const connections = {};
  for (let i = 0; i < nodes.length - 1; i++) {
    connections[nodes[i].name] = { main: [[{ node: nodes[i + 1].name, type: "main", index: 0 }]] };
  }
  return {
    id,
    name,
    active: false,
    nodes,
    connections,
    settings: { executionOrder: "v1", timezone: "Asia/Ho_Chi_Minh", saveManualExecutions: true },
    pinData: {},
  };
}

// Random start offset so posts never land on the exact same minute every day.
const JITTER = `return [{ json: { waitSec: rand(0, 40 * 60) } }];`;

// ---------------------------------------------------------------------------
// 1. Image post: screenshot a real page of the site, write a post about it,
//    link to that page in the first comment.
const imagePost = workflow("thrImagePost01", "Threads 1 – Bài ảnh từ website", [
  schedule("Lịch 8:30 & 19:30", "30 8,19 * * *"),
  codeNode("Lệch giờ ngẫu nhiên", JITTER, 220),
  wait("Chờ", 440),
  codeNode(
    "Chọn trang & chụp ảnh",
    String.raw`
// Pages worth showing: free test, vocab lists, guides, blog posts (from the sitemap).
const xml = await http({ url: SITE + '/sitemap.xml', json: false, headers: { 'User-Agent': 'Mozilla/5.0' } });
const urls = [...String(xml).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const good = urls.filter((u) => /\/(blog|tu-vung|huong-dan|thi-thu-mien-phi)(\/|$)/.test(u));
const used = store.usedPages || [];
let candidates = good.filter((u) => !used.includes(u));
if (!candidates.length) candidates = good;
const pageUrl = pick(candidates);
store.usedPages = [...used, pageUrl].slice(-60);

const html = String(await http({ url: pageUrl, json: false, headers: { 'User-Agent': 'Mozilla/5.0' } }));
const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
const text = html
  .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#x27;|&quot;|&amp;/g, ' ')
  .replace(/\s+/g, ' ')
  .slice(0, 3500);

const path = pageUrl.replace(/^https?:\/\/[^/]+/, '') || '/';
const shot = await http({ url: (E.HELPER_URL || 'http://127.0.0.1:5690') + '/shot', qs: { path }, timeout: 120000 });
if (!shot.url) throw new Error('Helper không chụp được ảnh: ' + JSON.stringify(shot));
return [{ json: { pageUrl, title, text, imageUrl: shot.url } }];
`,
    660
  ),
  codeNode(
    "Viết bài (Gemini)",
    String.raw`
const p = $input.first().json;
const mine = (await myRecentPosts(12)).map((x) => '- ' + x.text.replace(/\s+/g, ' ').slice(0, 220)).join('\n');
const trends = await research(p.title);
const out = await gemini(
  [
    'Bạn là admin trang Threads @toeicmasteryy (web luyện thi TOEIC miễn phí ' + SITE + ').',
    'Viết 1 bài Threads kèm ẢNH CHỤP trang web này để kéo người đọc vào trang. Tiêu đề trang: ' + p.title,
    'Nội dung trang (tóm tắt để lấy ý, không chép nguyên): ' + p.text,
    VOICE,
    'Bài dài 200-420 ký tự. Lấy 1-3 ý đắt nhất trong trang, kết bài bằng câu kích người đọc comment hoặc xem link ở comment ("link t để ở cmt nha").',
    VIRAL,
    trends ? 'Xu hướng/đối thủ đang làm (chỉ lấy cảm hứng):\n' + trends : '',
    mine ? 'Các bài cũ của trang (giữ giọng tương tự nhưng KHÔNG lặp hook/ý):\n' + mine : '',
    'Trả về JSON: {"post": "...", "comment": "câu comment ngắn kiểu người thật dẫn link, có chèn đúng link ' + p.pageUrl + '"}',
  ].join('\n\n'),
  { json: true }
);
if (!out.post || !out.comment || !out.comment.includes(SITE.replace(/^https?:\/\//, ''))) throw new Error('Gemini trả sai định dạng: ' + JSON.stringify(out));
return [{ json: { ...p, post: out.post, comment: out.comment } }];
`,
    880
  ),
  codeNode(
    "Đăng lên Threads",
    String.raw`
const p = $input.first().json;
const postId = await threadsPost({ text: p.post, imageUrl: p.imageUrl });
// Link comment goes up a few minutes later, like a person replying to themselves.
return [{ json: { ...p, postId, waitSec: rand(120, 420) } }];
`,
    1100
  ),
  wait("Chờ rồi comment", 1320),
  codeNode(
    "Comment link",
    String.raw`
const p = $input.first().json;
const replyId = await threadsPost({ text: p.comment, replyTo: p.postId });
return [{ json: { postId: p.postId, replyId, pageUrl: p.pageUrl } }];
`,
    1540
  ),
]);

// ---------------------------------------------------------------------------
// 2. Engagement post: tips / quiz (answer in comment) / question to the audience.
const engagePost = workflow("thrEngagePost01", "Threads 2 – Bài tương tác (tips, quiz, hỏi đáp)", [
  schedule("Lịch 12:15 & 21:45", ["15 12 * * *", "45 21 * * *"]),
  codeNode("Lệch giờ ngẫu nhiên", JITTER, 220),
  wait("Chờ", 440),
  codeNode(
    "Viết & đăng bài",
    String.raw`
const TYPES = {
  tip: 'Chia sẻ 3-5 mẹo TOEIC cực ngắn, thực tế (Part 5/6/7, Listening, quản lý thời gian, từ vựng). Comment sẽ dẫn link luyện tập.',
  quiz: 'Đăng 1 câu hỏi Part 5 (1 câu tiếng Anh có chỗ trống + 4 đáp án A/B/C/D, chuẩn format TOEIC, chỉ 1 đáp án đúng). Thách người đọc trả lời trong 10s, KHÔNG nêu đáp án trong bài. Comment sẽ là đáp án + giải thích ngắn + link làm thêm.',
  question: 'Đặt 1 câu hỏi mở kích comment (vd: bạn kẹt part nào, mục tiêu bao nhiêu điểm, thi lần mấy rồi...), kèm 1-2 câu kể chuyện đồng cảm. Comment dẫn link để luyện đúng chỗ yếu.',
  confusing: 'So sánh 2-3 từ/cấu trúc TOEIC dễ nhầm (vd: affect/effect, despite/although), mỗi cái 1 ví dụ ngắn. Kết bằng 1 câu đố nhỏ. Comment dẫn link.',
  story: 'Kể 1 câu chuyện/confession ngắn kiểu người học (mất gốc, sợ Listening, ôn sát ngày thi...) rồi rút ra 1 bài học có ích. Không bịa điểm số cụ thể. Comment dẫn link.',
};
const keys = Object.keys(TYPES);
const last = store.lastType;
const type = pick(keys.filter((k) => k !== last));
store.lastType = type;

const mine = (await myRecentPosts(12)).map((x) => '- ' + x.text.replace(/\s+/g, ' ').slice(0, 220)).join('\n');
const trends = await research(type === 'quiz' ? 'câu hỏi TOEIC Part 5 thử thách' : 'mẹo học TOEIC');
const linkPages = [SITE + '/thi-thu-mien-phi', SITE + '/practice', SITE + '/tu-vung', SITE + '/huong-dan', SITE];
const link = pick(linkPages);

const out = await gemini(
  [
    'Bạn là admin trang Threads @toeicmasteryy (web luyện thi TOEIC miễn phí ' + SITE + ').',
    'Nhiệm vụ: ' + TYPES[type],
    VOICE,
    'Bài dài 150-450 ký tự.',
    VIRAL,
    trends ? 'Xu hướng/đối thủ đang làm (chỉ lấy cảm hứng, không chép):\n' + trends : '',
    mine ? 'Các bài cũ của trang (giữ giọng tương tự nhưng KHÔNG lặp ý):\n' + mine : '',
    'Trả về JSON: {"post": "...", "comment": "comment đầu tiên do chính trang viết, tự nhiên như người thật, có chèn đúng link ' + link + '"}',
  ].join('\n\n'),
  { json: true }
);
if (!out.post || !out.comment || !out.comment.includes(SITE.replace(/^https?:\/\//, ''))) throw new Error('Gemini trả sai định dạng: ' + JSON.stringify(out));
const postId = await threadsPost({ text: out.post });
// Quiz: answer comes 1-3h later so people have time to guess; others: a few minutes.
const waitSec = type === 'quiz' ? rand(60, 180) * 60 : rand(180, 600);
return [{ json: { type, postId, post: out.post, comment: out.comment, waitSec } }];
`,
    660
  ),
  wait("Chờ rồi comment", 880),
  codeNode(
    "Comment đáp án / link",
    String.raw`
const p = $input.first().json;
const replyId = await threadsPost({ text: p.comment, replyTo: p.postId });
return [{ json: { type: p.type, postId: p.postId, replyId } }];
`,
    1100
  ),
]);

// ---------------------------------------------------------------------------
// 3. Auto-reply to comments on our recent posts, paced to look human and stay
//    far below Threads' limits.
const autoReply = workflow("thrAutoReply01", "Threads 3 – Tự trả lời comment", [
  node("Mỗi 20 phút", "n8n-nodes-base.scheduleTrigger", 1.2, { rule: { interval: [{ field: "minutes", minutesInterval: 20 }] } }, 0),
  codeNode(
    "Trả lời comment",
    String.raw`
const MAX_PER_RUN = 3, MAX_PER_DAY = 60, LINK_RATE = 0.3;
const hour = Number(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh', hour: 'numeric', hour12: false }));
if (hour < 7) return [{ json: { skipped: 'ngoài giờ (7h-24h)' } }];

const today = new Date().toISOString().slice(0, 10);
if (store.day !== today) { store.day = today; store.countToday = 0; }
if (store.countToday >= MAX_PER_DAY) return [{ json: { skipped: 'đủ giới hạn ngày' } }];
store.replied = store.replied || [];
store.linked = store.linked || [];

const me = await http({ url: TH + '/me', qs: { fields: 'id,username', access_token: E.THREADS_TOKEN } });
const since = Date.now() - 4 * 86400e3;
const posts = (await myRecentPosts(15)).filter((p) => new Date(p.timestamp).getTime() > since);

const todo = [];
for (const post of posts) {
  const r = await http({ url: TH + '/' + post.id + '/replies', qs: { fields: 'id,text,username,timestamp', access_token: E.THREADS_TOKEN } });
  for (const c of r.data || []) {
    if (!c.text || c.username === me.username || store.replied.includes(c.id)) continue;
    if (Date.now() - new Date(c.timestamp).getTime() > 2 * 86400e3) continue;
    todo.push({ post, c });
  }
}
const done = [];
for (const { post, c } of todo.slice(0, MAX_PER_RUN)) {
  // Skip comments the owner already answered by hand.
  const sub = await http({ url: TH + '/' + c.id + '/replies', qs: { fields: 'username', access_token: E.THREADS_TOKEN } });
  if ((sub.data || []).some((x) => x.username === me.username)) { store.replied.push(c.id); continue; }

  const asksLink = /link|web|ở đâu|o dau|học ở|xin|cho mình|cho em|cho t|dùng gì|app|trang nào/i.test(c.text);
  const withLink = asksLink || (!store.linked.includes(c.username) && Math.random() < LINK_RATE);
  const reply = await gemini(
    [
      'Bạn là admin trang Threads @toeicmasteryy (web luyện thi TOEIC miễn phí ' + SITE + ').',
      'Bài gốc: ' + post.text.slice(0, 600),
      'Comment của @' + c.username + ': ' + c.text,
      'Viết 1 câu trả lời comment này: Gen Z, vui, ấm áp, như người thật nhắn lại; đúng trọng tâm comment (nếu hỏi kiến thức thì trả lời đúng và ngắn gọn, nếu là đáp án quiz thì khen/sửa nhẹ nhàng).',
      'Tối đa 220 ký tự, tối đa 1 emoji, không hashtag, không nhận là AI/bot, không văn mẫu.',
      withLink ? 'Lồng tự nhiên link ' + SITE + ' vào câu trả lời (vd "vô đây luyện thêm nè").' : 'KHÔNG chèn link.',
      'Chỉ trả về nội dung câu trả lời.',
    ].join('\n'),
  );
  await sleep(rand(15, 45) * 1000);
  const id = await threadsPost({ text: reply.replace(/^"|"$/g, ''), replyTo: c.id });
  store.replied.push(c.id);
  if (withLink) store.linked.push(c.username);
  store.countToday++;
  done.push({ comment: c.text, by: c.username, reply, id });
}
store.replied = store.replied.slice(-2000);
store.linked = store.linked.slice(-2000);
return done.length ? done.map((d) => ({ json: d })) : [{ json: { replied: 0, waiting: todo.length } }];
`,
    220
  ),
]);

mkdirSync(OUT, { recursive: true });
for (const [file, wf] of [
  ["threads-1-image-post.json", imagePost],
  ["threads-2-engagement-post.json", engagePost],
  ["threads-3-auto-reply.json", autoReply],
]) {
  writeFileSync(join(OUT, file), JSON.stringify(wf, null, 2) + "\n");
  console.log("wrote", file);
}
