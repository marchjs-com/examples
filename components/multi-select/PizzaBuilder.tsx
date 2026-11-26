// PizzaBuilder: the real-life MultiSelect example.
//
// Build your own pizza: every topping you add raises the price, and each option shows its price as a hint. This is the
// pattern for "pick several things that each cost something": a MultiSelect for the choice, a derived total next to it.
// Use it when the user builds a bundle (toppings, add-ons, features) and should see the cost change at once.
import { MultiSelect, Field } from "march/ui"

// Options with `hint`: the hint is small text on the option's row in the dropdown. The price is kept in the hint text
// so the data stays in one place; price() below reads the number back out of it.
const toppings = [
  { value: "mantar", label: "Mantar", hint: "+15 ₺" }, { value: "sucuk", label: "Sucuk", hint: "+25 ₺" },
  { value: "zeytin", label: "Zeytin", hint: "+10 ₺" }, { value: "biber", label: "Közlenmiş biber", hint: "+12 ₺" },
  { value: "mozzarella", label: "Ekstra mozzarella", hint: "+20 ₺" }, { value: "ananas", label: "Ananas", hint: "+18 ₺" },
]
// Keep only the digits of the hint ("+15 gives 15"); an unknown value counts as 0.
const price = (v: string) => Number(toppings.find((t) => t.value === v)?.hint.replace(/\D/g, "") ?? 0)

export function PizzaBuilder() {
  // Reactive array of picked values; bind:value below keeps it in sync with the chips in both directions.
  let $picked = ["mozzarella"]
  // A plain function that reads $picked: calling it inside JSX makes the total update whenever the chips change.
  const total = () => 180 + $picked.reduce((sum, v) => sum + price(v), 0)
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Field gives the input its visible label and connects it for screen readers. Chips can be removed with their
        button or with Backspace in the empty field (see the MultiSelect docs). */}
    <Field label="Malzemeler"><MultiSelect bind:value={$picked} options={toppings} placeholder="Malzeme ekle" /></Field>
    <span sx={{ text: ["xl", "bold"], color: "brand-orange" }}>Toplam: {total()} ₺</span>
  </div>
}
