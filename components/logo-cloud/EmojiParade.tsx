// EmojiParade: the creative-minimal LogoCloud example.
//
// What it shows: a parade of fruit emoji in an endless sliding strip, with two buttons that make it slower or faster. The
// current speed is shown between them.
// When to use this pattern: a ticker of logos, badges or any small items. `variant="marquee"` runs the items as an endless
// ticker; `speed` (px per second) is the only thing you need to tune.
//
// Animation: the marquee fades at its edges, stops while it is off screen, and stays still under reduced motion; the
// global speed and pause apply too. The `speed` prop sets the base speed in px/s.
// Accessibility: each item is named by its `name`; the duplicated copies that make the loop seamless are hidden from
// assistive technology, so every name is read once.
import { LogoCloud } from "march/landing"
import { Button } from "march/ui"

// The fruits and their names (the accessible names), in the same order.
const FRUITS = ["🍎", "🍌", "🍇", "🍉", "🍓", "🥝", "🍍", "🥥"]
const NAMES = ["Elma", "Muz", "Üzüm", "Karpuz", "Çilek", "Kivi", "Ananas", "Hindistan cevizi"]

export function EmojiParade() {
  // The speed in px per second, a signal. The buttons keep it between 10 and 160 in steps of 20.
  let $speed = 40
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button variant="secondary" on:click={() => $speed = Math.max(10, $speed - 20)}>Yavaşla</Button>
      <strong>{`${$speed} px/sn`}</strong>
      <Button variant="secondary" on:click={() => $speed = Math.min(160, $speed + 20)}>Hızlan</Button>
    </div>
    {/* The cloud sits in a live region that reads $speed, so it is built again when the speed changes.
        - variant="marquee": the endless ticker instead of the grid.
        - mono={false}: keep each item's own colours (by default logos share one muted tone and show colour on hover;
          emoji would look washed out in it).
        - speed: px per second. title: a small heading.
        - logos: { name, node } per item; the node is a large emoji here. */}
    {() => {
      const speed = $speed
      return <LogoCloud variant="marquee" mono={false} speed={speed} title="Meyve geçidi"
      logos={FRUITS.map((f, i) => ({ name: NAMES[i]!, node: <span sx={{ text: "2xl" }}>{f}</span> }))} />
    }}
  </div>
}
