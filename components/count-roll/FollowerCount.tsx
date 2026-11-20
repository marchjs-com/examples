import { CountRoll, Button } from "march/ui"

// takipçi sayısı: kısa biçim (12,4 B); takip et düğmesi bir artırır
export function FollowerCount() {
  let $n = 12480
  let $on = false
  return <div sx={{ flex: ["row", "center"], gap: 3 }}>
    <span><strong><CountRoll value={$n} format="compact" /></strong> takipçi</span>
    <Button size="sm" variant={$on ? "secondary" : "primary"} on:click={() => { $on = !$on; $n += $on ? 1 : -1 }}>{$on ? "Takip ediliyor" : "Takip et"}</Button>
  </div>
}
