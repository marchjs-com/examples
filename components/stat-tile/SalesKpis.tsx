import { StatTile, Card } from "march/ui"

// bir satış panelinin göstergeleri: önce etiket, sola hizalı kart karolar; biri rapora bağlantı, biri pasif
const KPIS = [
  { label: "Ciro", value: "₺248.300", hint: "geçen aya göre %12 ↑", color: "success" as const },
  { label: "Sipariş", value: "1.284", hint: "günde ortalama 41" },
  { label: "İade oranı", value: "%2,1", hint: "hedef %3'ün altında", color: "brand-blue" as const },
]

export function SalesKpis() {
  return <Card title="Kasım özeti">
    <div sx={{ grid: "fit", gap: 3 }}>
      {KPIS.map((k) => <StatTile variant="card" align="start" order="label" size="lg" label={k.label} value={k.value} hint={k.hint} m:color={k.color} />)}
      <StatTile variant="tile" align="start" order="label" label="Ayrıntılı rapor" value="Aç →" href="#rapor" />
      <StatTile variant="tile" align="start" order="label" label="Tahmin" value="Yakında" href="#tahmin" disabled />
    </div>
  </Card>
}
