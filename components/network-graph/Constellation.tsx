import { NetworkGraph } from "march/charts"
import { Button, Card } from "march/ui"

// A constellation: a playful, minimal NetworkGraph that grows one star at a time.
// The sky starts with six linked stars; every "Yıldız ekle" click throws a new star in and links it to a random older
// star. New stars pop in from the middle and the force layout settles again around them. Drag a star to pin it
// somewhere in the sky (double click releases it; the hint next to the button says so); drag the background to pan,
// wheel or pinch to zoom.
// Use a growing graph like this when connections arrive over time (people joining, pages linking) and you want the
// layout to make room for them on its own instead of placing every node by hand.

// Star names, reused in a cycle once all twelve are in the sky.
const NAMES = ["Vega", "Altair", "Deneb", "Sirius", "Rigel", "Lyra", "Mira", "Polaris", "Kapella", "Arktur", "Spika", "Antares"]

export function Constellation() {
  // Node rows use NetworkGraph's default keys (id, label) plus `glow`, which is read as the node size via `value`.
  // The first six stars are fixed (deterministic glow and links), so the sky looks the same on every load.
  let $stars = NAMES.slice(0, 6).map((label, i) => ({ id: String(i), label, glow: 1 + ((i * 3) % 5) }))
  // Link rows use the default `source` / `target` keys, so no source / target props are needed. Star k + 1 links to an
  // older star picked by a fixed rule.
  let $lines: { source: string; target: string }[] = Array.from({ length: 5 }, (_, k) => ({ source: String(k + 1), target: String((k * 5) % (k + 1)) }))
  // Adds one star with a random glow (1–5) and links it to a random existing star. Math.random makes every sky
  // different; new arrays are assigned so both signals notify the chart.
  const add = () => {
    const i = $stars.length, to = String(Math.floor(Math.random() * i))
    $stars = [...$stars, { id: String(i), label: NAMES[i % NAMES.length]!, glow: 1 + Math.round(Math.random() * 4) }]
    $lines = [...$lines, { source: String(i), target: to }]
  }
  // The Card wears the "night" theme (m:theme), so the sky is dark whatever the page theme is.
  //
  // NetworkGraph props:
  // - nodes / links as functions reading signals: the graph updates (and animates) on every new star.
  // - value="glow" + nodeSize={[3, 10]}: brighter stars are drawn bigger, between 3 and 10 px radius.
  // - labels="hover": names only for the hovered star and its neighbours, so the sky stays uncluttered.
  // - linkDistance={48}: shorter links than the default 60 px, so the constellation stays compact. Stars still keep a
  //   3 px gap from each other (collide, on by default); collide={false} lets them drift on top of one another.
  // - draggable (on by default): a star shows a grab hand and can be dragged and pinned; draggable={false} keeps the
  //   layout to the simulation alone (stars can still be hovered and selected).
  // - colors={["#ffe9a8"]}: one warm star color; legend={false}: there are no groups to toggle.
  // - animate={{ easing: "spring-wobbly" }}: new stars pop in with a bouncy spring. The force simulation itself runs on
  //   the motion engine's clock and stops when the layout cools. animate={false} computes the layout at once with no
  //   motion; reduced motion does the same automatically.
  // Keyboard: Tab focuses the graph, the arrows go to the nearest star in that direction, Home / End jump to the
  // first / last star, Enter selects, Escape clears; + / - zoom and 0 resets the view.
  return <Card m:theme="night" sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" on:click={add}>Yıldız ekle ✨</Button>
      {/* The drag behaviour is invisible until tried, so a short hint names it ("drag a star to pin it"). */}
      <span sx={{ text: "sm", color: "muted" }}>Bir yıldızı sürükle, orada kalsın; çift tıkla, bırak</span>
    </div>
    <NetworkGraph nodes={() => $stars} links={() => $lines} value="glow" nodeSize={[3, 10]} labels="hover" linkDistance={48}
      colors={["#ffe9a8"]} legend={false} animate={{ easing: "spring-wobbly" }} title="Takımyıldız" height={260} />
  </Card>
}
