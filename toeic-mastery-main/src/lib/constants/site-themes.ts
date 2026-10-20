/**
 * Registry of selectable site-wide "Live theme" wallpapers (see ProCard's
 * benefit list). A plain string id is stored on UserSettings.siteTheme
 * instead of a Prisma enum so new themes can ship without a migration.
 *
 * Every theme is an animated illustrated SVG under
 * public/themes/<id>/background.svg (1600x800, CSS motion inside the file,
 * subject kept around 55–70% across so the sidebar crop and the hero's clear
 * right side both show it). Each one also recolors the whole UI: see the
 * [data-site-theme] palettes at the end of globals.css. A photo or video
 * export can still replace any file later (see public/themes/README.md). Every background is layered as CSS `background-image` (image
 * themes) or an absolutely-positioned <video> with that same file as
 * `poster` (video themes) over the theme's swatch gradient, so a missing
 * file just falls back to the gradient instead of a broken-image glyph.
 *
 * Rendered in two places: full-clarity on the dashboard hero
 * (dashboard-hero.tsx) and as a dimmed ambient backdrop behind every page
 * in the app shell (site-theme-background.tsx) — both read the same
 * registry entry so the two stay visually consistent.
 */

export type SiteThemeMedia = "gradient" | "image" | "video";

export interface SiteTheme {
  id: string;
  name: string;
  description: string;
  tier: "FREE" | "PRO";
  media: SiteThemeMedia;
  /** Public path to a still preview image (gallery card + video poster). */
  previewSrc?: string;
  /** Public path to the full-res background photo (media: "image"). */
  imageSrc?: string;
  /** Optional still version of an animated image, used blurred behind app
   * pages (SiteThemeBackground "ambient"); falls back to imageSrc. */
  stillSrc?: string;
  /** Optional daytime versions shown in light mode (see ThemeScene); fall
   * back to the night assets above. */
  imageSrcDay?: string;
  stillSrcDay?: string;
  /** Public path to the looping background video (media: "video"). */
  videoSrc?: string;
  /** Gradient fallback shown while/if the real asset is missing. */
  swatchFrom: string;
  swatchTo: string;
}

export const DEFAULT_SITE_THEME_ID = "lily-pond-cat";

export const SITE_THEMES: SiteTheme[] = [
  {
    id: "aurora",
    name: "Aurora",
    description: "Cực quang tím – xanh uốn lượn trên núi tuyết và căn nhà gỗ ven hồ.",
    tier: "FREE",
    media: "image",
    previewSrc: "/themes/aurora/background.svg",
    imageSrc: "/themes/aurora/background.svg",
    swatchFrom: "#3730a3",
    swatchTo: "#0b1040",
  },
  {
    id: "lily-pond-cat",
    name: "Mèo đen bên hồ sen",
    description: "Chú mèo viết bài dưới lá sen giữa hồ hoa súng (mặc định).",
    tier: "FREE",
    media: "image",
    previewSrc: "/themes/lily-pond-cat/background.svg",
    imageSrc: "/themes/lily-pond-cat/background.svg",
    stillSrc: "/themes/lily-pond-cat/background-still.svg",
    imageSrcDay: "/themes/lily-pond-cat/background-day.svg",
    stillSrcDay: "/themes/lily-pond-cat/background-day-still.svg",
    swatchFrom: "#3c6e52",
    swatchTo: "#1f3d2e",
  },
  {
    id: "torii-sunset",
    name: "Cổng Torii hoàng hôn",
    description: "Ngồi ngắm hoàng hôn cùng chú chó nhỏ bên cổng torii giữa biển, hoa anh đào bay.",
    tier: "FREE",
    media: "image",
    previewSrc: "/themes/torii-sunset/background.svg",
    imageSrc: "/themes/torii-sunset/background.svg",
    swatchFrom: "#8e2f62",
    swatchTo: "#241238",
  },
  {
    id: "rainy-living-room",
    name: "Phòng khách chiều mưa",
    description: "Mưa rơi bên cửa sổ, mèo cưng ngủ trên bậu và ánh đèn vàng ấm áp.",
    tier: "FREE",
    media: "image",
    previewSrc: "/themes/rainy-living-room/background.svg",
    imageSrc: "/themes/rainy-living-room/background.svg",
    swatchFrom: "#3a4a63",
    swatchTo: "#1c2740",
  },
  {
    id: "tokyo-rain-desk",
    name: "Bàn học đêm mưa Tokyo",
    description: "Góc học tập nhìn ra Tokyo Tower rực sáng dưới mưa đêm, phố đèn neon.",
    tier: "PRO",
    media: "image",
    previewSrc: "/themes/tokyo-rain-desk/background.svg",
    imageSrc: "/themes/tokyo-rain-desk/background.svg",
    swatchFrom: "#16214a",
    swatchTo: "#070b1f",
  },
  {
    id: "attic-tokyo-view",
    name: "Gác mái nhìn phố đêm",
    description: "Gác mái ấm cúng, cửa sổ tròn nhìn ra phố đêm và máy hát đĩa đang quay.",
    tier: "PRO",
    media: "image",
    previewSrc: "/themes/attic-tokyo-view/background.svg",
    imageSrc: "/themes/attic-tokyo-view/background.svg",
    swatchFrom: "#2b2545",
    swatchTo: "#1c1832",
  },
  {
    id: "balcony-night",
    name: "Ban công đêm sao",
    description: "Ban công đầy đèn dây dưới dải Ngân Hà, chú mèo ngồi ngắm trăng.",
    tier: "PRO",
    media: "image",
    previewSrc: "/themes/balcony-night/background.svg",
    imageSrc: "/themes/balcony-night/background.svg",
    swatchFrom: "#3b2a6b",
    swatchTo: "#090620",
  },
  {
    id: "jungle-view",
    name: "Ban công rừng nhiệt đới",
    description: "Thung lũng rừng nhiệt đới mù sương lúc hoàng hôn, lá monstera đung đưa.",
    tier: "PRO",
    media: "image",
    previewSrc: "/themes/jungle-view/background.svg",
    imageSrc: "/themes/jungle-view/background.svg",
    swatchFrom: "#5e7e44",
    swatchTo: "#1f3b3a",
  },
  {
    id: "pixel-cottage",
    name: "Bếp nhỏ pixel art",
    description: "Góc bếp pixel art ấm áp, cối xay gió ngoài đồng quê và chú mèo cam.",
    tier: "PRO",
    media: "image",
    previewSrc: "/themes/pixel-cottage/background.svg",
    imageSrc: "/themes/pixel-cottage/background.svg",
    swatchFrom: "#c9744a",
    swatchTo: "#6a3a1f",
  },
];

const THEME_BY_ID = new Map(SITE_THEMES.map((theme) => [theme.id, theme]));

export function getSiteTheme(id: string | null | undefined): SiteTheme {
  return (id && THEME_BY_ID.get(id)) || THEME_BY_ID.get(DEFAULT_SITE_THEME_ID)!;
}
