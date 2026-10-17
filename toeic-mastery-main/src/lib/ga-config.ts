/** GA4 measurement ID. The Google tag is also linked (in the tag settings in
 * Google Analytics, not in code) to G-CCTBJ73HK1, so every hit lands in both
 * properties. Don't add a second gtag('config') for that ID or its numbers
 * would be doubled. */
export const GA_MEASUREMENT_ID = "G-GDBZE58K1G";

/** The linked second property. Only server-side Measurement Protocol hits
 * need it spelled out: those bypass the Google tag, so its linking doesn't
 * forward them. */
export const GA_LINKED_MEASUREMENT_ID = "G-CCTBJ73HK1";
