"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WordListEditor, type WordRow } from "@/components/vocabulary/word-list-editor";
import { bulkAddCustomWordsAction } from "@/lib/actions/dictionary";

/** Quizlet-style "add your own word" for the learner's Saved Words list —
 * doesn't require the dictionary API to already know the term, so proper
 * nouns, TOEIC jargon, or phrases work fine too. Also lets the whole batch
 * be filed into one learner-named category (e.g. "OFFICE") — free text with
 * autocomplete from categories the learner already has, new names just
 * create a fresh one. */
export function AddCustomWordsDialog({ existingCategories = [] }: { existingCategories?: string[] }) {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const router = useRouter();

  async function handleSubmit(rows: WordRow[]) {
    const result = await bulkAddCustomWordsAction(rows, category);
    if (result.error) return { error: result.error };
    if (result.aiFailed) toast.info("Đã lưu — riêng phiên âm/loại từ của vài từ AI chưa điền được, bạn có thể sửa sau.");
    setOpen(false);
    setCategory("");
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button type="button" data-tour="bookmarks-add-word" variant="outline" size="sm" className="w-fit" onClick={() => setOpen(true)}>
        <Plus className="size-4" /> Thêm từ mới
      </Button>
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Thêm từ của riêng bạn</DialogTitle>
          <DialogDescription>
            Gõ từ + nghĩa là đủ — phiên âm và loại từ web tự điền khi lưu. Có sẵn bảng Excel/Sheets thì bấm “Nhập nhiều thẻ cùng lúc”.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="word-category">Chủ đề (không bắt buộc)</Label>
          <Input
            id="word-category"
            list="saved-word-categories"
            placeholder="Ví dụ: OFFICE, TRAVEL..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <datalist id="saved-word-categories">
            {existingCategories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>

        <WordListEditor onSubmit={handleSubmit} submitLabel="Lưu vào Đã lưu" termLabel="Từ" definitionLabel="Nghĩa của bạn" details />
      </DialogContent>
    </Dialog>
  );
}
