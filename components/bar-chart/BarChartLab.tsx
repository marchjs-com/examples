// BarChartLab: the full-featured BarChart example; it uses every prop at least once.
//
// Props shown here: data (a function, so it stays live), x, y (a key and a getter in one list), series, horizontal /
// orientation, stacked, xFormat, format, yMin, yMax, grid, xLabel, tooltip, onSelect, animate, title, description,
// empty, legend, class, colors, width and height.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// BarChartLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { BarChart } from "march/charts"
import { Button, Card } from "march/ui"

// Demo data: six months, and a function that makes new numbers for each "round" k so the bars have something to
// animate to. Each row is { ay, yeni, eski }: the month and two series of values.
const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz"]
const make = (k: number) => MONTHS.map((ay, i) => ({ ay, yeni: 20 + ((i * 7 + k * 5) % 9) * 6, eski: 30 + ((i * 3 + k * 7) % 8) * 5 }))

export function BarChartLab() {
  // The round number (new data), the text of the last selected bar and the "no data" switch. Plain `let $x`
  // variables are reactive state.
  let $k = 1
  let $picked = "—"
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Yeni veri</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    {/* The first chart (grouped bars, two series):
        - data as a function: the chart re-reads it whenever $k or $empty change; an empty list shows `empty`.
        - x="ay": the category key. xFormat: formats the category labels (here upper case). xLabel: the header of the
          x column in the hidden data table that screen readers get.
        - y: a list with a key ("yeni") and a getter (a function of the row) for the second series. series: the labels
          of those series, in the same order (legend, tooltip, table). format: how values are written.
        - yMin / yMax: the value axis range (rounded to nice ticks). grid: grid lines.
        - animate="spring-wobbly": bars glide to new values with that spring when the data changes (true gives the
          default spring, an easing name such as "out" gives a plain ease). It follows the global speed / "Stop all"
          settings, and with reduced motion the bars jump to the new values.
        - legend="bottom": where the legend goes; its items are toggle buttons that hide a series.
        - colors: one colour per series, instead of the palette.
        - tooltip: a function building the hover (and keyboard) text of a bar. onSelect: called when a bar is clicked
          or chosen with Enter; the Lab prints it. Keyboard: Tab reaches the plot, arrow keys move between bars.
        - title / description: the SVG's accessible name and description. height: pixels (width defaults to the
          container's width). class: added to the root so CSS or a test can find this chart. */}
    <BarChart class="lab-bars" data={() => ($empty ? [] : make($k))} x="ay" xFormat={(m: string) => m.toUpperCase()} xLabel="Ay"
      y={["yeni", (r: { eski: number }) => r.eski]} series={["Yeni üye", "Eski üye"]} format={(v: number) => `${v} kişi`}
      yMin={0} yMax={100} grid animate="spring-wobbly" legend="bottom" colors={["#f2801f", "#2f6fed"]}
      tooltip={(p: { x: unknown; y?: number | null; label?: unknown }) => `${p.x}: ${p.y} kişi`} onSelect={(p: { x: unknown; y?: number | null; label?: unknown }) => { $picked = `${p.x} · ${p.y}` }}
      title="Üye artışı" description="Ay ay yeni ve eski üyeler" empty="Henüz veri yok" height={240} />
    {/* The second chart shows the "other" switches: stacked puts the series on top of each other, orientation=
        "horizontal" lays the bars down (horizontal is the short form), grid={false} and legend={false} remove the
        grid and the legend, width and height fix the size. m:theme="night" on the Card puts it on a dark surface. */}
    <Card m:theme="night">
      <BarChart class="lab-stack" data={() => make($k)} x="ay" y={["yeni", "eski"]} stacked orientation="horizontal" grid={false} legend={false}
        width={320} height={200} title="Yığılmış, yatay" />
    </Card>
  </div>
}
