import { LineChart, AreaChart } from "march/charts"
import { Button, Card } from "march/ui"

// LineChart ve AreaChart'ın bütün özellikleri: data (sinyal), x, y (liste ve getter), series, xType, xFormat, format,
// yMin, yMax, zero, grid, maxPoints, zoom, xLabel, tooltip, onSelect, stacked, title, description, empty, legend,
// class, colors, width, height
const rows = Array.from({ length: 24 }, (_, i) => ({ saat: i, ic: Math.round(18 + 6 * Math.sin((i - 9) / 4)), dis: Math.round(9 + 9 * Math.sin((i - 10) / 4)) }))

export function LineChartLab() {
  let $data = rows
  let $picked = "—"
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-shift" size="sm" on:click={() => { $data = $data.map((r) => ({ ...r, dis: r.dis + 2 })) }}>Dışarısı ısınsın</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Veriyi boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <LineChart class="lab-line" data={() => ($empty ? [] : $data)} x="saat" xType="linear" xFormat={(h: number) => `${h}:00`} xLabel="Saat"
      y={["ic", (r: { dis: number }) => r.dis]} series={["İçeri", "Dışarı"]} format={(v: number) => `${v} °C`}
      yMin={0} yMax={30} grid="both" zoom maxPoints={500} legend="right" colors={["#f2801f", "#2f6fed"]}
      tooltip={(p: { x: unknown; y?: number | null; label?: unknown }) => `${p.label}: ${p.y} °C`} onSelect={(p: { x: unknown; y?: number | null; label?: unknown }) => { $picked = `${p.x}:00 · ${p.y} °C` }}
      title="Sıcaklık" description="İç ve dış sıcaklık, saat saat" empty="Ölçüm yok" height={240} />
    <Card m:theme="night">
      <AreaChart class="lab-area" data={() => $data} x="saat" y={["ic", "dis"]} series={{ ic: "İçeri", dis: "Dışarı" }} stacked zero
        grid={false} legend={false} width={320} height={140} title="Yığılmış alan" />
    </Card>
  </div>
}
