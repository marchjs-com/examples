import { BoxPlot } from "march/charts"
import { Button, Card } from "march/ui"

// BoxPlotLab: every BoxPlot prop in one place, the full-featured reference example.
// Props used: data (a signal), x, y, mode, whisker, outliers, mean, showPoints, jitter, horizontal, bandwidth, boxWidth,
// format, xFormat, yMin, yMax, grid, yTitle, marks, xLabel, tooltip, onSelect, animate, title, description, empty,
// legend, class, colors, width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture BoxPlotLab.test.tsx checks.
// The buttons change the data, the mode and empty / full, so every change animation can be seen.

// Brewing times (seconds) for three coffees. `k` is the "day": each new day nudges one value per coffee, so the boxes
// visibly morph. Espresso's 40 s is deliberately far out: it is the one outlier the test counts.
// The keys are Turkish on purpose (kahve = coffee, sure = duration) to show that x / y can name any key.
const make = (k: number) => [
  { kahve: "espresso", sure: [24, 26, 25, 27, 23, 25 + k, 26, 40] },
  { kahve: "filtre", sure: [180, 175, 190, 200, 185, 170 + k * 5, 195, 188].map((s) => s / 6) },
  { kahve: "latte", sure: [42, 45, 40, 48, 44, 46, 43 + k, 47] },
]

export function BoxPlotLab() {
  let $k = 0          // the current "day", drives the data
  let $mode = "box"   // "box" → "violin" → "both"
  let $picked = "—"   // last selected category, written by onSelect
  let $empty = false  // shows the `empty` text when true
  // Main chart, prop by prop:
  // - data={() => …}: a function reading signals, so the chart redraws (and animates) when $k or $empty changes.
  // - x="kahve" y="sure": category key and value-list key (one row per category with a list of values).
  // - mode: box, violin or both; whisker="iqr": 1.5 × IQR (the default, written out here for reference).
  // - outliers / mean: dots beyond the whiskers and the hollow mean diamond (both on by default).
  // - showPoints + jitter={0.8}: raw values as dots across 80 % of the band.
  // - horizontal={false}: vertical boxes (the default); the second chart below shows horizontal.
  // - bandwidth={2}: violin smoothing in seconds (default is Silverman's rule per category); boxWidth={0.5}: box takes
  //   half of its band.
  // - format / xFormat: value format ("sn" = seconds) and category label format (upper case on the axis and in onSelect).
  // - yMin / yMax / grid / yTitle: fixed value axis 0–60 so days are comparable, grid lines, axis title.
  // - marks: a band from 20 to 30 s labelled as the ideal espresso range.
  // - xLabel: header of the category column in the hidden data table.
  // - tooltip: a function returning custom content; here just the median.
  // - onSelect: called on click or Enter with { label, stats, values }; the Lab shows it in `.lab-picked`.
  // - animate={{ duration: 450, easing: "out", stagger: 60 }}: timed easing, each coffee 60 ms after the previous.
  //   Other forms: true (spring, default), false (no motion), "bounce" (easing name), { enter: false } (skip the first
  //   grow-in but keep updates), or (ctx) => … to decide per mark from { index, key, phase }. Reduced motion → no motion.
  // - title / description: the SVG's accessible name and description; empty: text shown when data is [].
  // - legend="bottom": category toggles under the chart (off by default because the axis already names categories);
  //   hiding a category collapses its box into the median before it leaves.
  // - colors: one color per category; height: px; export: a toolbar to download PNG and CSV.
  // Keyboard: Tab focuses the plot, ← → move between coffees, Home / End jump, Enter selects, Escape clears.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-mode, …) are hooks for BoxPlotLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Yeni gün</Button>
      <Button class="lab-mode" size="sm" on:click={() => { $mode = $mode === "box" ? "violin" : $mode === "violin" ? "both" : "box" }}>Biçim</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <BoxPlot class="lab-box" data={() => ($empty ? [] : make($k))} x="kahve" y="sure" mode={$mode as "box"} whisker="iqr" outliers mean
      showPoints jitter={0.8} horizontal={false} bandwidth={2} boxWidth={0.5} format={(v: number) => `${v} sn`}
      xFormat={(v: string) => v.toUpperCase()} yMin={0} yMax={60} grid yTitle="Demleme süresi" marks={[{ y: [20, 30], label: "İdeal espresso" }]}
      xLabel="Kahve" tooltip={(p: { label: string; stats: { median: number } }) => `${p.label}: ${p.stats.median} sn`}
      onSelect={(p: { label: string; stats: { median: number } }) => { $picked = `${p.label} ${p.stats.median}` }}
      animate={{ duration: 450, easing: "out", stagger: 60 }} title="Demleme süreleri" description="Üç kahvenin demleme süresi dağılımı"
      empty="Bugün kahve yok" legend="bottom" colors={["#6f4e37", "#c58b3a", "#e0c097"]} height={260} export={["png", "csv"]} />
    {/* Second chart: the same data on a dark theme (m:theme="night"), horizontal, min / max whiskers (so no outliers can
        exist), no mean, a fixed width, and animate={false}: it updates instantly, a direct comparison with the one above. */}
    <Card m:theme="night">
      <BoxPlot class="lab-flat" data={() => make($k)} x="kahve" y="sure" horizontal whisker="minmax" mean={false} animate={false} width={260} height={160} title="Yatay kutular" />
    </Card>
  </div>
}
