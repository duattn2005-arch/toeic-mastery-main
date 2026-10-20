import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export interface YouTubeSearchResult {
  id: string;
  title: string;
  channel: string;
  thumbnailUrl: string;
  /** "m:ss" or "h:mm:ss"; empty for live streams. */
  duration: string;
}

/** Search costs 100 of the API key's 10,000 daily quota units, so identical
 * queries are served from memory for a few hours. */
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const CACHE_MAX = 500;
const cache = new Map<string, { at: number; results: YouTubeSearchResult[] }>();

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** ISO 8601 duration (PT1H2M3S) -> "1:02:03" / "2:03". */
function formatDuration(iso: string | undefined) {
  const m = iso?.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!m) return "";
  const [h, min, s] = [Number(m[1] ?? 0), Number(m[2] ?? 0), Number(m[3] ?? 0)];
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${String(min).padStart(2, "0")}:${ss}` : `${min}:${ss}`;
}

/** Searches YouTube for embeddable videos (YouTube Data API v3) for the
 * background-music player. Needs YOUTUBE_API_KEY; logged-in users only, so
 * the shared quota isn't open to the internet. */
export async function GET(request: Request) {
  const profile = await getCurrentProfile();
  if (!profile) return NextResponse.json({ error: "Vui lòng đăng nhập" }, { status: 401 });

  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Tìm kiếm YouTube chưa được bật — hãy dán link video." }, { status: 503 });
  }

  const q = new URL(request.url).searchParams.get("q")?.trim().slice(0, 100);
  if (!q) return NextResponse.json({ error: "Thiếu từ khóa" }, { status: 400 });

  const cacheKey = q.toLowerCase();
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return NextResponse.json({ results: hit.results });

  const limit = rateLimit(`youtube-search:${profile.id}`, 20, 60 * 60 * 1000);
  if (!limit.ok) return NextResponse.json({ error: "Bạn tìm hơi nhiều, thử lại sau ít phút nhé." }, { status: 429 });

  try {
    const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    searchUrl.search = new URLSearchParams({
      part: "snippet",
      type: "video",
      videoEmbeddable: "true",
      maxResults: "10",
      safeSearch: "moderate",
      regionCode: "VN",
      q,
      key,
    }).toString();
    const res = await fetch(searchUrl, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return NextResponse.json({ error: "Không tìm được trên YouTube lúc này" }, { status: 502 });
    const data = (await res.json()) as {
      items?: { id: { videoId?: string }; snippet: { title: string; channelTitle: string; thumbnails: Record<string, { url: string }> } }[];
    };
    const items = (data.items ?? []).filter((i) => i.id.videoId);

    // Durations come from a second, 1-unit call.
    const durations = new Map<string, string>();
    if (items.length) {
      const videosUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
      videosUrl.search = new URLSearchParams({ part: "contentDetails", id: items.map((i) => i.id.videoId!).join(","), key }).toString();
      const vres = await fetch(videosUrl, { signal: AbortSignal.timeout(8000) });
      if (vres.ok) {
        const vdata = (await vres.json()) as { items?: { id: string; contentDetails: { duration: string } }[] };
        vdata.items?.forEach((v) => durations.set(v.id, formatDuration(v.contentDetails.duration)));
      }
    }

    const results: YouTubeSearchResult[] = items.map((i) => ({
      id: i.id.videoId!,
      title: decodeEntities(i.snippet.title),
      channel: decodeEntities(i.snippet.channelTitle),
      thumbnailUrl: i.snippet.thumbnails.medium?.url ?? i.snippet.thumbnails.default?.url ?? `https://img.youtube.com/vi/${i.id.videoId}/mqdefault.jpg`,
      duration: durations.get(i.id.videoId!) ?? "",
    }));

    if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value!);
    cache.set(cacheKey, { at: Date.now(), results });
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Không tìm được trên YouTube lúc này" }, { status: 502 });
  }
}
