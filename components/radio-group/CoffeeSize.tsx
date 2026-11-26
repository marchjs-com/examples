// CoffeeSize: the creative-minimal RadioGroup example.
//
// What it shows: three joined buttons (S / M / L) in the segmented look. Choosing a size changes the size of the cup
// and the price next to it. When to use this pattern: a small, always-visible choice whose result shows at once.
//
// Keyboard and accessibility: the group is a radiogroup of native radios sharing one name; arrow keys move and
// select inside the group, Tab leaves it. aria-label names the group because there is no visible label.

import { RadioGroup, Card } from "march/ui"

// For each size: the text size of the cup and its price. The keys are the option values.
const sizes = { S: { text: "lg", price: 65 }, M: { text: "xl", price: 80 }, L: { text: "2xl", price: 95 } } as const

export function CoffeeSize() {
  // The chosen size; bind:value below keeps it in step with the group.
  let $size = "M"
  // A computed value (it reads $size): it is worked out again whenever the size changes.
  const $cup = sizes[$size as keyof typeof sizes]
  return <Card title="Filtre kahve">
    <div sx={{ flex: ["row", "between", "center"], gap: 3 }}>
      {/* variant="segmented": joined buttons; options="S, M, L": a comma-separated text, each part is a value and its
          label. */}
      <RadioGroup bind:value={$size} variant="segmented" options="S, M, L" aria-label="Boy" />
      <span sx={{ text: $cup.text }}>☕</span>
      <strong sx={{ text: "lg", color: "brand-orange" }}>{$cup.price} ₺</strong>
    </div>
  </Card>
}
