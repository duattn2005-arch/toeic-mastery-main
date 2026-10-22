/**
 * Imports full TOEIC tests prepared as bundles (one folder per test: test.json + media/) into the
 * database, copying their photos/audio into UPLOADS_DIR/question-media/{images,audio}/.
 *
 * Run on the server, from the app directory (needs DATABASE_URL, UPLOADS_DIR, NEXT_PUBLIC_UPLOADS_URL):
 *   npx tsx scripts/import-ets-tests.ts <bundles dir> [--publish] [--replace]
 *
 * A test whose slug already exists is skipped; --replace rebuilds it, unless someone has taken it
 * (its attempts would be deleted with it). New tests are DRAFT unless --publish is given.
 */
import "dotenv/config";
import { copyFile, mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import type { PassageFormat, TestPart } from "../src/generated/prisma/enums";

interface BundleQuestion {
  n: number;
  part: TestPart;
  prompt: string;
  options: string[];
  correct: "A" | "B" | "C" | "D";
  explanation: string;
  transcript?: string;
  image?: string;
  audio?: string;
  passage?: string;
}
interface BundlePassage {
  part: TestPart;
  format: PassageFormat;
  title?: string;
  images: string[];
  audio?: string;
  transcript?: string;
}
interface Bundle {
  slug: string;
  title: string;
  description: string;
  questions: BundleQuestion[];
  passages: Record<string, BundlePassage>;
}

const LABELS = ["A", "B", "C", "D"];
const PARTS: TestPart[] = ["PART1", "PART2", "PART3", "PART4", "PART5", "PART6", "PART7"];

const [dir, ...flags] = process.argv.slice(2);
if (!dir) throw new Error("Usage: npx tsx scripts/import-ets-tests.ts <bundles dir> [--publish] [--replace]");
const publish = flags.includes("--publish");
const replace = flags.includes("--replace");

const { DATABASE_URL, UPLOADS_DIR, NEXT_PUBLIC_UPLOADS_URL } = process.env;
if (!DATABASE_URL || !UPLOADS_DIR || !NEXT_PUBLIC_UPLOADS_URL) throw new Error("DATABASE_URL, UPLOADS_DIR and NEXT_PUBLIC_UPLOADS_URL must be set");
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: DATABASE_URL }) });

/** Copies a bundle file into the uploads folder and returns its public URL. */
async function upload(bundleDir: string, slug: string, file: string | undefined): Promise<string | null> {
  if (!file) return null;
  const bucket = file.endsWith(".mp3") ? "question-media/audio" : "question-media/images";
  const name = `${slug}-${file}`;
  await mkdir(path.join(UPLOADS_DIR!, bucket), { recursive: true });
  await copyFile(path.join(bundleDir, "media", file), path.join(UPLOADS_DIR!, bucket, name));
  return `${NEXT_PUBLIC_UPLOADS_URL!.replace(/\/$/, "")}/${bucket}/${name}`;
}

function validate(b: Bundle) {
  const nums = b.questions.map((q) => q.n).sort((x, y) => x - y);
  if (nums.length !== 200 || nums.some((n, i) => n !== i + 1)) throw new Error(`${b.slug}: expected questions 1-200`);
  for (const q of b.questions) {
    const count = q.part === "PART2" ? 3 : 4;
    if (q.options.length !== count || q.options.some((o) => !o.trim())) throw new Error(`${b.slug} #${q.n}: needs ${count} options`);
    if (!LABELS.slice(0, count).includes(q.correct)) throw new Error(`${b.slug} #${q.n}: bad answer ${q.correct}`);
    if (q.passage && !b.passages[q.passage]) throw new Error(`${b.slug} #${q.n}: unknown passage ${q.passage}`);
  }
}

async function importBundle(bundleDir: string) {
  const b: Bundle = JSON.parse(await readFile(path.join(bundleDir, "test.json"), "utf8"));
  validate(b);

  const existing = await db.test.findUnique({ where: { slug: b.slug }, include: { _count: { select: { attempts: true } } } });
  if (existing) {
    if (!replace) return console.log(`= ${b.slug}: already exists, skipped (--replace to rebuild)`);
    if (existing._count.attempts > 0) return console.log(`! ${b.slug}: has ${existing._count.attempts} attempts, not replaced`);
    await db.test.delete({ where: { id: existing.id } });
  }

  // Media first, so a failed copy leaves no half-built test behind
  const passageMedia = new Map<string, { audio: string | null; images: string[] }>();
  for (const [key, p] of Object.entries(b.passages)) {
    const images = [];
    for (const f of p.images) images.push((await upload(bundleDir, b.slug, f))!);
    passageMedia.set(key, { audio: await upload(bundleDir, b.slug, p.audio), images });
  }
  const questionMedia = new Map<number, { audio: string | null; image: string | null }>();
  for (const q of b.questions) {
    questionMedia.set(q.n, { audio: await upload(bundleDir, b.slug, q.audio), image: await upload(bundleDir, b.slug, q.image) });
  }

  const count = (part: TestPart) => b.questions.filter((q) => q.part === part).length;
  await db.$transaction(
    async (tx) => {
      const test = await tx.test.create({
        data: {
          slug: b.slug,
          title: b.title,
          description: b.description,
          status: publish ? "PUBLISHED" : "DRAFT",
          isFullTest: true,
          durationMinutes: 120,
          totalQuestions: 200,
          listeningQuestions: 100,
          readingQuestions: 100,
          allowReplay: false,
        },
      });
      await tx.testSection.createMany({
        data: PARTS.map((part, i) => ({ testId: test.id, part, title: `Part ${i + 1}`, orderIndex: i, questionCount: count(part) })),
      });
      const sections = new Map((await tx.testSection.findMany({ where: { testId: test.id } })).map((s) => [s.part, s.id]));

      const passageIds = new Map<string, string>();
      for (const [i, [key, p]] of Object.entries(b.passages).entries()) {
        const media = passageMedia.get(key)!;
        const created = await tx.passage.create({
          data: {
            testId: test.id,
            part: p.part,
            format: p.format,
            layout: media.images.length === 3 ? "TRIPLE" : media.images.length === 2 ? "DOUBLE" : "SINGLE",
            title: p.title,
            texts: [],
            audioUrl: media.audio,
            imageUrls: media.images,
            imageUrl: media.images[0] ?? null,
            transcript: p.transcript,
            orderIndex: i,
          },
        });
        passageIds.set(key, created.id);
      }

      for (const q of [...b.questions].sort((x, y) => x.n - y.n)) {
        const media = questionMedia.get(q.n)!;
        await tx.question.create({
          data: {
            testId: test.id,
            testSectionId: sections.get(q.part),
            passageId: q.passage ? passageIds.get(q.passage) : undefined,
            part: q.part,
            orderIndex: q.n - 1,
            prompt: q.prompt,
            imageUrl: media.image,
            audioUrl: media.audio,
            transcript: q.transcript,
            correctLabel: q.correct,
            explanationVi: q.explanation,
            status: "PUBLISHED",
            options: { create: q.options.map((content, i) => ({ label: LABELS[i], content, isCorrect: LABELS[i] === q.correct })) },
          },
        });
      }
    },
    { timeout: 120_000 }
  );
  console.log(`+ ${b.slug}: imported (${publish ? "PUBLISHED" : "DRAFT"})`);
}

async function main() {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries.filter((e) => e.isDirectory()).sort((x, y) => x.name.localeCompare(y.name))) {
    await importBundle(path.join(dir, e.name));
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
