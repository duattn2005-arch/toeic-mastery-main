import type { Metadata } from "next";
import { requireUser, isPro } from "@/lib/auth";
import { getMistakeQuestions } from "@/lib/data/mistakes";
import { MistakeBankClient } from "@/components/practice/mistake-bank-client";
import type { TestPart } from "@/generated/prisma/enums";

export const metadata: Metadata = { title: "Ngân hàng lỗi sai" };

export default async function MistakeBankPage({ searchParams }: { searchParams: Promise<{ part?: string }> }) {
  const profile = await requireUser();
  const { part } = await searchParams;
  const { questions, countByPart } = await getMistakeQuestions(profile.id, isPro(profile));

  return <MistakeBankClient questions={questions} countByPart={countByPart} initialPart={part && part in countByPart ? (part as TestPart) : undefined} />;
}
