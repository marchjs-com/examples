// OrderStatus: the real-life PixelSprite example.
//
// A café's pickup screen: each order shows a pixel icon for its state (brewing coffee, ready check, a bell to call the
// customer) next to the name. Your own sprite (the `.led.json` format) joins the built-in ones with defineSprite, and
// then works as `:name:` in any LED text too.
import { PixelSprite, PixelFont, defineSprite, Card } from "march/ui"

// Your own sprite: frames of rows ("." off), a palette for its characters and a frame rate. This is exactly what a
// `.led.json` file holds, so a designer can draw it in a pixel editor and you can load it with parseLedJson.
defineSprite("cup-steam", {
  fps: 3,
  palette: { w: "#e8e8e8", b: "#b0703f" },
  frames: [
    ["..w.w...", "...w.w..", "........", "bbbbbb..", "bbbbbbbb", "bbbbbb.b", "bbbbbbb.", ".bbbb..."],
    ["...w.w..", "..w.w...", "........", "bbbbbb..", "bbbbbbbb", "bbbbbb.b", "bbbbbbb.", ".bbbb..."],
  ],
})

const ORDERS = [
  { name: "Ayşe", state: "brewing" },
  { name: "Mert", state: "ready" },
  { name: "Deniz", state: "called" },
] as const
// one sprite and one sentence per state; the sentence is the sprite's label, so the icon is never the only signal
const ICON = { brewing: ["cup-steam", "Hazırlanıyor"], ready: ["check", "Hazır"], called: ["bell", "Çağrıldı"] } as const

export function OrderStatus() {
  return <Card title="Teslim ekranı">
    <div sx={{ flex: "col", gap: 2 }}>
      {ORDERS.map((o) => <div sx={{ flex: "row", gap: 3 }}>
        <PixelSprite sprite={ICON[o.state][0]} pitch={5} label={ICON[o.state][1]} />
        <PixelFont text={o.name} color="amber" pitch={4} />
      </div>)}
    </div>
  </Card>
}
