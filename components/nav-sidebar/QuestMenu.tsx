// QuestMenu: the creative-minimal NavSidebar example.
//
// The side menu of a game: gold and quests are live badges, and claiming the daily reward raises the gold and clears
// its badge. It also shows how small NavSidebar can be made by switching parts off: no search, no recent list, no
// rail. Use this pattern for a short fixed menu where the items do things (onSelect) and emoji work as icons.
import { NavSidebar } from "march/ui"

export function QuestMenu() {
  // Reactive state: gold (shown in the subtitle), whether the gift is still unclaimed, quest count, current place.
  let $gold = 120
  let $gift = true
  let $quests = 3
  let $place = "Harita"
  // Builds an onSelect handler that just changes the place shown on the right.
  const go = (label: string) => () => { $place = label }
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    {/* - subtitle={`${$gold} ...`}: reading $gold here makes the subtitle update when gold changes.
        - search={false}, recent={0}, collapsible={false}: no search box, no "recent" block and no icon rail: a lean
          menu. hotkey={false} and palette={false}: no keyboard shortcut and no command palette entries.
        - defaultOpen="all": every category starts open. groupOrder="none" / itemOrder="none": keep the order we
          wrote instead of sorting alphabetically (the story reads from the map to the hero).
        - storageKey: where this menu's UI state would be saved in localStorage.
        - featured: the gift item sits above the categories. Its badge is a function: it shows the text while the
          gift is unclaimed and null (no badge) afterwards. badgeTone colours the badge.
        - items: `icon` takes an emoji string as well as an icon; `sub` is a second line; `badge={() => $quests}` is
          a live count that the quests item resets to zero when chosen. */}
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
