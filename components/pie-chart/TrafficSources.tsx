import { PieChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// TrafficSources: a real-life analytics card. Where a site's visitors come from, this week or this month. Switching the
// period turns the slices to their new shares; clicking a slice picks it as a filter (wire onSelect to your own data).
const DATA: Record<string, { label: string; value: number }[]> = {
  week: [{ label: "Arama", value: 4200 }, { label: "Doğrudan", value: 2100 }, { label: "Sosyal", value: 1800 }, { label: "E-posta", value: 640 }],
  month: [{ label: "Arama", value: 16400 }, { label: "Doğrudan", value: 9800 }, { label: "Sosyal", value: 11200 }, { label: "E-posta", value: 3100 }],
}

export function TrafficSources() {
  let $range = "week"
  let $source = "Hepsi"
  return <Card title="Trafik kaynakları" actions={[<Segmented size="sm" bind:value={$range} aria-label="Dönem" options={[{ value: "week", label: "Bu hafta" }, { value: "month", label: "Bu ay" }]} />]}>
    {/* donut={0.7}: a thin ring; format="compact" writes 16 400 as "16K"; animate="out" is a calm easing for a
        dashboard. Keyboard: Tab to the chart, ← → between sources, Enter picks one (onSelect). */}
    <PieChart data={() => DATA[$range]} donut={0.7} padAngle={0.02} format="compact" animate="out" legend="bottom" title="Trafik kaynakları"
      onSelect={(p: { label: unknown; share: number }) => { $source = String(p.label) }} height={240} />
    <p sx={{ text: "sm", color: "muted" }}>Süzgeç: {() => $source}</p>
  </Card>
}
