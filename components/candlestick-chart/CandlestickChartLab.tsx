import { CandlestickChart } from "march/charts"
import { Button, Card } from "march/ui"

// CandlestickChartLab: every CandlestickChart prop in one place, the full-featured reference example.
// Props used: data (a signal), x, xType, open, high, low, close, volume, type, up, down, ma, marks, lastPrice, window,
// navigator, zoom, sync, grid, format, volumeFormat, xFormat, xLabel, labels, tooltip, onSelect, animate, title,
// description, empty, legend, class, colors, width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture CandlestickChartLab.test.tsx checks.
// "Yeni mum" appends a candle like live data does, so the slide of the window and the grow-in can be seen.

// One daily candle for day i: t = time (epoch ms), o / h / l / c = open, high, low, close, v = volume. Every third day
// closes lower (a falling candle), the others close higher. Short keys on purpose, to show that every field is named
// by a prop. Day 11 closes at 114: the number the selection test expects.
const bar = (i: number) => ({ t: Date.UTC(2026, 0, 1 + i), o: 100 + i, h: 106 + i, l: 97 + i, c: 100 + i + (i % 3 === 0 ? -2 : 3), v: 1000 + i * 40 })

export function CandlestickChartLab() {
  let $rows = Array.from({ length: 12 }, (_, i) => bar(i))  // twelve days to start with; the button appends more
  let $picked = "—"   // last selected candle, written by onSelect
  let $empty = false  // shows the `empty` text when true
  // Main chart, prop by prop:
  // - data={() => …}: a function reading signals; appending to $rows grows the chart live.
  // - x="t" xType="time": the time key, and a forced time scale (epoch ms is detected as time anyway; xType also takes
  //   "linear" or "band" when detection is not what you want).
  // - open / high / low / close / volume: the price and volume keys; volume adds the lower pane of volume bars.
  // - type="candle": bodies and wicks (the default); "ohlc" draws bars with ticks, "line" only the close.
  // - up / down: colors of rising and falling candles (theme tokens here, CSS colors work too).
  // - ma={[3, 5]}: two moving averages of the close, each a legend item; `colors` colors them (purple, green).
  // - marks: a price line at 110 labelled as a target, and { y: "average" }, a line at the average close.
  // - lastPrice: the dashed line and tag at the last close (on by default).
  // - window={10}: only the latest 10 candles; a new candle slides the view left. navigator={40}: a 40 px overview
  //   strip under the chart whose window can be dragged or resized to pick another range.
  // - zoom: drag across the plot to zoom; double click, Escape or "Reset zoom" resets.
  // - sync="lab": charts with the same sync name share the crosshair (the night chart below uses it too).
  // - grid="both": horizontal and vertical grid lines.
  // - format / volumeFormat / xFormat: price as US dollars, volume in compact form (thousands shortened), time as a date.
  // - xLabel / labels: the time column header and the tooltip / table texts for open, high, … and change.
  // - tooltip: a function returning custom content; onSelect: called on click or Enter with { open, high, low, close,
  //   volume, change, up, datum }; the Lab shows the close in `.lab-picked`.
  // - animate={{ duration: 300, easing: "out", stagger: 20 }}: candles grow out of their open price one after another,
  //   20 ms apart, with a quick timed easing. Other forms: true (spring, default), false (no motion), "bounce" (an
  //   easing name), { enter: false } (no grow-in on the first draw, but updates still glide), or (ctx) => … deciding
  //   per candle from { index, key, phase }. Reduced motion is honoured automatically.
  // - title / description: the SVG's accessible name and description; empty: text shown when data is [].
  // - legend="bottom": toggles for the moving averages and the volume pane.
  // - height: px; export: a toolbar to download PNG and CSV.
  // Keyboard: Tab focuses the plot, ← → move between candles, Home / End jump, Enter selects, Escape clears (and resets
  // the zoom). The navigator's edges are sliders (← →, Shift for big steps, Home / End).
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-empty, lab-picked, …) are hooks for CandlestickChartLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $rows = [...$rows, bar($rows.length)] }}>Yeni mum</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <CandlestickChart class="lab-candles" data={() => ($empty ? [] : $rows)} x="t" xType="time" open="o" high="h" low="l" close="c" volume="v"
      type="candle" up="brand-blue" down="brand-orange" ma={[3, 5]} marks={[{ y: 110, label: "Hedef", color: "brand-blue" }, { y: "average" }]}
      lastPrice window={10} navigator={40} zoom sync="lab" grid="both" format={["money", "USD"]} volumeFormat="compact" xFormat="date" xLabel="Gün"
      labels={{ open: "Açılış", high: "Yüksek", low: "Düşük", close: "Kapanış", volume: "Hacim", change: "Değişim" }}
      tooltip={(p: { close: number }) => `Kapanış ${p.close}`} onSelect={(p: { close: number }) => { $picked = `kapanış ${p.close}` }}
      animate={{ duration: 300, easing: "out", stagger: 20 }} title="Lab hissesi" description="On iki günlük fiyat" empty="İşlem yok"
      legend="bottom" colors={["#8e44ad", "#1fa463"]} height={300} export={["png", "csv"]} />
    {/* Second chart: the same rows on a dark theme (m:theme="night") as type="line" (only the close), without the last
        price tag, legend or tooltip, at a fixed width. It keeps the default animation, and sync="lab" makes its
        crosshair follow the pointer over the main chart, the way a price chart and its mini overview stay in step. */}
    <Card m:theme="night">
      <CandlestickChart class="lab-line" data={() => $rows} x="t" open="o" high="h" low="l" close="c" type="line" sync="lab" lastPrice={false}
        legend={false} tooltip={false} width={320} height={160} title="Kapanış çizgisi" />
    </Card>
  </div>
}
