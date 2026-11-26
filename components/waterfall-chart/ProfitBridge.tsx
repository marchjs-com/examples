import { WaterfallChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// A quarterly profit bridge: a real-life WaterfallChart.
// It walks from revenue to net profit: revenue goes up, cost of goods comes down, a gross-profit subtotal stands on the
// axis, then staff, marketing and tax come down to the net profit column at the end. A target line marks the goal.
// Picking another quarter swaps the numbers: the bars glide to their new lengths and the connectors follow.
// Use a profit bridge (a classic finance chart) when people ask "why is profit what it is?": every cost is visible
// as a step, in order, instead of hidden inside a single total.

// Revenue and costs per quarter, in TRY, in the order of NAMES (costs are negative). Replace with your own figures.
const QUARTERS: Record<string, number[]> = {
  q1: [640000, -238000, -96000, -71000, -42000],
  q2: [712000, -251000, -104000, -66000, -51000],
  q3: [598000, -226000, -99000, -88000, -34000],
}
// Column labels: revenue, cost of goods sold, staff, marketing, tax.
const NAMES = ["Gelir", "Satılan malın maliyeti", "Personel", "Pazarlama", "Vergi"]

export function ProfitBridge() {
  // `$q` is a signal: `rows` reads it, so the chart re-runs it whenever the quarter changes.
  let $q = "q1"
  // Builds the rows: the first two steps, then a subtotal row (`ara: true`, gross profit) which shows the
  // running total at that point (its own value is ignored), then the remaining costs.
  const rows = () => {
    const v = QUARTERS[$q]!
    return [{ kalem: NAMES[0], tutar: v[0] }, { kalem: NAMES[1], tutar: v[1] }, { kalem: "Brüt kâr", ara: true },
      ...v.slice(2).map((tutar, i) => ({ kalem: NAMES[i + 2], tutar }))]
  }
  // The Segmented control sits in the Card's `actions` slot, so the quarter switch is in the card header next to the
  // title. `aria-label` names the control for screen readers.
  //
  // WaterfallChart props:
  // - data={rows}: the function itself, so the chart calls it and tracks the signal it reads.
  // - x="kalem" / y="tutar": the column label and the step value keys.
  // - total="ara": rows where `ara` is truthy are subtotals that stand on the axis.
  // - totals="end" + totalLabel: a final total column labelled "net profit".
  // - format="compact": 640000 reads as a short number, used by labels, axis, tooltip and data table.
  // - marks: a target line at 200,000 in the theme's green, labelled "Hedef 200 B" (target 200 K).
  // - No `animate` prop: the default spring, so on a quarter switch every bar glides to its new start and end and the
  //   connectors follow. animate="out" glides without overshoot; animate={false} jumps; reduced motion is honoured
  //   automatically.
  // - title: the SVG's accessible name.
  // Increases, decreases and totals take the theme's good / bad / neutral colors; override with upColor / downColor /
  // totalColor if your brand needs other ones.
  // Keyboard: Tab focuses the chart, ← → move between columns, Enter / Space selects, Escape clears.
  return <Card title="Kâr köprüsü" actions={[<Segmented size="sm" bind:value={$q} aria-label="Çeyrek" options={[{ value: "q1", label: "1. çeyrek" }, { value: "q2", label: "2. çeyrek" }, { value: "q3", label: "3. çeyrek" }]} />]}>
    <WaterfallChart data={rows} x="kalem" y="tutar" total="ara" totals="end" totalLabel="Net kâr" format="compact"
      marks={[{ y: 200000, label: "Hedef 200 B", color: "brand-green" }]} title="Çeyrek kâr köprüsü" height={280} />
  </Card>
}
