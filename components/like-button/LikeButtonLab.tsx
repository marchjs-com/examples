import { LikeButton } from "march/ui"
import { star } from "march/icons"

// LikeButton'ın özellikleri: liked, onToggle, count, size, burst, colors, label, icon (öğe ya da işlev), pop,
// burstOptions, countFormat, class
export function LikeButtonLab() {
  let $on = false
  let $n = 1999
  return <div sx={{ flex: "col", gap: 2 }}>
    <LikeButton class="lab-like" liked={$on} count={$n} countFormat="compact" onToggle={(v: boolean) => { $on = v; $n += v ? 1 : -1 }}
      label="Beğen" pop={false} burst={false} burstOptions={{ ring: false }} />
    <LikeButton class="lab-own" liked={true} onToggle={() => {}} size="sm" colors="single" icon={(on: boolean) => <span>{on ? "★" : "☆"}</span>} />
    <span class="lab-n">{$n}</span>
  </div>
}
