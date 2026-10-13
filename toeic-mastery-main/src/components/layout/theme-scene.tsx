import { cn } from "@/lib/utils";
import { getSiteTheme } from "@/lib/constants/site-themes";

export interface SceneScrim {
  /** CSS background-image value(s) laid over the day scene (light mode). */
  light: string;
  /** CSS background-image value(s) laid over the night scene (dark mode). */
  dark: string;
}

/**
 * The current Live theme's scene as a backdrop layer: the daytime art in
 * light mode, the night art in dark mode, each with its own scrim. Place it
 * as the first child of an `isolate` container; it sits at -z-10, under the
 * container's content.
 *
 * Only the visible variant's image is fetched (the other is display:none).
 * Video themes show their gradient here; callers that want the video render
 * it themselves.
 */
export function ThemeScene({
  themeId,
  still = false,
  size = "cover",
  position = "center",
  scrim,
  className,
  imageClassName,
}: {
  themeId: string;
  /** Use the non-animated asset (for blurred backdrops). */
  still?: boolean;
  size?: string;
  position?: string;
  scrim?: SceneScrim;
  className?: string;
  imageClassName?: string;
}) {
  const theme = getSiteTheme(themeId);

  if (theme.media === "gradient") {
    return <div aria-hidden className={cn("hero-ambient pointer-events-none absolute inset-0 -z-10", className)} />;
  }

  const night = (still ? theme.stillSrc : undefined) ?? theme.imageSrc ?? theme.previewSrc;
  const day = (still ? (theme.stillSrcDay ?? theme.imageSrcDay) : theme.imageSrcDay) ?? night;
  const layer = (src: string | undefined) =>
    src ? { backgroundImage: `url(${src})`, backgroundSize: size, backgroundPosition: position, backgroundRepeat: "no-repeat" } : undefined;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute inset-0 dark:hidden" style={{ backgroundImage: "linear-gradient(160deg, #e9f6f1, #d2ebe2)" }} />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{ backgroundImage: `linear-gradient(135deg, ${theme.swatchFrom}, ${theme.swatchTo})` }}
      />
      {theme.media === "image" && (
        <>
          <div className={cn("absolute inset-0 dark:hidden", imageClassName)} style={layer(day)} />
          <div className={cn("absolute inset-0 hidden dark:block", imageClassName)} style={layer(night)} />
        </>
      )}
      {scrim && (
        <>
          <div className="absolute inset-0 dark:hidden" style={{ backgroundImage: scrim.light }} />
          <div className="absolute inset-0 hidden dark:block" style={{ backgroundImage: scrim.dark }} />
        </>
      )}
    </div>
  );
}
