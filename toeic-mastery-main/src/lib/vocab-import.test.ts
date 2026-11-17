import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeIpa, normalizePartOfSpeech, parseDelimited, parseVocabTable } from "./vocab-import";

// Exactly what copying the screenshot's Google Sheet gives: header row,
// Day/STT columns, Word merged across rows (blank below), a multi-line
// note quoted.
const SHEET = [
  "Day\tSTT\tWord\tPro\tType\tMean\tNote",
  "1\t1\tFavor\t/ˈfeɪ.vər/\tN\tSự giúp đỡ, ân huệ\tFavorable (adj): thuận lợi",
  "\t2\t\t/ˈfeɪ.vər/\tV\tThiên vị, ủng hộ\t",
  '\t3\tDispose\t/dɪˈspəʊz/\tV\tVứt bỏ\t"Dispose of\n- disposal (n)\n- disposable (adj)"',
  "\t4\tCustom\t/ˈkʌs.təm/\tN\tPhong tục\t",
  "\t5\t\t/ˈkʌs.təm/\tAdj\tTheo yêu cầu\t- Customary (adj): theo phong tục",
  "\t8\tDetect\t/dɪˈtekt/\tV\tPhát hiện, nhận ra\tDetective (n): thám tử",
].join("\n");

test("quoted multi-line cells stay one cell", () => {
  const rows = parseDelimited('a\t"line 1\nline ""2"""\tz\nb\tc\td');
  assert.deepEqual(rows, [
    ["a", 'line 1\nline "2"', "z"],
    ["b", "c", "d"],
  ]);
});

test("the screenshot's sheet: header mapped, Day/STT skipped, merged words folded", () => {
  const { rows, merged, fromHeader } = parseVocabTable(SHEET);
  assert.equal(fromHeader, true);
  assert.equal(merged, 2);
  assert.deepEqual(
    rows.map((r) => r.term),
    ["Favor", "Dispose", "Custom", "Detect"],
  );
  const favor = rows[0];
  assert.equal(favor.ipa, "/ˈfeɪ.vər/");
  assert.equal(favor.partOfSpeech, "n, v");
  assert.equal(favor.definition, "(n) Sự giúp đỡ, ân huệ; (v) Thiên vị, ủng hộ");
  assert.equal(favor.note, "Favorable (adj): thuận lợi");
  assert.equal(rows[1].note, "Dispose of\n- disposal (n)\n- disposable (adj)");
  assert.equal(rows[3].definition, "Phát hiện, nhận ra");
  assert.equal(rows[3].partOfSpeech, "v");
});

test("no header: columns guessed from content", () => {
  const { rows, fromHeader } = parseVocabTable(["1\tcompact\t/ˈkɑːm.pækt/\tadj\tnhỏ gọn", "2\tdebit\tˈdeb.ɪt\tN\tkhoản ghi nợ"].join("\n"));
  assert.equal(fromHeader, false);
  assert.deepEqual(rows[0], { term: "compact", ipa: "/ˈkɑːm.pækt/", partOfSpeech: "adj", definition: "nhỏ gọn", note: "" });
  assert.equal(rows[1].ipa, "/ˈdeb.ɪt/");
  assert.equal(rows[1].partOfSpeech, "n");
});

test("just word + meaning still works (the AI fills the rest later)", () => {
  const { rows } = parseVocabTable("applicant\tứng viên\npenalty\thình phạt");
  assert.deepEqual(
    rows.map((r) => [r.term, r.definition, r.ipa, r.partOfSpeech]),
    [
      ["applicant", "ứng viên", "", ""],
      ["penalty", "hình phạt", "", ""],
    ],
  );
});

test("type and IPA normalisation", () => {
  assert.equal(normalizePartOfSpeech("Adj."), "adj");
  assert.equal(normalizePartOfSpeech("verb / noun"), "n, v");
  assert.equal(normalizePartOfSpeech("Phrasal verb"), "phr v");
  assert.equal(normalizeIpa("ˈfeɪ.vər"), "/ˈfeɪ.vər/");
  assert.equal(normalizeIpa("[kəmˈpækt]"), "/kəmˈpækt/");
  assert.equal(normalizeIpa("  "), "");
});
