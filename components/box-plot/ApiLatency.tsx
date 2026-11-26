import { BoxPlot } from "march/charts"
import { Card, Segmented } from "march/ui"

// API latency per endpoint: a real-life BoxPlot.
// Shows one horizontal box per endpoint, a 300 ms SLA line across all of them and the slow requests as outlier dots.
// Switching the environment (prod / staging) swaps the data, and every box morphs to its new quartiles.
// Use a box plot like this when an average hides the story: two endpoints can share a mean of 150 ms while one of
// them has a long tail of slow requests. The box (middle 50 %), the whiskers and the outliers make that tail visible.

// Fake request logs: [endpoint, typical ms, spread ms]. The sine hash below is a tiny deterministic "random", so the
// chart looks the same on every load (and in tests). Replace `requests` with your real log rows.
const ENDPOINTS: [string, number, number][] = [["GET /products", 80, 25], ["GET /cart", 60, 15], ["POST /orders", 190, 60], ["GET /search", 140, 70], ["POST /payments", 260, 50]]
// One row per request ({ endpoint, ms }). BoxPlot takes this "one row per value" shape as it is and groups the rows by
// the `x` key itself, so you never compute quartiles by hand.
const requests = (env: string) => ENDPOINTS.flatMap(([endpoint, base, spread], e) => Array.from({ length: 60 }, (_, i) => {
  const a = Math.sin(i * 12.9898 + e * 7 + (env === "prod" ? 0 : 3)) * 43758.5453, u = a - Math.floor(a)
  // Every 17th request is three times slower: these become the outlier dots beyond the whiskers.
  const slow = i % 17 === 0 ? 3 : 1
  // Staging is lighter (0.7 ×), so switching environments visibly moves the boxes.
  return { endpoint, ms: Math.round((base * (env === "prod" ? 1 : 0.7) + spread * (u * 2 - 1)) * slow) }
}))

export function ApiLatency() {
  // `$env` is a signal: reading it inside `data={() => …}` makes the chart re-run the function whenever it changes.
  let $env = "prod"
  // The Segmented control goes into the Card's `actions` slot, so the environment switch sits in the card header next
  // to the title instead of taking a row of its own. `aria-label` names the control for screen readers.
  //
  // BoxPlot props:
  // - x / y: the category key and the value key of each row.
  // - horizontal: endpoints on the y axis; long labels like "POST /payments" read better on the left than rotated.
  // - whisker={2}: whiskers reach 2 × IQR instead of the default 1.5 ×, so only the really slow requests become dots.
  // - marks: a value line across every box; color "danger" marks it as a limit, the label names it in chart and table.
  // - format: one formatter for the axis, the tooltip and the hidden data table, so the "ms" unit is never lost.
  // - xLabel: the header of the category column in the screen-reader data table (default "Category").
  // - animate="out": an easing name instead of the default spring, so on a switch the boxes glide to their new numbers
  //   without overshoot, which suits a dashboard. animate={false} makes them jump; {{ duration: 300, easing: "out",
  //   stagger: 40 }} gives finer control. Users who ask for reduced motion get the jump automatically.
  // Keyboard: Tab focuses the plot, ← → move between endpoints, Enter selects, Escape clears; the tooltip follows.
  // To adapt: point `data` at your own rows and set x / y to your keys.
  return <Card title="API yanıt süreleri" actions={[<Segmented size="sm" bind:value={$env} aria-label="Ortam" options={[{ value: "prod", label: "Canlı" }, { value: "staging", label: "Test" }]} />]}>
    <BoxPlot data={() => requests($env)} x="endpoint" y="ms" horizontal whisker={2} marks={[{ y: 300, label: "SLA 300 ms", color: "danger" }]}
      format={(v: number) => `${v} ms`} xLabel="Uç nokta" animate="out" title="Yanıt süreleri" height={280} />
  </Card>
}
