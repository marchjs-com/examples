import { BarChart } from "march/charts"
import { Button, Card } from "march/ui"

// BarChartLab: every prop of BarChart in one place, as a reference to copy from: data (a signal), x, y (a key list
// with a getter), series, horizontal, orientation, stacked, xFormat, format, yMin, yMax, grid, labels, marks, xLabel,
// tooltip, onSelect, animate, export, title, description, empty, legend, class, colors, width, height.
// The class names (lab-…) are hooks for BarChartLab.test.tsx.
const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz"]
const make = (k: number) => MONTHS.map((ay, i) => ({ ay, yeni: 20 + ((i * 7 + k * 5) % 9) * 6, eski: 30 + ((i * 3 + k * 7) % 8) * 5 }))

export function BarChartLab() {
  // `let $x` is reactive state: "Yeni veri" bumps $k, the data function below re-runs and the bars glide.
  let $k = 1
  // Fewer months: the bars of the dropped months sink to the baseline before they leave (the exit animation).
  let $short = false
  let $picked = "—"
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Yeni veri</Button>
      <Button class="lab-short" size="sm" variant="ghost" on:click={() => { $short = !$short }}>Üç ay / altı ay</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    {/*
      The main chart.
      - y mixes a key and a getter; `series` names both (legend, tooltip, the hidden data table).
      - labels="outside" writes each value past its bar end; the label rides along while the bar animates.
      - marks draw a target line and the average of the first series behind / above the bars.
      - animate: an options object. Bars grow from the baseline one month after another (stagger), glide to new
        values with the spring-wobbly easing and sink when they leave. `animate={false}` turns all of it off;
        the user's reduced-motion setting always makes changes jump.
      - export adds PNG / SVG / CSV download buttons (shown on hover or focus).
      - Keyboard: Tab to the chart, ← → move between months, Enter selects (onSelect).
    */}
    <BarChart class="lab-bars" data={() => ($empty ? [] : make($k).slice(0, $short ? 3 : 6))} x="ay" xFormat={(m: string) => m.toUpperCase()} xLabel="Ay"
      y={["yeni", (r: { eski: number }) => r.eski]} series={["Yeni üye", "Eski üye"]} format={(v: number) => `${v} kişi`}
      yMin={0} yMax={100} grid labels="outside" marks={[{ y: 70, label: "Hedef", color: "success" }, { y: "average" }]}
      animate={{ easing: "spring-wobbly", stagger: 60 }} export legend="bottom" colors={["#f2801f", "#2f6fed"]}
      tooltip={(p: { x: unknown; y?: number | null; label?: unknown }) => `${p.x}: ${p.y} kişi`} onSelect={(p: { x: unknown; y?: number | null; label?: unknown }) => { $picked = `${p.x} · ${p.y}` }}
      title="Üye artışı" description="Ay ay yeni ve eski üyeler" empty="Henüz veri yok" height={240} />
    {/* Stacked and lying down (orientation="horizontal"); labels="inside" writes the values inside the bars.
        Inside a night Card the chart takes the dark theme's colours by itself. */}
    <Card m:theme="night">
      <BarChart class="lab-stack" labels="inside" data={() => make($k)} x="ay" y={["yeni", "eski"]} stacked orientation="horizontal" grid={false} legend={false}
        width={320} height={200} title="Yığılmış, yatay" />
    </Card>
  </div>
}
