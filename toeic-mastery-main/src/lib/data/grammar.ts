import "server-only";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { questionAccessFilter } from "@/lib/data/question-access";

export async function getGrammarTopics() {
  return db.grammarTopic.findMany({
    orderBy: { orderIndex: "asc" },
    include: { _count: { select: { questions: true } }, lessons: { select: { slug: true }, take: 1 } },
  });
}

export async function getGrammarTopicDetail(slug: string, pro: boolean) {
  const topic = await db.grammarTopic.findUnique({
    where: { slug },
    include: { lessons: true },
  });
  if (!topic) notFound();

  const questions = await db.question.findMany({
    where: { grammarTopicId: topic.id, status: "PUBLISHED", ...questionAccessFilter(pro) },
    include: { options: { orderBy: { label: "asc" } } },
    orderBy: { orderIndex: "asc" },
    take: 15,
  });

  return { topic, lesson: topic.lessons[0] ?? null, questions };
}
