"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ShopItem, ShopItemRarity } from "@/lib/constants/xp-shop";
import { XpShopItemCard } from "@/components/shop/xp-shop-item-card";
import { RARITY_META, RARITY_ORDER } from "@/components/shop/shop-rarity";

type Filter = "ALL" | ShopItemRarity;

/** Rarity filter + item grid. With "Tất cả" the grid is grouped by tier so
 * the jump from Rare to Legendary reads as a progression. */
export function XpShopView({
  items,
  userXp,
  ownedIds,
  equippedId,
}: {
  items: ShopItem[];
  userXp: number;
  ownedIds: string[];
  equippedId: string | null;
}) {
  const [filter, setFilter] = React.useState<Filter>("ALL");
  const owned = React.useMemo(() => new Set(ownedIds), [ownedIds]);

  const tiers = RARITY_ORDER.map((rarity) => ({
    rarity,
    items: items.filter((i) => i.rarity === rarity),
  })).filter((t) => t.items.length > 0);

  const filters: { key: Filter; label: string; ownedCount: number; total: number }[] = [
    { key: "ALL", label: "Tất cả", ownedCount: items.filter((i) => owned.has(i.id)).length, total: items.length },
    ...tiers.map((t) => ({
      key: t.rarity as Filter,
      label: RARITY_META[t.rarity].label,
      ownedCount: t.items.filter((i) => owned.has(i.id)).length,
      total: t.items.length,
    })),
  ];

  const visibleTiers = filter === "ALL" ? tiers : tiers.filter((t) => t.rarity === filter);

  return (
    <div className="flex flex-col gap-6">
      <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="tablist" aria-label="Lọc theo độ hiếm">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
              filter === f.key
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-card text-foreground/80 ring-1 ring-border/60 hover:bg-accent hover:text-foreground"
            )}
          >
            {f.label}
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[11px] font-bold tabular-nums",
                filter === f.key ? "bg-black/15" : "bg-muted text-muted-foreground"
              )}
            >
              {f.ownedCount}/{f.total}
            </span>
          </button>
        ))}
      </div>

      {visibleTiers.map((tier) => (
        <section key={tier.rarity} className="flex flex-col gap-4">
          {filter === "ALL" && (
            <h2 className="flex items-baseline gap-2 text-lg font-extrabold tracking-tight">
              {RARITY_META[tier.rarity].label}
              <span className="text-sm font-medium text-muted-foreground">{tier.items.length} khung</span>
            </h2>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tier.items.map((item) => (
              <XpShopItemCard
                key={item.id}
                item={item}
                userXp={userXp}
                owned={owned.has(item.id)}
                equipped={equippedId === item.id}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
