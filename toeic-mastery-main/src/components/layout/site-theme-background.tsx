import { getSiteTheme } from "@/lib/constants/site-themes";
import { ThemeScene } from "@/components/layout/theme-scene";

/**
 * Fixed backdrop behind a page, driven by the current Live theme. Uses the
 * daytime scene in light mode and the night scene in dark mode (ThemeScene).
 *
 * - "scene" (landing page): the theme's art, dimmed with the app's
 *   background token.
 * - "ambient" (logged-in app shell): a heavily blurred still of the scene.
 *   The dashboard hero already shows it at full clarity; a sharp, animated
 *   copy behind every card made the page busy.
 *
 * Renders nothing for a media: "gradient" theme, which keeps
 * the plain `bg-background`. No "use client" needed.
 */
export function SiteThemeBackground({
  themeId,
  variant = "scene",
}: {
  themeId: string;
  variant?: "scene" | "ambient";
}) {
  const theme = getSiteTheme(themeId);
  if (theme.media === "gradient") return null;

  if (variant === "ambient") {
    return (
      <div className="fixed inset-0 -z-10 isolate overflow-hidden bg-background" aria-hidden>
        {/* Static and blurred: colors and the moon/sun glow come through as
            soft bokeh, no shape readable enough to pull the eye. Painted once
            rather than on every animation frame. */}
        <ThemeScene themeId={themeId} still imageClassName="-inset-16 scale-110 blur-[48px] saturate-150 dark:saturate-125" />
        <div className="absolute inset-0 bg-background/[0.58] dark:bg-background/[0.66]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 isolate overflow-hidden" aria-hidden>
      <ThemeScene themeId={themeId} />
      {theme.media === "video" && theme.videoSrc && (
        <video
          className="absolute inset-0 size-full object-cover"
          src={theme.videoSrc}
          poster={theme.previewSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {/* Dims the art down to an ambient tint using the app's own background
          token, so it adapts between light and dark mode. */}
      <div className="absolute inset-0 bg-background/75" />
    </div>
  );
}
