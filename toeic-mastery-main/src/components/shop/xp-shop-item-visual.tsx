import type { ShopItemRarity } from "@/lib/constants/xp-shop";
import {
  AbyssalTideFrame,
  AuroraGenesisFrame,
  BambooSerenityFrame,
  CelestialDragonFrame,
  CloudNapFrame,
  CoconutBreezeFrame,
  CoralReefFrame,
  CrystalCavernFrame,
  DailySparkFrame,
  DevilHeadsetFrame,
  DivineWingsFrame,
  ElementalClashFrame,
  EmberCrownFrame,
  EmeraldWandAuraFrame,
  EternalBloomFrame,
  FirstStarFrame,
  FrostHaloFrame,
  GalaxyCoreFrame,
  GlacierCrownFrame,
  HoneyHiveFrame,
  LanternNightFrame,
  LeafWhisperFrame,
  MoonlitPathFrame,
  MorningDewFrame,
  OceanRingFrame,
  PaperPlaneFrame,
  PebbleStreamFrame,
  PhoenixEmberFrame,
  RiptideRingFrame,
  RoyalAscensionFrame,
  SakuraShrineFrame,
  ShadowHornsFrame,
  SolarFlareFrame,
  SparkTrailFrame,
  StarforgedHaloFrame,
  StormSailFrame,
  SunnyPetalFrame,
  ThunderCrestFrame,
  VerdantBladeFrame,
  VoidwalkerFrame,
} from "@/components/shop/xp-shop-scene-frames";

type SceneComponent = React.ComponentType<{ size: number; rarity: ShopItemRarity }>;

/** Every shop item gets its own illustrated scene (see
 * xp-shop-scene-frames.tsx), keyed by item id rather than theme — items
 * that share a theme (e.g. the three "ember" items) still need to look
 * different from each other. */
const ITEM_FRAMES: Record<string, SceneComponent> = {
  "daily-spark": DailySparkFrame,
  "morning-dew": MorningDewFrame,
  "leaf-whisper": LeafWhisperFrame,
  "ocean-ring": OceanRingFrame,
  "storm-sail": StormSailFrame,
  "spark-trail": SparkTrailFrame,
  "moonlit-path": MoonlitPathFrame,
  "bamboo-serenity": BambooSerenityFrame,
  "ember-crown": EmberCrownFrame,
  "coconut-breeze": CoconutBreezeFrame,
  "riptide-ring": RiptideRingFrame,
  "verdant-blade": VerdantBladeFrame,
  "frost-halo": FrostHaloFrame,
  "sakura-shrine": SakuraShrineFrame,
  "shadow-horns": ShadowHornsFrame,
  "royal-ascension": RoyalAscensionFrame,
  "glacier-crown": GlacierCrownFrame,
  "devil-headset": DevilHeadsetFrame,
  "thunder-crest": ThunderCrestFrame,
  "elemental-clash": ElementalClashFrame,
  "emerald-wand-aura": EmeraldWandAuraFrame,
  "phoenix-ember": PhoenixEmberFrame,
  voidwalker: VoidwalkerFrame,
  "aurora-genesis": AuroraGenesisFrame,
  "eternal-bloom": EternalBloomFrame,
  "starforged-halo": StarforgedHaloFrame,
  "paper-plane": PaperPlaneFrame,
  "pebble-stream": PebbleStreamFrame,
  "sunny-petal": SunnyPetalFrame,
  "cloud-nap": CloudNapFrame,
  "first-star": FirstStarFrame,
  "honey-hive": HoneyHiveFrame,
  "coral-reef": CoralReefFrame,
  "lantern-night": LanternNightFrame,
  "crystal-cavern": CrystalCavernFrame,
  "solar-flare": SolarFlareFrame,
  "abyssal-tide": AbyssalTideFrame,
  "galaxy-core": GalaxyCoreFrame,
  "divine-wings": DivineWingsFrame,
  "celestial-dragon": CelestialDragonFrame,
};

/** An avatar frame preview for the XP shop — dispatches to the item's
 * bespoke illustrated scene by id. */
export function XpShopItemVisual({ id, rarity, size = 92 }: { id: string; rarity: ShopItemRarity; size?: number }) {
  const SceneFrame = ITEM_FRAMES[id];
  if (!SceneFrame) return null;
  return <SceneFrame size={size} rarity={rarity} />;
}
