import { LineChart, AreaChart, ComboChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// ShopRevenue: a real-life dashboard card. An online shop's income and spending over a chosen period, a target line,
// the orders as bars with the margin on a second axis, and active users as a stacked area. The three charts share one
// crosshair (sync), so hovering a day in one shows that day in all of them.

const DAY = 864e5, START = Date.UTC(2026, 8, 1)
const wave = (i: number, base: number, amp: number, k: number) => Math.round(base + amp * Math.sin((i + k) / 3) + (amp / 2) * Math.cos((i * 7 + k) / 5) + i * base * 0.004)
const ALL = Array.from({ length: 90 }, (_, i) => ({
  gun: START + i * DAY, gelir: wave(i, 42000, 9000, 1), gider: wave(i, 26000, 5000, 4),
  siparis: wave(i, 320, 70, 3), marj: (wave(i, 30, 6, 2)) / 100, web: wave(i, 1800, 300, 2), uygulama: wave(i, 2600, 400, 5),
}))

export function ShopRevenue() {
  // The Segmented control binds the period; `rows` derives the visible slice, and the charts morph to it
  // (fewer days: the x axis glides, points slide; the change animates by default).
  let $range = "30"
  const rows = () => ALL.slice(-Number($range))
  return <Card title="Gelir ve gider" actions={[<Segmented size="sm" bind:value={$range} aria-label="Dönem" options={[{ value: "7", label: "7 gün" }, { value: "30", label: "30 gün" }, { value: "90", label: "90 gün" }]} />]}>
    {/* money format for axis, tooltip and table; a target line through marks; drag across the plot to zoom. */}
    <LineChart data={rows} x="gun" y={["gelir", "gider"]} series={{ gelir: "Gelir", gider: "Gider" }} format={["money", "TRY"]} xFormat="date"
      marks={[{ y: 45000, label: "Hedef", color: "success" }]} zoom sync="shop" export title="Gelir ve gider" height={240} />
    {/* orders as bars (left axis), the margin as a smooth line on the right axis in percent. */}
    <ComboChart data={rows} x="gun" y={[{ key: "siparis", type: "bar", label: "Sipariş" }, { key: "marj", type: "line", axis: "right", curve: "smooth", label: "Marj" }]}
      y2Format="percent" xFormat="date" sync="shop" title="Sipariş ve marj" height={180} />
    {/* two areas stacked on each other: total active users with the part from each platform. */}
    <AreaChart data={rows} x="gun" y={["web", "uygulama"]} series={["Web", "Uygulama"]} stacked xFormat="date" sync="shop" title="Etkin kullanıcı" height={160} legend="right" />
  </Card>
}
