import { ChoicePicker } from "march/ui"
import { Icon, coffee } from "march/icons"

// kahve boyu: üç kısa seçenek kendiliğinden segmented olur; fincan seçilen boya göre büyür, fiyat da değişir
const sizes = [
  { value: "sm", label: "Küçük", price: 60, text: "md" },
  { value: "md", label: "Orta", price: 75, text: "xl" },
  { value: "lg", label: "Büyük", price: 90, text: "2xl" },
] as const

export function CoffeeSize() {
  let $size = "md"
  const cup = () => sizes.find((s) => s.value === $size) ?? sizes[1]
  return <div sx={{ flex: ["row", "center"], gap: 3 }}>
    <ChoicePicker aria-label="Kahve boyu" bind:value={$size} options={sizes} />
    <span sx={{ text: cup().text, color: "brand-orange" }}><Icon of={coffee} /></span>
    <span sx={{ text: "bold" }}>{cup().price} ₺</span>
  </div>
}
