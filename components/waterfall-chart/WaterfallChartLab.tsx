import { WaterfallChart } from "march/charts"
import { Button, Card } from "march/ui"

// WaterfallChartLab: every WaterfallChart prop in one place, the full-featured reference example.
// Props used: data (a signal), x, y, start, startLabel, total, totals, totalLabel, connectors, labels, upColor,
// downColor, totalColor, horizontal, orientation, format, yMin, yMax, grid, marks, xLabel, yLabel, tooltip, onSelect,
// animate, title, description, empty, legend, class, colors, width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture WaterfallChartLab.test.tsx checks.
// The buttons change the data and empty / full, so every change animation can be seen.

// A shop's till for one day: sales in, returns out, a subtotal, then shipping out. `k` is the day: each new day sells
// 50 more and ships 10 more, so the bars visibly move. The keys are Turkish on purpose (ad = name, fark = change,
// ara = subtotal) to show that x / y / total can name any key.
const make = (k: number) => [{ ad: "Satış", fark: 400 + k * 50 }, { ad: "İade", fark: -80 }, { ad: "Ara toplam", ara: true }, { ad: "Kargo", fark: -60 - k * 10 }]

export function WaterfallChartLab() {
  let $k = 1          // the current day, drives the data
  let $picked = "—"   // last selected column, written by onSelect
  let $empty = false  // shows the `empty` text when true
  // Main chart, prop by prop:
  // - data={() => …}: a function reading signals, so the chart redraws (and animates) when $k or $empty changes.
  // - x="ad" / y="fark": the column label and the step value.
  // - start={200} + startLabel="Kasa": the till's opening cash as the first column ("Kasa" = till).
  // - total="ara": rows with a truthy `ara` are subtotals; totals="end" + totalLabel: a final total column labelled
  //   "end of day".
  // - connectors: dashed lines from each bar's end to the next bar (the default, written out for reference).
  // - labels: a function for the bar labels: totals as "N ₺", steps with a sign ("+450", "−80").
  // - upColor / downColor / totalColor: theme tokens for increases, decreases and totals.
  // - orientation="vertical": columns standing up (the default); the second chart uses `horizontal`.
  // - format="number"; yMin / yMax: a fixed value axis 0–800 so days are comparable; grid: grid lines.
  // - marks: a target line at 500 and a line at the average of the running totals.
  // - xLabel / yLabel: the column headers of the hidden data table (item and change).
  // - legend="bottom": Increase / Decrease / Total toggles that hide or show that kind of bar.
  // - tooltip: a function returning custom content, here the running total after the column.
  // - onSelect: called on click or Enter with { label, kind, value, from, to, datum }, written into `.lab-picked`.
  // - animate={{ easing: "out", duration: 500, stagger: 80 }}: timed easing, each bar 80 ms after the previous, so the
  //   bars build from left to right. Other forms: true (spring, default), false (no motion), "bounce" (an easing name),
  //   { enter: false } (skip the first build but keep updates), or (ctx) => … to decide per bar from
  //   { index, key, phase }. Reduced motion → no motion.
  // - title / description: the SVG's accessible name and description; empty: content shown when data is [].
  // - height: px; export: a toolbar with the default export buttons.
  // Keyboard: Tab focuses the chart, ← → move between columns, Enter / Space selects, Escape clears.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-empty, lab-picked, …) are hooks for WaterfallChartLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Sonraki gün</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <WaterfallChart class="lab-fall" data={() => ($empty ? [] : make($k))} x="ad" y="fark" start={200} startLabel="Kasa" total="ara" totals="end" totalLabel="Gün sonu"
      connectors labels={(p: { kind: string; value: number }) => (p.kind === "total" ? `${p.value} ₺` : `${p.value > 0 ? "+" : "−"}${Math.abs(p.value)}`)}
      upColor="brand-blue" downColor="brand-orange" totalColor="brand-purple" orientation="vertical" format="number" yMin={0} yMax={800} grid
      marks={[{ y: 500, label: "Hedef" }, { y: "average" }]} xLabel="Kalem" yLabel="Fark" legend="bottom"
      tooltip={(p: { label: string; to: number }) => `${p.label} → ${p.to} ₺`}
      onSelect={(p: { label: string; to: number }) => { $picked = `${p.label} (${p.to})` }}
      animate={{ easing: "out", duration: 500, stagger: 80 }} title="Günlük kasa" description="Kasanın gün içindeki yolu" empty="Hareket yok"
      height={280} export />
    {/* Second chart: the same data on a dark theme (m:theme="night"), horizontal (bars run to the right), no start
        column, no connectors, no labels, no grid, colors as [up, down, total] instead of the three color props, a fixed
        width, and animate={false}: it updates instantly, a direct comparison with the one above. */}
    <Card m:theme="night">
      <WaterfallChart class="lab-side" data={() => make($k)} x="ad" y="fark" total="ara" horizontal connectors={false} labels={false} grid={false}
        colors={["#1fa463", "#d42a2f", "#8a8a94"]} animate={false} width={420} height={180} title="Yatay kasa" />
    </Card>
  </div>
}
