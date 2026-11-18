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
// Waits between steps: a few seconds when run by hand (test), human-like when scheduled.
const delay = (a, b) => ($execution.mode !== 'production' ? 5 : rand(a, b));
// Step log carried along the run so every node's output shows the whole story.
const tr = (p, step, detail) => [...((p && p.trace) || []), { step, at: new Date().toISOString(), ...detail }];
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const store = $getWorkflowStaticData('global'); // persists only on scheduled (active) runs

async function gemini(prompt, { search = false, json = false } = {}) {
  const body = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 1, thinkingConfig: { thinkingBudget: 0 } } }; // no hidden "thinking": 2-3s per call instead of 5-15s
  if (search) body.tools = [{ google_search: {} }];
  else if (json) body.generationConfig.responseMimeType = 'application/json';
  let r;
  for (let attempt = 1; ; attempt++) {
    try {
      r = await http({
        method: 'POST',
        url: 'https://generativelanguage.googleapis.com/v1beta/models/' + (E.GEMINI_MODEL || 'gemini-3.1-flash-lite') + ':generateContent',
        qs: { key: E.GEMINI_API_KEY },
        body,
        timeout: 30000, // a stuck call is cut after 30s and retried
      });
      break;
    } catch (e) {
      // Gemini answers 429/5xx now and then: wait a little and retry (max 3 tries).
      if (attempt >= 3 || !/status code (429|500|502|503|504)|timeout|ETIMEDOUT|ECONNABORTED|ECONNRESET/i.test(String(e.message))) throw e;
      await sleep(1500 * attempt);
    }
  }
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

// Facebook Graph API with the Page token (FB_PAGE_TOKEN).
async function fbApi(method, path, params = {}) {
  return http({ method, url: 'https://graph.facebook.com/v23.0' + path, qs: { ...params, access_token: E.FB_PAGE_TOKEN } });
}

async function myRecentPosts(limit = 15) {
  const r = await http({ url: TH + '/me/threads', qs: { fields: 'id,text,timestamp,media_type,permalink', limit, access_token: E.THREADS_TOKEN } });
  return (r.data || []).filter((p) => p.text);
}

