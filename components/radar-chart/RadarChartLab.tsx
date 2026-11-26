import { RadarChart } from "march/charts"
import { Button, Card } from "march/ui"

// RadarChartLab: every RadarChart prop in one place, the full-featured reference example.
// Props used: data (a signal), x, y, series, max, scale, axisMax, levels, gridShape, grid, fill, dots, curve,
// axisLabels, levelLabels, format, xLabel, tooltip, onSelect, animate, title, description, empty, legend, class,
// colors, width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture RadarChartLab.test.tsx checks.
// The buttons change the data and empty / refill it, so the morph, enter and exit animations can be seen.

// Two game characters, five skills (speed, strength, intelligence, luck, charisma). `k` is the level: each level
// nudges some skills, using % so the values cycle and stay within 10. `hedef` (target) is 10 on every spoke and is
// read by the second chart's axisMax. The keys are Turkish on purpose (beceri = skill) to show x / y can be any key.
const make = (k: number) => [
  { beceri: "Hız", ada: 7 + (k % 3), bora: 5, hedef: 10 },
  { beceri: "Güç", ada: 6, bora: 8 - (k % 2), hedef: 10 },
  { beceri: "Zeka", ada: 9, bora: 6 + (k % 4), hedef: 10 },
  { beceri: "Şans", ada: 4 + (k % 2), bora: 7, hedef: 10 },
  { beceri: "Karizma", ada: 8, bora: 9, hedef: 10 },
]

export function RadarChartLab() {
  let $k = 0          // the current level, drives the data
  let $empty = false  // shows the `empty` text when true
  let $picked = "—"   // last selected skill, written by onSelect
  // Main chart, prop by prop:
  // - data={() => …}: a function reading signals, so the chart morphs when $k or $empty changes.
  // - x="beceri" / y={["ada", "bora"]} / series: the spoke key, two value series and their display labels.
  // - max={10} / scale="shared": one scale for every spoke with the rim at 10 ("shared" is the default).
  // - levels={5} / gridShape="polygon" / grid: five polygon rings plus spokes (polygon and grid on are the defaults).
  // - fill={0.25} / dots / curve="linear": fill opacity, a dot on every value, straight edges.
  // - axisLabels / levelLabels: skill names around the rim, and each ring's value along the first spoke.
  // - format: the value format in tooltip, ring labels and table ("puan" = points); xLabel: the spoke column header.
  // - tooltip: a function returning custom content; here only the skill name.
  // - onSelect: called on click or Enter / Space with { label, values, … }; the Lab writes both values.
  // - animate={{ duration: 500, easing: "out", stagger: 80 }}: timed easing, Bora's shape 80 ms after Ada's.
  //   Other forms: true (spring, default), false (no motion), "bounce" (an easing name), { enter: false } (no grow-in
  //   on first draw, updates still morph), or (ctx) => … to decide per series from { index, key, phase }.
  //   Reduced motion → shapes take their places at once.
  // - title / description: the SVG's accessible name and description; empty: text shown when data is [].
  // - legend="bottom": series toggles; colors: one per series; height: px; export: PNG and CSV download buttons.
  // Keyboard: Tab focuses the chart, ← → (↑ ↓, Home, End) move from spoke to spoke, Enter / Space selects, Escape
  // clears. The keyboard spoke is drawn dashed with its dots filled and its name in bold.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-empty, …) are hooks for RadarChartLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Seviye atla</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <RadarChart class="lab-radar" data={() => ($empty ? [] : make($k))} x="beceri" y={["ada", "bora"]} series={["Ada", "Bora"]}
      max={10} scale="shared" levels={5} gridShape="polygon" grid fill={0.25} dots curve="linear" axisLabels levelLabels
      format={(v: number) => `${v} puan`} xLabel="Beceri" tooltip={(p: { label: unknown }) => `${p.label}`}
      onSelect={(p: { label: unknown; values: Record<string, number | null> }) => { $picked = `${p.label}: Ada ${p.values.ada}, Bora ${p.values.bora}` }}
      animate={{ duration: 500, easing: "out", stagger: 80 }} title="Karakterler" description="İki karakterin beş becerisi"
      empty="Karakter yok" legend="bottom" colors={["#f2801f", "#2f6fed"]} height={300} export={["png", "csv"]} />
    {/* Second chart: one series on a dark theme (m:theme="night"), the opposite of every default: per-spoke scale via
        axisMax, circle grid hidden (grid={false}), lines only (fill={false}), no dots, a smooth curve, no spoke
        names, no legend, a fixed width, and animate={false}: it updates instantly, next to the animated one above. */}
    <Card m:theme="night">
      <RadarChart class="lab-circle" data={() => make($k)} x="beceri" y="ada" axisMax="hedef" gridShape="circle" grid={false}
        fill={false} dots={false} curve="smooth" axisLabels={false} legend={false} width={240} height={180} title="Ada" animate={false} />
    </Card>
  </div>
}
