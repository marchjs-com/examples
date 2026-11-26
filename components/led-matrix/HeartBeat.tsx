// HeartBeat: the creative-minimal LedMatrix example.
//
// A heart drawn as text, one string per row, that beats: every half second the picture swaps between a big and a small
// heart. LedMatrix repaints only the LEDs that changed, so a picture can change as often as you like.
import { LedMatrix } from "march/led"
import { onFrame } from "march/motion"

// Pixel art as text: "." is off, any other character is lit; the palette colors "r".
const BIG = [".rr.rr.", "rrrrrrr", "rrrrrrr", ".rrrrr.", "..rrr..", "...r..."]
const SMALL = [".......", "..r.r..", ".rrrrr.", "..rrr..", "...r...", "......."]

export function HeartBeat() {
  let $big = true
  // The beat runs on the motion engine's clock (onFrame), not setInterval: global speed and "pause all" act on it, and
  // it stops with the component. `t` is the clock time in ms.
  onFrame((t) => { const b = Math.floor(t / 500) % 2 === 0; if (b !== $big) $big = b })
  // frame takes a function, so the screen follows $big. pitch is the size of one LED in px.
  return <LedMatrix frame={() => ($big ? BIG : SMALL)} palette={{ r: "#ff3355" }} pitch={22} bloom={10} label="Atan kalp" />
}
