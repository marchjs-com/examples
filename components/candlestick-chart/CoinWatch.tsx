import { CandlestickChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// A crypto watch card: a real-life CandlestickChart.
// Switch the view (candles / OHLC bars / close line), read volume and the 7- and 21-day moving averages, see a target
// price line and a support band, pick a range in the navigator strip under the chart, and click a candle to get a
// one-line summary of that day. Use this setup for any price history: stocks, currencies, commodities.
// Display only: the chart has no order entry.

// 120 days of fake prices. `r` is a tiny seeded random generator (Park–Miller), so the chart looks the same on every
// load and in tests. Each day opens at the previous close; high and low reach a little beyond the body.
// Rows use the default keys date / open / high / low / close, so only `volume` needs to be named. Replace `rows` with
// your own rows, sorted by date.
const START = Date.UTC(2026, 5, 1), DAY = 864e5
const rows = (() => {
  let seed = 42, p = 58000
  const r = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  return Array.from({ length: 120 }, (_, i) => {
    const open = p, close = Math.round(open + (r() - 0.46) * open * 0.04)
    p = close
    return { date: START + i * DAY, open, close, high: Math.round(Math.max(open, close) * (1 + r() * 0.015)), low: Math.round(Math.min(open, close) * (1 - r() * 0.015)), vol: Math.round(900 + r() * 1600) }
  })
})()

export function CoinWatch() {
  let $type = "candle"         // the view, bound to the Segmented control
  let $day = "Bir muma tıkla"  // the summary line under the chart, written by onSelect
  // The Segmented control goes into the Card's `actions` slot, so the view switch sits in the card header next to the
  // title. `aria-label` names the control for screen readers.
  //
  // CandlestickChart props:
  // - data={rows}: a plain array; the data never changes here, only the view does.
  // - type={() => $type}: a function reading the signal, so switching the view redraws the chart.
  // - volume="vol": the volume key; a lower pane shows volume bars (the legend can hide it).
  // - ma={[7, 21]}: 7- and 21-day moving averages of the close, the classic short / long trend pair.
  // - navigator + window={60}: the latest 60 days are shown; the overview strip shows all 120, and dragging its window
  //   (or an edge) picks another range.
  // - format={["money", "USD"]}: prices as US dollars in the axis, tooltip and hidden table.
  // - marks: a price line at 64 000 (target) and a band from 54 000 to 57 000 (support) in the "success" color.
  // - onSelect: called on click or Enter with { label, close, change, … }; change is a fraction, so it is shown as a
  //   signed percent with one decimal.
  // - No `animate` prop: the default spring, so candles grow out of their open price and the view glides on zoom or a
  //   navigator drag. animate="out" gives a calmer glide, animate={false} jumps; reduced motion is honoured.
  // Keyboard: Tab focuses the plot, ← → move between candles, Home / End jump, Enter selects, Escape clears and resets
  // the zoom. The navigator's edges are sliders (← →, Shift for big steps).
  return <Card title="HADİ / USD" actions={[<Segmented size="sm" bind:value={$type} aria-label="Görünüm"
    options={[{ value: "candle", label: "Mum" }, { value: "ohlc", label: "OHLC" }, { value: "line", label: "Çizgi" }]} />]}>
    <CandlestickChart data={rows} type={() => $type as "candle"} volume="vol" ma={[7, 21]} navigator window={60}
      format={["money", "USD"]} marks={[{ y: 64000, label: "Hedef", color: "brand-blue" }, { y: [54000, 57000], label: "Destek", color: "success" }]}
      onSelect={(p: { label: unknown; close: number; change: number }) => { $day = `${p.label}: ${Math.round(p.close)} $ (${p.change >= 0 ? "+" : ""}${(p.change * 100).toFixed(1)}%)` }}
      title="HADİ / USD günlük" height={320} />
    {/* The summary line: a function child, so it re-renders when onSelect writes $day. */}
    <p sx={{ text: "sm", color: "muted" }}>{() => $day}</p>
  </Card>
}
