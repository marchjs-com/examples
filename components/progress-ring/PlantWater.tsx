import { ProgressRing } from "march/charts"
import { Button } from "march/ui"

// saksı bitkisinin su seviyesi: her gün biraz azalır, "Sula" doldurur; düşükte kırmızı, ortada sarı, dolu yeşil
export function PlantWater() {
  let $water = 64
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
    <ProgressRing value={$water} size={96} thickness={12} label="Su seviyesi" format={(v: number) => `${Math.round(v)}%`} />
    <div sx={{ flex: "col", gap: 2 }}>
      <Button on:click={() => { $water = Math.min(100, $water + 30) }}>🪴 Sula</Button>
      <Button variant="ghost" on:click={() => { $water = Math.max(0, $water - 15) }}>☀️ Bir gün geçsin</Button>
    </div>
  </div>
}
