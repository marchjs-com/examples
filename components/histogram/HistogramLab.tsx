import { Histogram } from "march/charts"
import { Button, Card } from "march/ui"

// HistogramLab: every Histogram prop in one place, the full-featured reference example.
// Props used: data (a signal), value, group, groupLabels, bins, binWidth, domain, cumulative, density, curve, bandwidth,
// marks, xFormat, format, yMax, grid, gap, xTitle, yTitle, xLabel, yLabel, tooltip, onSelect, animate, title,
// description, empty, legend, class, colors, width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture HistogramLab.test.tsx checks.
// The buttons change the data, the bin count and empty / full, so every change animation can be seen.

// Exam scores of two classes ("şube"). `k` is the exam number: each new exam shifts class A by k points and class B by
// 2k, so the two distributions move at different speeds and the bars visibly morph.
// The keys are Turkish on purpose (puan = score, sinif = class) to show that value / group can name any key.
const make = (k: number) => [
  ...[61, 64, 66, 68, 70, 71, 72, 74, 75, 78, 80, 82, 85, 90].map((puan) => ({ puan: puan + k, sinif: "a" })),
  ...[45, 52, 58, 60, 63, 65, 66, 67, 69, 70, 73, 77].map((puan) => ({ puan: puan + k * 2, sinif: "b" })),
]

export function HistogramLab() {
  let $k = 0          // the current exam, drives the data
  let $bins = 6       // about 6 or 12 bins, toggled by a button
  let $picked = "—"   // last selected bin, written by onSelect
  let $empty = false  // shows the `empty` text when true
  // Main chart, prop by prop:
  // - data={() => …}: a function reading signals, so the chart re-bins (and animates) when $k or $empty changes.
  // - value="puan" / group="sinif": the number to bin and the key that splits rows into overlaid groups.
  // - groupLabels: display names of the raw group values ("a" → "A şubesi") for legend, tooltip and table.
  // - bins={$bins}: about this many bins, rounded to nice thresholds; toggling it re-bins with a morph.
  // - domain={[40, 100]}: the binned range; values outside it are left out, and the axis stays put between exams.
  // - curve="kde" + bandwidth={4}: a kernel density curve per group, smoothed over 4 points.
  // - marks: class A's average (a statistic that follows the data, picked by `series`) and a fixed pass mark at 50.
  // - xFormat / format: bin edge format ("puan" = points) and height format (the "number" pipe).
  // - yMax={10} / grid / gap={2}: a fixed count axis so exams are comparable, grid lines, 2 px between bars.
  // - xTitle / yTitle: axis titles; xLabel / yLabel: column names in the hidden table and tooltip ("Öğrenci" = students).
  // - tooltip: a function returning custom content from the bin's label and count.
  // - onSelect: called on click or Enter with the bin ({ x0, x1, label, count, … }); the Lab shows it in `.lab-picked`.
  // - animate={{ duration: 450, easing: "out", stagger: 30 }}: timed easing, each bar 30 ms after the previous one, so
  //   a re-bin sweeps left to right. Other forms: true (spring, default), false (no motion), "bounce" (an easing
  //   name), { enter: false } (skip the first grow-in but keep updates), or (ctx) => … to decide per bar from
  //   { index, key, phase }. Reduced motion → bars take their new shape at once.
  // - title / description: the SVG's accessible name and description; empty: text shown when data is [].
  // - legend="right": group toggles beside the chart; colors: one color per group; height: px; export: PNG and CSV.
  // Keyboard: Tab focuses the plot, ← → move between bins, Home / End jump to the ends, Enter selects, Escape clears.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-bins, …) are hooks for HistogramLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Sonraki sınav</Button>
      <Button class="lab-bins" size="sm" on:click={() => { $bins = $bins === 6 ? 12 : 6 }}>Kutu sayısı</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <Histogram class="lab-histogram" data={() => ($empty ? [] : make($k))} value="puan" group="sinif" groupLabels={{ a: "A şubesi", b: "B şubesi" }}
      bins={$bins} domain={[40, 100]} curve="kde" bandwidth={4} marks={[{ x: "average", series: "a" }, { x: 50, label: "Geçme notu", color: "danger" }]}
      xFormat={(v: number) => `${v} puan`} format="number" yMax={10} grid gap={2} xTitle="Puan" yTitle="Öğrenci" xLabel="Puan aralığı" yLabel="Öğrenci"
      tooltip={(p: { label: string; count: number }) => `${p.label}: ${p.count} öğrenci`} onSelect={(p: { x0: number; count: number }) => { $picked = `${p.x0}+: ${p.count}` }}
      animate={{ duration: 450, easing: "out", stagger: 30 }} title="Sınav puanları" description="İki şubenin puan dağılımı" empty="Sınav yok"
      legend="right" colors={["#2f6fed", "#f2801f"]} height={240} export={["png", "csv"]} />
    {/* Second chart: the same scores on a dark theme (m:theme="night"), no groups, an exact binWidth of 10, cumulative +
        density (running shares from 0 to 1, so the last bar is always the tallest), no legend, no grid, a fixed width,
        and animate={false}: it updates instantly, a direct comparison with the one above. */}
    <Card m:theme="night">
      <Histogram class="lab-cumulative" data={() => make($k)} value="puan" binWidth={10} cumulative density legend={false} grid={false} animate={false} width={260} height={160} title="Birikimli pay" />
    </Card>
  </div>
}
