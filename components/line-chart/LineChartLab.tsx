import { LineChart, AreaChart, ComboChart } from "march/charts"
import { Button, Card } from "march/ui"

// LineChartLab: every prop of LineChart, AreaChart and ComboChart in one place, as a reference to copy from.
// LineChart / AreaChart: data (a signal), x, y (keys, a getter and a series options object), series, xType, xFormat,
// format, yMin, yMax, zero, xTitle, yTitle, grid, curve, markers, connectNulls, marks, window, navigator, sync,
// maxPoints, zoom, resetLabel, xLabel, tooltip, onSelect, animate, export, title, description, empty, legend, class,
// colors, width, height; AreaChart: stacked, offset; ComboChart: per-series type and axis, y2Format, y2Min, y2Max, y2Title.
// The class names (lab-…) are hooks for LineChartLab.test.tsx.

// 24 hours of indoor and outdoor temperature; hour 13 has no outdoor reading (null), which draws as a gap.
const rows = Array.from({ length: 24 }, (_, i) => ({
  saat: i,
  ic: Math.round(18 + 6 * Math.sin((i - 9) / 4)),
  dis: i === 13 ? null : Math.round(9 + 9 * Math.sin((i - 10) / 4)),
  kwh: Math.round(20 + 14 * Math.sin((i - 7) / 3) + (i % 5)),
}))

export function LineChartLab() {
  // Plain `let $x` state: March turns it into a signal, so every chart that reads it redraws by itself.
  let $data = rows
  let $picked = "—"
  let $empty = false
  let $exported = "—"
  // A growing live feed: the "Canlı" chart below shows only its last 12 readings (window) and slides as rows arrive.
  let $live = rows.slice(0, 12)
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* A data change does not rebuild the chart: points are matched by x and tween to their new values. */}
      <Button class="lab-shift" size="sm" on:click={() => { $data = $data.map((r) => ({ ...r, dis: r.dis == null ? null : r.dis + 2 })) }}>Dışarısı ısınsın</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Veriyi boşalt / geri getir</Button>
      <Button class="lab-feed" size="sm" variant="ghost" on:click={() => { const n = $live.length; $live = [...$live, { ...rows[n % 24]!, saat: n }] }}>Canlı ölçüm ekle</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>

    {/*
      The main chart.
      - y mixes a key ("ic") and a getter: a getter needs no key, its series is named by `series` (aligned with y).
      - xType="linear" forces a number axis; xFormat turns 13 into "13:00"; xLabel heads the x column of the hidden table.
      - curve="smooth" never overshoots the data; markers="auto" draws dots only while the points are few.
      - The null reading at 13:00 leaves a gap; connectNulls={true} would draw across it instead.
      - marks: a target line, the average of the indoor series, a band of hours and a note on one point.
      - sync="lab" shares the crosshair with the energy chart below: hover one, both show that hour.
      - animate: an options object. duration / easing set the feel, stagger delays one series after the other;
        `false` turns all motion off, and reduced motion (the user's setting) always makes changes jump.
      - export adds PNG / SVG / CSV buttons; onExport tells you what was made.
      - Keyboard: Tab to the plot, ← → between hours, Enter selects (onSelect), Escape resets the zoom.
    */}
    <LineChart class="lab-line" data={() => ($empty ? [] : $data)} x="saat" xType="linear" xFormat={(h: number) => `${h}:00`} xLabel="Saat"
      y={["ic", (r: { dis: number | null }) => r.dis]} series={["İçeri", "Dışarı"]} format={(v: number) => `${v} °C`}
      yMin={0} yMax={30} zero grid="both" curve="smooth" markers="auto" connectNulls={false}
      marks={[{ y: 21, label: "Konfor", color: "success" }, { y: "average", series: "ic" }, { x: [9, 17], label: "Mesai", color: "brand-blue" }, { at: [15, 24], label: "En sıcak" }]}
      xTitle="Saat" yTitle="°C" sync="lab" zoom resetLabel="Tümünü göster" maxPoints={500} legend="right" colors={["#f2801f", "#2f6fed"]}
      animate={{ duration: 700, easing: "out", stagger: 120 }}
      export={{ formats: ["png", "csv"], filename: "sicaklik", onExport: (f: string) => { $exported = f } }}
      tooltip={(p: { x: unknown; y?: number | null; label?: unknown }) => `${p.label}: ${p.y} °C`}
      onSelect={(p: { x: unknown; y?: number | null }) => { $picked = `${p.x}:00 · ${p.y} °C` }}
      title="Sıcaklık" description="İç ve dış sıcaklık, saat saat" empty="Ölçüm yok" height={260} />
    <span class="lab-exported">Dışa aktarılan: {() => $exported}</span>

    {/*
      ComboChart: bars and a line on one x axis. Each series is an options object: `type` picks bar / line / area,
      `axis: "right"` puts the line on a second value axis with its own format and range. The sync name matches the
      chart above, so their crosshairs move together. animate="bounce" uses an easing name directly.
    */}
    <ComboChart class="lab-combo" data={() => $data} x="saat" xType="linear" xFormat={(h: number) => `${h}:00`}
      y={[{ key: "kwh", type: "bar", label: "Enerji" }, { key: "ic", type: "line", axis: "right", curve: "step", dash: "dashed", marker: "square", label: "İçeri" }]}
      format={(v: number) => `${v} kWh`} y2Format={(v: number) => `${v} °C`} y2Min={10} y2Max={30} yTitle="kWh" y2Title="°C"
      sync="lab" animate="bounce" height={220} title="Enerji ve sıcaklık" />

    {/*
      AreaChart, stacked as shares of 100 % (offset="expand"); "wiggle" would make a stream graph. Inside a night
      Card the chart takes the dark theme's colours by itself.
    */}
    <Card m:theme="night">
      <AreaChart class="lab-area" data={() => $data} x="saat" y={["ic", "kwh"]} series={{ ic: "İçeri", kwh: "Enerji" }} stacked offset="expand"
        grid={false} legend={false} width={320} height={140} animate={false} title="Yığılmış alan" />
    </Card>

    {/*
      A live chart: data keeps growing, `window={12}` keeps the last 12 rows, and the navigator under it shows the
      whole feed with a window you can drag (or pull at its edges) to look back. Its edges are keyboard sliders.
    */}
    <LineChart class="lab-live" data={() => $live} x="saat" xType="linear" y="ic" series="İçeri" window={12} navigator={56}
      height={180} legend={false} title="Canlı" />
  </div>
}
