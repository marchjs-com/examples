// ShopRevenue: the real-life LineChart example.
//
// What it shows: the revenue card of an e-commerce dashboard. A Segmented control picks the period (7, 30 or 90 days);
// a LineChart draws revenue and expenses in money, and an AreaChart below stacks the active users from the web and
// from the app.
// When to use this pattern: dashboards where several charts share one control. Both charts get the same `rows`
// function, so changing the period updates them together; time axes come from giving real dates to `x`.
//
// Accessibility (built in): each chart has a title, a visually hidden data table and keyboard navigation of its points.
import { LineChart, AreaChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// Demo data: 90 days from 1 Sep 2026 (the month index 8 is September). Four made-up series per day: revenue and expense
// (money) and web and app users, each a wave plus a slow upward trend so the lines look alive.
const DAY = 864e5, START = Date.UTC(2026, 8, 1)
const wave = (i: number, base: number, amp: number, k: number) => Math.round(base + amp * Math.sin((i + k) / 3) + (amp / 2) * Math.cos((i * 7 + k) / 5) + i * base * 0.004)
const ALL = Array.from({ length: 90 }, (_, i) => ({ gun: START + i * DAY, gelir: wave(i, 42000, 9000, 1), gider: wave(i, 26000, 5000, 4), web: wave(i, 1800, 300, 2), uygulama: wave(i, 2600, 400, 5) }))

export function ShopRevenue() {
  // The chosen period in days, a signal (Segmented values are strings).
  let $range = "30"
  // The last N rows. It reads $range, and the charts take it as a function, so they follow the period.
  const rows = () => ALL.slice(-Number($range))
  return <Card title="Gelir ve gider" actions={[<Segmented size="sm" bind:value={$range} aria-label="Dönem" options={[{ value: "7", label: "7 gün" }, { value: "30", label: "30 gün" }, { value: "90", label: "90 gün" }]} />]}>
    {/* - x="gun": dates give a time axis; xFormat="date" writes its labels as dates.
        - y: two series by key; series gives them their display names (legend, tooltip, table).
        - format={["money", "TRY"]}: a pipe name with arguments, so values are written as Turkish lira.
        - zoom: drag across the plot to zoom into a range; double click or Escape resets. */}
    <LineChart data={rows} x="gun" y={["gelir", "gider"]} series={{ gelir: "Gelir", gider: "Gider" }} format={["money", "TRY"]} xFormat="date" zoom title="Gelir ve gider" height={240} />
    {/* AreaChart: the same data props, but it fills under the lines; `stacked` puts the series on top of each other so
        the total is visible. series here is a list in the order of `y`. legend="right" places the legend at the side. */}
    <AreaChart data={rows} x="gun" y={["web", "uygulama"]} series={["Web", "Uygulama"]} stacked xFormat="date" title="Etkin kullanıcı" height={160} legend="right" />
  </Card>
}
