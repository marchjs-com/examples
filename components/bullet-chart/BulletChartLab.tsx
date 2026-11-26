import { BulletChart, type BulletPoint } from "march/charts"
import { Button, Card } from "march/ui"

// BulletChartLab: every BulletChart prop in one place, the full-featured reference example.
// Props used: data (a signal and a single object), label, subtitle, value, target, previous, ranges, rangeLabels,
// rangeTone, min, max, sharedScale, orientation, compact, axis, showValue, names, rowHeight, color, format, xLabel,
// tooltip, onSelect, animate, title, description, empty, legend, class, colors, width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture BulletChartLab.test.tsx checks.
// The buttons move to the next week and empty / refill the data, so every change animation can be seen.

// A weekly scorecard: three measures, each with its actual value, target, last week's value and three range ends.
// `k` is the "week": each new week raises revenue and orders a little, so the bars visibly grow towards (and past)
// their targets. The keys are not the defaults on purpose (name, unit, actual, goal, last, bands) to show that
// label / value / target / … can name any key.
// The bands differ per row (revenue in thousands, rating out of 5), which is why each row carries its own `bands`.
// One row of the scorecard (the type the callbacks below receive in `datum`).
type Row = { name: string; unit: string; actual: number; goal: number; last: number; bands: number[] }
const make = (k: number): Row[] => [
  { name: "Ciro", unit: "bin ₺", actual: 220 + k * 20, goal: 260, last: 210, bands: [150, 220, 300] },
  { name: "Sipariş", unit: "adet", actual: 140 + k * 5, goal: 150, last: 160, bands: [80, 130, 200] },
  { name: "Puan", unit: "5 üzerinden", actual: 4.1, goal: 4.5, last: 4.3, bands: [3, 4, 5] },
]

export function BulletChartLab() {
  let $k = 1          // the current "week", drives the data
  let $picked = "—"   // last selected row, written by onSelect
  let $empty = false  // shows the `empty` text when true
  // Main chart, prop by prop:
  // - data={() => …}: a function reading signals, so the chart redraws (and animates) when $k or $empty changes.
  // - label / subtitle: the row name and the smaller line under it ("ad", "unit").
  // - value / target / previous: the bar (actual), the target tick and the dashed comparison marker (last week).
  // - ranges="bands": the range ends per row, ascending; three ends give the three shaded bands behind the bar.
  // - rangeLabels: names of those bands in the tooltip, the data table and onSelect's `range` (poor / fair / good).
  // - rangeTone="neutral": grey shades (the default); "traffic" would tint them bad / warning / good.
  // - min={0} / max={(d) => d.bands[2]}: every row's scale runs from 0 to its own last band end, so a 4.1 / 5 rating
  //   and 240 / 300 revenue both fill their rows proportionally. sharedScale={false} keeps those scales apart; with
  //   one shared scale the rating would be a sliver next to the revenue.
  // - orientation="horizontal", compact={false}: full rows with subtitles and ticks (both are the defaults).
  // - axis / showValue / names: tick values, the number beside the bar and the names column (all on by default).
  // - rowHeight={60}: px per row; the chart's height follows the number of rows, so no `height` is needed.
  // - color="brand-green": the bar color. colors={[bar, target, previous]} colors the three marks; note that `color`
  //   wins over colors[0] for the bar, so here colors really sets the target tick and the previous marker.
  // - format="number": value format for the axis, tooltip and table; xLabel: header of the name column in the table.
  // - legend="bottom": Value / Target / Previous toggles that hide or show those marks on every row.
  // - tooltip: a function returning custom content: the value and the band it falls in.
  // - onSelect: called on click or Enter with { label, value, target, previous, ranges, range, datum }; the Lab shows
  //   "name · band" in `.lab-picked`.
  // - animate={{ easing: "spring-wobbly", stagger: 90 }}: a bouncy spring, each row 90 ms after the previous one, so
  //   on a new week the bars fill one after another. Other forms: true (spring, default), false (no motion), "out"
  //   (an easing name), { duration: 400, easing: "in-out" }, { enter: false } (skip the first fill but keep updates),
  //   or (ctx) => … deciding per row from { index, key, phase }. Reduced motion is honoured automatically.
  // - title / description: the SVG's accessible name and description; empty: text shown when data is [].
  // - export={["svg"]}: a toolbar button to download the chart as SVG.
  // Keyboard: Tab focuses the chart, ↑ ↓ (or ← →) move between rows, Enter / Space selects, Escape clears; the tooltip
  // follows the keyboard row.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-empty, lab-picked, …) are hooks for BulletChartLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Sonraki hafta</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <BulletChart class="lab-bullet" data={() => ($empty ? [] : make($k))} label="name" subtitle="unit" value="actual" target="goal" previous="last" ranges="bands"
      rangeLabels={["Zayıf", "Orta", "İyi"]} rangeTone="neutral" min={0} max={(d: Row) => d.bands[2]!} sharedScale={false}
      orientation="horizontal" compact={false} axis showValue names rowHeight={60} color="brand-green" format="number" xLabel="Ölçü"
      legend="bottom" colors={["#1fa463", "#17171a", "#8a8a94"]}
      tooltip={(p: BulletPoint<Row>) => `${p.label}: ${p.value} (${p.range})`}
      onSelect={(p: BulletPoint<Row>) => { $picked = `${p.label} · ${p.range}` }}
      animate={{ easing: "spring-wobbly", stagger: 90 }} title="Haftalık karne" description="Ciro, sipariş ve puan hedefe karşı" empty="Ölçü yok" export={["svg"]} />
    {/* Second chart: `data` as a single object (no array) with the default keys label / value / target / ranges, on a
        dark theme (m:theme="night"). orientation="vertical" stands the measure up as one column, compact drops the
        subtitle and ticks, rangeTone="traffic" tints the bands red / amber / green, and animate={false} draws it in
        place: a direct comparison with the animated chart above. width / height fix its size in px. */}
    <Card m:theme="night">
      <BulletChart class="lab-mini" data={{ label: "Pil", value: 64, target: 80, ranges: [20, 50, 100] }} orientation="vertical" compact
        rangeTone="traffic" animate={false} width={160} height={200} title="Tek ölçü" />
    </Card>
  </div>
}
