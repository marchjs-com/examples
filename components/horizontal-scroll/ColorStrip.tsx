import { HorizontalScroll } from "march/landing"
import { Button } from "march/ui"
import { plus } from "march/icons"

// renk şeridi: her basışta yeni bir renk paneli eklenir, şerit yana kayarak uzar (sabitlenmeden, yerel kaydırma)
const COLORS = ["#ff7a59", "#ffb347", "#7c5cff", "#2bb8ff", "#3ecf8e", "#ff5fa2"]

const Swatch = (p: { color: string; n: number }) =>
  <div style={{ background: p.color, color: "#fff", "min-height": "9rem", "border-radius": "1rem", padding: "1rem" }}>
    <strong sx={{ text: "xl" }}>{String(p.n).padStart(2, "0")}</strong>
    <p>{p.color}</p>
  </div>

export function ColorStrip() {
  let $count = 3
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button icon={plus} on:click={() => $count = $count + 1}>Renk ekle ({$count})</Button>
    {() => {
      const n = $count
      return <HorizontalScroll pinned={false} panel="10rem" label="Renk şeridi">
        {Array.from({ length: n }, (_, i) => <Swatch color={COLORS[i % COLORS.length]!} n={i + 1} />)}
      </HorizontalScroll>
    }}
  </div>
}
