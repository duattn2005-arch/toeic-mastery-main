"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Coins, Loader2, Lock, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { getShopItemStatus, type ShopItem } from "@/lib/constants/xp-shop";
import { redeemShopItemAction, equipShopItemAction } from "@/lib/actions/xp-shop";
import { XpShopItemVisual } from "@/components/shop/xp-shop-item-visual";
import { RARITY_META } from "@/components/shop/shop-rarity";

export function XpShopItemCard({
  item,
  userXp,
  owned,
  equipped,
}: {
  item: ShopItem;
  userXp: number;
  owned: boolean;
  equipped: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const { canAfford, missingXp } = getShopItemStatus(userXp, item.priceXp);
  const rarity = RARITY_META[item.rarity];
  const topTier = item.rarity === "LEGENDARY" || item.rarity === "MYTHIC";
  const affordPercent = Math.min(100, Math.round((userXp / item.priceXp) * 100));

  function handleRedeem() {
    startTransition(async () => {
      const result = await redeemShopItemAction(item.id);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(`Đã đổi và trang bị "${item.name}"`);
      router.refresh();
    });
  }

  function handleEquip() {
    startTransition(async () => {
      const result = await equipShopItemAction(item.id);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(`Đã trang bị "${item.name}"`);
      router.refresh();
    });
  }

  const card = (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-lift",
        !rarity.border && "border border-border/60 shadow-soft",
        equipped && !rarity.border && "border-primary/60 shadow-[0_0_0_3px_rgba(45,212,191,0.18)]"
      )}
    >
      {/* Stage: rarity spotlight, the frame, and a soft pedestal shadow */}
      <div
        className="relative flex h-48 items-center justify-center"
        style={{ backgroundImage: `radial-gradient(60% 65% at 50% 45%, ${rarity.glow}, transparent 70%)` }}
      >
        <span aria-hidden className="absolute bottom-6 h-3 w-24 rounded-[50%] bg-black/25 blur-md dark:bg-black/50" />
        <div className="relative transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1.5 group-hover:scale-105">
          <XpShopItemVisual id={item.id} rarity={item.rarity} size={104} />
        </div>

        <span className={cn("absolute top-3.5 left-3.5 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold ring-1", rarity.badge)}>
          {topTier && <Star className="size-3 fill-current" />}
          {rarity.label}
        </span>
        {equipped ? (
          <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 rounded-md bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">
            <Check className="size-3" strokeWidth={3} /> Đang dùng
          </span>
        ) : owned ? (
          <span className="absolute top-3.5 right-3.5 rounded-md bg-primary/15 px-2 py-0.5 text-[11px] font-bold text-primary ring-1 ring-primary/30">
            Đã sở hữu
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 pt-1 pb-5">
        <div>
          <h3 className="text-base font-extrabold tracking-tight">{item.name}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          {!owned && (
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-base font-extrabold text-amber-600 tabular-nums dark:text-amber-400">
                <Coins className="size-4" />
                {item.priceXp.toLocaleString("vi-VN")}
              </span>
              {!canAfford && (
                <span className="text-[11px] font-semibold text-muted-foreground tabular-nums">
                  Thiếu {missingXp.toLocaleString("vi-VN")}
                </span>
              )}
            </div>
          )}
          {!owned && !canAfford && (
            <div className="h-1.5 overflow-hidden rounded-full bg-muted" aria-label={`Đã có ${affordPercent}% số XP cần`}>
              <div className="h-full rounded-full bg-amber-500/80" style={{ width: `${affordPercent}%` }} />
            </div>
          )}

          {equipped ? (
            <span className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/30">
              <Check className="size-4" strokeWidth={2.5} /> Đang trang bị
            </span>
          ) : owned ? (
            <button
              type="button"
              onClick={handleEquip}
              disabled={pending}
              className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-primary text-sm font-bold text-primary-foreground transition-[background-color,transform] duration-300 hover:bg-[var(--primary-hover)] active:scale-[0.98] disabled:opacity-60"
            >
              {pending ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              Trang bị
            </button>
          ) : canAfford ? (
            <button
              type="button"
              onClick={handleRedeem}
              disabled={pending}
              className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-sm font-bold text-[#3a2600] shadow-[0_8px_20px_-10px_rgba(245,158,11,0.9)] transition-[filter,transform] duration-300 hover:brightness-105 active:scale-[0.98] disabled:opacity-60"
            >
              {pending ? <Loader2 className="size-4 animate-spin" /> : <Coins className="size-4" />}
              Đổi ngay
            </button>
          ) : (
            <span className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-muted text-sm font-semibold text-muted-foreground">
              <Lock className="size-3.5" /> Chưa đủ XP
            </span>
          )}
        </div>
      </div>
    </article>
  );

  // Top tiers get a glowing gradient border: a padded wrapper painted with
  // the gradient, the card inside it.
  if (rarity.border) {
    return (
      <div
        className={cn("h-full rounded-[1.85rem] p-[2px] shadow-soft", equipped && "shadow-[0_0_0_3px_rgba(45,212,191,0.18)]")}
        style={{ backgroundImage: rarity.border }}
      >
        {card}
      </div>
    );
  }
  return card;
}
