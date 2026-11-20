import type { Metadata } from "next";
import { Check, Crown, Gift, Hourglass } from "lucide-react";
import { requireUser, isPro } from "@/lib/auth";
import { getNewMemberOfferState } from "@/lib/services/new-member-offer";
import { getProTrialState } from "@/lib/services/pro-trial";
import { StartTrialButton } from "@/components/billing/start-trial-button";
import { NEW_MEMBER_OFFER_PERCENT, PRO_TRIAL_DAYS } from "@/lib/constants/billing";
import { Badge } from "@/components/ui/badge";
import { ProCard } from "@/components/billing/pro-card";
import { FREE_ANSWER_REVEALS_PER_PART_PER_DAY, FREE_DICTIONARY_LOOKUPS_PER_DAY } from "@/lib/constants/limits";

export const metadata: Metadata = { title: "Bảng giá" };

const FREE_BENEFITS = [
  "Học bài cơ bản & Mini/Mock Test giới hạn",
  `Tra từ bôi đen: ${FREE_DICTIONARY_LOOKUPS_PER_DAY} từ/ngày`,
  `Chữa câu tức thì: ${FREE_ANSWER_REVEALS_PER_PART_PER_DAY} câu/part/ngày`,
  "Quick Study cố định 7 phút",
  "Quản lý từ vựng 3 trạng thái & Lịch ôn ngày 1–7",
  "Xem Ngân hàng lỗi sai cơ bản",
];

export default async function PricingPage() {
  const profile = await requireUser();
  const pro = isPro(profile);
  const [offer, trial] = await Promise.all([getNewMemberOfferState(profile), getProTrialState(profile)]);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Bảng giá</h1>
        <p className="mt-1 text-sm text-muted-foreground">Chọn gói phù hợp để học TOEIC hiệu quả hơn.</p>
        {pro ? (
          <Badge className="mt-3" variant="default">
            <Crown className="size-3.5" /> {trial.active ? `Bạn đang dùng thử Pro ${PRO_TRIAL_DAYS} ngày` : "Bạn đang dùng gói Pro"}
            {profile.proExpiresAt && ` — hết hạn ${profile.proExpiresAt.toLocaleDateString("vi-VN")}`}
          </Badge>
        ) : (
          <Badge className="mt-3" variant="secondary">
            Bạn đang dùng gói Free
          </Badge>
        )}
      </div>

      {trial.eligible && (
        <div id="dung-thu" className="relative mx-auto w-full max-w-3xl scroll-mt-24 overflow-hidden rounded-3xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-400/15 via-orange-500/10 to-transparent p-5 shadow-soft sm:p-6">
          <div className="pointer-events-none absolute -top-12 -right-10 size-40 rounded-full bg-amber-400/25 blur-3xl" aria-hidden />
          <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm">
              <Gift className="size-7" />
            </span>
            <div className="flex-1">
              <p className="text-lg font-bold">Chưa chắc chắn? Dùng thử PRO miễn phí {PRO_TRIAL_DAYS} ngày</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Mở khóa toàn bộ tính năng PRO ngay lập tức. Không cần chuyển khoản, không tự động gia hạn — hết {PRO_TRIAL_DAYS} ngày tài khoản tự về gói Free.
              </p>
            </div>
            <StartTrialButton source="pricing" className="w-full rounded-full border-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:opacity-90 sm:w-auto" label="Dùng thử ngay" />
          </div>
        </div>
      )}

      {trial.active && trial.endsAt && (
        <div className="mx-auto flex w-full max-w-3xl items-start gap-3 rounded-2xl border border-amber-400/50 bg-amber-400/10 p-4 text-sm">
          <Hourglass className="mt-0.5 size-5 shrink-0 text-amber-500" />
          <p>
            Bạn đang dùng thử PRO đến <b>{new Date(trial.endsAt).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" })}</b>. Nâng cấp ngay
            {offer.eligible ? <> với ưu đãi <b>-{NEW_MEMBER_OFFER_PERCENT}%</b></> : null} — số ngày còn lại của bản dùng thử vẫn được <b>cộng dồn</b>, không mất ngày nào.
          </p>
        </div>
      )}

      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft">
          <span className="text-lg font-semibold">Miễn phí</span>
          <p className="mt-1 text-sm text-muted-foreground">Dành cho người mới bắt đầu trải nghiệm</p>
          <p className="mt-4 text-3xl font-bold">0đ</p>
          <ul className="mt-5 flex flex-col gap-2 text-sm">
            {FREE_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          {!pro && (
            <span className="mt-6 rounded-lg border border-border py-2.5 text-center text-sm font-medium text-muted-foreground">Gói hiện tại</span>
          )}
        </div>

        <ProCard offer={offer} />
      </div>
    </div>
  );
}
