/**
 * Per-theme decorative motion layered over a photo/video Live theme's
 * background. Purely cosmetic (aria-hidden, pointer-events-none). Rendered by
 * DashboardHero for every photo/video theme; returns null for any theme
 * without a hand-tuned overlay, so adding a new theme to the registry never
 * requires touching this file's callers.
 *
 * "lily-pond-cat" needs no overlay: its clouds, birds, flowing water and
 * fireflies are animated inside public/themes/lily-pond-cat/background.svg
 * itself, so the motion also shows on the landing page and the site-wide
 * wallpaper, not just this hero.
 */
export function SiteThemeOverlay({ themeId }: { themeId: string }) {
  switch (themeId) {
    default:
      return null;
  }
}
