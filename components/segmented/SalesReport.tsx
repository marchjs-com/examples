import { Segmented, Card, Badge } from "march/ui"
import { list, grid, sun, calendar, columns } from "march/icons"

// satış panelinin başlığı: dönem seçimi (yıllık görünüm planda kapalı, nedeni ipucunda) ve yalnız ikonlu liste / ızgara
const periods = [
  { value: "day", label: "Gün", icon: sun }, { value: "week", label: "Hafta", icon: calendar }, { value: "month", label: "Ay", icon: columns },
  { value: "year", label: "Yıl", disabled: true, title: "Yıllık rapor Pro planda" },
]
const views = [{ value: "list", label: "", icon: list, title: "Liste" }, { value: "grid", label: "", icon: grid, title: "Izgara" }]
const sales = { day: { total: "18.450 ₺", orders: 42, change: "+%6" }, week: { total: "126.900 ₺", orders: 311, change: "+%12" }, month: { total: "534.200 ₺", orders: 1288, change: "-%3" } }

export function SalesReport() {
  let $period = "week"
  let $view = "list"
  const $now = sales[$period as keyof typeof sales]
  return <Card title="Satışlar" actions={<Segmented bind:value={$view} options={views} aria-label="Görünüm" />}>
    <div sx={{ flex: "col", gap: 3 }}>
      <Segmented bind:value={$period} indicator="slide" m:color="brand-blue" options={periods} aria-label="Dönem" />
      <div sx={{ flex: $view === "list" ? "col" : "row", gap: 2 }}>
        <span sx={{ text: ["xl", "bold"] }}>{$now.total}</span>
        <span sx={{ color: "muted" }}>{$now.orders} sipariş</span>
        <Badge tone={$now.change.startsWith("+") ? "success" : "danger"}>{$now.change}</Badge>
      </div>
    </div>
  </Card>
}
