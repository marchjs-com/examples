// LineChartLab: the full-featured LineChart and AreaChart example; it uses every prop at least once.
//
// Props shown here: data (a signal or a function), x, y (a key, a getter, or a list of both), series, xType, xFormat,
// format, yMin, yMax, zero, grid, maxPoints, zoom, xLabel, tooltip, onSelect, stacked, title, description, empty,
// legend, class, colors, width and height.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// LineChartLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Accessibility (built in): the SVG has a title and description, a visually hidden data table carries every value for
// screen readers, Tab reaches the plot and the arrow keys move between points (Enter selects), and legend items are
// toggle buttons.
import { LineChart, AreaChart } from "march/charts"
import { Button, Card } from "march/ui"

// 24 hourly rows: "saat" is the hour, "ic" the indoor and "dis" the outdoor temperature, both made from a sine wave.
const rows = Array.from({ length: 24 }, (_, i) => ({ saat: i, ic: Math.round(18 + 6 * Math.sin((i - 9) / 4)), dis: Math.round(9 + 9 * Math.sin((i - 10) / 4)) }))

export function LineChartLab() {
  // Signals: the rows (replaced with changed copies by the first button), the point picked with onSelect, and whether
  // the data is emptied.
  let $data = rows
  let $picked = "—"
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The first button replaces the data with warmer copies; the chart follows because `data` below is a function
          that reads the signal. The second button toggles an empty data set to show the `empty` text. */}
      <Button class="lab-shift" size="sm" on:click={() => { $data = $data.map((r) => ({ ...r, dis: r.dis + 2 })) }}>Dışarısı ısınsın</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Veriyi boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    {/* The LineChart, prop by prop:
        - data: a function returning the rows (or [] when emptied), so the chart follows the signals it reads.
        - x="saat" with xType="linear": the x value is the hour, forced to a linear scale. xFormat writes the x labels
          (a function here); xLabel is the x column header of the hidden data table.
        - y: a list of series: a key ("ic") and a getter (the second item). series: their labels, in the same order
          (legend, tooltip, table). format: how values are written (a function here).
        - yMin / yMax: the value axis range. grid="both": horizontal and vertical grid lines.
        - zoom: drag across the plot to zoom into an x range (double click, Escape or "Reset zoom" resets).
        - maxPoints: a series with more points than this is downsampled.
        - legend="right": the legend is placed at the side. colors: one colour per series.
        - tooltip: a function that returns the tooltip text for a point. onSelect: called with the point that was
          clicked or chosen with Enter (here it writes the "picked" text).
        - title and description: the accessible name and the longer description. empty: shown when there is no data.
        - height: 240 px (the width is the container's). class: added to the chart, for tests and your CSS. */}
    <LineChart class="lab-line" data={() => ($empty ? [] : $data)} x="saat" xType="linear" xFormat={(h: number) => `${h}:00`} xLabel="Saat"
      y={["ic", (r: { dis: number }) => r.dis]} series={["İçeri", "Dışarı"]} format={(v: number) => `${v} °C`}
      yMin={0} yMax={30} grid="both" zoom maxPoints={500} legend="right" colors={["#f2801f", "#2f6fed"]}
      tooltip={(p: { x: unknown; y?: number | null; label?: unknown }) => `${p.label}: ${p.y} °C`} onSelect={(p: { x: unknown; y?: number | null; label?: unknown }) => { $picked = `${p.x}:00 · ${p.y} °C` }}
      title="Sıcaklık" description="İç ve dış sıcaklık, saat saat" empty="Ölçüm yok" height={240} />
    {/* The AreaChart takes the same data props and fills under the lines:
        - series as an object: { key: label }, the other form next to the list above.
        - stacked: the series are stacked on top of each other. zero: the value axis includes 0.
        - grid={false} and legend={false}: no grid and no legend. width / height: a fixed size in px.
        m:theme="night" on the Card draws the chart in the dark theme. */}
    <Card m:theme="night">
      <AreaChart class="lab-area" data={() => $data} x="saat" y={["ic", "dis"]} series={{ ic: "İçeri", dis: "Dışarı" }} stacked zero
        grid={false} legend={false} width={320} height={140} title="Yığılmış alan" />
    </Card>
  </div>
}
