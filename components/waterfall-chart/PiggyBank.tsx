import { WaterfallChart } from "march/charts"
import { Button } from "march/ui"

// A piggy bank: a playful, minimal WaterfallChart.
// It starts with what is already in the bank, then every step is pocket money in (up) or an ice cream out (down); the
// last column is what is left now. Each button adds a step, and the new bar floats out of the end of the previous one;
// "Geri al" (undo) removes the last step and its bar shrinks back to where it started.
// Use a waterfall when the story is how a start value became an end value through ups and downs (cash, stock, points).

export function PiggyBank() {
  // The steps as { label, value } rows: these are the chart's default x / y keys, so no x / y props are needed.
  let $steps: { label: string; value: number }[] = [{ label: "Harçlık", value: 100 }, { label: "Dondurma", value: -15 }]
  // Appends a step. The step number in the label keeps every column's label unique, which also keeps each bar's
  // identity stable, so only the new bar animates in. A new array is assigned, so the signal notices the change.
  const add = (label: string, value: number) => { $steps = [...$steps, { label: `${label} ${$steps.length + 1}`, value }] }
  // WaterfallChart props:
  // - data={() => $steps}: a function reading the signal, so the chart follows every added or removed step.
  // - start={20} + startLabel="Kumbara": the bank's opening amount, drawn as the first column from zero.
  // - totals="end" + totalLabel: a total column at the end, labelled "now", that always shows the running sum.
  // - format: money in TRY, used by the bar labels, the tooltip and the hidden data table.
  // - No `animate` prop: the default spring. Bars build one after another on the first draw, a new bar floats out of the
  //   previous one's end, a removed bar shrinks back before it goes. Set animate={false} to draw in place, or an easing
  //   name like "bounce"; reduced motion is honoured automatically.
  // - title: the SVG's accessible name.
  // Keyboard: Tab focuses the chart, ← → move between columns, Enter / Space selects, Escape clears; the tooltip shows
  // the change and the running total.
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* Pocket money in (+50) and an ice cream out (−15); the third button undoes the last step. */}
      <Button size="sm" on:click={() => add("Harçlık", 50)}>Harçlık +50 🪙</Button>
      <Button size="sm" variant="secondary" on:click={() => add("Dondurma", -15)}>Dondurma −15 🍦</Button>
      <Button size="sm" variant="ghost" on:click={() => { $steps = $steps.slice(0, -1) }}>Geri al</Button>
    </div>
    <WaterfallChart data={() => $steps} start={20} startLabel="Kumbara" totals="end" totalLabel="Şimdi" format={["money", "TRY"]}
      title="Kumbara" height={240} />
  </div>
}
