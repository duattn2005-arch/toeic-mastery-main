# Dashboard live theme assets

Theme metadata lives in `src/lib/constants/site-themes.ts`. Every theme
ships an animated illustrated SVG at `public/themes/<theme-id>/background.svg`
(1600×800, CSS motion inside the file) — the same file is used for the
gallery thumbnail, the dashboard hero, the sidebar and the blurred page
backdrop. Each theme also recolors the whole UI through the
`[data-site-theme]` palettes at the end of `src/app/globals.css`; add one
there when adding a theme (the default `lily-pond-cat` uses the base palette).

## Replacing a placeholder with a real photo or video

1. Export your asset (jpg/webp for a photo, mp4 for a loop).
2. Drop it in `public/themes/<theme-id>/` under any name you like.
3. Update that theme's `imageSrc` (and `previewSrc`) — or `videoSrc` for a
   video theme — in `src/lib/constants/site-themes.ts` to point at the
   new file.

If a referenced file is ever missing, the hero/gallery quietly falls back to
that theme's `swatchFrom`/`swatchTo` gradient instead of a broken-image icon
— there's no crash risk either way.

Guidelines for new photo/video exports:

- **Background photo** — full-bleed, ~1920×960 (2:1-ish, the hero is a short
  wide banner), export as `.jpg`/`.webp`, keep under ~400KB.
- **Gallery/poster preview** — a smaller crop is fine, ~600×400.
- **Video loop** — muted, silent-safe (it always plays with `muted`), H.264
  mp4, ideally under ~4–6MB and a few seconds long so it loops seamlessly.
  Keep the busiest motion away from the top-left, since dashboard text sits
  on top of it.

Keep each scene's subject around 55–70% across and in the lower half: the
sidebar shows a narrow slice there, and the hero's left side sits under a
text scrim.
