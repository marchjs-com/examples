// LoanCalculator: the real-life Slider example.
//
// What it shows: a loan calculator. Two sliders (amount and term) feed a live monthly payment and total repayment, and the
// button submits the chosen values.
// When to use this pattern: a numeric choice in a range where the number itself matters (money, durations, quantities). The
// slider shows its value as formatted text, and a Field adds the visible label and a help line.
import { Slider, Field, Card, Button, toast } from "march/ui"

const rate = 0.0349 // monthly interest rate
// Formats a number as lira text, rounded and with the Turkish thousands separator.
const tl = (n: number) => `${Math.round(n).toLocaleString("tr-TR")} ₺`

export function LoanCalculator() {
  // `let $name` variables are March signals: bind:value writes them while the user drags. `const $monthly` is a derived
  // value: it is computed again whenever $amount or $months changes (the usual annuity formula), and so is everything that
  // shows it.
  let $amount = 100000
  let $months = 24
  const $monthly = $amount * rate / (1 - Math.pow(1 + rate, -$months))
  return <Card title="İhtiyaç kredisi" subtitle="Aylık %3,49 faiz">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* Field gives the Slider its visible label (the slider's accessible name) and a help line.
          Slider options used here:
          - bind:value: two-way binding with the signal. min, max, step: the range and the size of one step.
          - format: turns the number into the text shown next to the slider (here money); it only changes the text, the
            value stays a number.
          - track: the slider keeps its native range input (keyboard, forms, screen readers) but gets a drawn track: a ramp in
            the control's colour.
          - m:color: a common prop that sets the colour token of the control. */}
      <Field label="Tutar" help="10.000 ₺ ile 500.000 ₺ arası">
        <Slider bind:value={$amount} min={10000} max={500000} step={5000} format={tl} track m:color="brand-blue" />
      </Field>
      {/* The term slider: another range, with its format adding the unit. Being a native range input, it works with the
          arrow keys, Page Up / Down and Home / End. */}
      <Field label="Vade">
        <Slider bind:value={$months} min={3} max={36} step={3} format={(v: number) => `${v} ay`} m:color="brand-purple" />
      </Field>
      <div sx={{ flex: ["row", "between", "center"] }}>
        <div sx={{ flex: "col" }}>
          <strong sx={{ text: "xl" }}>{tl($monthly)} / ay</strong>
          <span sx={{ text: "sm", color: "muted" }}>Toplam geri ödeme: {tl($monthly * $months)}</span>
        </div>
        <Button variant="primary" on:click={() => toast(`Başvuru alındı: ${tl($amount)}, ${$months} ay`)}>Başvur</Button>
      </div>
    </div>
  </Card>
}
