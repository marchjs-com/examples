// DonationGoal: the real-life Counter example.
//
// What it shows: a donation campaign. The amount raised rolls like an odometer (mode="roll") and is formatted as a
// currency; a second Counter shows the share of the goal as a percentage. Each donation button adds to the total and
// thanks the donor with a toast.
// When to use this pattern: numbers that matter and change live (totals, prices, progress). `format` takes
// Intl.NumberFormat options, so currency, percent and compact forms follow the visitor's locale without any code of
// your own. Pass `value` as a function so the counter follows the state.
// Animation: runs on the motion engine; reduced motion shows the value at once. Screen readers read the final value, not
// the moving digits.
import { Counter } from "march/landing"
import { Button, Card, toast } from "march/ui"
import { heart } from "march/icons"

const GOAL = 250000

export function DonationGoal() {
  let $raised = 184350
  // Returns a click handler for a given amount: adds it and thanks the donor.
  const give = (n: number) => () => { $raised += n; toast(`${n} ₺ bağış için teşekkürler`) }
  return <Card>
    <div sx={{ flex: "col", gap: 3, p: 2 }}>
      <span sx={{ color: "muted" }}>Köy okuluna kütüphane kampanyası</span>
      {/* mode="roll": odometer digits (only the digits that change move). format: Turkish lira with no decimals. */}
      <Counter value={() => $raised} mode="roll" format={{ style: "currency", currency: "TRY", maximumFractionDigits: 0 }} class="raised" />
      {/* The share of the goal: a value from 0 to 1 formatted as a percent with one decimal; Math.min stops it at 100%. */}
      <span>Hedefin <Counter value={() => Math.min(1, $raised / GOAL)} format={{ style: "percent", maximumFractionDigits: 1 }} /> kadarı toplandı</span>
      <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
        <Button icon={heart} on:click={give(50)}>50 ₺</Button>
        <Button variant="secondary" on:click={give(250)}>250 ₺</Button>
        <Button variant="secondary" on:click={give(1000)}>1000 ₺</Button>
      </div>
    </div>
  </Card>
}
