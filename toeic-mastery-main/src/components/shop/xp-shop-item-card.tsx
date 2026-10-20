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

/** Motes rising off the pedestal on Epic+ cards (fixed, so SSR matches). */
const MOTES = [
  { left: "34%", size: 3, delay: "0s", duration: "4.2s" },
  { left: "46%", size: 2, delay: "1.4s", duration: "5s" },
  { left: "58%", size: 3, delay: "0.7s", duration: "4.6s" },
  { left: "66%", size: 2, delay: "2.3s", duration: "5.4s" },
  { left: "40%", size: 2, delay: "3.1s", duration: "4.8s" },
];

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
  const fancy = topTier || item.rarity === "EPIC";
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
        "card-sheen group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-lift",
        !rarity.border && "border border-border/60 shadow-soft",
        equipped && !rarity.border && "border-primary/60 shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_22%,transparent)]"
      )}
    >
      {/* Stage: rarity spotlight (rays and rising motes from Epic up), the
          frame floating over a glowing pedestal */}
      <div className="relative isolate flex h-52 items-center justify-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            opacity: 0.85,
            backgroundImage: `radial-gradient(55% 60% at 50% 44%, ${rarity.glow}, transparent 72%), radial-gradient(circle at 50% 44%, color-mix(in oklab, ${rarity.accent} 10%, transparent) 0 1px, transparent 1.5px)`,
            backgroundSize: "100% 100%, 14px 14px",
          }}
        />
        {fancy && (
          <div
            aria-hidden
            className="stage-rays absolute -z-10 size-[150%]"
            style={{
              background: `repeating-conic-gradient(from 0deg at 50% 50%, color-mix(in oklab, ${rarity.accent} 22%, transparent) 0deg 6deg, transparent 6deg 22deg)`,
              WebkitMask: "radial-gradient(circle at 50% 50%, #000 0, transparent 46%)",
              mask: "radial-gradient(circle at 50% 50%, #000 0, transparent 46%)",
            }}
          />
        )}
        {fancy &&
          MOTES.map((m, i) => (
            <span
              key={i}
              aria-hidden
              className="stage-mote absolute bottom-10 -z-10 rounded-full"
              style={{ left: m.left, width: m.size, height: m.size, background: rarity.accent, boxShadow: `0 0 6px ${rarity.accent}`, animationDelay: m.delay, animationDuration: m.duration }}
            />
          ))}
        {/* Pedestal: a lit disc with a rim */}
        <span
          aria-hidden
          className="absolute bottom-6 h-5 w-32 rounded-[50%] transition-transform duration-700 group-hover:scale-110"
          style={{ background: `radial-gradient(closest-side, color-mix(in oklab, ${rarity.accent} 55%, transparent), transparent)`, filter: "blur(2px)" }}
        />
        <span
          aria-hidden
          className="absolute bottom-7 h-3 w-24 rounded-[50%] border"
          style={{ borderColor: `color-mix(in oklab, ${rarity.accent} 60%, transparent)`, boxShadow: `0 0 12px color-mix(in oklab, ${rarity.accent} 50%, transparent)` }}
        />
        <div className="float-y relative" style={{ animationDuration: "5s" }}>
          <div className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-2 group-hover:scale-[1.08]">
            <XpShopItemVisual id={item.id} rarity={item.rarity} size={108} />
          </div>
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

  // Top tiers get a glowing gradient border that keeps rotating: a padded
  // wrapper painted with a conic gradient, the card inside it.
  if (rarity.border) {
    return (
      <div
        className={cn(
          "rarity-border-spin h-full rounded-[1.85rem] p-[2px]",
          equipped ? "shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_22%,transparent)]" : "shadow-soft"
        )}
        style={{
          backgroundImage: rarity.conic ? `conic-gradient(from var(--frame-angle), ${rarity.conic})` : rarity.border,
          boxShadow: equipped ? undefined : `0 10px 30px -14px ${rarity.accent}`,
        }}
      >
        {card}
      </div>
    );
  }
  return card;
}
