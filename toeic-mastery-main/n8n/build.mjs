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
  // Gemini is often "overloaded" (503): alternate the main and a fallback model, short waits, 6 tries.
  const MAIN = E.GEMINI_MODEL || 'gemini-3.1-flash-lite';
  const MODELS = [MAIN, MAIN, E.GEMINI_FALLBACK || 'gemini-3.5-flash-lite'];
  let r, lastErr;
  for (let attempt = 1; attempt <= 6; attempt++) {
    const model = MODELS[(attempt - 1) % MODELS.length];
    const body = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 1 } };
    if (/^gemini-3\.1/.test(model)) body.generationConfig.thinkingConfig = { thinkingBudget: 0 }; // no hidden "thinking": 2-3s per call
    if (search) body.tools = [{ google_search: {} }];
    else if (json) body.generationConfig.responseMimeType = 'application/json';
    try {
      r = await http({
        method: 'POST',
        url: 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent',
        qs: { key: E.GEMINI_API_KEY },
        body,
        timeout: 15000, // a stuck call is cut after 15s and retried
      });
      break;
    } catch (e) {
      lastErr = e;
      if (attempt >= 6 || !/status code (429|500|502|503|504)|timeout|ETIMEDOUT|ECONNABORTED|ECONNRESET/i.test(String(e.message))) throw e;
      await sleep(700 * Math.min(attempt, 3));
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

// Real facts about the PRO plan (src/lib/constants/billing.ts, limits.ts, components/billing/pro-card.tsx). Posts may only use these.
const PRO_FACTS = [
  'GÓC NHÌN VỀ GÓI PRO CỦA WEB (chỉ được dùng đúng các dữ kiện này, không thêm bớt):',
  '- Giá: TUYỆT ĐỐI KHÔNG viết số tiền. Con số % duy nhất được viết là ưu đãi 25% cho thành viên mới (xem dòng dưới). Chỉ nói giá theo kiểu so sánh đời thường và đúng sự thật: tính ra mỗi ngày chưa bằng một ly trà sữa, một tô phở hay một cốc cà phê; "giá học sinh", ai cũng chạm tới được; gói dài hạn còn rẻ hơn mua từng tháng.',
  '- Ưu đãi thật: thành viên mới được GIẢM 25% khi nâng cấp trong 72 giờ đầu sau khi đăng ký (ưu đãi tự áp dụng lúc thanh toán). Được nêu "giảm 25%" nhưng không được nêu giá tiền sau giảm, và không được nói sai thời hạn 72 giờ.',
  '- Gói Free bị giới hạn mỗi ngày: 2 lượt bắt đầu luyện ở chế độ practice, 1 full test, tra từ bôi đen 30 lượt, chữa câu tức thì 50 lượt mỗi Part, 4 gợi ý "bước học tiếp theo" của AI Mentor, "học lại" tối đa 20 câu đã lưu.',
  '- Pro mở khoá: không giới hạn Mock Test, tra từ bôi đen và chữa câu tức thì; Radar kỹ năng và phân tích năng lực chi tiết kèm bài luyện vá điểm yếu; Transcript ETS (nghe chép chính tả, dịch song ngữ, đáp án); lời giải chi tiết và transcript khi xem lại bài / câu sai / câu đã lưu; từ đồng nghĩa và ví dụ chuyên sâu; tuỳ chỉnh Quick Study 5–60 phút; tự tạo đề từ câu sai và từ đã lưu; xuất PDF từ vựng; lộ trình cấp tốc 14–30 ngày và study plan theo ngày thi; theme động và upload hình nền; không quảng cáo; hỗ trợ ưu tiên.',
  '- Thanh toán bằng chuyển khoản QR ngay trên web, web tự xác nhận khi tiền về.',
  '- Xem gói và nâng cấp: ' + SITE + '/pricing',
].join('\n');
const PRO_RULES = [
  'CÁCH VIẾT BÀI CHỐT PRO (tự nhiên, thuyết phục, KHÔNG ép):',
  '- Nói như người bạn nhắc nhau, không như quảng cáo: mở bằng một tình huống/nỗi đau có thật của người học TOEIC (bị giới hạn, học không biết yếu ở đâu, không có kế hoạch, hết lượt luyện...), rồi nối sang đúng quyền lợi Pro giải quyết nó.',
  '- Cụ thể hơn là khoa trương: nêu 1-2 quyền lợi Pro cụ thể thay vì liệt kê hết. Nói về giá CHỈ bằng so sánh đời thường (chưa bằng ly trà sữa / tô phở / cốc cà phê mỗi ngày, giá học sinh) và nhắc ưu đãi giảm 25% cho thành viên mới trong 72 giờ đầu khi hợp ngữ cảnh. KHÔNG có số tiền; số % duy nhất được dùng là 25%.',
  '- Thành thật để tạo niềm tin: nói rõ ai CHƯA cần Pro (còn dùng free thoải mái, mới tập, chưa hết lượt) và ai NÊN cân nhắc (sát ngày thi, cần phân tích điểm yếu, luyện nhiều mỗi ngày).',
  '- CẤM bịa bằng chứng xã hội: không viết "nhiều bạn nhắn/hỏi mình", "nhiều ae đang…", "ai cũng dùng". Nói thẳng quan điểm của trang, không giả vờ có người hỏi.',
  'HOOK LÀ TẤT CẢ (dòng đầu quyết định có ai dừng lại đọc hay không): dòng đầu tối đa 70 ký tự, chọn MỘT kiểu: (a) câu hỏi chạm nỗi đau ("Làm đề xong vẫn không biết mình sai ở đâu?"); (b) sự thật phũ phàng / quan điểm ngược số đông ("Cày thêm đề không làm bạn giỏi hơn."); (c) lỗi ai luyện TOEIC cũng từng mắc, nêu tên cụ thể; (d) so sánh bất ngờ ("Một ly trà sữa nuôi được cả ngày luyện đề."); (e) hứa một điều cụ thể sẽ biết được nếu đọc tiếp. Các câu trong ngoặc chỉ để tham khảo cấu trúc: TUYỆT ĐỐI không chép lại, mỗi bài phải nghĩ ra một hook MỚI, khác các bài cũ.',
  '- Cấu trúc: dòng 1 hook → dòng 2-3 chỉ MỘT lợi ích Pro cụ thể (không liệt kê) → dòng cuối là câu hỏi hoặc lời rủ kích bình luận ("ae nào bị vậy giơ tay 🙋"). Mỗi dòng dưới 15 từ, xuống dòng giữa các ý, tối đa 2 emoji. Đọc xong trong 5 giây.',
  '- CẤM tuyệt đối: bịa lời chứng thực/đánh giá của học viên, điểm số hay số học viên cụ thể, cam kết/bảo đảm lên điểm, khan hiếm giả ("chỉ còn X suất", "hết hạn hôm nay"), chê bai đối thủ, nói quyền lợi không có trong dữ kiện.',
  '- Kết bài bằng một câu mời nhẹ (không "MUA NGAY"), link ở comment.',
].join('\n');
// Cut at a sentence end (never mid-word) when a text is still too long after rewriting.
const trimToSentence = (t, max) => {
  t = String(t).trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const m = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '), cut.lastIndexOf('\n'), cut.lastIndexOf('…'));
  return (m > max * 0.5 ? cut.slice(0, m + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '…').trim();
};
// Wording that must never reach a published post (checked again in the QC node).
const BANNED_PRO = /(nhiều (ae|bạn|người|mọi người) (nhắn|hỏi|inbox|ib|thắc mắc)|(ai|mọi người) cũng (đang )?(dùng|mua)|\d[\d.,]*\s?(k\b|nghìn|ngàn|đ(?![a-zà-ỹ])|đồng|₫|vnđ|vnd)|(?<!\d)(?!25\s?%)\d+\s?%|cam kết|đảm bảo (lên|đạt|điểm)|bảo đảm|chắc chắn (đạt|lên)|\d+\+? ?(học viên|bạn đã|người đã)|chỉ còn \d+ ?(suất|slot|chỗ)|hết (hạn|ưu đãi) (hôm nay|đêm nay|trong hôm nay))/i;

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
  threads: { who: "trang Threads @toeicmasteryy", max: 300, len: "Bài RẤT NGẮN, tối đa 220 ký tự, 2-3 dòng, dòng đầu là hook. Chỉ 1 ý, 1 lợi ích. Mỗi câu trọn vẹn.", comment: "câu comment ngắn kiểu người thật" },
  group: {
    who: "admin group Facebook TOEIC Mastery (cộng đồng người học TOEIC)",
    max: 600,
    len: "Bài group NGẮN, tối đa 450 ký tự, 3-5 dòng ngắn, dòng đầu là hook, gọi \"cả nhà\", kết bằng câu hỏi kích thành viên comment. Chỉ 1 ý, 1 lợi ích.",
    comment: "comment đầu tiên của admin",
  },
  facebook: {
    who: "Fanpage Facebook TOEIC Mastery",
    max: 600,
    len: "Bài Facebook NGẮN, tối đa 450 ký tự, 3-5 dòng ngắn, dòng đầu là hook. Chỉ 1 ý, 1 lợi ích.",
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
const mine = ${platform === "threads" ? "($input.first().json.mine !== undefined ? $input.first().json.mine : (await myRecentPosts(12)).map((x) => '- ' + x.text.replace(/\\s+/g, ' ').slice(0, 220)).join('\\n'))" : "''"};
const trends = p.trends !== undefined ? p.trends : await research(p.feature);
const buildPrompt = (extra) => [
  'Bạn là admin ' + P.who + ' (web luyện thi TOEIC ' + SITE + ').',
  'Viết 1 bài kèm ẢNH CHỤP MÀN HÌNH tính năng của web, vừa khoe tính năng vừa giúp người đọc cân nhắc nâng cấp gói PRO.',
  'Tính năng trong ảnh: ' + p.feature,
  'Chữ hiển thị trên màn hình đó (để hiểu tính năng, không chép nguyên): ' + String(p.text || '').slice(0, 2500),
  'Nối tính năng này với quyền lợi Pro THẬT trong dữ kiện: nếu tính năng bị khoá/giới hạn ở bản free (vd phân tích năng lực, transcript, luyện không giới hạn) thì nói thẳng là của Pro và nó giúp gì; nếu là tính năng free thì nói đúng là free, rồi chỉ ra Pro mở rộng nó thế nào. Không bịa.',
  PRO_FACTS,
  PRO_RULES,
  VOICE.replace('KHÔNG văn mẫu quảng cáo, ', ''),
  P.len + ' Không nói số liệu trong ảnh là kết quả của người thật.',
  VIRAL,
  trends ? 'Xu hướng/đối thủ đang làm (chỉ lấy cảm hứng):\n' + trends : '',
  mine ? 'Các bài cũ của trang (giữ giọng tương tự nhưng KHÔNG lặp hook/ý):\n' + mine : '',
  'COMMENT ĐẦU TIÊN: nối tiếp mạch bài như người đang nói tiếp (1-2 câu có giá trị thật, hoặc thừa nhận ai chưa cần Pro), rồi dẫn tới trang gói Pro, URL ' + SITE + '/pricing đặt CUỐI comment. Cấm mở đầu bằng "Link đây/Đây nè/Vào đây", tối đa 2 câu NGẮN (dưới 170 ký tự không tính link), 1 emoji.',
  extra || '',
  'Trả về JSON: {"post": "...", "comment": "..."}',
].filter(Boolean).join('\n\n');
let out = await gemini(buildPrompt(''), { json: true });
let retried = false;
if (BANNED_PRO.test(String(out.post) + ' ' + String(out.comment))) {
  retried = true;
  out = await gemini(buildPrompt('LẦN TRƯỚC VI PHẠM: bài có số tiền hoặc số % khác 25%, cam kết điểm, số học viên hoặc khan hiếm giả. Viết lại, bỏ hết những thứ đó, chỉ so sánh giá bằng ly trà sữa / tô phở, chỉ được nêu giảm 25% cho thành viên mới trong 72 giờ đầu, và dùng dữ kiện thật.'), { json: true });
}
let shortened = 0;
const MAX = P.max;
for (let i = 0; i < 2 && (String(out.post).length > MAX || String(out.comment).length > MAX); i++) {
  shortened++;
  out = await gemini(buildPrompt('QUÁ DÀI (bài ' + String(out.post).length + ' ký tự, comment ' + String(out.comment).length + '): viết lại NGẮN GỌN, bài dưới ' + (MAX - 70) + ' ký tự, comment dưới ' + (MAX - 130) + ' ký tự, giữ hook và ý chính, câu nào cũng trọn vẹn.'), { json: true });
}
const PRICING = SITE + '/pricing';
out.post = trimToSentence(out.post, MAX);
if (String(out.comment).length > MAX) out.comment = trimToSentence(String(out.comment).replace(PRICING, '').trim(), MAX - PRICING.length - 2) + ' ' + PRICING;
if (!out.post || !out.comment || !out.comment.includes(SITE.replace(/^https?:\/\//, '') + '/pricing')) throw new Error('Gemini trả sai định dạng (thiếu link /pricing): ' + JSON.stringify(out));
return [{ json: { ...p, post: out.post, comment: out.comment, link: SITE + '/pricing', viết_lại_vì_vi_phạm: retried, rút_gọn_lần: shortened } }];
`;

const ENGAGE_TYPES = String.raw`
const TYPES = {
  pro_limit: 'GÓC "HẾT LƯỢT": kể tình huống đang luyện hăng thì bị chặn vì hết lượt miễn phí trong ngày (practice 2 lượt, chữa câu tức thì, tra từ…). Chỉ ra Pro bỏ giới hạn đó và ai thực sự cần. Comment: nói tiếp bằng so sánh mỗi ngày chưa bằng ly trà sữa + mời xem gói.',
  pro_analysis: 'GÓC "KHÔNG BIẾT MÌNH YẾU Ở ĐÂU": nỗi đau học nhiều mà điểm đứng yên. Giới thiệu Radar kỹ năng + phân tích năng lực chi tiết + bài luyện vá điểm yếu của Pro như cách học có định hướng. Comment: mời xem gói, nhắc ưu đãi cho thành viên mới nếu hợp.',
  pro_transcript: 'GÓC "NGHE MÃI KHÔNG TIẾN BỘ": nghe xong không biết sai ở đâu. Transcript ETS của Pro (nghe chép chính tả, dịch song ngữ, đáp án) giúp học Listening đúng cách. Comment: nói tiếp tip nghe chép + mời xem gói.',
  pro_roadmap: 'GÓC "SẮP THI MÀ KHÔNG CÓ KẾ HOẠCH": lộ trình cấp tốc 14–30 ngày và study plan theo ngày thi của Pro. Nhắc nên chọn gói theo thời gian còn lại. Comment: gợi ý chọn gói ngắn hay dài theo số ngày còn lại tới ngày thi + link.',
  pro_price: 'GÓC "RẺ NHƯ LY TRÀ SỮA": nói gói Pro tính ra mỗi ngày chưa bằng một ly trà sữa / tô phở / cốc cà phê, giá học sinh, gói dài hạn còn rẻ hơn mua từng tháng, rồi nói rõ nhận được gì cho khoản đó. Tuyệt đối KHÔNG nêu số tiền hay %. Thành thật: ai chưa cần thì cứ dùng free. Comment: mời xem bảng gói + link.',
  pro_faq: 'GÓC "CÓ ĐÁNG MUA KHÔNG?": trả lời thẳng thắn câu người ta hay hỏi: free đã đủ chưa, Pro khác gì, ai nên mua, ai chưa cần. Giọng trung thực, có lý lẽ. Comment: tóm 2 dòng quyền lợi đáng nhất + link.',
  pro_offer: 'GÓC "ƯU ĐÃI THÀNH VIÊN MỚI": nhắc thành viên mới được GIẢM 25% khi nâng cấp trong 72 giờ đầu sau đăng ký (đúng sự thật, không giục giã ép buộc), nên thử bản free trước rồi quyết. KHÔNG nêu giá tiền. Comment: nói ưu đãi tự áp dụng lúc thanh toán + link.',
  pro_study: 'GÓC "HỌC THÔNG MINH HƠN": quick study tuỳ chỉnh 5–60 phút, tự tạo đề từ câu sai và từ đã lưu, xuất PDF từ vựng. Một tình huống đời thường (bận, đi làm, ôn trên điện thoại) rồi nối sang quyền lợi. Comment: mời xem đầy đủ quyền lợi + link.',
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
const mine = ${platform === "threads" ? "($input.first().json.mine !== undefined ? $input.first().json.mine : (await myRecentPosts(12)).map((x) => '- ' + x.text.replace(/\\s+/g, ' ').slice(0, 220)).join('\\n'))" : "''"};
const trends = $input.first().json.trends !== undefined ? $input.first().json.trends : await research('cách các trang luyện thi TOEIC kêu gọi nâng cấp gói Pro');
const buildPrompt = (extra) => [
  'Bạn là admin ' + P.who + ' (web luyện thi TOEIC ' + SITE + ').',
  'Nhiệm vụ: viết bài giúp người đọc cân nhắc nâng cấp gói PRO. ' + TYPES[type],
  PRO_FACTS,
  PRO_RULES,
  VOICE.replace('KHÔNG văn mẫu quảng cáo, ', ''),
  P.len,
  VIRAL,
  trends ? 'Xu hướng/đối thủ đang làm (chỉ lấy cảm hứng, không chép):\n' + trends : '',
  mine ? 'Các bài cũ của trang (giữ giọng tương tự nhưng KHÔNG lặp ý, góc, hook):\n' + mine : '',
  'COMMENT ĐẦU TIÊN: nối tiếp mạch bài như người đang nói tiếp (1-2 câu có giá trị thật: so sánh giá, chọn gói hợp tình huống, hoặc thừa nhận ai chưa cần), rồi dẫn tới trang gói Pro, URL ' + SITE + '/pricing đặt CUỐI comment. Cấm mở đầu bằng "Link đây/Đây nè/Vào đây", tối đa 2 câu NGẮN (dưới 170 ký tự không tính link), 1 emoji.',
  extra || '',
  'Trả về JSON: {"post": "...", "comment": "..."}',
].filter(Boolean).join('\n\n');
let out = await gemini(buildPrompt(''), { json: true });
let retried = false;
if (BANNED_PRO.test(String(out.post) + ' ' + String(out.comment))) {
  retried = true;
  out = await gemini(buildPrompt('LẦN TRƯỚC VI PHẠM: bài có số tiền hoặc số % khác 25%, cam kết điểm, số học viên hoặc khan hiếm giả. Viết lại, bỏ hết những thứ đó, chỉ so sánh giá bằng ly trà sữa / tô phở, chỉ được nêu giảm 25% cho thành viên mới trong 72 giờ đầu, và dùng dữ kiện thật.'), { json: true });
}
let shortened = 0;
const MAX = P.max;
for (let i = 0; i < 2 && (String(out.post).length > MAX || String(out.comment).length > MAX); i++) {
  shortened++;
  out = await gemini(buildPrompt('QUÁ DÀI (bài ' + String(out.post).length + ' ký tự, comment ' + String(out.comment).length + '): viết lại NGẮN GỌN, bài dưới ' + (MAX - 70) + ' ký tự, comment dưới ' + (MAX - 130) + ' ký tự, giữ hook và ý chính, câu nào cũng trọn vẹn.'), { json: true });
}
const PRICING = SITE + '/pricing';
out.post = trimToSentence(out.post, MAX);
if (String(out.comment).length > MAX) out.comment = trimToSentence(String(out.comment).replace(PRICING, '').trim(), MAX - PRICING.length - 2) + ' ' + PRICING;
if (!out.post || !out.comment || !out.comment.includes(SITE.replace(/^https?:\/\//, '') + '/pricing')) throw new Error('Gemini trả sai định dạng (thiếu link /pricing): ' + JSON.stringify(out));
return [{ json: { ...$input.first().json, type, post: out.post, comment: out.comment, link: SITE + '/pricing', viết_lại_vì_vi_phạm: retried, rút_gọn_lần: shortened } }];
`;

// Reply rules shared by Threads and Facebook auto-replies.
const REPLY_PROMPT = String.raw`
const replyPrompt = (who, postText, author, comment, withLink) =>
  [
    /(pro|giá|bao nhiêu|nâng cấp|mua|trả phí|gói|đắt|rẻ|khuyến mãi|giảm giá)/i.test(comment) ? PRO_FACTS + '\nNếu người ta hỏi về Pro/giá: trả lời thẳng thắn bằng đúng dữ kiện trên (không bịa), KHÔNG nêu số tiền: chỉ nói giá học sinh, mỗi ngày chưa bằng ly trà sữa, thành viên mới được giảm 25% trong 72 giờ đầu sau đăng ký, xem chi tiết ở link /pricing; đừng ép mua, ai chưa cần thì nói cứ dùng free.' : '',
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

// Threads 2. Engagement post: tips / quiz (answer in comment) / question to the audience.

// Threads 3. Auto-reply to comments on recent posts, paced to look human.

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
// ---------------------------------------------------------------------------
// Graph builder: every workflow is a real graph (explicit grid positions and edges,
// parallel branches joined by Merge nodes, coloured sticky notes, step-by-step trace).
const at = (col, row) => [Math.round(col * 260), Math.round(row * 150)];
const manual = (name) => ({ id: "mn-" + name.replace(/\W+/g, "-"), name, type: "n8n-nodes-base.manualTrigger", typeVersion: 1, position: [0, 0], parameters: {} });
const httpNode = (name, parameters) => node(name, "n8n-nodes-base.httpRequest", 4.2, parameters, 0);
const mergeNode = (name) => node(name, "n8n-nodes-base.merge", 3, { mode: "combine", combineBy: "combineByPosition", options: {} }, 0);
const sticky = (title, text, col, row, wCols, hRows, color) => {
  const [x, y] = at(col, row);
  return { id: "st-" + title.replace(/\W+/g, "-"), name: title, type: "n8n-nodes-base.stickyNote", typeVersion: 1, position: [x - 70, y - 90], parameters: { content: text, width: Math.round(wCols * 260), height: Math.round(hRows * 150), color } };
};
const HELPER = "={{ $env.HELPER_URL || 'http://127.0.0.1:5690' }}";
const TH_URL = "https://graph.threads.net/v1.0";
const edge = (from, to, out = 0, inp = 0) => ({ from, to, out, inp });

function buildGraph(id, name, items, edges, stickies = []) {
  const nodes = items.map(([n, col, row]) => ((n.position = at(col, row)), n));
  const connections = {};
  for (const e of edges) {
    const c = (connections[e.from] ||= { main: [] });
    (c.main[e.out] ||= []).push({ node: e.to, type: "main", index: e.inp });
  }
  return {
    id, name, active: false, nodes: [...stickies, ...nodes], connections,
    settings: { executionOrder: "v1", timezone: "Asia/Ho_Chi_Minh", saveManualExecutions: true }, pinData: {},
  };
}

const goCode = (plan) => String.raw`
const now = new Date();
return [{ json: {
  runId: 'run-' + Date.now().toString(36),
  mode: $execution.mode,
  startedAt: now.toISOString(),
  kế_hoạch: ${JSON.stringify(plan)},
  trace: tr(null, 'Khởi động', { chế_độ: $execution.mode, kế_hoạch: ${JSON.stringify(plan)} }),
} }];
`;

const OLD_POSTS = String.raw`
const p = $input.first().json;
const posts = await myRecentPosts(12);
const mine = posts.map((x) => '- ' + x.text.replace(/\s+/g, ' ').slice(0, 220)).join('\n');
return [{ json: { mine, minePosts: posts.length, mineNote: 'đọc ' + posts.length + ' bài gần nhất của trang để không lặp hook/ý' } }];
`;

const TREND_CODE = (topicExpr) => String.raw`
const p = $input.first().json;
const t0 = Date.now();
const trends = await research(${topicExpr});
return [{ json: { trends, trendsMs: Date.now() - t0, trendsNote: trends ? 'có dữ liệu xu hướng đối thủ' : (E.GEMINI_SEARCH === 'on' ? 'Search lỗi → dùng mẫu viral cài sẵn' : 'Search tắt (GEMINI_SEARCH=off, cần gói Gemini trả phí) → dùng mẫu viral cài sẵn') } }];
`;

// Quality gate shared by the post workflows.
const QC_POST = (maxLen) => String.raw`
const p = $input.first().json;
const HOST = SITE.replace(/^https?:\/\//, '');
let post = String(p.post || '').trim();
const comment = String(p.comment || '').trim();
const checks = [];
const add = (name, pass, detail) => checks.push({ name, pass, detail });
add('Bài dài 80–${maxLen} ký tự', post.length >= 80 && post.length <= ${maxLen}, post.length + ' ký tự');
add('Comment có link web', comment.includes(HOST), comment.includes(HOST) ? 'có ' + HOST : 'thiếu link');
add('Link không dẫn vào blog/hướng dẫn', !/\/(blog|huong-dan)(\/|$)/.test(comment), 'đã kiểm tra');
add('Thân bài không chứa link', !/https?:\/\//.test(post), 'đã kiểm tra');
add('Không tự nhận là AI/bot', !/(tôi là AI|là một AI|trí tuệ nhân tạo|chatbot)/i.test(post + comment), 'đã kiểm tra');
const tags = post.match(/#[^\s#]+/g) || [];
let fixed = '';
if (tags.length > 1) { post = post.replace(/#[^\s#]+/g, '').replace(/\s+$/, '') + ' ' + tags[0]; fixed = 'tự cắt hashtag thừa, giữ ' + tags[0]; }
add('Tối đa 1 hashtag', true, tags.length + ' hashtag' + (fixed ? ' → ' + fixed : ''));
add('Không nêu giá tiền / % khác 25%, cam kết điểm, số liệu bịa, khan hiếm giả', !BANNED_PRO.test(post + ' ' + comment), 'đã kiểm tra');
const failed = checks.filter((c) => !c.pass);
if (post.length > ${maxLen} || comment.length > ${maxLen}) throw new Error('Kiểm duyệt chặn bài: bài ' + post.length + ' / comment ' + comment.length + ' ký tự, vượt giới hạn ${maxLen} nên nền tảng sẽ cắt cụt. Bài KHÔNG được đăng.');
if (!checks[checks.length - 1].pass) throw new Error('Kiểm duyệt chặn bài: có số tiền, % khác 25%, cam kết điểm, số liệu học viên hoặc khan hiếm giả. Bài KHÔNG được đăng.');
return [{ json: {
  ...p, post, comment,
  qc: { đạt: checks.length - failed.length, tổng: checks.length, cảnh_báo: failed.map((f) => f.name), chi_tiết: checks },
  trace: tr(p, 'Kiểm duyệt', { đạt: checks.length - failed.length + '/' + checks.length, cảnh_báo: failed.map((f) => f.name), độ_dài_bài: post.length, độ_dài_comment: comment.length }),
} }];
`;

// Threads publishing = three visible steps: create container (HTTP) -> wait for Meta -> publish (HTTP).
const WAIT_CONTAINER = String.raw`
const id = $input.first().json.id;
if (!id) throw new Error('Threads không trả container id: ' + JSON.stringify($input.first().json));
let status = 'IN_PROGRESS', polls = 0;
for (; polls < 15; polls++) {
  await sleep(3000);
  const s = await http({ url: TH + '/' + id, qs: { fields: 'status,error_message', access_token: E.THREADS_TOKEN } });
  status = s.status;
  if (status === 'FINISHED') break;
  if (status === 'ERROR' || status === 'EXPIRED') throw new Error('Threads container lỗi: ' + (s.error_message || status));
}
return [{ json: { containerId: id, status, polls: polls + 1 } }];
`;
const threadsCreate = (name, kind) =>
  httpNode(name, {
    method: "POST", url: TH_URL + "/me/threads", sendQuery: true, specifyQuery: "json",
    jsonQuery:
      kind === "image"
        ? "={{ JSON.stringify({ media_type: 'IMAGE', image_url: $json.imageUrl, text: String($json.post).slice(0, 490), access_token: $env.THREADS_TOKEN }) }}"
        : kind === "text"
        ? "={{ JSON.stringify({ media_type: 'TEXT', text: String($json.post).slice(0, 490), access_token: $env.THREADS_TOKEN }) }}"
        : "={{ JSON.stringify({ media_type: 'TEXT', text: String($json.comment).slice(0, 490), reply_to_id: $json.postId, access_token: $env.THREADS_TOKEN }) }}",
    options: { timeout: 60000 },
  });
const threadsPublish = (name) =>
  httpNode(name, {
    method: "POST", url: TH_URL + "/me/threads_publish", sendQuery: true, specifyQuery: "json",
    jsonQuery: "={{ JSON.stringify({ creation_id: $json.containerId, access_token: $env.THREADS_TOKEN }) }}",
    options: { timeout: 60000 },
  });

const PAUSE_CODE = (qcName) => String.raw`
const p = $('${qcName}').first().json;
const postId = $input.first().json.id;
const wait = delay(8, 15);
await sleep(wait * 1000);
return [{ json: { ...p, postId, trace: tr(p, 'Đăng bài', { postId, nghỉ_trước_comment_giây: wait }) } }];
`;
const DONE_POST = (pauseName, label) => String.raw`
const p = $('${pauseName}').first().json;
const reply = $input.first().json;
const ms = Date.now() - new Date(p.startedAt).getTime();
const trace = tr(p, 'Comment', { replyId: reply.id });
return [{ json: {
  runId: p.runId,
  trạng_thái: '✅ XONG — bài và comment đã lên ${label}',
  chế_độ_chạy: p.mode,
  tổng_thời_gian_giây: Math.round(ms / 100) / 10,
  loại: p.kind === 'feature' ? 'Bài ảnh tính năng → chốt PRO' : 'Bài chốt PRO · ' + p.type,
  tính_năng: p.feature || null,
  link_dẫn: p.link || null,
  ảnh: p.imageUrl || null,
  postId: p.postId,
  replyId: reply.id,
  kiểm_duyệt: p.qc,
  xem_trước_bài: p.post.slice(0, 240) + (p.post.length > 240 ? '…' : ''),
  xem_trước_comment: p.comment.slice(0, 240),
  nhật_ký_từng_bước: trace,
} }];
`;

const PICK_FEATURE = () => FEATURE_PICK + String.raw`
const prev = $input.first().json;
return [{ json: {
  ...prev, kind: 'feature', feature: fill(f.name, v), path, click: f.click || '', link: SITE + path,
  kho_tính_năng: FEATURES.length, còn_chưa_đăng: pool.length,
  trace: tr(prev, 'Chọn tính năng', { tính_năng: fill(f.name, v), trang: path, thao_tác_bấm: f.click || 'không', link_dẫn: SITE + path, còn_chưa_đăng: pool.length + '/' + FEATURES.length }),
} }];
`;
const PICK_ENGAGE_CODE = ENGAGE_TYPES + String.raw`
const prev = $input.first().json;
return [{ json: {
  ...prev, kind: 'engage', type, brief: TYPES[type], link_gợi_ý: LINKS.length,
  trace: tr(prev, 'Chọn dạng bài', { dạng: type, yêu_cầu: TYPES[type].slice(0, 90) + '…', số_trang_có_thể_dẫn: LINKS.length }),
} }];
`;
const SHOT_HTTP = (name) =>
  httpNode(name, {
    method: "GET", url: HELPER + "/shot", sendQuery: true, specifyQuery: "json",
    jsonQuery: "={{ JSON.stringify($json.click ? { path: $json.path, click: $json.click } : { path: $json.path }) }}",
    options: { timeout: 150000 },
  });
const READ_PAGE = (pickName) => String.raw`
const p0 = $('${pickName}').first().json;
const m = $input.first().json;
const text = m.text || '';
return [{ json: {
  ...p0, imageUrl: m.url, text, textChars: text.length, trends: m.trends, trendsNote: m.trendsNote, mine: m.mine,
  trace: tr(p0, 'Chụp & đọc trang', { ảnh: m.url, trang_đã_chụp: m.page, ký_tự_đọc_được: text.length, xu_hướng: m.trendsNote, bài_cũ_đã_đọc: m.minePosts }),
} }];
`;

// ===========================================================================
// Threads posting slots sit inside the hours the computer is in use: morning 8:00-11:30, evening 19:00-23:00.
const A = {
  man: "▶ Chạy ngay", sch: "⏰ 8:30 & 19:30", go: "🚀 Khởi động lượt chạy",
  pick: "🎯 Chọn tính năng", shot: "📷 Chụp màn hình (HTTP)", tr: "📈 Săn xu hướng", old: "📚 Đọc bài cũ của trang", mg1: "🔀 Gộp ảnh + xu hướng", mg2: "🔀 Gộp thêm bài cũ",
  readP: "🔎 Đọc nội dung trang", wr: "✍️ Viết bài (Gemini)", qc: "🛡️ Kiểm duyệt nội dung",
  c1: "📦 Tạo container bài (HTTP)", w1: "⏳ Chờ Meta xử lý bài", p1: "🚀 Xuất bản bài (HTTP)", pause: "⏱ Nghỉ vài giây rồi comment",
  c2: "📦 Tạo container comment (HTTP)", w2: "⏳ Chờ Meta xử lý comment", p2: "🚀 Xuất bản comment (HTTP)", done: "📊 Tổng kết chạy",
};
const imagePost = buildGraph("thrImagePost01", "Threads 1 – Bài ảnh tính năng → chốt PRO", [
  [manual(A.man), 0, 1], [schedule(A.sch, ["30 8 * * *", "30 19 * * *"]), 0, 2.5], [codeNode(A.go, goCode(["chọn tính năng của web", "chụp ảnh", "viết bài + comment", "kiểm duyệt", "đăng Threads"]), 0), 1.3, 1.75],
  [codeNode(A.pick, PICK_FEATURE(), 0), 2.6, 1.75],
  [SHOT_HTTP(A.shot), 3.9, 0.9], [codeNode(A.tr, TREND_CODE("$input.first().json.feature"), 0), 3.9, 1.75], [codeNode(A.old, OLD_POSTS, 0), 3.9, 2.6],
  [mergeNode(A.mg1), 5, 1.3], [mergeNode(A.mg2), 6.1, 1.75],
  [codeNode(A.readP, READ_PAGE(A.pick), 0), 7.2, 1.75], [codeNode(A.wr, featureWrite("threads"), 0), 8.3, 1.75], [codeNode(A.qc, QC_POST(490), 0), 9.4, 1.75],
  [threadsCreate(A.c1, "image"), 10.5, 1.75], [codeNode(A.w1, WAIT_CONTAINER, 0), 11.6, 1.75], [threadsPublish(A.p1), 12.7, 1.75],
  [codeNode(A.pause, PAUSE_CODE(A.qc), 0), 13.8, 1.75],
  [threadsCreate(A.c2, "comment"), 14.9, 1.75], [codeNode(A.w2, WAIT_CONTAINER, 0), 16, 1.75], [threadsPublish(A.p2), 17.1, 1.75],
  [codeNode(A.done, DONE_POST(A.pause, "Threads"), 0), 18.2, 1.75],
], [
  edge(A.man, A.go), edge(A.sch, A.go), edge(A.go, A.pick), edge(A.pick, A.shot), edge(A.pick, A.tr), edge(A.pick, A.old),
  edge(A.shot, A.mg1, 0, 0), edge(A.tr, A.mg1, 0, 1), edge(A.mg1, A.mg2, 0, 0), edge(A.old, A.mg2, 0, 1), edge(A.mg2, A.readP),
  edge(A.readP, A.wr), edge(A.wr, A.qc), edge(A.qc, A.c1), edge(A.c1, A.w1), edge(A.w1, A.p1), edge(A.p1, A.pause),
  edge(A.pause, A.c2), edge(A.c2, A.w2), edge(A.w2, A.p2), edge(A.p2, A.done),
], [
  sticky("① KÍCH HOẠT", "## ① KÍCH HOẠT\n8:30 (sáng) & 19:30 (tối) hoặc bấm tay", 0, 0.6, 2.3, 2.9, 4),
  sticky("② CHUẨN BỊ SONG SONG", "## ② CHUẨN BỊ (song song)\nChọn tính năng → CHỤP ẢNH ‖ SĂN XU HƯỚNG ‖ ĐỌC BÀI CŨ → gộp → đọc trang → viết bài nối tính năng với quyền lợi PRO", 2.6, 0.1, 5.1, 3.5, 5),
  sticky("③ VIẾT VÀ KIỂM DUYỆT", "## ③ VIẾT & KIỂM DUYỆT\nGemini viết bài nối tính năng với quyền lợi PRO + comment dẫn /pricing, 7 điều kiện chất lượng", 8.3, 0.9, 2.0, 1.7, 6),
  sticky("④ ĐĂNG THREADS", "## ④ ĐĂNG LÊN THREADS (API chính thức)\nTạo container → chờ Meta → xuất bản · nghỉ vài giây · comment dẫn link cùng 3 bước", 10.4, 0.9, 8.2, 1.7, 7),
]);

const B = {
  man: "▶ Chạy ngay", sch: "⏰ 10:30 & 21:30", go: "🚀 Khởi động lượt chạy",
  pick: "🎲 Chọn góc nâng cấp PRO", tr: "📈 Săn xu hướng", old: "📚 Đọc bài cũ của trang", mg1: "🔀 Gộp dạng bài + xu hướng", mg2: "🔀 Gộp thêm bài cũ",
  wr: "✍️ Viết bài (Gemini)", qc: "🛡️ Kiểm duyệt nội dung",
  c1: "📦 Tạo container bài (HTTP)", w1: "⏳ Chờ Meta xử lý bài", p1: "🚀 Xuất bản bài (HTTP)", pause: "⏱ Nghỉ vài giây rồi comment",
  c2: "📦 Tạo container comment (HTTP)", w2: "⏳ Chờ Meta xử lý comment", p2: "🚀 Xuất bản comment (HTTP)", done: "📊 Tổng kết chạy",
};
const engagePost = buildGraph("thrEngagePost01", "Threads 2 – Bài chốt PRO (nâng cấp gói)", [
  [manual(B.man), 0, 1], [schedule(B.sch, ["30 10 * * *", "30 21 * * *"]), 0, 2.5], [codeNode(B.go, goCode(["chọn dạng bài", "viết bài + comment", "kiểm duyệt", "đăng Threads"]), 0), 1.3, 1.75],
  [codeNode(B.pick, PICK_ENGAGE_CODE, 0), 2.6, 0.9], [codeNode(B.tr, TREND_CODE("'mẹo học TOEIC, câu hỏi TOEIC Part 5 thử thách'"), 0), 2.6, 1.75], [codeNode(B.old, OLD_POSTS, 0), 2.6, 2.6],
  [mergeNode(B.mg1), 3.7, 1.3], [mergeNode(B.mg2), 4.8, 1.75],
  [codeNode(B.wr, engageWrite("threads"), 0), 5.9, 1.75], [codeNode(B.qc, QC_POST(490), 0), 7, 1.75],
  [threadsCreate(B.c1, "text"), 8.1, 1.75], [codeNode(B.w1, WAIT_CONTAINER, 0), 9.2, 1.75], [threadsPublish(B.p1), 10.3, 1.75],
  [codeNode(B.pause, PAUSE_CODE(B.qc), 0), 11.4, 1.75],
  [threadsCreate(B.c2, "comment"), 12.5, 1.75], [codeNode(B.w2, WAIT_CONTAINER, 0), 13.6, 1.75], [threadsPublish(B.p2), 14.7, 1.75],
  [codeNode(B.done, DONE_POST(B.pause, "Threads"), 0), 15.8, 1.75],
], [
  edge(B.man, B.go), edge(B.sch, B.go), edge(B.go, B.pick), edge(B.go, B.tr), edge(B.go, B.old),
  edge(B.pick, B.mg1, 0, 0), edge(B.tr, B.mg1, 0, 1), edge(B.mg1, B.mg2, 0, 0), edge(B.old, B.mg2, 0, 1), edge(B.mg2, B.wr),
  edge(B.wr, B.qc), edge(B.qc, B.c1), edge(B.c1, B.w1), edge(B.w1, B.p1), edge(B.p1, B.pause),
  edge(B.pause, B.c2), edge(B.c2, B.w2), edge(B.w2, B.p2), edge(B.p2, B.done),
], [
  sticky("① KÍCH HOẠT", "## ① KÍCH HOẠT\n10:30 (cuối buổi sáng) & 21:30 (tối) hoặc bấm tay", 0, 0.6, 2.3, 2.9, 4),
  sticky("② CHUẨN BỊ SONG SONG", "## ② CHUẨN BỊ (song song)\nChọn góc nâng cấp PRO (hết lượt / phân tích điểm yếu / transcript / lộ trình / giá ly trà sữa / có đáng mua / ưu đãi người mới / học thông minh) ‖ SĂN XU HƯỚNG ‖ ĐỌC BÀI CŨ → gộp", 2.6, 0.1, 2.9, 3.5, 5),
  sticky("③ VIẾT VÀ KIỂM DUYỆT", "## ③ VIẾT & KIỂM DUYỆT\nGemini viết bài thuyết phục PRO + comment dẫn /pricing, 7 điều kiện (chặn số tiền, cam kết, số liệu bịa)", 5.7, 0.9, 2.0, 1.7, 6),
  sticky("④ ĐĂNG THREADS", "## ④ ĐĂNG LÊN THREADS (API chính thức)\nTạo container → chờ Meta → xuất bản · nghỉ vài giây · comment cùng 3 bước", 7.8, 0.9, 8.6, 1.7, 7),
]);

// ===========================================================================
// Facebook group hub: ONE run writes BOTH posts (feature screenshot + engagement) into the Google Doc.
const G = {
  man: "▶ Chạy ngay", sch: "⏰ Mỗi ngày 9:00", go: "🚀 Khởi động lượt chạy",
  pickF: "🎯 Chọn tính năng", shot: "📷 Chụp màn hình (HTTP)", trA: "📈 Săn xu hướng (A)", oldA: "🗂 Đọc nhật ký bài đã soạn", mgA: "🔀 Gộp ảnh + xu hướng", readP: "🔎 Đọc nội dung trang", wrA: "✍️ Viết bài ảnh (Gemini)",
  pickE: "🎲 Chọn góc nâng cấp PRO", trB: "📈 Săn xu hướng (B)", mgB: "🔀 Gộp dạng bài + xu hướng", wrB: "✍️ Viết bài tương tác (Gemini)",
  qc: "🛡️ Kiểm duyệt nội dung", docs: "📄 Ghi vào Google Docs (HTTP)", done: "📊 Tổng kết chạy",
};
const DONE_GROUP = String.raw`
const q = $('${G.qc}').all(0, $runIndex)[0].json;
const doc = $input.first().json;
const ms = Date.now() - new Date(q.startedAt).getTime();
const trace = tr(q, 'Ghi Google Docs', { kết_quả: doc.doc, đã_lưu: doc.saved });
return [{ json: {
  runId: q.runId,
  trạng_thái: doc.saved ? '✅ XONG — bài nằm trong Google Docs' : '⚠️ lưu thất bại',
  loại: q.kind === 'feature' ? 'Bài ảnh tính năng → chốt PRO' : 'Bài chốt PRO · ' + q.type,
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
const OLD_DRAFTS = String.raw`
const p = $input.first().json;
const drafts = [];
return [{ json: { mine: '', minePosts: 0, mineNote: 'nhật ký bài group do bạn đăng tay nên không có sẵn → bỏ qua' } }];
`;
const fbGroupHub = buildGraph("fbGroupHub0001", "Facebook Group – Trung tâm nội dung (ghi Google Docs)", [
  [manual(G.man), 0, 1.6], [schedule(G.sch, "0 9 * * *"), 0, 3.4], [codeNode(G.go, goCode(["bài ảnh tính năng (nhánh A)", "bài chốt PRO (nhánh B)", "kiểm duyệt", "ghi Google Docs"]), 0), 1.2, 2.5],
  [codeNode(G.pickF, PICK_FEATURE(), 0), 2.5, 1], [SHOT_HTTP(G.shot), 3.6, 0.3], [codeNode(G.trA, TREND_CODE("$input.first().json.feature"), 0), 3.6, 1.7],
  [mergeNode(G.mgA), 4.7, 1], [codeNode(G.readP, READ_PAGE(G.pickF), 0), 5.8, 1], [codeNode(G.wrA, featureWrite("group"), 0), 6.9, 1],
  [codeNode(G.pickE, PICK_ENGAGE_CODE, 0), 2.5, 4], [codeNode(G.trB, TREND_CODE("'mẹo học TOEIC, câu hỏi TOEIC Part 5 thử thách'"), 0), 2.5, 5.2],
  [mergeNode(G.mgB), 3.6, 4.6], [codeNode(G.wrB, engageWrite("group"), 0), 4.7, 4.6],
  [codeNode(G.qc, QC_POST(1000), 0), 8.2, 2.8], [httpNode(G.docs, {
    method: "POST", url: HELPER + "/draft", sendBody: true, specifyBody: "json",
    jsonBody: "={{ JSON.stringify({ kind: ($json.kind === 'feature' ? 'Ảnh tính năng → PRO · ' : 'Chốt PRO · ') + ($json.feature || $json.type), post: $json.post, comment: $json.comment, imageUrl: $json.imageUrl || null, commentLater: $json.type === 'quiz' }) }}",
    options: { timeout: 120000 },
  }), 9.3, 2.8],
  [codeNode(G.done, DONE_GROUP, 0), 10.4, 2.8],
], [
  edge(G.man, G.go), edge(G.sch, G.go),
  edge(G.go, G.pickF), edge(G.go, G.pickE), edge(G.go, G.trB),
  edge(G.pickF, G.shot), edge(G.pickF, G.trA),
  edge(G.shot, G.mgA, 0, 0), edge(G.trA, G.mgA, 0, 1), edge(G.mgA, G.readP), edge(G.readP, G.wrA), edge(G.wrA, G.qc),
  edge(G.pickE, G.mgB, 0, 0), edge(G.trB, G.mgB, 0, 1), edge(G.mgB, G.wrB), edge(G.wrB, G.qc),
  edge(G.qc, G.docs), edge(G.docs, G.done),
], [
  sticky("① KÍCH HOẠT", "## ① KÍCH HOẠT\n9:00 mỗi ngày hoặc bấm tay. Một lượt chạy = 2 bài", 0, 0.6, 2.3, 3.2, 4),
  sticky("② NHÁNH A", "## ② NHÁNH A · BÀI ẢNH TÍNH NĂNG\nChọn tính năng → CHỤP ẢNH ‖ SĂN XU HƯỚNG → gộp → đọc trang → Gemini viết bài + comment", 2.5, 0.1, 5.2, 2.6, 5),
  sticky("③ NHÁNH B", "## ③ NHÁNH B · BÀI CHỐT PRO\nChọn dạng bài ‖ săn xu hướng → gộp → Gemini viết bài + comment", 2.5, 3.3, 3.4, 2.7, 6),
  sticky("④ XUẤT", "## ④ KIỂM DUYỆT → GOOGLE DOCS → TỔNG KẾT\n6 điều kiện chất lượng, ghi doc, báo cáo từng bước", 8.0, 1.8, 3.6, 2.2, 7),
]);

// ===========================================================================
// Auto-reply (Threads + Facebook Page): gate -> read account/stats in parallel -> scan -> pick -> write (parallel Gemini) -> QC -> send -> summary.
const RP_IDLE = `if ($input.first().json.idle) return $input.all();\n`;
const replyFlow = ({ id, title, sch, schName, platform, accountHttp, postsCode, scanCode, sendCode, who, maxRun, maxDay, linkRate }) => {
  const N = {
    man: "▶ Chạy ngay", sch: schName, gate: "🚦 Cổng an toàn (giờ & giới hạn ngày)", acc: accountHttp.name, stats: "📈 Thống kê hôm nay", mg: "🔀 Gộp tài khoản + thống kê",
    posts: "📚 Lấy bài 4 ngày gần đây", scan: "🔍 Quét comment mới", pick: `🧠 Chọn tối đa ${maxRun} & quyết định gắn link`, write: "✍️ Viết trả lời (Gemini, song song)",
    qc: "🛡️ Kiểm duyệt trả lời", send: "📤 Đăng trả lời (cách nhau 15–45s)", sum: "📊 Tổng kết chạy",
  };
  const GATE = REPLY_PROMPT + String.raw`
const MAX_PER_DAY = ${maxDay};
if ($execution.mode === 'production' && hourVN < 7) return [];
if (store.countToday >= MAX_PER_DAY) return [];
return [{ json: {
  runId: 'run-' + Date.now().toString(36), mode: $execution.mode, startedAt: new Date().toISOString(),
  hourVN, countToday: store.countToday, remainingToday: MAX_PER_DAY - store.countToday,
  trace: tr(null, 'Cổng an toàn', { giờ_VN: hourVN, đã_trả_lời_hôm_nay: store.countToday, còn_được_trả_lời: MAX_PER_DAY - store.countToday, chế_độ: $execution.mode }),
} }];
`;
  const STATS = REPLY_PROMPT + String.raw`
return [{ json: { repliedTracked: store.replied.length, linkedTracked: (store.linked || store.linkedPosts || []).length, statsNote: 'nhớ ' + store.replied.length + ' comment đã xử lý' } }];
`;
  const PICK = REPLY_PROMPT + RP_IDLE + String.raw`
const items = $input.all();
const MAX_PER_RUN = ${maxRun}, LINK_RATE = ${linkRate};
store.linked = store.linked || [];
store.linkedPosts = store.linkedPosts || [];
const chosen = items.slice(0, Math.min(MAX_PER_RUN, items[0].json.remainingToday));
const linkedThisRun = new Set();
return chosen.map((it) => {
  const j = it.json;
  const text = j.c.text || j.c.message || '';
  const key = '${platform}' === 'threads' ? j.c.username : j.post.id;
  const used = '${platform}' === 'threads' ? store.linked.includes(key) : (store.linkedPosts.includes(key) || linkedThisRun.has(key));
  const asks = asksLink(text);
  const withLink = !used && (asks || Math.random() < LINK_RATE);
  if (withLink) linkedThisRun.add(key);
  return { json: { ...j, withLink, alreadyLinked: used, asks, trace: tr(j, 'Chọn & quyết định link', { comment: text.slice(0, 80), gắn_link: withLink, lý_do: withLink ? (asks ? 'người đó hỏi xin link' : 'ngẫu nhiên ' + Math.round(LINK_RATE * 100) + '%') : (used ? '${platform === "threads" ? "đã gửi link cho người này" : "bài này đã có link"}' : 'không gắn') }) } };
});
`;
  const WRITE = REPLY_PROMPT + RP_IDLE + String.raw`
const items = $input.all();
const out = await Promise.all(items.map(async (it) => {
  const j = it.json;
  const text = j.c.text || j.c.message || '';
  const author = '${platform}' === 'threads' ? '@' + j.c.username : (j.c.from && j.c.from.name) || 'một bạn';
  let prompt = replyPrompt('${who}', j.post.text || j.post.message, author, text, j.withLink);
  if (j.alreadyLinked && j.asks) prompt += '\nNgười này hỏi link: nói link web mình đã để ở comment phía trên rồi, bảo họ xem ở đó (không dán lại link).';
  const t0 = Date.now();
  const reply = String(await gemini(prompt)).replace(/^"|"$/g, '').trim();
  return { json: { ...j, reply, trace: tr(j, 'Viết trả lời', { gemini_ms: Date.now() - t0, độ_dài: reply.length }) } };
}));
return out;
`;
  const QC = REPLY_PROMPT + RP_IDLE + String.raw`
const HOST = SITE.replace(/^https?:\/\//, '');
return $input.all().map((it) => {
  const j = it.json;
  let reply = j.reply;
  const notes = [];
  if (!j.withLink && /https?:\/\//.test(reply)) { reply = reply.replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim(); notes.push('đã gỡ link không được phép'); }
  if (j.withLink && !reply.includes(HOST)) { reply = reply + ' ' + SITE; notes.push('thêm link còn thiếu'); }
  reply = reply.replace(/#[^\s#]+/g, '').trim();
  if (reply.length > 260) { reply = reply.slice(0, 257).replace(/\s+\S*$/, '') + '…'; notes.push('cắt còn 260 ký tự'); }
  const ai = /(tôi là AI|là một AI|trí tuệ nhân tạo|chatbot)/i.test(reply);
  if (ai) notes.push('CẢNH BÁO tự nhận AI → bỏ qua');
  return { json: { ...j, reply, skip: ai, qc: { ghi_chú: notes, độ_dài: reply.length, link: j.withLink }, trace: tr(j, 'Kiểm duyệt', { ghi_chú: notes.length ? notes : ['sạch'], độ_dài: reply.length }) } };
});
`;
  const SEND = REPLY_PROMPT + RP_IDLE + sendCode;
  const SUM = String.raw`
const items = $input.all();
if (items[0].json.idle) return [{ json: { trạng_thái: '😴 Không có comment mới cần trả lời', lý_do: items[0].json.idleReason, nhật_ký: items[0].json.trace } }];
const first = items[0].json;
return [{ json: {
  runId: first.runId,
  trạng_thái: '✅ XONG — đã xử lý ' + items.length + ' comment',
  chế_độ_chạy: first.mode,
  tổng_thời_gian_giây: Math.round((Date.now() - new Date(first.startedAt).getTime()) / 100) / 10,
  đã_trả_lời_hôm_nay: first.countToday + items.filter((i) => i.json.sent).length,
  chi_tiết: items.map((i) => ({ comment: (i.json.c.text || i.json.c.message || '').slice(0, 100), trả_lời: i.json.reply, gắn_link: i.json.withLink, kết_quả: i.json.result, kiểm_duyệt: i.json.qc.ghi_chú })),
  nhật_ký_từng_bước: items[0].json.trace,
} }];
`;
  const gateNode = codeNode(N.gate, GATE, 0);
  const items = [
    [manual(N.man), 0, 1], [node(N.sch, "n8n-nodes-base.scheduleTrigger", 1.2, { rule: { interval: [{ field: "minutes", minutesInterval: sch.minutes }] } }, 0), 0, 2.6], [gateNode, 1.3, 1.8],
    [accountHttp.node, 2.6, 1.1], [codeNode(N.stats, STATS, 0), 2.6, 2.5], [mergeNode(N.mg), 3.7, 1.8],
    [codeNode(N.posts, postsCode(N), 0), 4.8, 1.8], [codeNode(N.scan, scanCode(N), 0), 5.9, 1.8], [codeNode(N.pick, PICK, 0), 7, 1.8],
    [codeNode(N.write, WRITE, 0), 8.1, 1.8], [codeNode(N.qc, QC, 0), 9.2, 1.8], [codeNode(N.send, SEND, 0), 10.3, 1.8], [codeNode(N.sum, SUM, 0), 11.4, 1.8],
  ];
  const edges = [
    edge(N.man, N.gate), edge(N.sch, N.gate), edge(N.gate, N.acc), edge(N.gate, N.stats), edge(N.acc, N.mg, 0, 0), edge(N.stats, N.mg, 0, 1),
    edge(N.mg, N.posts), edge(N.posts, N.scan), edge(N.scan, N.pick), edge(N.pick, N.write), edge(N.write, N.qc), edge(N.qc, N.send), edge(N.send, N.sum),
  ];
  const stickies = [
    sticky("① KÍCH HOẠT", "## ① KÍCH HOẠT\n" + title + "\nChạy theo lịch hoặc bấm tay", 0, 0.7, 2.2, 2.6, 4),
    sticky("② AN TOÀN", "## ② AN TOÀN & CHUẨN BỊ\nCổng giờ/giới hạn ngày → lấy tài khoản ‖ thống kê → gộp → lấy bài → quét comment mới", 1.2, 0.2, 5.6, 3.1, 5),
    sticky("③ QUYẾT ĐỊNH", "## ③ QUYẾT ĐỊNH & VIẾT\nChọn comment, quyết định gắn link (tối đa 1 link/bài hoặc người), Gemini viết song song", 6.9, 0.7, 2.4, 2.2, 6),
    sticky("④ GỬI", "## ④ KIỂM DUYỆT → GỬI → TỔNG KẾT\nGỡ link thừa, cắt độ dài, đăng từng câu cách nhau 15–45s như người thật", 9.1, 0.7, 3.1, 2.2, 7),
  ];
  return buildGraph(id, title, items, edges, stickies);
};

const REPLY_POSTS_TH = (N) => String.raw`
const m = $input.first().json;
const g = $('${N.gate}').first().json;
const since = Date.now() - 4 * 86400e3;
const posts = (await myRecentPosts(15)).filter((p) => new Date(p.timestamp).getTime() > since);
return [{ json: { ...g, me: { id: m.id, username: m.username }, repliedTracked: m.repliedTracked, posts, trace: tr(g, 'Lấy bài', { tài_khoản: '@' + m.username, số_bài_4_ngày: posts.length, thống_kê: m.statsNote }) } }];
`;
const REPLY_SCAN_TH = (N) => String.raw`
const p = $input.first().json;
const me = p.me;
store.replied = store.replied || [];
const lists = await Promise.all(p.posts.map(async (post) => ({ post, r: await http({ url: TH + '/' + post.id + '/replies', qs: { fields: 'id,text,username,timestamp', access_token: E.THREADS_TOKEN } }) })));
const todo = [];
for (const { post, r } of lists) {
  for (const c of r.data || []) {
    if (!c.text || c.username === me.username || store.replied.includes(c.id)) continue;
    if (Date.now() - new Date(c.timestamp).getTime() > 2 * 86400e3) continue;
    todo.push({ post, c });
  }
}
// Skip comments the owner already answered by hand.
const open = [];
for (const t of todo.slice(0, 12)) {
  const sub = await http({ url: TH + '/' + t.c.id + '/replies', qs: { fields: 'username', access_token: E.THREADS_TOKEN } });
  if ((sub.data || []).some((x) => x.username === me.username)) store.replied.push(t.c.id); else open.push(t);
}
if (!open.length) return [{ json: { ...p, idle: true, idleReason: 'quét ' + p.posts.length + ' bài, ' + todo.length + ' comment mới nhưng đều đã được trả lời', trace: tr(p, 'Quét comment', { số_comment_mới: 0 }) } }];
return open.map((t) => ({ json: { ...p, posts: undefined, post: { id: t.post.id, text: t.post.text }, c: t.c, trace: tr(p, 'Quét comment', { số_comment_cần_trả_lời: open.length, từ: '@' + t.c.username }) } }));
`;
const REPLY_SEND_TH = String.raw`
const items = $input.all();
const out = [];
let n = 0;
for (const it of items) {
  const j = it.json;
  if (j.skip) { out.push({ json: { ...j, sent: false, result: 'bỏ qua (kiểm duyệt)' } }); continue; }
  if (n > 0) await sleep(delay(15, 45) * 1000);
  n++;
  let result, id = null;
  if (E.REPLY_DRY === 'on') result = 'THỬ — chưa đăng';
  else {
    id = await threadsPost({ text: j.reply, replyTo: j.c.id });
    store.replied.push(j.c.id);
    if (j.withLink) store.linked.push(j.c.username);
    store.countToday++;
    result = 'đã đăng ' + id;
  }
  out.push({ json: { ...j, sent: E.REPLY_DRY !== 'on', replyId: id, result, trace: tr(j, 'Đăng trả lời', { kết_quả: result }) } });
}
store.replied = store.replied.slice(-2000);
store.linked = store.linked.slice(-2000);
return out;
`;
const thrAutoReply = replyFlow({
  id: "thrAutoReply01", title: "Threads 3 – Tự trả lời comment", sch: { minutes: 20 }, schName: "⏰ Mỗi 20 phút", platform: "threads",
  accountHttp: { name: "👤 Lấy tài khoản (HTTP)", node: httpNode("👤 Lấy tài khoản (HTTP)", { method: "GET", url: TH_URL + "/me", sendQuery: true, specifyQuery: "json", jsonQuery: "={{ JSON.stringify({ fields: 'id,username', access_token: $env.THREADS_TOKEN }) }}", options: { timeout: 30000 } }) },
  postsCode: REPLY_POSTS_TH, scanCode: REPLY_SCAN_TH, sendCode: REPLY_SEND_TH, who: "trang Threads @toeicmasteryy", maxRun: 3, maxDay: 60, linkRate: 0.3,
});

const REPLY_POSTS_FB = (N) => String.raw`
const m = $input.first().json;
const g = $('${N.gate}').first().json;
const since = Math.floor((Date.now() - 4 * 86400e3) / 1000);
const feed = await fbApi('GET', '/' + E.FB_PAGE_ID + '/feed', { fields: 'id,message,created_time', since, limit: 15 });
return [{ json: { ...g, me: { id: E.FB_PAGE_ID, username: m.name }, repliedTracked: m.repliedTracked, posts: feed.data || [], trace: tr(g, 'Lấy bài', { page: m.name, số_bài_4_ngày: (feed.data || []).length, thống_kê: m.statsNote }) } }];
`;
const REPLY_SCAN_FB = (N) => String.raw`
const p = $input.first().json;
const PAGE = E.FB_PAGE_ID;
store.replied = store.replied || [];
const lists = await Promise.all(p.posts.map(async (post) => ({ post, r: await fbApi('GET', '/' + post.id + '/comments', { fields: 'id,message,from,created_time,comments.limit(20){from}', filter: 'toplevel', limit: 50 }) })));
const open = [];
for (const { post, r } of lists) {
  for (const c of r.data || []) {
    if (!c.message || store.replied.includes(c.id)) continue;
    if (c.from && c.from.id === PAGE) continue;
    if ((c.comments?.data || []).some((x) => x.from && x.from.id === PAGE)) { store.replied.push(c.id); continue; }
    if (Date.now() - new Date(c.created_time).getTime() > 2 * 86400e3) continue;
    open.push({ post, c });
  }
}
if (!open.length) return [{ json: { ...p, idle: true, idleReason: 'quét ' + p.posts.length + ' bài, không có comment mới cần trả lời', trace: tr(p, 'Quét comment', { số_comment_mới: 0 }) } }];
return open.slice(0, 20).map((t) => ({ json: { ...p, posts: undefined, post: { id: t.post.id, message: t.post.message }, c: t.c, trace: tr(p, 'Quét comment', { số_comment_cần_trả_lời: open.length, từ: (t.c.from && t.c.from.name) || 'ẩn danh' }) } }));
`;
const REPLY_SEND_FB = String.raw`
const items = $input.all();
const out = [];
let n = 0;
for (const it of items) {
  const j = it.json;
  if (j.skip) { out.push({ json: { ...j, sent: false, result: 'bỏ qua (kiểm duyệt)' } }); continue; }
  if (n > 0) await sleep(delay(15, 45) * 1000);
  n++;
  let result, id = null;
  if (E.REPLY_DRY === 'on') result = 'THỬ — chưa đăng';
  else {
    await fbApi('POST', '/' + j.c.id + '/likes', {}).catch(() => {});
    const r = await fbApi('POST', '/' + j.c.id + '/comments', { message: j.reply });
    id = r.id;
    store.replied.push(j.c.id);
    if (j.withLink) store.linkedPosts.push(j.post.id);
    store.countToday++;
    result = 'đã like + trả lời ' + id;
  }
  out.push({ json: { ...j, sent: E.REPLY_DRY !== 'on', replyId: id, result, trace: tr(j, 'Đăng trả lời', { kết_quả: result }) } });
}
store.replied = store.replied.slice(-2000);
store.linkedPosts = (store.linkedPosts || []).slice(-500);
return out;
`;
const fbAutoReply = replyFlow({
  id: "fbAutoReply001", title: "Facebook 3 – Tự trả lời comment (Page)", sch: { minutes: 15 }, schName: "⏰ Mỗi 15 phút", platform: "facebook",
  accountHttp: { name: "👤 Lấy thông tin Page (HTTP)", node: httpNode("👤 Lấy thông tin Page (HTTP)", { method: "GET", url: "={{ 'https://graph.facebook.com/v23.0/' + $env.FB_PAGE_ID }}", sendQuery: true, specifyQuery: "json", jsonQuery: "={{ JSON.stringify({ fields: 'name,fan_count', access_token: $env.FB_PAGE_TOKEN }) }}", options: { timeout: 30000 } }) },
  postsCode: REPLY_POSTS_FB, scanCode: REPLY_SCAN_FB, sendCode: REPLY_SEND_FB, who: "Fanpage TOEIC Mastery", maxRun: 4, maxDay: 80, linkRate: 0.35,
});

// ===========================================================================
// Showcase account studies every day.
const S = {
  man: "▶ Chạy ngay", sch: "⏰ 19:05 mỗi ngày", go: "🚀 Khởi động lượt chạy", plan: "📅 Chọn bài học hôm nay", health: "🩺 Kiểm tra helper (HTTP)", tempo: "🧮 Tính nhịp học", mg: "🔀 Gộp kiểm tra + nhịp", start: "🎓 Bắt đầu buổi học (HTTP)", sum: "📊 Tổng kết chạy",
};
const dailyStudy = buildGraph("studyDaily0001", "Học mỗi ngày – tài khoản showcase", [
  [manual(S.man), 0, 1], [schedule(S.sch, "5 19 * * *"), 0, 2.6], [codeNode(S.go, goCode(["chọn bài học", "kiểm tra helper", "học thật bằng Gemini", "ghi streak và thống kê"]), 0), 1.3, 1.8],
  [codeNode(S.plan, String.raw`
// Full test every 3rd day, otherwise a Listening or Reading section (Free: 1 full + 3 mini a day).
const p = $input.first().json;
const n = (store.runs || 0) + 1;
store.runs = n;
const kind = n % 3 === 1 ? 'full' : pick(['listening', 'reading']);
return [{ json: { ...p, kind, lần_chạy_thứ: n, trace: tr(p, 'Chọn bài học', { loại: kind, lần_chạy_thứ: n, quy_tắc: 'cứ 3 ngày 1 full test, ngày khác Listening/Reading' }) } }];
`, 0), 2.6, 1.8],
  [httpNode(S.health, { method: "GET", url: HELPER + "/health", options: { timeout: 15000 } }), 3.9, 1.1],
  [codeNode(S.tempo, String.raw`
const p = $input.first().json;
const mins = { full: 120, listening: 45, reading: 75 }[p.kind] || 60;
return [{ json: { thời_lượng_dự_kiến_phút: mins, nhịp: 'đáp án gửi rải theo thời gian như người thật làm bài', mini_test_còn_trong_ngày: 'Free: 1 full + 3 mini' } }];
`, 0), 3.9, 2.5],
  [mergeNode(S.mg), 5.2, 1.8],
  [httpNode(S.start, { method: "POST", url: HELPER + "/study", sendQuery: true, specifyQuery: "json", jsonQuery: "={{ JSON.stringify({ kind: $('" + S.plan + "').first().json.kind }) }}", options: { timeout: 30000 } }), 6.5, 1.8],
  [codeNode(S.sum, String.raw`
const p = $('${S.plan}').first().json;
const r = $input.first().json;
const m = $('${S.mg}').first().json;
return [{ json: {
  runId: p.runId,
  trạng_thái: r.started ? '✅ ĐÃ BẮT ĐẦU buổi học (chạy nền)' : '⚠️ ' + JSON.stringify(r),
  loại: p.kind, lần_chạy_thứ: p.lần_chạy_thứ,
  helper: m.ok ? 'sống' : 'không phản hồi',
  thời_lượng_dự_kiến_phút: m.thời_lượng_dự_kiến_phút,
  file_log: r.log,
  nhật_ký_từng_bước: tr(p, 'Bắt đầu buổi học', { started: r.started, log: r.log }),
} }];
`, 0), 7.8, 1.8],
], [
  edge(S.man, S.go), edge(S.sch, S.go), edge(S.go, S.plan), edge(S.plan, S.health), edge(S.plan, S.tempo),
  edge(S.health, S.mg, 0, 0), edge(S.tempo, S.mg, 0, 1), edge(S.mg, S.start), edge(S.start, S.sum),
], [
  sticky("① KÍCH HOẠT", "## ① KÍCH HOẠT\n19:05 mỗi ngày hoặc bấm tay", 0, 0.7, 2.3, 2.6, 4),
  sticky("② CHUẨN BỊ", "## ② CHUẨN BỊ (song song)\nChọn bài học hôm nay → KIỂM TRA HELPER ‖ TÍNH NHỊP HỌC → gộp", 2.6, 0.2, 3.6, 3.0, 5),
  sticky("③ HỌC", "## ③ HỌC THẬT\nGemini đọc đề/nghe audio, đáp án gửi rải như người thật, nộp bài → streak + thống kê", 6.3, 0.7, 2.5, 2.2, 6),
]);


mkdirSync(OUT, { recursive: true });
for (const [file, wf] of [
  ["threads-1-image-post.json", imagePost],
  ["threads-2-engagement-post.json", engagePost],
  ["threads-3-auto-reply.json", thrAutoReply],
  ["facebook-1-image-post.json", fbImagePost],
  ["facebook-2-engagement-post.json", fbEngagePost],
  ["facebook-3-auto-reply.json", fbAutoReply],
  ["facebook-4-group-hub.json", fbGroupHub],
  ["study-daily.json", dailyStudy],
]) {
  writeFileSync(join(OUT, file), JSON.stringify(wf, null, 2) + "\n");
  console.log("wrote", file);
}
