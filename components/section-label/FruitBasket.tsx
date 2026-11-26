// FruitBasket: the creative-minimal SectionLabel example.
//
// What it shows: a fruit basket. Each fruit button adds that fruit to the basket; the label above it counts the fruits
// live, draws a line across the row and has a "empty it" button in its end slot.
// When to use this pattern: a small heading that also needs a live number and one quick action; the label is the only
// component involved besides the buttons.
import { SectionLabel, Button } from "march/ui"

const fruits = ["🍓", "🍌", "🍑", "🍇"]

export function FruitBasket() {
  // `let $basket` is a March signal holding the picked fruits: assigning a new array redraws the label count and the
  // basket line.
  let $basket: string[] = []
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* SectionLabel options used here:
        - icon="🧺": an emoji works as the icon (an icon from march/icons works too).
        - count: the number after the text; it is live, so it follows the basket.
        - rule: a thin line that fills the rest of the row after the text.
        - m:color="brand-orange": a common prop (it works on every component) that sets the colour token of the label
          and what is in it; the default is a faint neutral.
        - actions: the node at the end of the label, here a small link-style Button that empties the basket.
        The children are the text. */}
    <SectionLabel icon="🧺" count={$basket.length} rule m:color="brand-orange"
      actions={<Button size="sm" variant="link" on:click={() => $basket = []}>Boşalt</Button>}>Sepetim</SectionLabel>
    {/* The basket: the fruits joined by spaces, or an ellipsis while it is empty. */}
    <div sx={{ text: "2xl" }}>{$basket.length ? $basket.join(" ") : "…"}</div>
    {/* One ghost Button per fruit; pressing it appends that fruit. */}
    <div sx={{ flex: "row", gap: 1 }}>
      {fruits.map((f) => <Button variant="ghost" on:click={() => $basket = [...$basket, f]}>{f}</Button>)}
    </div>
  </div>
}
