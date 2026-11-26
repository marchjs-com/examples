import { SunburstChart } from "march/charts"
import { Button, Card } from "march/ui"

// SunburstChartLab: every SunburstChart prop in one place, the full-featured reference example.
// Props used: data (a signal), childrenOf, value, label, id, maxDepth, innerRadius, padAngle, labels, drill, breadcrumbs,
// focus, rootLabel, center, format, tooltip, onSelect, onDrill, animate, title, description, empty, legend, class,
// colors, width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture SunburstChartLab.test.tsx checks.
// The buttons change the data, empty / full and the zoom from outside, so every change animation can be seen.

// A monthly budget: three groups (food, home, fun) with two items each. The keys are Turkish on purpose to show that
// childrenOf / value / label / id can read any shape: `alt` holds the children, `tutar` the amount, `ad` the name and
// `kod` a stable id. `k` grows three of the amounts, so the arcs visibly turn to their new angles.
const make = (k: number) => [
  { kod: "yemek", ad: "Yemek", alt: [{ kod: "market", ad: "Market", tutar: 5200 + k * 400 }, { kod: "restoran", ad: "Restoran", tutar: 1800 }] },
  { kod: "ev", ad: "Ev", alt: [{ kod: "kira", ad: "Kira", tutar: 14000 }, { kod: "fatura", ad: "Faturalar", tutar: 2100 + k * 150 }] },
  { kod: "keyif", ad: "Keyif", alt: [{ kod: "sinema", ad: "Sinema", tutar: 600 }, { kod: "kitap", ad: "Kitap", tutar: 450 + k * 100 }] },
]

export function SunburstChartLab() {
  let $k = 0                         // spending steps, drives the data
  let $empty = false                 // shows the `empty` text when true
  let $picked = "—"                  // last selected node, written by onSelect
  let $level = "Bütçe"               // current zoom level, written by onDrill
  let $focus: string | null = null   // node zoomed into from outside (null = top)
  // Main chart, prop by prop:
  // - data={() => …}: a function reading signals, so the chart redraws (and animates) when $k or $empty changes.
  // - childrenOf="alt" / value="tutar" / label="ad": how to read a row; id={(d) => d.kod}: a stable identity, so a node
  //   keeps its place (and its animation) when names or amounts change, and `focus` can name it.
  // - maxDepth={2}: two rings at once; innerRadius={0.32}: the hole in the middle is 32 % of the radius;
  //   padAngle={0.01}: a small gap (radians) between arcs.
  // - labels: names on arcs wide enough; drill: click / Enter zooms into a group; breadcrumbs: the path over the chart.
  // - focus={$focus}: zooms into the node with that id from outside (the "home in / out" button toggles "ev").
  // - rootLabel: the name of the whole tree (budget) in the middle and the path.
  // - center: custom content for the middle (the zoomed node's name and its share); format: money in TRY.
  // - tooltip: a function returning custom content, here the node's share in percent.
  // - onSelect: called on click or Enter / Space (before the zoom); onDrill: called with the new zoomed node (null at
  //   the top). The Lab writes both into the row above the chart.
  // - animate={{ duration: 550, easing: "out", stagger: 60 }}: timed easing, ring after ring 60 ms apart. Other forms:
  //   true (spring, default), false (no motion), "bounce" (an easing name), { enter: false } (skip the first opening
  //   but keep updates), or (ctx) => … to decide per node from { index, key, phase }. Reduced motion → no motion.
  // - title / description: the SVG's accessible name and description; empty: content shown when data is [].
  // - legend="bottom": one toggle per top branch; colors: one color per branch (children take lighter shades).
  // - height: px; export: a toolbar to download PNG and CSV.
  // Keyboard: Tab focuses the chart, ← → move along a ring, ↓ to the first child, ↑ to the parent, Enter / Space selects
  // and zooms in, Escape / Backspace zoom out (Escape at the top clears).
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-empty, lab-home, …) are hooks for SunburstChartLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Harcama ekle</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      {/* Drives the `focus` prop: zooms into "ev" (home) from outside the chart, and back out. */}
      <Button class="lab-home" size="sm" variant="ghost" on:click={() => { $focus = $focus ? null : "ev" }}>Eve gir / çık</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
      <span class="lab-level">Seviye: {() => $level}</span>
    </div>
    <SunburstChart class="lab-sun" data={() => ($empty ? [] : make($k))} childrenOf="alt" value="tutar" label="ad" id={(d: { kod: string }) => d.kod}
      maxDepth={2} innerRadius={0.32} padAngle={0.01} labels drill breadcrumbs focus={$focus} rootLabel="Bütçe"
      center={(p: { label: string; total: number }) => `${p.label} %${Math.round(p.total * 100)}`} format={["money", "TRY"]}
      tooltip={(p: { label: string; share: number }) => `${p.label}: %${Math.round(p.share * 100)}`}
      onSelect={(p: { label: string; value: number }) => { $picked = `${p.label} ${p.value}` }}
      onDrill={(p: { label: string } | null) => { $level = p ? p.label : "Bütçe" }}
      animate={{ duration: 550, easing: "out", stagger: 60 }} title="Aylık bütçe" description="Harcamalar grup grup"
      empty="Harcama yok" legend="bottom" colors={["#f2801f", "#2f6fed", "#1fa463"]} height={320} export={["png", "csv"]} />
    {/* Second chart: the same data on a dark theme (m:theme="night") with everything extra switched off: no drill, no
        breadcrumbs, no labels, no middle content, no legend, a fixed width, and animate={false} so it updates
        instantly, a direct comparison with the one above. */}
    <Card m:theme="night">
      <SunburstChart class="lab-plain" data={() => make($k)} childrenOf="alt" value="tutar" label="ad" drill={false} breadcrumbs={false}
        labels={false} center={false} legend={false} width={220} height={200} title="Düz halka" animate={false} />
    </Card>
  </div>
}
