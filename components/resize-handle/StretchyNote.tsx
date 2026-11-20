import { ResizeHandle } from "march/ui"

// esnek not kâğıdı: sağ kenardan genişler; genişlik yazının boyunu da büyütür
export function StretchyNote() {
  let $w = 220
  return <div class="m-card" style={{ position: "relative", "inline-size": `${$w}px` }} sx={{ p: 3 }}>
    <p style={{ "font-size": `${Math.round($w / 14)}px` }}>Merhaba!</p>
    <ResizeHandle value={() => $w} set={(w: number) => $w = w} min={160} max={420} reset={() => $w = 220} label="Not genişliği" m:color="brand-orange" />
  </div>
}
