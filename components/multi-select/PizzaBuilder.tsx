import { MultiSelect, Field } from "march/ui"

// kendi pizzanı yap: malzemeleri ekledikçe fiyat artar, her chip'in yanında fiyatı yazar
const toppings = [
  { value: "mantar", label: "Mantar", hint: "+15 ₺" }, { value: "sucuk", label: "Sucuk", hint: "+25 ₺" },
  { value: "zeytin", label: "Zeytin", hint: "+10 ₺" }, { value: "biber", label: "Közlenmiş biber", hint: "+12 ₺" },
  { value: "mozzarella", label: "Ekstra mozzarella", hint: "+20 ₺" }, { value: "ananas", label: "Ananas", hint: "+18 ₺" },
]
const price = (v: string) => Number(toppings.find((t) => t.value === v)?.hint.replace(/\D/g, "") ?? 0)

export function PizzaBuilder() {
  let $picked = ["mozzarella"]
  const total = () => 180 + $picked.reduce((sum, v) => sum + price(v), 0)
  return <div sx={{ flex: "col", gap: 2 }}>
    <Field label="Malzemeler"><MultiSelect bind:value={$picked} options={toppings} placeholder="Malzeme ekle" /></Field>
    <span sx={{ text: ["xl", "bold"], color: "brand-orange" }}>Toplam: {total()} ₺</span>
  </div>
}
