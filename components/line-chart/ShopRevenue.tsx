import { LineChart, AreaChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// bir e-ticaret panelinin gelir kartı: dönem seçilir, gelir ve gider çizgisi; altında etkin kullanıcıların alanı
const DAY = 864e5, START = Date.UTC(2026, 8, 1)
const wave = (i: number, base: number, amp: number, k: number) => Math.round(base + amp * Math.sin((i + k) / 3) + (amp / 2) * Math.cos((i * 7 + k) / 5) + i * base * 0.004)
const ALL = Array.from({ length: 90 }, (_, i) => ({ gun: START + i * DAY, gelir: wave(i, 42000, 9000, 1), gider: wave(i, 26000, 5000, 4), web: wave(i, 1800, 300, 2), uygulama: wave(i, 2600, 400, 5) }))

export function ShopRevenue() {
  let $range = "30"
  const rows = () => ALL.slice(-Number($range))
  return <Card title="Gelir ve gider" actions={[<Segmented size="sm" bind:value={$range} aria-label="Dönem" options={[{ value: "7", label: "7 gün" }, { value: "30", label: "30 gün" }, { value: "90", label: "90 gün" }]} />]}>
    <LineChart data={rows} x="gun" y={["gelir", "gider"]} series={{ gelir: "Gelir", gider: "Gider" }} format={["money", "TRY"]} xFormat="date" zoom title="Gelir ve gider" height={240} />
    <AreaChart data={rows} x="gun" y={["web", "uygulama"]} series={["Web", "Uygulama"]} stacked xFormat="date" title="Etkin kullanıcı" height={160} legend="right" />
  </Card>
}
