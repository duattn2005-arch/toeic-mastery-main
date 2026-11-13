/**
 * The chat bubble shows plain text, so Markdown the model slips in (**bold**,
 * # headings, * bullets) and internal tags ([[MARKER]], [VOCABULARY_TOPIC])
 * would show up raw. Keeps **bold** as bold, drops the rest.
 */
export function mentorTextSegments(text: string): { text: string; bold: boolean }[] {
  const clean = text
    .replace(/\[\[[^\]]*\]\]?/g, "")
    .replace(/\[[A-Z][A-Z_]{2,}\]\s*/g, "")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^(\s*)[*-]\s+/gm, "$1• ")
    .replace(/`+/g, "");
  const segments: { text: string; bold: boolean }[] = [];
  const re = /\*\*([^*]+?)\*\*|__([^_]+?)__/g;
  let last = 0;
  for (let m = re.exec(clean); m; m = re.exec(clean)) {
    if (m.index > last) segments.push({ text: clean.slice(last, m.index), bold: false });
    segments.push({ text: m[1] ?? m[2], bold: true });
    last = m.index + m[0].length;
  }
  if (last < clean.length) segments.push({ text: clean.slice(last), bold: false });
  // Unpaired leftovers (a half-streamed "**", a stray "*word*").
  return segments.map((s) => ({ ...s, text: s.text.replace(/\*+/g, "") })).filter((s) => s.text);
}
