import { Heatmap } from "march/charts"
import { Button, Card } from "march/ui"

// Heatmap'in bütün özellikleri: data (sinyal), x, y, value, calendar ({ weeks }), end, xFormat, yFormat, xDomain,
// yDomain, format, levels, max, cell, valueLabel, tooltip, onSelect, animate, title, description, empty, class
const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum"]
const make = (k: number) => DAYS.flatMap((gun, d) => [9, 12, 15, 18].map((saat) => ({ gun, saat, kisi: ((d * 7 + saat + k * 5) % 13) })))
const END = new Date(2026, 10, 20)

export function HeatmapLab() {
  let $k = 1
  let $picked = "—"
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Yeni hafta</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <Heatmap class="lab-grid" data={() => ($empty ? [] : make($k))} x="saat" y="gun" value="kisi" xDomain={$empty ? undefined : [9, 12, 15, 18]} yDomain={$empty ? undefined : DAYS}
      xFormat={(h: number) => `${h}:00`} yFormat={(g: string) => g.toUpperCase()} format={(v: number) => `${v} kişi`} levels={4} max={12} cell={28}
      valueLabel="Kişi" animate tooltip={(c: { x: unknown; y: unknown; value: number | null }) => `${c.y} ${c.x}:00 → ${c.value} kişi`} onSelect={(c: { x: unknown; y: unknown; value: number | null }) => { $picked = `${c.y} ${c.x}:00` }}
      title="Toplantı odası" description="Gün ve saate göre oda kullanımı" empty="Kayıt yok" />
    <Card m:theme="night">
      <Heatmap class="lab-cal" data={() => make($k).map((r, i) => { const d = new Date(END); d.setDate(END.getDate() - i); return { x: d, value: r.kisi } })}
        calendar={{ weeks: 4 }} end={END} levels={5} title="Takvim" />
    </Card>
  </div>
}
