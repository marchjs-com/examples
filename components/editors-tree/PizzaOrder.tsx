// PizzaOrder: the creative-minimal TreeEditor example.
//
// What it shows: a pizza order as a JSON tree. Add, delete and change the toppings in the tree; the card above draws the
// pizza from the value with an emoji per topping.
// When to use this pattern: editing a small structured value without writing a form. A schema adds rules: the size must
// be one of three, and at most five toppings (rows that break a rule are marked).
// Keyboard: arrows move between rows, Enter edits a value, + / Insert adds, Delete removes, Ctrl+Z undoes.
import { TreeEditor, Card } from "march/ui"

// An emoji per topping name; a name that is not listed shows a question mark.
const EMOJI: Record<string, string> = { mantar: "🍄", zeytin: "🫒", biber: "🌶️", domates: "🍅", mısır: "🌽", peynir: "🧀" }
type Pizza = { size?: string; toppings?: unknown[]; extraCheese?: boolean }

// $order is the JSON value (bound to the editor); $p and $face are derived from it, so the card follows every edit.
export function PizzaOrder() {
  let $order: unknown = { size: "orta", toppings: ["mantar", "zeytin", "biber"], extraCheese: true }
  const $p = ($order ?? {}) as Pizza
  const $face = [...($p.toppings ?? []).map((t) => EMOJI[String(t).toLowerCase()] ?? "❔"), ...($p.extraCheese ? ["🧀"] : [])].join(" ")
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The pizza card: m:theme="night" draws it in the dark theme. */}
    <Card m:theme="night">
      <div sx={{ flex: ["row", "center", "between"] }}>
        <span sx={{ text: "xl" }}>{`🍕 ${$face}`}</span>
        <span sx={{ text: "sm", color: "brand-orange" }}>{`${$p.size ?? "?"} boy`}</span>
      </div>
    </Card>
    {/* bind:value: the editor changes $order; search={false} hides the search box (the tree is small); expand={2} opens two
            levels; label names the tree; history adds the undo / redo buttons; schema: size must be one of the three words,
            toppings is a list of strings with at most five items. */}
    <TreeEditor bind:value={$order} search={false} expand={2} label="Pizza siparişi" history
      schema={{ type: "object", properties: { size: { enum: ["küçük", "orta", "büyük"] }, toppings: { type: "array", items: { type: "string" }, maxItems: 5 } } }} />
  </div>
}
