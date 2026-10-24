import { statSync } from "node:fs";
import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER } from "next/constants";

// next/image treats ANY absolute-URL src (http(s)://...) as "external" and
// 400s it unless the host is whitelisted — even when that host is the app's
// own origin. saveUpload() (src/lib/upload.ts) always returns a full
// NEXT_PUBLIC_UPLOADS_URL-based URL, so that host must be whitelisted here
// too, in both dev (http://localhost:3000/uploads) and production (wherever
// Nginx serves UPLOADS_DIR from — see README §12).
const uploadsUrl = process.env.NEXT_PUBLIC_UPLOADS_URL ? new URL(process.env.NEXT_PUBLIC_UPLOADS_URL) : null;

/**
 * Zero-downtime deploys. A production build used to write straight into
 * `.next` — the folder the running server reads from — so for the minutes a
 * deploy's `next build` took, pages answered "Internal Server Error".
 * Builds now alternate between `.next-a` and `.next-b`: a build always goes
 * into the slot the server is NOT using (the older/unfinished one), and a
 * starting server picks the newest complete build (BUILD_ID is the last
 * file Next writes). The live site keeps serving the old build until the
 * deploy's `pm2 restart`, whatever command runs the build. `next dev`
 * still uses `.next`.
 */
const BUILD_SLOTS = [".next-a", ".next-b"] as const;

function builtAt(slot: string) {
  try {
    return statSync(`${slot}/BUILD_ID`).mtimeMs;
  } catch {
    return 0;
  }
}

function distDirFor(phase: string) {
  const [a, b] = BUILD_SLOTS.map(builtAt);
  if (phase === PHASE_PRODUCTION_BUILD) return a <= b ? BUILD_SLOTS[0] : BUILD_SLOTS[1];
  // No slot built yet (first start after this change): keep the old folder.
  if (phase === PHASE_PRODUCTION_SERVER) return a === 0 && b === 0 ? ".next" : a >= b ? BUILD_SLOTS[0] : BUILD_SLOTS[1];
  return ".next";
}

const baseConfig: NextConfig = {
  // sharp ships native (.node) bindings — bundling it like ordinary JS
  // breaks those at runtime, so it must stay an external require both for
  // Next's own image optimizer (handled automatically) and for our own
  // direct `import sharp` in src/lib/upload.ts (this entry is what makes
  // that one work too).
  serverExternalPackages: ["sharp"],
  experimental: {
    // src/proxy.ts runs on every request, so Next buffers each request body
    // for it — and silently truncates anything past this limit (default
    // 10MB). A full-test/Part transcript audio is well over that, and the
    // truncated multipart body made /api/upload/question-media fail. Match
    // Nginx's client_max_body_size (60m, README §12).
    proxyClientMaxBodySize: "60mb",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.dicebear.com" },
      ...(uploadsUrl
        ? [
            {
              protocol: uploadsUrl.protocol.replace(":", "") as "http" | "https",
              hostname: uploadsUrl.hostname,
              port: uploadsUrl.port,
              pathname: `${uploadsUrl.pathname.replace(/\/$/, "")}/**`,
            },
          ]
        : []),
    ],
    // In local dev NEXT_PUBLIC_UPLOADS_URL points at localhost, which
    // resolves to a loopback IP — the optimizer's SSRF guard blocks that by
    // default. Safe here because remotePatterns above already restricts
    // fetches to only our own uploads host, not arbitrary URLs.
    dangerouslyAllowLocalIP: true,
  },
};

export default function nextConfig(phase: string): NextConfig {
  return { ...baseConfig, distDir: distDirFor(phase) };
}
