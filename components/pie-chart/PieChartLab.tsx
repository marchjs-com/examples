// PieChartLab: the full-featured PieChart example; it uses every prop at least once.
//
// PieChart shows shares of a whole as a pie or a donut. `x` names each slice, `y` gives its value. Props shown here: data
// (a function, so it is live), x, y, format, donut (true or an inner-radius ratio, or false for a plain pie), padAngle,
// center, xLabel, yLabel, tooltip, onSelect, animate, title, description, empty, legend, class, colors, width and height.
// Motion: with `animate` the slices turn to their new angles when the data changes; with reduced motion they take their
// new angles in place, and the global speed and "Stop all" of the motion engine apply.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PieChartLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { PieChart } from "march/charts"
import { Button, Card } from "march/ui"

// Rows of the data: ad (name) and tutar (amount). `k` makes two of the amounts grow, so the "add expense" button changes
// the chart.
const make = (k: number) => [{ ad: "Kira", tutar: 14000 }, { ad: "Mutfak", tutar: 5000 + k * 700 }, { ad: "Ulaşım", tutar: 2400 }, { ad: "Eğlence", tutar: 1200 + k * 400 }]

export function PieChartLab() {
  // Reactive state: how many expenses were added, the last selected slice, and whether the data is emptied.
  let $k = 1
  let $picked = "—"
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Harcama ekle</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    {/* The first chart uses most props:
        - data as a function: re-read when its signals change; an empty array shows the `empty` content.
        - x / y: which key of a row is the slice's name and which is its value (the defaults are "label" and "value").
        - format={["money", "TRY"]}: how values are written (a pipe name with arguments, or a function). xLabel / yLabel:
          the column headers of the visually hidden data table that screen readers use.
        - donut: a ring (inner radius 60 %); a number such as 0.7 sets the inner radius ratio. center: content in the hole
          (the default is the formatted total). padAngle: the gap between slices in radians (the default is 0.01).
        - animate: slices turn to their new angles when the data changes. legend="right": the legend beside the chart;
          its items are toggle buttons that hide a slice (aria-pressed). colors: one colour per slice.
        - tooltip: a function that builds the tooltip text for a slice (or false to turn it off). onSelect: called with
          the clicked or Enter-pressed slice ({ label, value, share, datum }); the keyboard reaches slices with the arrow
          keys.
        - title / description: the SVG's accessible name and longer description. height: the size in pixels.
        - class: a class on the root, for CSS or tests. */}
    <PieChart class="lab-pie" data={() => ($empty ? [] : make($k))} x="ad" y="tutar" format={["money", "TRY"]} xLabel="Kalem" yLabel="Tutar"
      donut center={`${make($k).length} kalem`} padAngle={0.03} animate legend="right" colors={["#f2801f", "#2f6fed", "#1fa463", "#8e44ad"]}
      tooltip={(p: { label: unknown; share: number }) => `${p.label}: %${Math.round(p.share * 100)}`} onSelect={(p: { label: unknown; share: number }) => { $picked = `${p.label} %${Math.round(p.share * 100)}` }}
      title="Bütçe" description="Ayın harcamaları kalem kalem" empty="Harcama yok" height={220} />
    {/* m:theme="night" on the Card makes the card and everything inside use the dark theme tokens. The second chart is a
        plain pie: donut={false} (no hole), legend={false} (no legend) and a fixed width and height. */}
    <Card m:theme="night">
      <PieChart class="lab-plain" data={() => make($k)} x="ad" y="tutar" donut={false} legend={false} width={200} height={160} title="Düz pasta" />
    </Card>
  </div>
}
