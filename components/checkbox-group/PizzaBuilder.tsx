import { CheckboxGroup, Card } from "march/ui"

// pizza ustası: her malzeme kendi HADİ renginde bir çip; seçtikçe fiyat ve dilimdeki malzemeler değişir
const toppings = [
  { value: "mantar", label: "Mantar", meta: 15 }, { value: "zeytin", label: "Zeytin", meta: 10 },
  { value: "sucuk", label: "Sucuk", meta: 25 }, { value: "biber", label: "Biber", meta: 10 }, { value: "mısır", label: "Mısır", meta: 8 },
]

export function PizzaBuilder() {
  let $picked = ["mantar", "sucuk"]
  const $price = 180 + toppings.filter((t) => $picked.includes(t.value)).reduce((sum, t) => sum + t.meta, 0)
  return <Card title="Pizzanı yap" subtitle="Hamur ve peynir 180 ₺">
    <div sx={{ flex: "col", gap: 3 }}>
      <CheckboxGroup bind:value={$picked} variant="chip" colors="brand" inline options={toppings.map((t) => ({ value: t.value, label: t.label }))} aria-label="Malzemeler" />
      <span sx={{ text: "xl", color: "brand-orange" }}>{$picked.length ? `🍕 ${$picked.join(" · ")}` : "🍕 Sade margarita"}</span>
      <strong sx={{ text: "lg" }}>Toplam: {$price} ₺</strong>
    </div>
  </Card>
}
