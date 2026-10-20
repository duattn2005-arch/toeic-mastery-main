export type ShopItemRarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY" | "MYTHIC";

/** Visual family an item's frame is drawn from (see XpShopItemVisual) —
 * decides its ring color and the glyph orbiting it. Independent of rarity:
 * rarity instead drives how *much* motion the frame has (particle count,
 * spin speed), so two items can share a theme but still read as different
 * tiers. */
export type ShopItemTheme =
  | "dawn"
  | "verdant"
  | "aqua"
  | "storm"
  | "ember"
  | "frost"
  | "bloom"
  | "shadow"
  | "thunder"
  | "arcane"
  | "elemental"
  | "cosmic"
  | "royal"
  | "tropical"
  | "bamboo";

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  rarity: ShopItemRarity;
  theme: ShopItemTheme;
  priceXp: number;
}

/** The shop's catalog — not database-backed (no admin surface to manage it
 * yet), only ownership is (see UserShopItem in prisma/schema.prisma and
 * src/lib/actions/xp-shop.ts's redeemShopItemAction). An item's `id` is
 * what's persisted on redemption, so treat these as stable identifiers —
 * changing one orphans any existing UserShopItem rows for it. */
export const XP_SHOP_ITEMS: ShopItem[] = [
  // Common
  { id: "daily-spark", name: "Daily Spark", description: "Tia sáng nhỏ mỗi khi bạn hoàn thành mục tiêu học tập trong ngày.", rarity: "COMMON", theme: "dawn", priceXp: 300 },
  { id: "morning-dew", name: "Morning Dew", description: "Khung avatar trong vắt như giọt sương sớm — khởi đầu nhẹ nhàng cho hành trình TOEIC.", rarity: "COMMON", theme: "dawn", priceXp: 600 },
  { id: "leaf-whisper", name: "Leaf Whisper", description: "Vài chiếc lá nhỏ khẽ bay quanh khung — bình yên như một buổi sáng ôn từ vựng.", rarity: "COMMON", theme: "verdant", priceXp: 900 },
  { id: "paper-plane", name: "Paper Plane", description: "Chiếc máy bay giấy bay vòng quanh khung — mỗi ngày học là một chuyến bay mới.", rarity: "COMMON", theme: "dawn", priceXp: 1000 },
  { id: "pebble-stream", name: "Pebble Stream", description: "Những viên sỏi suối và gợn nước lan nhẹ — kiên nhẫn mài giũa từng chút một.", rarity: "COMMON", theme: "aqua", priceXp: 1100 },
  { id: "sunny-petal", name: "Sunny Petal", description: "Hoa cúc nhỏ nở quanh khung, gật gù trong nắng — vui tươi như một buổi học suôn sẻ.", rarity: "COMMON", theme: "bloom", priceXp: 1200 },
  { id: "cloud-nap", name: "Cloud Nap", description: "Mây bồng bềnh trôi bên vầng trăng khuyết — nghỉ ngơi đúng lúc để học tốt hơn.", rarity: "COMMON", theme: "storm", priceXp: 1300 },
  { id: "first-star", name: "First Star", description: "Ngôi sao đầu tiên của buổi tối và một vệt sao băng — điều ước cho điểm số mơ ước.", rarity: "COMMON", theme: "cosmic", priceXp: 1500 },

  // Rare
  { id: "ocean-ring", name: "Ocean Ring", description: "Vòng sóng biển xanh mát, gợi nhắc sự bền bỉ như thủy triều không ngừng.", rarity: "RARE", theme: "aqua", priceXp: 2000 },
  { id: "storm-sail", name: "Storm Sail", description: "Cánh buồm vượt bão giữa biển ngữ pháp — không gì cản được bạn tiến lên.", rarity: "RARE", theme: "storm", priceXp: 2000 },
  { id: "spark-trail", name: "Spark Trail", description: "Vệt lửa nhỏ bám theo mỗi câu trả lời đúng — động lực không bao giờ tắt.", rarity: "RARE", theme: "ember", priceXp: 2400 },
  { id: "moonlit-path", name: "Moonlit Path", description: "Ánh trăng dẫn lối những buổi ôn bài khuya — im lặng mà kiên định.", rarity: "RARE", theme: "cosmic", priceXp: 2600 },
  { id: "bamboo-serenity", name: "Bamboo Serenity", description: "Khu vườn tre tĩnh lặng, lá tre khẽ rơi quanh khung — tâm trí an yên trước mọi kỳ thi.", rarity: "RARE", theme: "bamboo", priceXp: 2800 },
  { id: "honey-hive", name: "Honey Hive", description: "Tổ ong vàng óng, chú ong chăm chỉ bay vòng quanh — ngọt ngào thành quả của sự cần mẫn.", rarity: "RARE", theme: "dawn", priceXp: 3000 },
  { id: "coral-reef", name: "Coral Reef", description: "Rạn san hô rực rỡ, chú cá nhỏ bơi vòng qua những bọt nước — đại dương kiến thức vô tận.", rarity: "RARE", theme: "aqua", priceXp: 3100 },
  { id: "lantern-night", name: "Lantern Night", description: "Những chiếc đèn lồng giấy bay lên trời đêm — gửi theo mọi mục tiêu bạn đang theo đuổi.", rarity: "RARE", theme: "ember", priceXp: 3200 },

  // Epic
  { id: "ember-crown", name: "Ember Crown", description: "Forged in relentless grind. The ring that burns.", rarity: "EPIC", theme: "ember", priceXp: 3500 },
  { id: "coconut-breeze", name: "Coconut Breeze", description: "Làn gió nhiệt đới mát rượi giữa rừng dừa đung đưa — thư giãn mà tràn đầy năng lượng.", rarity: "EPIC", theme: "tropical", priceXp: 3800 },
  { id: "riptide-ring", name: "Riptide Ring", description: "Dòng hải lưu xoáy quanh khung — cuốn phăng mọi nghi ngờ trên đường chinh phục TOEIC.", rarity: "EPIC", theme: "aqua", priceXp: 4200 },
  { id: "verdant-blade", name: "Verdant Blade", description: "Lưỡi kiếm phủ rêu xanh giữa vòng lá rừng — đơn giản mà uy lực, bền bỉ như gốc cây cổ thụ.", rarity: "EPIC", theme: "verdant", priceXp: 4400 },
  { id: "frost-halo", name: "Frost Halo", description: "Ice-cold precision. Every answer is inevitable.", rarity: "EPIC", theme: "frost", priceXp: 5000 },
  { id: "sakura-shrine", name: "Sakura Shrine", description: "Khung cổng torii giữa mưa hoa anh đào — phong cách Đông Phương cổ kính đầy mê hoặc.", rarity: "EPIC", theme: "bloom", priceXp: 5000 },
  { id: "shadow-horns", name: "Shadow Horns", description: "Vương miện sừng tím với pha lê lơ lửng — bí ẩn, uy nghi, không thể rời mắt.", rarity: "EPIC", theme: "shadow", priceXp: 5000 },
  { id: "crystal-cavern", name: "Crystal Cavern", description: "Cụm thạch anh tím mọc quanh khung, mảnh pha lê lơ lửng lấp lánh — tri thức kết tinh qua năm tháng.", rarity: "EPIC", theme: "arcane", priceXp: 5500 },

  // Legendary
  { id: "royal-ascension", name: "Royal Ascension", description: "Vương miện vàng kim lấp lánh trên khung — vinh quang dành cho nhà vô địch TOEIC thực thụ.", rarity: "LEGENDARY", theme: "royal", priceXp: 18000 },
  { id: "glacier-crown", name: "Glacier Crown", description: "Băng hà ngàn năm kết tinh thành vương miện — lạnh lùng và bất khả xâm phạm.", rarity: "LEGENDARY", theme: "frost", priceXp: 13000 },
  { id: "devil-headset", name: "Devil Headset", description: "Tai nghe ác ma đỏ thẫm với sừng nhọn và chiếc đuôi cong — năng lượng nổi loạn của kẻ không bao giờ bỏ cuộc.", rarity: "LEGENDARY", theme: "shadow", priceXp: 15000 },
  { id: "thunder-crest", name: "Thunder Crest", description: "Vòng giáp vàng đen cùng những tia sét tím xé toạc bóng tối — biểu tượng của nhà vô địch thực thụ.", rarity: "LEGENDARY", theme: "thunder", priceXp: 15000 },
  { id: "elemental-clash", name: "Elemental Clash", description: "Nửa vòng băng giá, nửa vòng lửa cháy hòa quyện đối nghịch — sự cân bằng giữa lý trí và đam mê.", rarity: "LEGENDARY", theme: "elemental", priceXp: 15000 },
  { id: "emerald-wand-aura", name: "Emerald Wand Aura", description: "Cây đũa phép cổ tỏa luồng khói xanh ngọc lục bảo thành vòng tròn huyền bí — phép thuật của tri thức.", rarity: "LEGENDARY", theme: "arcane", priceXp: 15000 },
  { id: "phoenix-ember", name: "Phoenix Ember", description: "Tro tàn hồi sinh thành lửa thiêng — mỗi lần vấp ngã là một lần bùng cháy mạnh mẽ hơn.", rarity: "LEGENDARY", theme: "ember", priceXp: 16500 },
  { id: "voidwalker", name: "Voidwalker", description: "Bước qua hư không, mang theo bóng tối tuyệt đối — chỉ dành cho kẻ không còn gì để sợ.", rarity: "LEGENDARY", theme: "shadow", priceXp: 17500 },

  // Mythic
  { id: "aurora-genesis", name: "Aurora Genesis", description: "Cực quang huyền thoại hiếm khi xuất hiện — chỉ dành cho những học viên kiên trì nhất.", rarity: "MYTHIC", theme: "cosmic", priceXp: 30000 },
  { id: "solar-flare", name: "Solar Flare", description: "Vành nhật hoa rực cháy xoay quanh khung, tia lửa mặt trời bùng lên — năng lượng không bao giờ cạn.", rarity: "MYTHIC", theme: "ember", priceXp: 32000 },
  { id: "abyssal-tide", name: "Abyssal Tide", description: "Xoáy nước biển sâu cuộn quanh khung cùng những chú sứa phát sáng — bí ẩn và cuốn hút.", rarity: "MYTHIC", theme: "aqua", priceXp: 33000 },
  { id: "eternal-bloom", name: "Eternal Bloom", description: "Đóa hoa không bao giờ tàn — biểu tượng của những nỗ lực bền bỉ không ngừng nghỉ.", rarity: "MYTHIC", theme: "bloom", priceXp: 35000 },
  { id: "galaxy-core", name: "Galaxy Core", description: "Thiên hà xoắn ốc chầm chậm quay sau khung, muôn vì sao lấp lánh — cả vũ trụ trong tầm tay.", rarity: "MYTHIC", theme: "cosmic", priceXp: 38000 },
  { id: "starforged-halo", name: "Starforged Halo", description: "Rèn nên từ bụi sao ngoài thiên hà — vinh quang tối thượng dành cho huyền thoại TOEIC.", rarity: "MYTHIC", theme: "cosmic", priceXp: 40000 },
  { id: "divine-wings", name: "Divine Wings", description: "Đôi cánh thiên thần viền vàng vỗ nhẹ, vầng hào quang lơ lửng — thăng hoa sau mọi nỗ lực.", rarity: "MYTHIC", theme: "royal", priceXp: 42000 },
  { id: "celestial-dragon", name: "Celestial Dragon", description: "Rồng thiên giới ngọc bích uốn mình quanh khung, đuổi theo viên ngọc sáng giữa mây trời — đỉnh cao huyền thoại.", rarity: "MYTHIC", theme: "thunder", priceXp: 45000 },
];

export function getShopItemStatus(userXp: number, priceXp: number): { canAfford: boolean; missingXp: number } {
  return { canAfford: userXp >= priceXp, missingXp: Math.max(0, priceXp - userXp) };
}
