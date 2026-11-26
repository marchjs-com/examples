import { ScatterChart } from "march/charts"
import { Button, Card } from "march/ui"

// ScatterChartLab: every ScatterChart prop in one place, the full-featured reference example.
// Props used: data (a signal), x, y, size, sizeRange, radius, group, groupLabels, label, key, shape, xType, xFormat,
// format, sizeFormat, xMin, xMax, yMin, yMax, grid, xTitle, yTitle, trend, trendLabel, marks, xLabel, yLabel, sizeLabel,
// tooltip, onSelect, animate, title, description, empty, legend, class, colors, width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture ScatterChartLab.test.tsx checks.
// The buttons change the data and empty / full, so the enter, update and exit animations can all be seen.

// Five friends: height (boy, cm), weight (kilo, kg), age (yas) and team (takim). `k` is "years passed": each step
// changes some heights and weights, so points visibly glide. The keys are Turkish on purpose to show that x / y /
// size / group can name any key.
const make = (k: number) => [
  { ad: "Ada", boy: 152 + k, kilo: 48 + k, yas: 14, takim: "mavi" }, { ad: "Bora", boy: 181, kilo: 79 - k, yas: 31, takim: "mavi" },
  { ad: "Cem", boy: 174, kilo: 70, yas: 27, takim: "turuncu" }, { ad: "Defne", boy: 166 + k * 2, kilo: 57, yas: 22, takim: "turuncu" },
  { ad: "Eren", boy: 188, kilo: 86 + k, yas: 40, takim: "mavi" },
]

export function ScatterChartLab() {
  let $k = 0          // years passed, drives the data
  let $picked = "—"   // last selected person, written by onSelect
  let $empty = false  // shows the `empty` text when true
  // Main chart, prop by prop:
  // - data={() => …}: a function reading signals, so the chart redraws (and animates) when $k or $empty changes.
  // - x="boy" y="kilo": the two coordinates; size="yas" + sizeRange={[5, 18]}: a bubble chart, the area follows age.
  // - group="takim" + groupLabels: two series (teams) with readable names in the legend and the tooltip.
  // - label="ad": the name of each point; key="ad": its identity across data changes, so a person glides instead of
  //   being replaced (the default would be the label anyway; written out for reference).
  // - shape={["circle", "triangle"]}: one symbol per series, so teams differ by shape as well as color.
  // - xType="linear": numeric x (the default is detected; "time" for dates).
  // - xFormat / format / sizeFormat: formats of x (cm), y (kg) and size (years of age).
  // - xMin / xMax / yMin / yMax: fixed axes, so years are comparable; grid="y": horizontal grid lines only.
  // - xTitle / yTitle: axis titles.
  // - trend="linear" + trendLabel: a least-squares line per team; its label shows the slope instead of the default r².
  // - marks: a vertical line at 170 cm ("average height") and a line at the average of y.
  // - xLabel / yLabel / sizeLabel: names of x, y and size in the tooltip and the hidden data table.
  // - tooltip: a function returning custom content; onSelect: called on click or Enter, written into `.lab-picked`.
  // - animate={{ duration: 500, easing: "out", stagger: 40 }}: timed easing, each point 40 ms after the previous, so
  //   they sweep in from left to right. Other forms: true (spring, default), false (no motion), "bounce" (an easing
  //   name), { enter: false } (skip the first grow-in but keep updates), or (ctx) => … to decide per point from
  //   { index, key, phase }. Reduced motion → no motion.
  // - title / description: the SVG's accessible name and description; empty: content shown when data is [].
  // - legend="right": team toggles beside the chart (shown because there are two series); hiding a team shrinks its
  //   points away.
  // - colors: one color per series; height: px; export: a toolbar to download PNG and CSV.
  // Keyboard: Tab focuses the plot, ← → walk the points in x order, Home / End jump, Enter selects, Escape clears.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-empty, lab-picked, …) are hooks for ScatterChartLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Bir yıl geçsin</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <ScatterChart class="lab-scatter" data={() => ($empty ? [] : make($k))} x="boy" y="kilo" size="yas" sizeRange={[5, 18]}
      group="takim" groupLabels={{ mavi: "Mavi takım", turuncu: "Turuncu takım" }} label="ad" key="ad" shape={["circle", "triangle"]}
      xType="linear" xFormat={(v: number) => `${v} cm`} format={(v: number) => `${v} kg`} sizeFormat={(v: number) => `${v} yaş`}
      xMin={140} xMax={200} yMin={40} yMax={100} grid="y" xTitle="Boy" yTitle="Kilo" trend="linear"
      trendLabel={(fit: { slope: number }) => `eğim ${fit.slope.toFixed(2)}`} marks={[{ x: 170, label: "Ortalama boy" }, { y: "average" }]}
      xLabel="Boy" yLabel="Kilo" sizeLabel="Yaş" tooltip={(p: { label: unknown; y: number }) => `${p.label}: ${p.y} kg`}
      onSelect={(p: { label: unknown }) => { $picked = String(p.label) }} animate={{ duration: 500, easing: "out", stagger: 40 }}
      title="Boy ve kilo" description="Beş arkadaşın boyu, kilosu ve yaşı" empty="Kimse yok" legend="right"
      colors={["#2f6fed", "#f2801f"]} height={260} export={["png", "csv"]} />
    {/* Second chart: the same data on a dark theme (m:theme="night"), plain points with a fixed radius={3} (no size, no
        group, so one series), no legend, a fixed width, and animate={false}: it updates instantly, a direct comparison
        with the one above. */}
    <Card m:theme="night">
      <ScatterChart class="lab-plain" data={() => make($k)} x="boy" y="kilo" radius={3} legend={false} animate={false} width={260} height={160} title="Düz noktalar" />
    </Card>
  </div>
}
