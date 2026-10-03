/** Splits "Mastery ETS 2026 Test 05" into folder "Mastery ETS 2026" + number
 * 5. Titles that don't end in "Test N"/"Đề N" have no folder. */
export function parseTestFolder(title: string): { folder: string; number: number } | null {
  const match = title.trim().match(/^(.+?)[\s\-–—:·|]+(?:test|đề)\s*0*(\d+)$/i);
  if (!match) return null;
  return { folder: match[1].trim(), number: Number(match[2]) };
}

export interface TestFolder<T> {
  name: string;
  tests: T[];
}

/** Groups tests into folders by title, tests inside a folder ordered by
 * their number, folders newest series first (e.g. ETS 2026 before 2024). */
export function groupTestsIntoFolders<T extends { title: string }>(tests: T[]) {
  const folders = new Map<string, { test: T; number: number }[]>();
  const loose: T[] = [];
  for (const test of tests) {
    const parsed = parseTestFolder(test.title);
    if (!parsed) {
      loose.push(test);
      continue;
    }
    const bucket = folders.get(parsed.folder) ?? [];
    bucket.push({ test, number: parsed.number });
    folders.set(parsed.folder, bucket);
  }
  const grouped: TestFolder<T>[] = [...folders.entries()]
    .sort(([a], [b]) => b.localeCompare(a, "vi", { numeric: true }))
    .map(([name, items]) => ({ name, tests: items.sort((a, b) => a.number - b.number).map((i) => i.test) }));
  return { folders: grouped, loose };
}
