import { SectionLabel, Button } from "march/ui"

// meyve sepeti: her meyve düğmesi sepete ekler; etiketin sayısı canlı, çizgi satırı doldurur, boşalt sonda eylem yuvasında
const fruits = ["🍓", "🍌", "🍑", "🍇"]

export function FruitBasket() {
  let $basket: string[] = []
  return <div sx={{ flex: "col", gap: 2 }}>
    <SectionLabel icon="🧺" count={$basket.length} rule m:color="brand-orange"
      actions={<Button size="sm" variant="link" on:click={() => $basket = []}>Boşalt</Button>}>Sepetim</SectionLabel>
    <div sx={{ text: "2xl" }}>{$basket.length ? $basket.join(" ") : "…"}</div>
    <div sx={{ flex: "row", gap: 1 }}>
      {fruits.map((f) => <Button variant="ghost" on:click={() => $basket = [...$basket, f]}>{f}</Button>)}
    </div>
  </div>
}
