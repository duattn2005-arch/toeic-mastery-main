import "server-only";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

const MAX_BYTES = 2_000_000;
const TIMEOUT_MS = 15_000;
const MAX_REDIRECTS = 3;
const MAX_TEXT = 12_000;

export class FetchPageError extends Error {}

function ipv4Blocked(ip: string) {
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 192 && b === 0) ||
    (a === 198 && (b === 18 || b === 19))
  );
}

function ipBlocked(ip: string) {
  if (isIP(ip) === 4) return ipv4Blocked(ip);
  const v6 = ip.toLowerCase();
  const mapped = v6.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return ipv4Blocked(mapped[1]);
  return v6 === "::" || v6 === "::1" || v6.startsWith("fc") || v6.startsWith("fd") || v6.startsWith("fe8") || v6.startsWith("fe9") || v6.startsWith("fea") || v6.startsWith("feb");
}

/** Only http(s) URLs whose host resolves exclusively to public addresses — so
 * an admin-entered "competitor URL" can't make the server call itself
 * (127.0.0.1:3000), the database, or anything else on the VPS's network.
 * (A host could still re-resolve between this check and the request; the
 * feature is admin-only, so that narrow window is accepted.) */
export async function assertPublicUrl(raw: string) {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new FetchPageError("URL không hợp lệ");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new FetchPageError("Chỉ hỗ trợ http và https");
  if (url.username || url.password) throw new FetchPageError("URL không được chứa tài khoản/mật khẩu");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  const addresses = isIP(host) ? [{ address: host }] : await lookup(host, { all: true }).catch(() => []);
  if (addresses.length === 0) throw new FetchPageError("Không phân giải được tên miền");
  if (addresses.some((a) => ipBlocked(a.address))) throw new FetchPageError("Địa chỉ nội bộ, không được phép");
  return url;
}

async function readCapped(res: Response) {
  const reader = res.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BYTES) {
      await reader.cancel();
      break;
    }
    chunks.push(value);
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(Buffer.concat(chunks));
}

/** GETs a public web page (redirects re-checked hop by hop) and returns its HTML. */
export async function fetchPublicPage(rawUrl: string) {
  let url = await assertPublicUrl(rawUrl);
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const res = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; ToeicMasterySEO/1.0; +https://toeicmastery.click)",
        accept: "text/html,application/xhtml+xml",
        "accept-language": "vi,en;q=0.8",
      },
    }).catch((err: Error) => {
      throw new FetchPageError(`Không tải được trang (${err.name === "TimeoutError" ? "quá thời gian" : err.message})`);
    });
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) throw new FetchPageError(`Chuyển hướng ${res.status} không có địa chỉ đích`);
      url = await assertPublicUrl(new URL(location, url).toString());
      continue;
    }
    if (!res.ok) throw new FetchPageError(`Trang trả về mã ${res.status}`);
    const type = res.headers.get("content-type") ?? "";
    if (!/html|xml/i.test(type)) throw new FetchPageError(`Không phải trang HTML (${type || "không rõ"})`);
    return { finalUrl: url.toString(), html: await readCapped(res) };
  }
  throw new FetchPageError("Chuyển hướng quá nhiều lần");
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code: string) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[code.toLowerCase()] ?? m;
  });
}

function strip(html: string) {
  return decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

/** Title, meta description, headings and body text of an HTML page — what
 * the analysis model reads instead of raw markup. */
export function extractPageText(html: string) {
  const cleaned = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|svg|iframe|template)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(nav|footer|aside|form)[\s\S]*?<\/\1>/gi, " ");
  const title = strip(cleaned.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = decode(
    cleaned.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] ??
      cleaned.match(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i)?.[1] ??
      ""
  ).trim();
  const headings = [...cleaned.matchAll(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => `${"#".repeat(Number(m[1]))} ${strip(m[2])}`).filter((h) => h.length > 3);
  const main = cleaned.match(/<(article|main)[^>]*>([\s\S]*?)<\/\1>/i)?.[2] ?? cleaned.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? cleaned;
  const body = strip(main).slice(0, MAX_TEXT);
  return { title, description, headings: headings.slice(0, 40), body };
}
