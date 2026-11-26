// BillSplit: the real-life NumberInput example.
//
// Split the bill: the amount, the tip and the number of people are three number fields, and the amount per person is
// calculated at once. It shows prefix / suffix text, decimals, thousands grouping, min / max limits and the step of the
// arrow keys. Use this pattern for any small calculator where several numbers feed one result.
import { NumberInput, Card } from "march/ui"

export function BillSplit() {
  // Reactive numbers. A NumberInput's value is a number or null (when the field is empty), so the formula below
  // falls back to 0 / 1 with `??` and never produces NaN.
  let $bill = 1240
  let $tip = 10
  let $people = 4
  // A value computed from the signals above: it is recalculated whenever one of them changes.
  const $each = (($bill ?? 0) * (1 + ($tip ?? 0) / 100)) / Math.max(1, $people ?? 1)
  // m:theme="night" on the Card makes the card and the fields inside use the dark theme tokens.
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 2 }}>
      {/* The bill: prefix puts the currency sign before the number; decimals={2} and minDecimals={2} always show two
          digits; grouping adds thousands separators while the field is not being edited; min={0} blocks negatives
          (the limit is applied when the field is left). aria-label names the field for screen readers. */}
      <NumberInput bind:value={$bill} prefix="₺" decimals={2} minDecimals={2} grouping min={0} aria-label="Hesap" />
      {/* Tip and people: suffix puts a unit after the number; step is how much ArrowUp / ArrowDown change the value
          (5 for the tip, the default 1 for people); min / max keep the values in range; decimals={0} means whole
          numbers. Typing and the arrow keys both work. */}
      <div sx={{ flex: "row", gap: 2 }}>
        <NumberInput bind:value={$tip} suffix="%" min={0} max={30} step={5} decimals={0} aria-label="Bahşiş" />
        <NumberInput bind:value={$people} suffix="kişi" min={1} max={20} decimals={0} aria-label="Kişi sayısı" />
      </div>
      <span sx={{ text: ["xl", "bold"], color: "brand-gold" }}>Kişi başı ₺{$each.toFixed(2)}</span>
    </div>
  </Card>
}
