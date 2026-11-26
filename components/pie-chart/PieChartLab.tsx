import { PieChart } from "march/charts"
import { Button, Card } from "march/ui"

// PieChartLab: every prop of PieChart in one place, as a reference to copy from: data (a signal), x, y, format, donut
// (true and a ratio), padAngle, center, labels, pop, xLabel, yLabel, tooltip, onSelect, animate, export, title,
// description, empty, legend, class, colors, width, height. The class names (lab-…) are hooks for the tests.
const make = (k: number) => [{ ad: "Kira", tutar: 14000 }, { ad: "Mutfak", tutar: 5000 + k * 700 }, { ad: "Ulaşım", tutar: 2400 }, { ad: "Eğlence", tutar: 1200 + k * 400 }]

export function PieChartLab() {
  // Reactive state: "Harcama ekle" grows two slices (they turn to their new angles), "Eğlenceyi çıkar" drops one
  // (it closes onto its middle before it leaves), "Boşalt" shows the empty text.
  let $k = 1
  let $noFun = false
  let $picked = "—"
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Harcama ekle</Button>
      <Button class="lab-fun" size="sm" variant="ghost" on:click={() => { $noFun = !$noFun }}>Eğlenceyi çıkar / ekle</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    {/*
      The main chart: a donut with its own centre text, a gap between slices (padAngle), percentages on the slices
      (labels), the active slice moving out by 10 px (pop) and money formatting. animate: slices open one after
      another on the first draw (stagger), then turn to new angles; `animate={false}` turns motion off, reduced motion
      always jumps. export adds download buttons. Keyboard: Tab to the chart, ← → between slices, Enter selects.
    */}
    <PieChart class="lab-pie" data={() => ($empty ? [] : make($k).filter((r) => !$noFun || r.ad !== "Eğlence"))} x="ad" y="tutar" format={["money", "TRY"]} xLabel="Kalem" yLabel="Tutar"
      donut center={`${make($k).length} kalem`} padAngle={0.03} labels="percent" pop={10} animate={{ easing: "out", duration: 650, stagger: 90 }} export legend="right" colors={["#f2801f", "#2f6fed", "#1fa463", "#8e44ad"]}
      tooltip={(p: { label: unknown; share: number }) => `${p.label}: %${Math.round(p.share * 100)}`} onSelect={(p: { label: unknown; share: number }) => { $picked = `${p.label} %${Math.round(p.share * 100)}` }}
      title="Bütçe" description="Ayın harcamaları kalem kalem" empty="Harcama yok" height={220} />
    {/* A plain pie (donut={false}) without a legend, on a night Card; it has no centre text. */}
    <Card m:theme="night">
      <PieChart class="lab-plain" data={() => make($k)} x="ad" y="tutar" donut={false} legend={false} width={200} height={160} title="Düz pasta" />
    </Card>
  </div>
}
