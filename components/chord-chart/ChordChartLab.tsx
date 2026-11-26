import { ChordChart } from "march/charts"
import { Button, Card } from "march/ui"

// ChordChartLab: every ChordChart prop in one place, the full-featured reference example.
// Props used: matrix, names, data (a signal), source, target, value, directed, padAngle, thickness, ribbonColor,
// labels, ticks, format, tableLabels, tooltip, onSelect, animate, title, description, empty, legend, class, colors,
// width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture ChordChartLab.test.tsx checks.
// The buttons add gifts and empty / refill the data, so every change animation can be seen.

// Who gave how many gifts to whom, as flow rows. `k` grows two of the flows, so arcs and ribbons visibly turn to their
// new angles. The keys are Turkish on purpose (kimden = from, kime = to, adet = count) to show that source / target /
// value can name any key. Five rows: Ada ↔ Bora both ways, Ada → Cem, Cem ↔ Bora both ways.
const make = (k: number) => [
  { kimden: "Ada", kime: "Bora", adet: 5 + k }, { kimden: "Bora", kime: "Ada", adet: 3 }, { kimden: "Ada", kime: "Cem", adet: 2 },
  { kimden: "Cem", kime: "Bora", adet: 4 + k * 2 }, { kimden: "Bora", kime: "Cem", adet: 1 },
]

export function ChordChartLab() {
  let $k = 0          // drives the data: each click adds gifts
  let $empty = false  // shows the `empty` text when true
  let $picked = "—"   // last selected group or ribbon, written by onSelect
  // Main chart, prop by prop:
  // - data={() => …} + source / target / value: flow rows instead of a matrix; the function reads signals, so the
  //   chart redraws (and animates) when $k or $empty changes.
  // - names: fixes the order of the groups round the rim (otherwise the order they first appear in the rows).
  // - directed: each direction gets its own ribbon ending in an arrow at the target, so Ada → Bora and Bora → Ada stay
  //   apart (5 rows → 5 ribbons). Without it, the two directions of a pair share one ribbon.
  // - padAngle={0.06}: the gap between groups in radians; thickness={12}: the arc width in px.
  // - ribbonColor="target": a ribbon takes the color of the receiver ("source" is the default, "larger" the end that
  //   gives more).
  // - labels: group names round the rim (on by default); ticks={2}: value ticks every 2 gifts.
  // - format: the value text in tooltip, ticks and table ("hediye" = gifts); tableLabels: headers of the hidden table.
  // - tooltip: a function returning custom content from { kind, key, label, value, back, source, target, datum }.
  // - onSelect: called on click or Enter with a group or a ribbon; `kind` tells which, and the Lab shows it.
  // - animate={{ duration: 600, easing: "out", stagger: 40 }}: arcs and ribbons fan out from 12 o'clock one after
  //   another, then turn to new angles with a timed easing. Other forms: true (spring, default), false (no motion),
  //   "bounce" (an easing name), { enter: false } (skip the fan-out but keep updates), or (ctx) => … deciding per mark
  //   from { index, key, phase }. Reduced motion is honoured automatically.
  // - title / description: the SVG's accessible name and description; empty: text shown when data is [].
  // - legend="right": one toggle per person beside the chart (off by default, because the rim already names them);
  //   hiding a group turns the others to fill the circle.
  // - colors: one color per group; height: px; export: a toolbar button to download a PNG.
  // Keyboard: Tab focuses the chart, the arrow keys walk the groups round the rim and then the ribbons, Enter / Space
  // selects, Escape clears; the tooltip and the highlight follow the keyboard.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-empty, lab-picked, …) are hooks for ChordChartLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Hediye ekle</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <ChordChart class="lab-flows" data={() => ($empty ? [] : make($k))} names={["Ada", "Bora", "Cem"]} source="kimden" target="kime" value="adet"
      directed padAngle={0.06} thickness={12} ribbonColor="target" labels ticks={2} format={(n: number) => `${n} hediye`}
      tableLabels={{ source: "Kimden", target: "Kime", value: "Adet" }} tooltip={(p: { label: string; value: number }) => `${p.label}: ${p.value}`}
      onSelect={(p) => { $picked = `${p.kind} ${p.label}` }} animate={{ duration: 600, easing: "out", stagger: 40 }}
      title="Hediyeleşme" description="Kim kime kaç hediye verdi" empty="Hediye yok" legend="right"
      colors={["#f2801f", "#2f6fed", "#1fa463"]} height={280} export={["png"]} />
    {/* Second chart: the matrix form on a dark theme (m:theme="night"). matrix[i][j] is what group i gives group j, in
        the order of `names`. The matrix is symmetric and the chart is not directed, so each pair is one ribbon (three
        pairs → three ribbons). labels={false} and legend={false} leave only the shapes, animate={false} draws them in
        place, and width / height fix the size. */}
    <Card m:theme="night">
      <ChordChart class="lab-matrix" matrix={[[0, 4, 2], [4, 0, 6], [2, 6, 0]]} names={["X", "Y", "Z"]} labels={false} legend={false}
        width={220} height={200} title="Matris" animate={false} />
    </Card>
  </div>
}
