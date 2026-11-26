// PizzaBuilder: the creative-minimal Chip example.
//
// What it shows: build your pizza. Each topping is a toggle chip; a selected chip shows a heart instead of the default
// tick, and the total price adds up by itself.
// When to use this pattern: a small set of on / off options that should feel playful. selected + onClick makes a chip
// a toggle button (announced with aria-pressed); selectedIcon swaps the tick for your own mark.
// Keyboard: chips are real buttons (Tab, Enter / Space).
import { Chip, Card } from "march/ui"
import { heart } from "march/icons"

const toppings = [
  { name: "🍄 Mantar", price: 15 },
  { name: "🫒 Zeytin", price: 10 },
  { name: "🌶️ Biber", price: 8 },
  { name: "🧀 Ekstra peynir", price: 25 },
  { name: "🍍 Ananas", price: 20 },
]

export function PizzaBuilder() {
  // The selected toppings as a Set (replaced with a new Set on each toggle so the view updates).
  let $picked = new Set(["🧀 Ekstra peynir"])
  // A derived total: the base price plus the price of every selected topping.
  const $total = 120 + toppings.filter((t) => $picked.has(t.name)).reduce((sum, t) => sum + t.price, 0)
  const toggle = (name: string) => { const n = new Set($picked); if (n.has(name)) n.delete(name); else n.add(name); $picked = n }
  // m:color on the Card (a common prop) sets the colour token for the whole card, chips included.
  return <Card title="Pizzanı yap" subtitle="Margarita tabanı · ₺120" m:color="brand-orange">
    <div sx={{ flex: ["row", "wrap"], gap: 2, mb: 3 }}>
      {toppings.map((t) => <Chip selected={$picked.has(t.name)} selectedIcon={heart} onClick={() => toggle(t.name)}>{t.name}</Chip>)}
    </div>
    <span sx={{ text: ["xl", "bold"], color: "brand-orange" }}>{`Toplam ₺${$total}`}</span>
  </Card>
}
