import { BarChart } from "march/charts"
import { Button, Card } from "march/ui"

// BarChart'ın bütün özellikleri: data (sinyal), x, y (liste ve getter), series, horizontal, orientation, stacked,
// xFormat, format, yMin, yMax, grid, xLabel, tooltip, onSelect, animate, title, description, empty, legend, class,
// colors, width, height
const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz"]
const make = (k: number) => MONTHS.map((ay, i) => ({ ay, yeni: 20 + ((i * 7 + k * 5) % 9) * 6, eski: 30 + ((i * 3 + k * 7) % 8) * 5 }))

export function BarChartLab() {
  let $k = 1
  let $picked = "—"
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Yeni veri</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <BarChart class="lab-bars" data={() => ($empty ? [] : make($k))} x="ay" xFormat={(m: string) => m.toUpperCase()} xLabel="Ay"
      y={["yeni", (r: { eski: number }) => r.eski]} series={["Yeni üye", "Eski üye"]} format={(v: number) => `${v} kişi`}
      yMin={0} yMax={100} grid animate="spring-wobbly" legend="bottom" colors={["#f2801f", "#2f6fed"]}
      tooltip={(p: { x: unknown; y?: number | null; label?: unknown }) => `${p.x}: ${p.y} kişi`} onSelect={(p: { x: unknown; y?: number | null; label?: unknown }) => { $picked = `${p.x} · ${p.y}` }}
      title="Üye artışı" description="Ay ay yeni ve eski üyeler" empty="Henüz veri yok" height={240} />
    <Card m:theme="night">
      <BarChart class="lab-stack" data={() => make($k)} x="ay" y={["yeni", "eski"]} stacked orientation="horizontal" grid={false} legend={false}
        width={320} height={200} title="Yığılmış, yatay" />
    </Card>
  </div>
}
