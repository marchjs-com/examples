import { NavSidebar } from "march/ui"

// bir oyunun yan menüsü: altın ve görevler canlı rozetlerde; günlük ödülü almak altını artırır, rozeti söndürür
export function QuestMenu() {
  let $gold = 120
  let $gift = true
  let $quests = 3
  let $place = "Harita"
  const go = (label: string) => () => { $place = label }
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    <NavSidebar title="🐉 Ejder Vadisi" subtitle={`${$gold} altın`} search={false} recent={0} collapsible={false}
      hotkey={false} palette={false} storageKey="quest.menu" defaultOpen="all" groupOrder="none" itemOrder="none"
      featured={[{ id: "gift", label: "Günlük ödül", icon: "🎁", badge: () => ($gift ? "hazır" : null), badgeTone: "primary",
        onSelect: () => { if ($gift) { $gold += 50; $gift = false } $place = "Ödül alındı" } }]}
      items={[
        { id: "map", label: "Harita", icon: "🗺️", group: "Dünya", onSelect: go("Harita") },
        { id: "quests", label: "Görevler", icon: "📜", group: "Dünya", badge: () => $quests, onSelect: () => { $quests = 0; $place = "Görevler" } },
        { id: "bag", label: "Çanta", icon: "🎒", group: "Kahraman", sub: "12 eşya", onSelect: go("Çanta") },
        { id: "skills", label: "Yetenekler", icon: "✨", group: "Kahraman", onSelect: go("Yetenekler") },
      ]} />
    <span sx={{ text: "xl" }}>{$place}</span>
  </div>
}
