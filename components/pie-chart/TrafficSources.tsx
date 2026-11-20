import { PieChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// sitenin trafik kaynakları: hafta ya da ay seçilir, dilimler yeni paylarına döner; bir dilime tıklamak onu süzer
const DATA: Record<string, { label: string; value: number }[]> = {
  week: [{ label: "Arama", value: 4200 }, { label: "Doğrudan", value: 2100 }, { label: "Sosyal", value: 1800 }, { label: "E-posta", value: 640 }],
  month: [{ label: "Arama", value: 16400 }, { label: "Doğrudan", value: 9800 }, { label: "Sosyal", value: 11200 }, { label: "E-posta", value: 3100 }],
}

export function TrafficSources() {
  let $range = "week"
  let $source = "Hepsi"
  return <Card title="Trafik kaynakları" actions={[<Segmented size="sm" bind:value={$range} aria-label="Dönem" options={[{ value: "week", label: "Bu hafta" }, { value: "month", label: "Bu ay" }]} />]}>
    <PieChart data={() => DATA[$range]} donut={0.7} padAngle={0.02} format="compact" animate="out" legend="bottom" title="Trafik kaynakları"
      onSelect={(p: { label: unknown; share: number }) => { $source = String(p.label) }} height={240} />
    <p sx={{ text: "sm", color: "muted" }}>Süzgeç: {() => $source}</p>
  </Card>
}
