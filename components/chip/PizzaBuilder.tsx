import { Chip, Card } from "march/ui"
import { heart } from "march/icons"

// pizzanı yap: her malzeme bir aç / kapa çip; seçilenin tiki yerine kalp çıkar, fiyat kendiliğinden toplanır
const toppings = [
  { name: "🍄 Mantar", price: 15 },
  { name: "🫒 Zeytin", price: 10 },
  { name: "🌶️ Biber", price: 8 },
  { name: "🧀 Ekstra peynir", price: 25 },
  { name: "🍍 Ananas", price: 20 },
]

export function PizzaBuilder() {
  let $picked = new Set(["🧀 Ekstra peynir"])
  const $total = 120 + toppings.filter((t) => $picked.has(t.name)).reduce((sum, t) => sum + t.price, 0)
  const toggle = (name: string) => { const n = new Set($picked); if (n.has(name)) n.delete(name); else n.add(name); $picked = n }
  return <Card title="Pizzanı yap" subtitle="Margarita tabanı · ₺120" m:color="brand-orange">
    <div sx={{ flex: ["row", "wrap"], gap: 2, mb: 3 }}>
      {toppings.map((t) => <Chip selected={$picked.has(t.name)} selectedIcon={heart} onClick={() => toggle(t.name)}>{t.name}</Chip>)}
    </div>
    <span sx={{ text: ["xl", "bold"], color: "brand-orange" }}>{`Toplam ₺${$total}`}</span>
  </Card>
}
