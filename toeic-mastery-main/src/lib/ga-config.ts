/** GA4 measurement ID — loads gtag.js. The Google tag is also linked (in its
 * settings inside Google Analytics, not in code) to G-CCTBJ73HK1, but that link
 * alone proved unreliable: that property lost most of 2026-10-16. So the page
 * also configures GA_LINKED_MEASUREMENT_ID itself; gtag de-duplicates the two
 * routes (checked: 4 visits → 4 page_views per property, not 8). */
export const GA_MEASUREMENT_ID = "G-GDBZE58K1G";

/** The linked second property. Only server-side Measurement Protocol hits
 * need it spelled out: those bypass the Google tag, so its linking doesn't
 * forward them. */
export const GA_LINKED_MEASUREMENT_ID = "G-CCTBJ73HK1";
