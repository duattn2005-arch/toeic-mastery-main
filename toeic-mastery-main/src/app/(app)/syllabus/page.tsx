import type { Metadata } from "next";
import { getOutcomeCatalog } from "@/lib/bloom/outcome-data";
import { SyllabusView } from "@/components/syllabus/syllabus-view";

export const metadata: Metadata = { title: "Đề cương chương trình" };

export default async function SyllabusPage() {
  return <SyllabusView catalog={await getOutcomeCatalog()} />;
}
