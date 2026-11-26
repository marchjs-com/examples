// CoffeeSize: the creative-minimal ChoicePicker example.
//
// What it shows: pick a coffee size. Three short options turn into a segmented control by themselves (kind="auto"), the cup
// grows with the chosen size and the price follows.
// When to use this pattern: a few short, mutually exclusive choices. You write only `options` and `bind:value`; the
// picker decides how to draw them (and would become chips or a combobox if the list grew).
// Accessibility: the result is a radio group named by aria-label.
import { ChoicePicker } from "march/ui"
import { Icon, coffee } from "march/icons"

// Each option has a value, a label (the visible text) and extra data (price, text size) that the picker ignores and
// the example reads back below. `as const` keeps the literal values for the lookup.
const sizes = [
  { value: "sm", label: "Küçük", price: 60, text: "md" },
  { value: "md", label: "Orta", price: 75, text: "xl" },
  { value: "lg", label: "Büyük", price: 90, text: "2xl" },
] as const

export function CoffeeSize() {
  let $size = "md"
  // The data of the chosen size; falls back to the middle one.
  const cup = () => sizes.find((s) => s.value === $size) ?? sizes[1]
  return <div sx={{ flex: ["row", "center"], gap: 3 }}>
    <ChoicePicker aria-label="Kahve boyu" bind:value={$size} options={sizes} />
    <span sx={{ text: cup().text, color: "brand-orange" }}><Icon of={coffee} /></span>
    <span sx={{ text: "bold" }}>{cup().price} ₺</span>
  </div>
}
