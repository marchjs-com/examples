import { PieChart } from "march/charts"
import { Button, Card } from "march/ui"

// PieChart'ın bütün özellikleri: data (sinyal), x, y, format, donut (true ve oran), padAngle, center, xLabel, yLabel,
// tooltip, onSelect, animate, title, description, empty, legend, class, colors, width, height
const make = (k: number) => [{ ad: "Kira", tutar: 14000 }, { ad: "Mutfak", tutar: 5000 + k * 700 }, { ad: "Ulaşım", tutar: 2400 }, { ad: "Eğlence", tutar: 1200 + k * 400 }]

export function PieChartLab() {
  let $k = 1
  let $picked = "—"
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Harcama ekle</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <PieChart class="lab-pie" data={() => ($empty ? [] : make($k))} x="ad" y="tutar" format={["money", "TRY"]} xLabel="Kalem" yLabel="Tutar"
      donut center={`${make($k).length} kalem`} padAngle={0.03} animate legend="right" colors={["#f2801f", "#2f6fed", "#1fa463", "#8e44ad"]}
      tooltip={(p: { label: unknown; share: number }) => `${p.label}: %${Math.round(p.share * 100)}`} onSelect={(p: { label: unknown; share: number }) => { $picked = `${p.label} %${Math.round(p.share * 100)}` }}
      title="Bütçe" description="Ayın harcamaları kalem kalem" empty="Harcama yok" height={220} />
    <Card m:theme="night">
      <PieChart class="lab-plain" data={() => make($k)} x="ad" y="tutar" donut={false} legend={false} width={200} height={160} title="Düz pasta" />
    </Card>
  </div>
}
