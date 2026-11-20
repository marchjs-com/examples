import { RadioGroup, Card } from "march/ui"

// kahve boyu: segmented görünümde S / M / L; seçtikçe fincan büyür ve fiyat değişir
const sizes = { S: { text: "lg", price: 65 }, M: { text: "xl", price: 80 }, L: { text: "2xl", price: 95 } } as const

export function CoffeeSize() {
  let $size = "M"
  const $cup = sizes[$size as keyof typeof sizes]
  return <Card title="Filtre kahve">
    <div sx={{ flex: ["row", "between", "center"], gap: 3 }}>
      <RadioGroup bind:value={$size} variant="segmented" options="S, M, L" aria-label="Boy" />
      <span sx={{ text: $cup.text }}>☕</span>
      <strong sx={{ text: "lg", color: "brand-orange" }}>{$cup.price} ₺</strong>
    </div>
  </Card>
}
