import { IconPicker, Card, Button, toast } from "march/ui"
import { save } from "march/icons"

// bütçe uygulamasının ayarları: her harcama kategorisinin ikonu düğmeden değiştirilir, sonra kaydedilir
const categories = [
  { name: "Market", icon: "shoppingBag" },
  { name: "Ulaşım", icon: "truck" },
  { name: "Kahve", icon: "coffee" },
  { name: "Faturalar", icon: "receipt" },
  { name: "Hediyeler", icon: "gift" },
]

// bir kategori satırı: adı solda, ikonu sağda
const CategoryRow = (props: { name: string; icon: string; onPick: (name: string, icon: string | null) => void }) => {
  let $icon: string | null = props.icon
  return <div sx={{ flex: ["row", "between", "center"], gap: 2 }}>
    <span sx={{ text: "bold" }}>{props.name}</span>
    <IconPicker value={$icon} onChange={(n: string | null) => { $icon = n; props.onPick(props.name, n) }} label={`${props.name} ikonu`} placeholder="İkon ara" />
  </div>
}

export function BudgetCategories() {
  let $changed: string[] = []
  const picked = (name: string) => { if (!$changed.includes(name)) $changed = [...$changed, name] }
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ text: ["lg", "bold"] }}>Harcama kategorileri</span>
      {categories.map((c) => <CategoryRow name={c.name} icon={c.icon} onPick={picked} />)}
      <div sx={{ flex: ["row", "end"] }}>
        <Button variant="primary" icon={save} disabled={$changed.length === 0} on:click={() => { toast(`${$changed.length} kategori kaydedildi`); $changed = [] }}>Kaydet</Button>
      </div>
    </div>
  </Card>
}
