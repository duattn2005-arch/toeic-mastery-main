# SEO content engine (blog tự viết bài)

Brings the two n8n flows the team used ("Competitor_Analysis_Flow" and
"Internal_Linking_Flow", both driven by a Google Sheet) into the app, and adds
the step they were missing: writing, reviewing and publishing articles on
`/blog`, each one leading readers into the learning features.

## Pipeline

```
 Competitor URLs ──► 1. Analyse ──► competitor topics / keywords / summaries
                                          │
 Published posts + guides + word lists ──►│  (2. internal-link catalog)
                                          ▼
                                   3. Topic ideas (keyword gaps)
                                          │  admin approves, or autopilot picks
                                          ▼
                                   4. Write article (DRAFT)
                                          │  admin reviews / edits
                                          ▼
                                   5. Publish → /blog/<slug>, sitemap, GA4
```

| Step | n8n equivalent | In the app |
|---|---|---|
| 1. Analyse competitor page | Competitor_Analysis_Flow (sheet "Competitor URLs" → "Competitor Analysis") | `SeoCompetitorPage` rows; `analyseCompetitorPage()` fetches the page safely, extracts its text and asks the LLM for Topic, Keywords (must appear in the page), Summary |
| 2. Internal-link catalog | Internal_Linking_Flow (sheet "Posted") | `buildLinkCatalog()` — built automatically from published `BlogPost`s (their keywords/summary are known at write time) plus the static public pages (guides, word lists, free quiz, practice). No separate analysis pass is needed because the app owns the posts |
| 3. Topic ideas | — (new) | `SeoTopic` rows proposed by the LLM from competitor topics minus what the site already covers; admins can also add a keyword by hand |
| 4. Write | — (new) | `writeArticleForTopic()` — structured JSON (sections / FAQ / meta / Google Ads copy), internal links restricted to the catalog, CTA chosen from a fixed list of in-app destinations |
| 5. Publish | — (new) | `BlogPost.status = PUBLISHED`, rendered at `/blog/<slug>` with Article + Breadcrumb + FAQ structured data, listed in the sitemap |

## Design choices

- **Same LLM as AI Mentor** (`completeMentorTask`, Gemini or Claude by env).
  No new API key.
- **Structured output, not HTML/Markdown.** Articles are the same
  `{ sections, faqs }` shape as the hand-written guides, rendered by the same
  `GuideBody` component — no HTML from the model ever reaches the page.
  Links are `[anchor](/path)` and are kept only when `/path` is in the
  catalog; anything else becomes plain text (no invented URLs).
- **Drafts by default.** Every generated article lands as `DRAFT`. Autopilot
  publishing exists but is off until an admin turns it on (Google demotes
  mass-produced, unreviewed pages, see "scaled content abuse").
- **Originality.** Competitor pages are only read to learn *what* people
  search for. The writing prompt never receives their text, only topics and
  keywords, and is told not to name competitors.
- **No cannibalisation.** A topic whose primary keyword is already the target
  of a post is rejected.
- **Long work runs in the background.** Analysing or writing can take
  longer than Nginx's 60 s proxy timeout, so buttons only enqueue: rows move
  through `PENDING → (ANALYSING|WRITING) → done/FAILED` and the admin pages
  refresh themselves while something is running.
- **Scheduler without crontab.** `instrumentation.ts` starts an in-process
  check every 15 minutes; once a day after `runHour` (Vietnam time) it runs
  the autopilot if enabled. `/api/cron/seo-content` does the same for anyone
  who prefers a crontab line.
- **Safe fetching.** Competitor URLs must be http(s) on a public host:
  private / loopback addresses are refused (no SSRF into the VPS), redirects
  are re-checked, size and time are capped.

## Admin

`/admin/seo` — settings (autopilot on/off, drafts per run, run hour,
auto-publish), last run log, "Chạy ngay".
`/admin/seo/doi-thu` — paste competitor URLs, analyse, see results.
`/admin/seo/chu-de` — generate / add topics, write an article for one.
`/admin/seo/bai-viet` — drafts and published posts; each post can be
previewed, edited (meta + content JSON), published, unpublished, deleted,
and shows ready-to-paste Google Ads headlines / descriptions / keywords (SEM).
