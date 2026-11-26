import { ScatterChart } from "march/charts"
import { Button } from "march/ui"

// A jar of fireflies: a playful, minimal ScatterChart used as a little animation toy.
// Each firefly is a point; its size is how brightly it glows. "Salla" (shake) sends every firefly drifting to a new
// spot with a wobbly spring, "Bir tane daha" (one more) adds a firefly that grows in from nothing.
// It shows the three motion phases of a scatter chart in one place: enter (a new point grows), update (points glide)
// and exit (after 24 the count drops back to 6 and the extra points shrink away).

// Position and glow of firefly `i` after `k` shakes. Sines and cosines keep it deterministic (the same on every load)
// while still looking random; x and y stay inside 0–100, which matches the fixed axes below.
const spot = (i: number, k: number) => ({ id: `b${i}`, x: 50 + 40 * Math.sin(i * 2.4 + k * 1.3), y: 50 + 38 * Math.cos(i * 1.7 + k * 0.9), glow: 2 + ((i * 7 + k * 3) % 9) })

export function FireflyJar() {
  let $k = 0      // number of shakes: changes every position
  let $count = 12 // fireflies in the jar (6–24)
  // ScatterChart props:
  // - key="id": each firefly's identity across data changes, so a shake moves the same firefly instead of replacing it.
  // - size="glow" + sizeRange={[3, 11]}: a bubble chart; the point's area follows `glow`, between 3 and 11 px radius.
  // - shape="diamond" + colors: every point a golden diamond, a spark rather than a data dot.
  // - grid={false}, fixed xMin / xMax / yMin / yMax: no grid lines and a steady "jar" that does not rescale when the
  //   fireflies move (with automatic axes the frame would jump with every shake).
  // - tooltip={false}: the points carry no information worth reading, so hovering shows nothing.
  // - animate={{ easing: "spring-wobbly", stagger: 25 }}: a bouncy spring, each firefly 25 ms after the previous, so the
  //   swarm ripples instead of moving as one block. animate={false} switches motion off; reduced motion is honoured
  //   automatically.
  // - title: the SVG's accessible name; the hidden data table still lists every point for screen readers.
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* Shake: bump $k, every position changes and the points glide (update phase). */}
      <Button size="sm" on:click={() => { $k++ }}>Salla ✨</Button>
      {/* One more: up to 24 fireflies (enter phase), then back to 6 so the demo never runs out (exit phase). */}
      <Button size="sm" variant="ghost" on:click={() => { $count = $count < 24 ? $count + 1 : 6 }}>Bir tane daha</Button>
    </div>
    <ScatterChart data={() => Array.from({ length: $count }, (_, i) => spot(i, $k))} key="id" size="glow" sizeRange={[3, 11]}
      shape="diamond" colors={["#f5c542"]} grid={false} xMin={0} xMax={100} yMin={0} yMax={100} tooltip={false}
      animate={{ easing: "spring-wobbly", stagger: 25 }} title="Ateşböceği kavanozu" height={240} />
  </div>
}
