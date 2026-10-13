import type { Metadata } from "next";
import { Coins, Sparkles, Target } from "lucide-react";

import { requireUser } from "@/lib/auth";
import { getOwnedShopItemIds, getSpendableXp } from "@/lib/data/xp-shop";
import { XP_SHOP_ITEMS } from "@/lib/constants/xp-shop";
import { XpShopItemVisual } from "@/components/shop/xp-shop-item-visual";
import { XpShopView } from "@/components/shop/xp-shop-view";
import { RARITY_META } from "@/components/shop/shop-rarity";

export const metadata: Metadata = { title: "Cửa hàng XP" };

export default async function ShopPage() {
  const profile = await requireUser();
  const [userXp, ownedItemIds] = await Promise.all([getSpendableXp(profile.id), getOwnedShopItemIds(profile.id)]);

  const equipped = XP_SHOP_ITEMS.find((i) => i.id === profile.equippedShopItemId) ?? null;
  // Cheapest item the learner doesn't own yet and can't afford: the next
  // thing to save up for.
  const nextGoal = XP_SHOP_ITEMS.filter((i) => !ownedItemIds.has(i.id) && i.priceXp > userXp).sort((a, b) => a.priceXp - b.priceXp)[0];
  const goalPercent = nextGoal ? Math.min(100, Math.round((userXp / nextGoal.priceXp) * 100)) : 100;

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-7">
      {/* Hero: balance, next goal, and the frame currently worn */}
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-border/60 bg-card p-6 shadow-lift sm:p-8">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(55% 80% at 100% 0%, rgba(251,191,36,0.22), transparent 70%), radial-gradient(45% 70% at 0% 100%, rgba(45,212,191,0.18), transparent 70%)",
          }}
        />
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Cửa hàng XP</h1>
            <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
              Đổi XP tích luỹ từ việc học lấy khung avatar. Khung đang trang bị hiện ở dashboard, sidebar và mọi chỗ có avatar của bạn.
            </p>

            <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">XP tiêu dùng</p>
                <p className="mt-1 flex items-center gap-2 text-4xl leading-none font-extrabold tracking-tight text-amber-600 tabular-nums dark:text-amber-400">
                  <Coins className="size-8" strokeWidth={2} />
                  {userXp.toLocaleString("vi-VN")}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">Đã sở hữu</p>
                <p className="mt-1 text-2xl leading-none font-extrabold tabular-nums">
                  {ownedItemIds.size}
                  <span className="text-base font-semibold text-muted-foreground">/{XP_SHOP_ITEMS.length}</span>
                </p>
              </div>
            </div>

            {nextGoal && (
              <div className="mt-6 max-w-md rounded-2xl bg-muted/60 p-4">
                <p className="flex items-center gap-1.5 text-sm">
                  <Target className="size-4 text-primary" />
                  Còn <span className="font-extrabold text-primary tabular-nums">{(nextGoal.priceXp - userXp).toLocaleString("vi-VN")}</span> XP
                  để đổi <span className="font-bold">{nextGoal.name}</span>
                </p>
                <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-background/70">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500" style={{ width: `${goalPercent}%` }} />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-3 rounded-[1.75rem] bg-muted/50 px-8 py-6 ring-1 ring-border/60">
            <p className="text-xs font-semibold text-muted-foreground">Đang trang bị</p>
            {equipped ? (
              <>
                <div className="relative flex size-40 items-center justify-center">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full blur-2xl"
                    style={{ background: RARITY_META[equipped.rarity].glow }}
                  />
                  <XpShopItemVisual id={equipped.id} rarity={equipped.rarity} size={120} />
                </div>
                <p className="text-base font-extrabold">{equipped.name}</p>
                <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ring-1 ${RARITY_META[equipped.rarity].badge}`}>
                  {RARITY_META[equipped.rarity].label}
                </span>
              </>
            ) : (
              <div className="flex size-40 flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                <Sparkles className="size-8 text-primary" />
                Chưa trang bị khung nào
              </div>
            )}
          </div>
        </div>
      </section>

      <XpShopView
        items={XP_SHOP_ITEMS}
        userXp={userXp}
        ownedIds={[...ownedItemIds]}
        equippedId={profile.equippedShopItemId}
      />
    </div>
  );
}
