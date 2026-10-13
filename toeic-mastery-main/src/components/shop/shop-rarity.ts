import type { ShopItemRarity } from "@/lib/constants/xp-shop";

/** Per-rarity look for the XP shop. Rarity colors follow the usual game
 * convention (grey, blue, purple, gold, pink) so tiers read at a glance. */
export const RARITY_META: Record<
  ShopItemRarity,
  {
    label: string;
    /** Spotlight color behind the frame on the card's stage. */
    glow: string;
    /** Badge chip classes. */
    badge: string;
    /** Gradient border for the top tiers; undefined = plain border. */
    border?: string;
  }
> = {
  COMMON: {
    label: "Common",
    glow: "rgba(148,163,184,0.45)",
    badge: "bg-slate-500/15 text-slate-700 ring-slate-500/25 dark:text-slate-200",
  },
  RARE: {
    label: "Rare",
    glow: "rgba(56,189,248,0.5)",
    badge: "bg-sky-500/15 text-sky-700 ring-sky-500/30 dark:text-sky-300",
  },
  EPIC: {
    label: "Epic",
    glow: "rgba(167,139,250,0.55)",
    badge: "bg-violet-500/15 text-violet-700 ring-violet-500/30 dark:text-violet-300",
  },
  LEGENDARY: {
    label: "Legendary",
    glow: "rgba(251,191,36,0.6)",
    badge: "bg-amber-400/20 text-amber-700 ring-amber-500/40 dark:text-amber-300",
    border: "linear-gradient(135deg, #fde68a, #f59e0b 35%, #b45309 60%, #fde68a)",
  },
  MYTHIC: {
    label: "Mythic",
    glow: "rgba(244,114,182,0.6)",
    badge: "bg-pink-500/15 text-pink-700 ring-pink-500/35 dark:text-pink-300",
    border: "linear-gradient(135deg, #f9a8d4, #c084fc 30%, #67e8f9 60%, #f9a8d4)",
  },
};

export const RARITY_ORDER: ShopItemRarity[] = ["COMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC"];
