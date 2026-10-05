"use client";

import * as React from "react";

/** The "File giải thích" + "Đề trên web" pickers on /admin/explanations.
 * Picking file Test N switches the web test to the one numbered N, so file
 * Test 6 is never compared against web Test 01 by accident; picking a web
 * test resets the file to "best match" so the server picks the fitting one. */
export function KeyTestPicker({
  year,
  keyTests,
  tests,
  webTestByKey,
  defaultKey,
  defaultTest,
}: {
  year: number;
  keyTests: number[];
  tests: { id: string; title: string }[];
  /** Key file number -> the web test whose title carries that number. */
  webTestByKey: Record<number, string | undefined>;
  defaultKey: string;
  defaultTest: string;
}) {
  const [key, setKey] = React.useState(defaultKey);
  const [test, setTest] = React.useState(defaultTest);

  return (
    <>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-xs font-medium text-muted-foreground">File giải thích</span>
        <select
          name="key"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            const match = webTestByKey[Number(e.target.value)];
            if (match) setTest(match);
          }}
          className="h-9 rounded-lg border border-input bg-background px-3"
        >
          <option value="">Tự chọn file khớp nhất</option>
          {keyTests.map((n) => (
            <option key={n} value={n}>
              ETS {year} — Test {n}
            </option>
          ))}
        </select>
      </label>
      <label className="flex min-w-64 flex-1 flex-col gap-1 text-sm">
        <span className="text-xs font-medium text-muted-foreground">Đề trên web</span>
        <select
          name="test"
          value={test}
          onChange={(e) => {
            setTest(e.target.value);
            setKey("");
          }}
          className="h-9 rounded-lg border border-input bg-background px-3"
        >
          <option value="">— Chọn đề —</option>
          {tests.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
