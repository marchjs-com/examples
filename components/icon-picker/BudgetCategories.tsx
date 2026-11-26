// BudgetCategories: the real-life IconPicker example.
//
// What it shows: settings of a budget app. Each spending category has an icon that can be changed with a picker button; the
// Save button is enabled once something has changed.
// When to use this pattern: one picker per row. Keep each row's own value in the row, and report changes upward with a
// callback so the parent can enable Save.
// Here the picker uses the full built-in catalogue; the value is the icon's name as text (for example a category's icon),
// and the panel has a search field.
// Keyboard: Tab reaches the search, the chips and the grid; Enter or Space chooses; Escape closes the panel.
import { IconPicker, Card, Button, toast } from "march/ui"
import { save } from "march/icons"

// Each category has a name and the name of its icon (the picker's value is an icon name).
const categories = [
  { name: "Market", icon: "shoppingBag" },
  { name: "Ulaşım", icon: "truck" },
  { name: "Kahve", icon: "coffee" },
  { name: "Faturalar", icon: "receipt" },
  { name: "Hediyeler", icon: "gift" },
]

// One row: the name on the left, the picker on the right. The row keeps its own icon state and tells the parent through onPick.
const CategoryRow = (props: { name: string; icon: string; onPick: (name: string, icon: string | null) => void }) => {
  // The row's own icon name.
  let $icon: string | null = props.icon
  return <div sx={{ flex: ["row", "between", "center"], gap: 2 }}>
    <span sx={{ text: "bold" }}>{props.name}</span>
    {/* value / onChange: the name chosen. label: the accessible name of the button (includes the category, so each button
        differs). placeholder: the hint of the search field. */}
    <IconPicker value={$icon} onChange={(n: string | null) => { $icon = n; props.onPick(props.name, n) }} label={`${props.name} ikonu`} placeholder="İkon ara" />
  </div>
}

export function BudgetCategories() {
  // The names of the categories whose icon was changed.
  let $changed: string[] = []
  // Remember a changed category once.
  const picked = (name: string) => { if (!$changed.includes(name)) $changed = [...$changed, name] }
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ text: ["lg", "bold"] }}>Harcama kategorileri</span>
      {categories.map((c) => <CategoryRow name={c.name} icon={c.icon} onPick={picked} />)}
      <div sx={{ flex: ["row", "end"] }}>
        {/* Disabled until something changed; saving shows a toast and clears the list. */}
        <Button variant="primary" icon={save} disabled={$changed.length === 0} on:click={() => { toast(`${$changed.length} kategori kaydedildi`); $changed = [] }}>Kaydet</Button>
      </div>
    </div>
  </Card>
}
