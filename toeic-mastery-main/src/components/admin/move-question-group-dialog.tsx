"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { listTestGroupSlotsAction, moveQuestionGroupAction, type GroupPlacement, type TestGroupSlot } from "@/lib/actions/admin-passages";
import { PART_META } from "@/lib/constants/toeic";
import type { QuestionGroupFormInput } from "@/lib/validations/admin";

/** Select value standing for "no specific test — the Part's practice pool". */
export const PRACTICE_POOL_CHOICE = "__pool__";

function placementFromValue(value: string): GroupPlacement {
  if (value === "start") return { type: "start" };
  if (value.startsWith("after:")) return { type: "after", passageId: value.slice("after:".length) };
  return { type: "end" };
}

/**
 * Recovery path for a group saved into the wrong test (or none — "quên
 * chọn đề"): pick the right test and exactly where in its Part the group
 * belongs, and the server re-slots it there (see moveQuestionGroupAction).
 */
export function MoveQuestionGroupDialog({
  passageId,
  part,
  currentChoice,
  testOptions,
  onMoved,
}: {
  passageId: string;
  part: QuestionGroupFormInput["part"];
  /** A test id, or PRACTICE_POOL_CHOICE. */
  currentChoice: string;
  testOptions: { id: string; title: string }[];
  onMoved: (choice: string) => void;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [choice, setChoice] = React.useState(currentChoice);
  const [placement, setPlacement] = React.useState("end");
  const [slots, setSlots] = React.useState<TestGroupSlot[] | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const requestRef = React.useRef(0);
  const partLabel = PART_META[part].label;

  function chooseTest(next: string) {
    setChoice(next);
    setPlacement("end");
    setSlots(null);
    if (next === PRACTICE_POOL_CHOICE) return;
    const request = ++requestRef.current;
    listTestGroupSlotsAction(next, part)
      .then((result) => {
        if (request === requestRef.current) setSlots(result.filter((s) => s.passageId !== passageId));
      })
      .catch(() => {
        if (request === requestRef.current) setSlots([]);
      });
  }

  function openDialog() {
    chooseTest(currentChoice);
    setOpen(true);
  }

  async function submit() {
    setSubmitting(true);
    try {
      const result = await moveQuestionGroupAction(passageId, {
        testId: choice === PRACTICE_POOL_CHOICE ? null : choice,
        placement: choice === PRACTICE_POOL_CHOICE ? { type: "end" } : placementFromValue(placement),
      });
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Đã chuyển nhóm câu hỏi vào đúng đề và vị trí.");
      onMoved(choice);
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Không chuyển được nhóm câu hỏi, vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button type="button" variant="outline" size="sm" onClick={openDialog} className="w-fit">
        <ArrowRightLeft className="size-3.5" /> Đổi đề / vị trí
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Gán lại đề thi cho nhóm này</DialogTitle>
            <DialogDescription>
              Dùng khi lỡ quên chọn đề hoặc chọn nhầm đề lúc lưu. Chọn đề đúng và vị trí của nhóm trong {partLabel} — các câu phía sau tự lùi xuống
              để giữ đúng thứ tự.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Thuộc đề thi</Label>
              <Select value={choice} onValueChange={chooseTest}>
                <SelectTrigger>
                  <SelectValue placeholder="— Chọn đề thi —" />
                </SelectTrigger>
                <SelectContent>
                  {testOptions.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.title}
                    </SelectItem>
                  ))}
                  <SelectItem value={PRACTICE_POOL_CHOICE}>Kho luyện tập (không thuộc đề nào)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {choice !== PRACTICE_POOL_CHOICE && (
              <div className="flex flex-col gap-1.5">
                <Label>Vị trí trong {partLabel}</Label>
                {slots === null ? (
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="size-3.5 animate-spin" /> Đang tải các nhóm trong đề…
                  </p>
                ) : (
                  <Select value={placement} onValueChange={setPlacement}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="end">Cuối {partLabel}</SelectItem>
                      {slots.length > 0 && <SelectItem value="start">Đầu {partLabel} (trước câu {slots[0].firstNumber})</SelectItem>}
                      {slots.map((s) => (
                        <SelectItem key={s.passageId} value={`after:${s.passageId}`}>
                          Sau nhóm câu {s.firstNumber === s.lastNumber ? s.firstNumber : `${s.firstNumber}–${s.lastNumber}`}: {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {slots?.length === 0 && <p className="text-xs text-muted-foreground">Đề này chưa có nhóm nào khác của {partLabel}.</p>}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button type="button" onClick={submit} disabled={submitting || (choice !== PRACTICE_POOL_CHOICE && slots === null)}>
              {submitting && <Loader2 className="size-4 animate-spin" />}
              Chuyển nhóm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
