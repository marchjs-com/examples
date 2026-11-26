// PizzaBuilder: the creative-minimal CheckboxGroup example.
//
// What it shows: build a pizza. Every topping is a chip in its own brand colour (colors="brand"); the price and the
// list under the chips update as you pick.
// When to use this pattern: a short "pick any number" list where the picked items feed something else (a price, a
// preview, a filter). bind:value keeps the array and the chips in sync, so nothing else needs wiring.
// Keyboard / accessibility: each chip is a real checkbox (Tab, then Space); aria-label names the group. Box motion
// runs on the motion engine (reduced motion and "Stop all" apply; animate={false} turns it off).
import { CheckboxGroup, Card } from "march/ui"

// `meta` is the extra price of a topping. It is kept here, not in the options below, because the chips only need
// value + label; the price is computed from this table.
const toppings = [
  { value: "mantar", label: "Mantar", meta: 15 }, { value: "zeytin", label: "Zeytin", meta: 10 },
  { value: "sucuk", label: "Sucuk", meta: 25 }, { value: "biber", label: "Biber", meta: 10 }, { value: "mısır", label: "Mısır", meta: 8 },
]

export function PizzaBuilder() {
  let $picked = ["mantar", "sucuk"]
  // A derived price: base 180 plus the price of every picked topping; it recomputes whenever $picked changes.
  const $price = 180 + toppings.filter((t) => $picked.includes(t.value)).reduce((sum, t) => sum + t.meta, 0)
  return <Card title="Pizzanı yap" subtitle="Hamur ve peynir 180 ₺">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* variant="chip": pill-shaped options; colors="brand": each option gets the next brand colour; inline: one
          row that wraps; the options are mapped to { value, label } objects. */}
      <CheckboxGroup bind:value={$picked} variant="chip" colors="brand" inline options={toppings.map((t) => ({ value: t.value, label: t.label }))} aria-label="Malzemeler" />
      <span sx={{ text: "xl", color: "brand-orange" }}>{$picked.length ? `🍕 ${$picked.join(" · ")}` : "🍕 Sade margarita"}</span>
      <strong sx={{ text: "lg" }}>Toplam: {$price} ₺</strong>
    </div>
  </Card>
}