// Competitor/trend research: Gemini + Google Search when the key's plan allows it,
// otherwise an empty string (the writing prompt has built-in viral patterns).
async function research(topic) {
  if (E.GEMINI_SEARCH !== 'on') return ''; // Google Search grounding needs a paid Gemini plan; set GEMINI_SEARCH=on in .env to use it
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

const COMMENT_RULE = [
  'Comment đầu tiên (do chính chủ bài viết) phải NỐI TIẾP mạch câu chuyện của bài, như đang kể tiếp chứ không phải quảng cáo:',
  '1) 1-2 câu nối đúng vấn đề đã nêu trong bài (cách t/mình xử lý, mẹo nhỏ có ích thật, hoặc thừa nhận thêm một chi tiết đời thường) — người đọc phải thấy có giá trị ngay cả khi không bấm link.',
  '2) Rồi mới khéo dẫn sang web theo kiểu bạn bè giới thiệu: nói rõ trên web có đúng thứ giải quyết vấn đề đó (tên tính năng/phần cụ thể), link đặt CUỐI comment.',
  'Cấm mở đầu bằng "Link đây", "Đây nè", "Vào đây"; cấm câu kêu gọi chung chung như "truy cập ngay"; không lặp lại nguyên văn bài; tối đa 3 câu, tối đa 1 emoji.',
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

function workflow(id, name, nodes) {
  const connections = {};
  for (let i = 0; i < nodes.length - 1; i++) {
    connections[nodes[i].name] = { main: [[{ node: nodes[i + 1].name, type: "main", index: 0 }]] };
  }
  nodes.forEach((n, i) => (n.position = [220 * i, 300]));
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


const PLATFORM = {
  threads: { who: "trang Threads @toeicmasteryy", len: "Bài dài 200-420 ký tự.", comment: "câu comment ngắn kiểu người thật" },
  group: {
    who: "admin group Facebook TOEIC Mastery (cộng đồng người học TOEIC)",
    len: "Bài đăng group dài 300-800 ký tự, giọng admin thân thiện nói với thành viên (gọi \"cả nhà\"/\"mọi người\"), kích thành viên comment, xuống dòng thoáng.",
    comment: "comment đầu tiên của admin",
  },
  facebook: {
    who: "Fanpage Facebook TOEIC Mastery",
    len: "Bài Facebook dài 400-900 ký tự, xuống dòng thoáng, có thể dùng gạch đầu dòng/emoji đầu dòng.",
    comment: "comment ghim đầu tiên do page viết, tự nhiên",
  },
};

// Feature pages of the logged-in app (the showcase account has real study data).
// {topic}/{lesson}/{n} are filled at random so the same screen isn't reposted.
const FEATURE_PICK = String.raw`
const FEATURES = [
  { path: '/dashboard', name: 'Trang tổng quan: streak, mục tiêu điểm, điểm dự đoán, kỹ năng' },
  { path: '/analytics', name: 'Thống kê điểm yếu theo từng Part và dạng câu' },
  { path: '/mentor/path', name: 'Lộ trình học cá nhân hoá theo ngày (AI Mentor)' },
  { path: '/mentor', name: 'AI Mentor phân tích và gợi ý học' },
  { path: '/vocabulary/path', name: 'Lộ trình từ vựng TOEIC theo ngày, nhắc ôn lặp lại ngắt quãng' },
  { path: '/vocabulary/topic/{topic}/study', click: 'Bắn nổ thiên thạch', name: 'Game Blast: bắn thiên thạch mang từ đúng nghĩa (từ vựng TOEIC chủ đề {topic})' },
  { path: '/vocabulary/topic/{topic}/study', click: 'Chạm bong bóng', name: 'Game Bong bóng: chạm bong bóng mang từ đúng (từ vựng TOEIC chủ đề {topic})' },
  { path: '/vocabulary/topic/{topic}/study', click: 'Đập chú chuột', name: 'Game Đập chuột: đập chú chuột cầm đúng nghĩa của từ (chủ đề {topic})' },
  { path: '/vocabulary/topic/{topic}/study', click: 'Thả móc kéo', name: 'Game Đào vàng: thả móc kéo cục vàng mang đúng nghĩa (chủ đề {topic})' },
  { path: '/vocabulary/topic/{topic}/study', click: 'Ghép từ với nghĩa', name: 'Game Nối từ: ghép từ với nghĩa nhanh nhất (chủ đề {topic})' },
  { path: '/vocabulary/topics', name: 'Từ vựng TOEIC theo chủ đề' },
  { path: '/grammar/mastery', name: 'Khoá ngữ pháp Part 5-6: bài học + bài tập' },
  { path: '/grammar/mastery/{lesson}', name: 'Một bài học ngữ pháp TOEIC kèm bài tập' },
  { path: '/listening/part-{n}', name: 'Luyện nghe TOEIC Part {n}' },
  { path: '/history', name: 'Lịch sử bài thi, điểm từng lần' },
  { path: '/practice', name: 'Kho đề thi thử TOEIC' },
  { path: '/shop', name: 'Shop đổi XP kiếm được khi học' },
];
const TOPICS = ['office', 'meetings', 'marketing', 'finance', 'travel', 'airport', 'hotel', 'restaurant', 'contracts', 'human-resources', 'manufacturing', 'shipping', 'customer-service', 'technology'];
const LESSONS = ['nhan-biet-danh-tu', 'danh-tu-so-it-so-nhieu', 'cum-danh-tu', 'dong-tu-vi-ngu', 'phan-tu-lam-tinh-tu', 'danh-dong-tu-to-v', 'vi-tri-tinh-tu-trang-tu'];
const used = store.usedFeatures || [];
const keyOf = (f) => f.path + (f.click || '');
let pool = FEATURES.filter((f) => !used.includes(keyOf(f)));
if (!pool.length) pool = FEATURES;
const f = pick(pool);
store.usedFeatures = [...used, keyOf(f)].slice(-(FEATURES.length - 2));
const fill = (s, v) => s.replace('{topic}', v.topic).replace('{lesson}', v.lesson).replace('{n}', v.n);
const v = { topic: pick(TOPICS), lesson: pick(LESSONS), n: String(rand(1, 4)) };
const path = fill(f.path, v);
`;
const FEATURE_SHOT = FEATURE_PICK + String.raw`
const shot = await http({ url: (E.HELPER_URL || 'http://127.0.0.1:5690') + '/shot', qs: f.click ? { path, click: f.click } : { path }, timeout: 150000 });
if (!shot.url) throw new Error('Helper không chụp được ảnh: ' + JSON.stringify(shot));
return [{ json: { feature: fill(f.name, v), path, text: shot.text || '', imageUrl: shot.url, link: SITE + path } }];
`;

const featureWrite = (platform) => String.raw`
const p = $input.first().json;
const P = ${JSON.stringify(PLATFORM[platform])};
const mine = ${platform === "threads" ? "(await myRecentPosts(12)).map((x) => '- ' + x.text.replace(/\\s+/g, ' ').slice(0, 220)).join('\n')" : "''"};
const trends = p.trends !== undefined ? p.trends : await research(p.feature);
const out = await gemini(
  [
    'Bạn là admin ' + P.who + ' (web luyện thi TOEIC ' + SITE + ').',
    'Viết 1 bài kèm ẢNH CHỤP MÀN HÌNH tính năng của web để khoe web có gì và kéo người đọc vào dùng thử.',
    'Tính năng trong ảnh: ' + p.feature,
    'Chữ hiển thị trên màn hình đó (để hiểu tính năng, không chép nguyên): ' + p.text.slice(0, 2500),
    VOICE,
    P.len + ' Nói tính năng này giúp gì cho người học (lợi ích cụ thể, đời thường), có thể kể kiểu "dạo này t học bằng cái này". Không nói số liệu trong ảnh là kết quả của người thật. Kết bài rủ người đọc xem link ở comment.',
    VIRAL,
    trends ? 'Xu hướng/đối thủ đang làm (chỉ lấy cảm hứng):\n' + trends : '',
    mine ? 'Các bài cũ của trang (giữ giọng tương tự nhưng KHÔNG lặp hook/ý):\n' + mine : '',
    COMMENT_RULE,
    'Trả về JSON: {"post": "...", "comment": "comment đầu tiên theo quy tắc trên, có chèn đúng link ' + p.link + ' ở cuối"}',
  ].join('\n\n'),
  { json: true }
);
if (!out.post || !out.comment || !out.comment.includes(SITE.replace(/^https?:\/\//, ''))) throw new Error('Gemini trả sai định dạng: ' + JSON.stringify(out));
return [{ json: { ...p, post: out.post, comment: out.comment } }];
`;

const ENGAGE_TYPES = String.raw`
const TYPES = {
  tip: 'Chia sẻ 3-5 mẹo TOEIC cực ngắn, thực tế (Part 5/6/7, Listening, quản lý thời gian, từ vựng). Comment sẽ dẫn link luyện tập.',
  quiz: 'Đăng 1 câu hỏi Part 5 (1 câu tiếng Anh có chỗ trống + 4 đáp án A/B/C/D, chuẩn format TOEIC, chỉ 1 đáp án đúng). Thách người đọc trả lời trong 10s, KHÔNG nêu đáp án trong bài. Comment sẽ là đáp án + giải thích ngắn + link làm thêm.',
  question: 'Đặt 1 câu hỏi mở kích comment (vd: bạn kẹt part nào, mục tiêu bao nhiêu điểm, thi lần mấy rồi...), kèm 1-2 câu kể chuyện đồng cảm. Comment dẫn link để luyện đúng chỗ yếu.',
  confusing: 'So sánh 2-3 từ/cấu trúc TOEIC dễ nhầm (vd: affect/effect, despite/although), mỗi cái 1 ví dụ ngắn. Kết bằng 1 câu đố nhỏ. Comment dẫn link.',
  story: 'Kể 1 câu chuyện/confession ngắn kiểu người học (mất gốc, sợ Listening, ôn sát ngày thi...) rồi rút ra 1 bài học có ích. Không bịa điểm số cụ thể. Comment dẫn link.',
};
const type = ($input.first().json && $input.first().json.type) || pick(Object.keys(TYPES).filter((k) => k !== store.lastType));
store.lastType = type;
// Every product page except blog/guide articles. Logged-out visitors land on the sign-up popup.
const LINKS = [
  SITE + '/dashboard : tổng quan học tập, streak, mục tiêu điểm (hợp động lực, theo dõi tiến bộ)',
  SITE + '/mentor/path : lộ trình học cá nhân hoá theo ngày theo mục tiêu điểm và ngày thi (hợp không biết học gì trước, thiếu kế hoạch)',
  SITE + '/mentor : AI Mentor hỏi đáp và gợi ý học (hợp thắc mắc cách học, cần người chỉ đường)',
  SITE + '/analytics : thống kê điểm yếu theo từng Part và dạng câu (hợp sai hoài mà không biết sai ở đâu)',
  SITE + '/practice/start : vào thẳng bài thi thử TOEIC đầy đủ như thi thật (hợp muốn biết trình độ, áp lực thời gian)',
  SITE + '/practice : kho đề thi thử ETS, luyện từng Part, xem lại câu sai (hợp luyện đề, sai hoài một dạng câu)',
  SITE + '/thi-thu-mien-phi : làm thử 10 câu Part 5 miễn phí có giải thích (hợp quiz, ngữ pháp, từ loại)',
  SITE + '/grammar/mastery : khoá ngữ pháp Part 5-6 có bài học và bài tập (hợp mất gốc ngữ pháp, từ loại)',
  SITE + '/listening : luyện nghe từng Part 1-4 có transcript (hợp sợ Listening, nghe không kịp)',
  SITE + '/reading : luyện đọc Part 5-6-7 (hợp Part 7 chậm, đọc không kịp giờ)',
  SITE + '/vocabulary : từ vựng TOEIC theo lộ trình, ôn lặp lại ngắt quãng (hợp quên từ nhanh)',
  SITE + '/vocabulary/topics : từ vựng theo chủ đề công sở/du lịch/tài chính, có game (hợp học từ chán, muốn chơi mà học)',
  SITE + '/tu-vung : danh sách từ vựng TOEIC theo chủ đề xem không cần đăng nhập (hợp từ dễ nhầm)',
  SITE + '/dictionary : từ điển tra nhanh nghĩa và cách dùng (hợp gặp từ lạ)',
  SITE + '/quick-study : học nhanh vài phút mỗi ngày (hợp bận, lười, ít thời gian)',
  SITE + '/shop : đổi XP kiếm được khi học lấy vật phẩm (hợp động lực, game hoá việc học)',
  SITE + ' : trang chủ (chỉ dùng khi không trang nào hợp hơn)',
];
`;

const engageWrite = (platform) => String.raw`
${ENGAGE_TYPES}
const P = ${JSON.stringify(PLATFORM[platform])};
const mine = ${platform === "threads" ? "(await myRecentPosts(12)).map((x) => '- ' + x.text.replace(/\\s+/g, ' ').slice(0, 220)).join('\n')" : "''"};
const trends = $input.first().json.trends !== undefined ? $input.first().json.trends : await research(type === 'quiz' ? 'câu hỏi TOEIC Part 5 thử thách' : 'mẹo học TOEIC');
const out = await gemini(
  [
    'Bạn là admin ' + P.who + ' (web luyện thi TOEIC miễn phí ' + SITE + ').',
    'Nhiệm vụ: ' + TYPES[type],
    VOICE,
    P.len,
    VIRAL,
    trends ? 'Xu hướng/đối thủ đang làm (chỉ lấy cảm hứng, không chép):\n' + trends : '',
    mine ? 'Các bài cũ của trang (giữ giọng tương tự nhưng KHÔNG lặp ý):\n' + mine : '',
    type === 'quiz' ? 'Với quiz: comment = đáp án đúng + giải thích 1 câu vì sao, rồi khéo dẫn sang web luyện thêm dạng câu này (link ở cuối); vẫn không mở đầu bằng "Link đây".' : COMMENT_RULE,
    'Các trang trên web để dẫn vào (CHỌN 1 trang hợp chủ đề bài nhất, chèn đúng URL đó; TUYỆT ĐỐI không dẫn vào blog/bài viết/hướng dẫn):\n' + LINKS.join('\n'),
    'Trả về JSON: {"post": "...", "comment": "comment đầu tiên theo quy tắc trên, link ở cuối"}',
  ].join('\n\n'),
  { json: true }
);
if (!out.post || !out.comment || !out.comment.includes(SITE.replace(/^https?:\/\//, ''))) throw new Error('Gemini trả sai định dạng: ' + JSON.stringify(out));
return [{ json: { ...$input.first().json, type, post: out.post, comment: out.comment } }];
`;

// Reply rules shared by Threads and Facebook auto-replies.
const REPLY_PROMPT = String.raw`
const replyPrompt = (who, postText, author, comment, withLink) =>
  [
    'Bạn là admin ' + who + ' (web luyện thi TOEIC miễn phí ' + SITE + ').',
    'Bài gốc: ' + String(postText || '').slice(0, 600),
    'Comment của ' + author + ': ' + comment,
    'Viết 1 câu trả lời comment này: Gen Z, vui, ấm áp, như người thật nhắn lại; đúng trọng tâm comment (nếu hỏi kiến thức thì trả lời đúng và ngắn gọn, nếu là đáp án quiz thì khen/sửa nhẹ nhàng).',
    'Tối đa 220 ký tự, tối đa 1 emoji, không hashtag, không nhận là AI/bot, không văn mẫu.',
    withLink ? 'Lồng tự nhiên link ' + SITE + ' vào câu trả lời (vd "vô đây luyện thêm nè").' : 'KHÔNG chèn link.',
    'Chỉ trả về nội dung câu trả lời.',
  ].join('\n');
const asksLink = (t) => /link|web|ở đâu|o dau|học ở|xin|cho mình|cho em|cho t|dùng gì|app|trang nào/i.test(t);
const hourVN = Number(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh', hour: 'numeric', hour12: false }));
const today = new Date().toISOString().slice(0, 10);
if (store.day !== today) { store.day = today; store.countToday = 0; }
store.replied = store.replied || [];
store.linked = store.linked || [];
`;

// ---------------------------------------------------------------------------
// Threads 1. Feature screenshot post, link in the first comment.
const imagePost = workflow("thrImagePost01", "Threads 1 – Bài ảnh tính năng web", [
  schedule("Lịch 8:30 & 19:30", "30 8,19 * * *"),
  codeNode("Chọn tính năng & chụp ảnh", FEATURE_SHOT, 660),
  codeNode("Viết bài (Gemini)", featureWrite("threads"), 880),
  codeNode(
    "Đăng lên Threads",
    String.raw`
const p = $input.first().json;
const postId = await threadsPost({ text: p.post, imageUrl: p.imageUrl });
// Link comment goes up a few minutes later, like a person replying to themselves.
return [{ json: { ...p, postId } }];
`,
    1100
  ),
  codeNode(
    "Comment link",
    String.raw`
const p = $input.first().json;
await sleep(rand(8, 15) * 1000);
const replyId = await threadsPost({ text: p.comment, replyTo: p.postId });
return [{ json: { postId: p.postId, replyId, path: p.path } }];
`,
    1540
  ),
]);

// Threads 2. Engagement post: tips / quiz (answer in comment) / question to the audience.
const engagePost = workflow("thrEngagePost01", "Threads 2 – Bài tương tác (tips, quiz, hỏi đáp)", [
  schedule("Lịch 12:15 & 21:45", ["15 12 * * *", "45 21 * * *"]),
  codeNode("Viết bài (Gemini)", engageWrite("threads"), 660),
  codeNode(
    "Đăng lên Threads",
    String.raw`
const p = $input.first().json;
const postId = await threadsPost({ text: p.post });
return [{ json: { ...p, postId } }];
`,
    880
  ),
  codeNode(
    "Comment đáp án / link",
    String.raw`
const p = $input.first().json;
await sleep(rand(8, 15) * 1000);
const replyId = await threadsPost({ text: p.comment, replyTo: p.postId });
return [{ json: { type: p.type, postId: p.postId, replyId } }];
`,
    1320
  ),
]);

// Threads 3. Auto-reply to comments on recent posts, paced to look human.
const autoReply = workflow("thrAutoReply01", "Threads 3 – Tự trả lời comment", [
  node("Mỗi 20 phút", "n8n-nodes-base.scheduleTrigger", 1.2, { rule: { interval: [{ field: "minutes", minutesInterval: 20 }] } }, 0),
  codeNode(
    "Trả lời comment",
    REPLY_PROMPT +
      String.raw`
const MAX_PER_RUN = 3, MAX_PER_DAY = 60, LINK_RATE = 0.3;
if (hourVN < 7) return [{ json: { skipped: 'ngoài giờ (7h-24h)' } }];
if (store.countToday >= MAX_PER_DAY) return [{ json: { skipped: 'đủ giới hạn ngày' } }];

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
  const withLink = asksLink(c.text) || (!store.linked.includes(c.username) && Math.random() < LINK_RATE);
  const reply = await gemini(replyPrompt('trang Threads @toeicmasteryy', post.text, '@' + c.username, c.text, withLink));
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

// ---------------------------------------------------------------------------
// Facebook Page (groups have no posting/commenting API since 2024).
const fbImagePost = workflow("fbImagePost001", "Facebook 1 – Bài ảnh tính năng web (Page)", [
  schedule("Lịch 10:00", "0 10 * * *"),
  codeNode("Chọn tính năng & chụp ảnh", FEATURE_SHOT, 660),
  codeNode("Viết bài (Gemini)", featureWrite("facebook"), 880),
  codeNode(
    "Đăng lên Page",
    String.raw`
const p = $input.first().json;
const r = await fbApi('POST', '/' + E.FB_PAGE_ID + '/photos', { url: p.imageUrl, caption: p.post });
return [{ json: { ...p, postId: r.post_id || r.id } }];
`,
    1100
  ),
  codeNode(
    "Comment link",
    String.raw`
const p = $input.first().json;
await sleep(rand(8, 15) * 1000);
const r = await fbApi('POST', '/' + p.postId + '/comments', { message: p.comment });
return [{ json: { postId: p.postId, commentId: r.id } }];
`,
    1540
  ),
]);

const fbEngagePost = workflow("fbEngagePost01", "Facebook 2 – Bài tương tác (Page)", [
  schedule("Lịch 20:30", "30 20 * * *"),
  codeNode("Viết bài (Gemini)", engageWrite("facebook"), 660),
  codeNode(
    "Đăng lên Page",
    String.raw`
const p = $input.first().json;
const r = await fbApi('POST', '/' + E.FB_PAGE_ID + '/feed', { message: p.post });
return [{ json: { ...p, postId: r.id } }];
`,
    880
  ),
  codeNode(
    "Comment đáp án / link",
    String.raw`
const p = $input.first().json;
await sleep(rand(8, 15) * 1000);
const r = await fbApi('POST', '/' + p.postId + '/comments', { message: p.comment });
return [{ json: { type: p.type, postId: p.postId, commentId: r.id } }];
`,
    1320
  ),
]);

const fbAutoReply = workflow("fbAutoReply001", "Facebook 3 – Tự trả lời comment (Page)", [
  node("Mỗi 15 phút", "n8n-nodes-base.scheduleTrigger", 1.2, { rule: { interval: [{ field: "minutes", minutesInterval: 15 }] } }, 0),
  codeNode(
    "Trả lời comment",
    REPLY_PROMPT +
      String.raw`
const MAX_PER_RUN = 4, MAX_PER_DAY = 80, LINK_RATE = 0.35;
if (hourVN < 7) return [{ json: { skipped: 'ngoài giờ (7h-24h)' } }];
if (store.countToday >= MAX_PER_DAY) return [{ json: { skipped: 'đủ giới hạn ngày' } }];
const PAGE = E.FB_PAGE_ID;
const since = Math.floor((Date.now() - 4 * 86400e3) / 1000);
const feed = await fbApi('GET', '/' + PAGE + '/feed', { fields: 'id,message,created_time', since, limit: 15 });
const todo = [];
for (const post of feed.data || []) {
  const r = await fbApi('GET', '/' + post.id + '/comments', { fields: 'id,message,from,created_time,comments.limit(20){from}', filter: 'toplevel', limit: 50 });
  for (const c of r.data || []) {
    if (!c.message || store.replied.includes(c.id)) continue;
    if (c.from && c.from.id === PAGE) continue;
    if ((c.comments?.data || []).some((x) => x.from && x.from.id === PAGE)) { store.replied.push(c.id); continue; }
    if (Date.now() - new Date(c.created_time).getTime() > 2 * 86400e3) continue;
    todo.push({ post, c });
  }
}
const done = [];
store.linkedPosts = store.linkedPosts || [];
for (const { post, c } of todo.slice(0, MAX_PER_RUN)) {
  const who = c.from?.id || c.id;
  // The site link goes into at most ONE reply per post; later replies on the same post stay link-free.
  const alreadyLinked = store.linkedPosts.includes(post.id);
  const withLink = !alreadyLinked && (asksLink(c.message) || Math.random() < LINK_RATE);
  let prompt = replyPrompt('Fanpage TOEIC Mastery', post.message, c.from?.name || 'một bạn', c.message, withLink);
  if (alreadyLinked && asksLink(c.message)) prompt += '\nNgười này hỏi link: nói link web mình đã để ở comment phía trên rồi, bảo họ xem ở đó (không dán lại link).';
  const reply = await gemini(prompt);
  await sleep(rand(15, 45) * 1000);
  await fbApi('POST', '/' + c.id + '/likes', {}).catch(() => {});
  const r = await fbApi('POST', '/' + c.id + '/comments', { message: reply.replace(/^"|"$/g, '') });
  store.replied.push(c.id);
  if (withLink) store.linkedPosts.push(post.id);
  store.countToday++;
  done.push({ comment: c.message, reply, id: r.id, linked: withLink });
}
store.replied = store.replied.slice(-2000);
store.linkedPosts = store.linkedPosts.slice(-500);
return done.length ? done.map((d) => ({ json: d })) : [{ json: { replied: 0, waiting: todo.length } }];
`,
    220
  ),
]);

// ---------------------------------------------------------------------------
// Facebook group: Meta has no group posting API, so n8n writes each ready-to-post
// draft (text, image, first comment) into a Google Doc via the helper; the admin
// copies from the doc and posts by hand.
const SAVE_DRAFT = String.raw`
const p = $input.first().json;
const r = await http({
  method: 'POST',
  url: (E.HELPER_URL || 'http://127.0.0.1:5690') + '/draft',
  body: { kind: p.type || p.feature, post: p.post, comment: p.comment, imageUrl: p.imageUrl || null, commentLater: p.type === 'quiz' },
  timeout: 120000,
});
return [{ json: r }];
`;
// Graph helpers for the group hub: explicit positions and edges.
const at = (col, row) => [col * 260, row * 150];
const put = (n, col, row) => ((n.position = at(col, row)), n);
const sticky = (name, content, x, y, w, h, color) =>
  ({ id: "st-" + name.replace(/\W+/g, "-"), name, type: "n8n-nodes-base.stickyNote", typeVersion: 1, position: [x, y], parameters: { content, width: w, height: h, color } });
const manual = (name) => ({ id: "mn-" + name.replace(/\W+/g, "-"), name, type: "n8n-nodes-base.manualTrigger", typeVersion: 1, position: [0, 0], parameters: {} });
const httpNode = (name, parameters) => node(name, "n8n-nodes-base.httpRequest", 4.2, parameters, 0);
const mergeNode = (name) => node(name, "n8n-nodes-base.merge", 3, { mode: "combine", combineBy: "combineByPosition", options: {} }, 0);
const HELPER = "={{ $env.HELPER_URL || 'http://127.0.0.1:5690' }}";

const GN = {
  man: "▶ Chạy ngay", s9: "⏰ Mỗi ngày 9:00", go: "🚀 Khởi động lượt chạy",
  pickF: "🎯 Chọn tính năng", shot: "📷 Chụp màn hình (HTTP)", trA: "📈 Săn xu hướng (A)", mgA: "🔀 Gộp ảnh + xu hướng", readP: "🔎 Đọc nội dung trang", wrA: "✍️ Viết bài ảnh (Gemini)",
  pickE: "🎲 Chọn dạng bài", trB: "📈 Săn xu hướng (B)", mgB: "🔀 Gộp dạng bài + xu hướng", wrB: "✍️ Viết bài tương tác (Gemini)",
  qc: "🛡️ Kiểm duyệt nội dung", docs: "📄 Ghi vào Google Docs (HTTP)", done: "📊 Tổng kết chạy",
};

const GO_CODE = String.raw`
const now = new Date();
return [{ json: {
  runId: 'grp-' + Date.now().toString(36),
  mode: $execution.mode,
  startedAt: now.toISOString(),
  kế_hoạch: ['bài ảnh tính năng (nhánh A)', 'bài tương tác (nhánh B)'],
  trace: tr(null, 'Khởi động', { chế_độ: $execution.mode, kế_hoạch: '2 bài chạy song song: ảnh tính năng + tương tác' }),
} }];
`;

const PICK_FEATURE = FEATURE_PICK + String.raw`
const prev = $input.first().json;
return [{ json: {
  ...prev, kind: 'feature', feature: fill(f.name, v), path, click: f.click || '', link: SITE + path,
  kho_tính_năng: FEATURES.length, còn_chưa_đăng: pool.length,
  trace: tr(prev, 'Chọn tính năng', { tính_năng: fill(f.name, v), trang: path, thao_tác_bấm: f.click || 'không', link_dẫn: SITE + path, còn_chưa_đăng: pool.length + '/' + FEATURES.length }),
} }];
`;

const TREND_NODE = (topicExpr) => String.raw`
const p = $input.first().json;
const t0 = Date.now();
const trends = await research(${topicExpr});
return [{ json: { trends, trendsMs: Date.now() - t0, trendsNote: trends ? 'có dữ liệu xu hướng đối thủ' : (E.GEMINI_SEARCH === 'on' ? 'Search lỗi → dùng mẫu viral cài sẵn' : 'Search tắt (GEMINI_SEARCH=off, cần gói Gemini trả phí) → dùng mẫu viral cài sẵn') } }];
`;

const READ_PAGE = String.raw`
const p0 = $('${GN.pickF}').first().json;
const m = $input.first().json;
const text = m.text || '';
return [{ json: {
  ...p0, imageUrl: m.url, text, textChars: text.length, trends: m.trends, trendsNote: m.trendsNote,
  trace: tr(p0, 'Chụp & đọc trang', { ảnh: m.url, trang_đã_chụp: m.page, ký_tự_đọc_được: text.length, xu_hướng: m.trendsNote, ms_săn_xu_hướng: m.trendsMs }),
} }];
`;

const PICK_ENGAGE = ENGAGE_TYPES + String.raw`
const prev = $input.first().json;
return [{ json: {
  ...prev, kind: 'engage', type, brief: TYPES[type], link_gợi_ý: LINKS.length,
  trace: tr(prev, 'Chọn dạng bài', { dạng: type, yêu_cầu: TYPES[type].slice(0, 90) + '…', số_trang_có_thể_dẫn: LINKS.length }),
} }];
`;

const QC = String.raw`
const p = $input.first().json;
const HOST = SITE.replace(/^https?:\/\//, '');
let post = String(p.post || '').trim();
const comment = String(p.comment || '').trim();
const checks = [];
const add = (name, pass, detail) => checks.push({ name, pass, detail });
add('Bài dài 150–1000 ký tự', post.length >= 150 && post.length <= 1000, post.length + ' ký tự');
add('Comment có link web', comment.includes(HOST), comment.includes(HOST) ? 'có ' + HOST : 'thiếu link');
add('Link không dẫn vào blog/hướng dẫn', !/\/(blog|huong-dan)(\/|$)/.test(comment), 'đã kiểm tra');
add('Thân bài không chứa link', !/https?:\/\//.test(post), 'đã kiểm tra');
add('Không tự nhận là AI/bot', !/(tôi là AI|là một AI|trí tuệ nhân tạo|chatbot)/i.test(post + comment), 'đã kiểm tra');
const tags = post.match(/#[^\s#]+/g) || [];
let fixed = '';
if (tags.length > 1) { post = post.replace(/#[^\s#]+/g, '').replace(/\s+$/, '') + ' ' + tags[0]; fixed = 'tự cắt hashtag thừa, giữ ' + tags[0]; }
add('Tối đa 1 hashtag', true, tags.length + ' hashtag' + (fixed ? ' → ' + fixed : ''));
const failed = checks.filter((c) => !c.pass);
return [{ json: {
  ...p, post, comment,
  qc: { đạt: checks.length - failed.length, tổng: checks.length, cảnh_báo: failed.map((f) => f.name), chi_tiết: checks },
  trace: tr(p, 'Kiểm duyệt', { đạt: checks.length - failed.length + '/' + checks.length, cảnh_báo: failed.map((f) => f.name), độ_dài_bài: post.length, độ_dài_comment: comment.length }),
} }];
`;

// Two branches finish separately, so the nodes below run once per branch ($runIndex pairs them).
const DONE = String.raw`
const q = $('${GN.qc}').all(0, $runIndex)[0].json;
const doc = $input.first().json;
const ms = Date.now() - new Date(q.startedAt).getTime();
const trace = tr(q, 'Ghi Google Docs', { kết_quả: doc.doc, đã_lưu: doc.saved });
return [{ json: {
  runId: q.runId,
  trạng_thái: doc.saved ? '✅ XONG — bài nằm trong Google Docs' : '⚠️ lưu thất bại',
  loại: q.kind === 'feature' ? 'Bài ảnh tính năng' : 'Bài tương tác · ' + q.type,
  chế_độ_chạy: q.mode,
  thời_gian_đến_lúc_xong_giây: Math.round(ms / 100) / 10,
  tính_năng: q.feature || null,
  link_dẫn: q.link || null,
  ảnh: q.imageUrl || null,
  kiểm_duyệt: q.qc,
  google_docs: doc.doc,
  xem_trước_bài: q.post.slice(0, 240) + (q.post.length > 240 ? '…' : ''),
  xem_trước_comment: q.comment.slice(0, 240),
  nhật_ký_từng_bước: trace,
} }];
`;

const groupNodes = [
  manual(GN.man), schedule(GN.s9, "0 9 * * *"),
  codeNode(GN.go, GO_CODE, 0),
  codeNode(GN.pickF, PICK_FEATURE, 0),
  httpNode(GN.shot, {
    method: "GET", url: HELPER + "/shot", sendQuery: true, specifyQuery: "json",
    jsonQuery: "={{ JSON.stringify($json.click ? { path: $json.path, click: $json.click } : { path: $json.path }) }}",
    options: { timeout: 150000 },
  }),
  codeNode(GN.trA, TREND_NODE("$input.first().json.feature"), 0),
  mergeNode(GN.mgA),
  codeNode(GN.readP, READ_PAGE, 0),
  codeNode(GN.wrA, featureWrite("group"), 0),
  codeNode(GN.pickE, PICK_ENGAGE, 0),
  codeNode(GN.trB, TREND_NODE("'mẹo học TOEIC, câu hỏi TOEIC Part 5 thử thách'"), 0),
  mergeNode(GN.mgB),
  codeNode(GN.wrB, engageWrite("group"), 0),
  codeNode(GN.qc, QC, 0),
  httpNode(GN.docs, {
    method: "POST", url: HELPER + "/draft", sendBody: true, specifyBody: "json",
    jsonBody: "={{ JSON.stringify({ kind: ($json.kind === 'feature' ? 'Ảnh tính năng · ' : 'Tương tác · ') + ($json.feature || $json.type), post: $json.post, comment: $json.comment, imageUrl: $json.imageUrl || null, commentLater: $json.type === 'quiz' }) }}",
    options: { timeout: 120000 },
  }),
  codeNode(GN.done, DONE, 0),
];
const pos = {
  [GN.man]: [0, 1.6], [GN.s9]: [0, 3.4], [GN.go]: [1.2, 2.5],
  [GN.pickF]: [2.5, 1], [GN.shot]: [3.6, 0.3], [GN.trA]: [3.6, 1.7], [GN.mgA]: [4.7, 1], [GN.readP]: [5.8, 1], [GN.wrA]: [6.9, 1],
  [GN.pickE]: [2.5, 4], [GN.trB]: [2.5, 5.2], [GN.mgB]: [3.6, 4.6], [GN.wrB]: [4.7, 4.6],
  [GN.qc]: [8.2, 2.8], [GN.docs]: [9.3, 2.8], [GN.done]: [10.4, 2.8],
};
groupNodes.push(
  sticky("s1", "## ① KÍCH HOẠT\n9:00 mỗi ngày hoặc bấm tay. Một lượt chạy = 2 bài chạy SONG SONG", -60, 150, 330, 520, 4),
  sticky("s3", "## ② NHÁNH A · BÀI ẢNH TÍNH NĂNG\nChọn tính năng → CHỤP ẢNH ‖ SĂN XU HƯỚNG (song song) → gộp → đọc trang → Gemini viết bài + comment", 560, -90, 1620, 440, 5),
  sticky("s4", "## ③ NHÁNH B · BÀI TƯƠNG TÁC\nChọn dạng bài ‖ săn xu hướng (song song) → gộp → Gemini viết bài + comment", 560, 560, 1020, 360, 6),
  sticky("s5", "## ④ KIỂM DUYỆT → GOOGLE DOCS → TỔNG KẾT\n6 điều kiện chất lượng, ghi doc, báo cáo từng bước", 2100, 260, 960, 400, 7),
);
const edge = (from, to, out = 0, inp = 0) => ({ from, to, out, inp });
const edges = [
  edge(GN.man, GN.go), edge(GN.s9, GN.go),
  edge(GN.go, GN.pickF), edge(GN.go, GN.pickE), edge(GN.go, GN.trB),
  edge(GN.pickF, GN.shot), edge(GN.pickF, GN.trA),
  edge(GN.shot, GN.mgA, 0, 0), edge(GN.trA, GN.mgA, 0, 1), edge(GN.mgA, GN.readP), edge(GN.readP, GN.wrA), edge(GN.wrA, GN.qc),
  edge(GN.pickE, GN.mgB, 0, 0), edge(GN.trB, GN.mgB, 0, 1), edge(GN.mgB, GN.wrB), edge(GN.wrB, GN.qc),
  edge(GN.qc, GN.docs), edge(GN.docs, GN.done),
];
const fbGroupHub = workflow("fbGroupHub0001", "Facebook Group – Trung tâm nội dung (ghi Google Docs)", groupNodes);
groupNodes.forEach((n) => pos[n.name] && put(n, pos[n.name][0], pos[n.name][1])); // workflow() lays nodes in a row; restore the graph layout
fbGroupHub.connections = {};
for (const e of edges) {
  const c = (fbGroupHub.connections[e.from] ||= { main: [] });
  (c.main[e.out] ||= []).push({ node: e.to, type: "main", index: e.inp });
}

// ---------------------------------------------------------------------------
// Showcase account studies every day (helper/study.js): keeps a real streak and
// fresh stats for the feature screenshots.
const dailyStudy = workflow("studyDaily0001", "Học mỗi ngày – tài khoản showcase", [
  schedule("Lịch 18:00", "0 18 * * *"),
  codeNode(
    "Làm bài",
    String.raw`
// Full test every 3rd day, otherwise a Listening or Reading section (Free: 1 full + 3 mini a day).
const n = (store.runs || 0) + 1;
store.runs = n;
const kind = n % 3 === 1 ? 'full' : pick(['listening', 'reading']);
const r = await http({ method: 'POST', url: (E.HELPER_URL || 'http://127.0.0.1:5690') + '/study', qs: { kind } });
return [{ json: { kind, ...r } }];
`,
    660
  ),
]);

mkdirSync(OUT, { recursive: true });
for (const [file, wf] of [
  ["threads-1-image-post.json", imagePost],
  ["threads-2-engagement-post.json", engagePost],
  ["threads-3-auto-reply.json", autoReply],
  ["facebook-1-image-post.json", fbImagePost],
  ["facebook-2-engagement-post.json", fbEngagePost],
  ["facebook-3-auto-reply.json", fbAutoReply],
  ["facebook-4-group-hub.json", fbGroupHub],
  ["study-daily.json", dailyStudy],
]) {
  writeFileSync(join(OUT, file), JSON.stringify(wf, null, 2) + "\n");
  console.log("wrote", file);
}
