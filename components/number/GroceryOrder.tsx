// GroceryOrder: the real-life NumberInput example.
//
// A greengrocer's order form: each product is bought by the kilo in half-kilo steps, at most 10 kg each (a bigger
// number drops to 10 when you leave the field), and the total updates live. It shows a one-way `value` with onChange
// (instead of bind:value) for a list of fields, plus the locale prop. Use this pattern when many number fields live
// in one array.
import { NumberInput, Field, Button, Card, toast } from "march/ui"
import { shoppingBag } from "march/icons"

const items = [
  { name: "Domates", price: 34.9 },
  { name: "Salatalık", price: 29.5 },
  { name: "Çilek", price: 89 },
]
type Maybe<T> = T | null | undefined

export function GroceryOrder() {
  // One reactive array: the kilos of each product, in the order of `items`.
  let $kg = [1.5, 1, 0]
  // Returns the onChange handler for product i. A cleared field gives null / undefined, which counts as 0. A
  // bind:value cannot be used on an array element in a loop, so the value goes in and the change comes back out.
  const setKg = (i: number) => (v: Maybe<number>) => { $kg = $kg.map((x, j) => (j === i ? v ?? 0 : x)) }
  const $total = items.reduce((sum, it, i) => sum + it.price * ($kg[i] ?? 0), 0)
  const order = () => toast(`Sipariş alındı: ₺${$total.toFixed(2)}`, { kind: "success" })
  return <Card title="Manav" subtitle="Bugün bahçeden">
    <div sx={{ flex: "col", gap: 2 }}>
      {/* One Field per product: it draws the visible label and links it to the input for screen readers.
          - value / onChange: the field shows $kg[i] and reports edits through setKg.
          - suffix="kg": the unit after the number. decimals={1}: one digit after the comma.
          - step={0.5}: ArrowUp / ArrowDown move by half a kilo. min / max: the value is clamped to 0..10 when the field
            is left and by the arrow keys.
          - locale="tr-TR": numbers are written and read the Turkish way (comma as the decimal mark), and both "1,5"
            and "1.5" are understood when typing. */}
      {items.map((it, i) => <Field label={`${it.name} · ₺${it.price.toFixed(2)} / kg`}>
        <NumberInput value={$kg[i]} onChange={setKg(i)} suffix="kg" decimals={1} step={0.5} min={0} max={10} locale="tr-TR" />
      </Field>)}
      <div sx={{ flex: ["row", "between", "center"] }}>
        <span sx={{ text: ["lg", "bold"] }}>Toplam ₺{$total.toFixed(2)}</span>
        {/* The button turns itself off while the basket is empty (disabled follows the total). The toast confirming
            the order follows the motion engine like all component motion (reduced motion, global speed, "Stop all"). */}
        <Button variant="primary" icon={shoppingBag} disabled={$total === 0} on:click={order}>Sipariş ver</Button>
      </div>
    </div>
  </Card>
}
