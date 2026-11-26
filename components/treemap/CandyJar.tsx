import { Treemap } from "march/charts"
import { Button } from "march/ui"

// A candy jar: a playful, minimal Treemap.
// Each candy kind is a group (with a header) and each flavor a tile inside it; a tile's area is how many of that candy
// are in the jar. The "throw in a handful" button adds random candies and the tiles slide to their new
// rectangles with a wobbly spring. Click a kind to zoom into it; the breadcrumb row brings you back.
// Use a treemap when the parts of a whole are many and nested, and the reader should compare their sizes at a glance.

// Candy kinds and their flavors. The emoji is part of the name, so it shows in the header, tooltip and data table.
const KINDS = [
  { name: "🍬 Akide", flavors: ["Nane", "Limon", "Çilek"] },
  { name: "🍫 Çikolata", flavors: ["Sütlü", "Bitter", "Fındıklı"] },
  { name: "🍭 Lolipop", flavors: ["Karpuz", "Kola"] },
]

export function CandyJar() {
  // Candy counts per kind and flavor, one candy each at the start. A signal: replacing it redraws the chart.
  let $jar = KINDS.map((k) => k.flavors.map(() => 1))
  // A handful: each flavor has a 40 % chance of getting 1–3 more. A new array is assigned (not mutated in place), so
  // the signal notices the change.
  const add = () => { $jar = $jar.map((row) => row.map((n) => n + (Math.random() < 0.4 ? 1 + Math.floor(Math.random() * 3) : 0))) }
  // Total candies for the counter next to the button.
  const total = () => $jar.flat().reduce((a, b) => a + b, 0)
  // Treemap props:
  // - data={() => …}: builds the tree from $jar on every change. Rows use the default keys (`name` as label,
  //   `children`, `value`), so no label / value / childrenOf props are needed.
  // - format: counts as "N adet" (pieces) in labels, tooltip and data table.
  // - radius={10} / padding={4}: rounder tiles with wider gaps than the defaults (4 / 2), for a softer, candy look.
  // - animate={{ easing: "spring-wobbly", stagger: 40 }}: a bouncy spring, each tile 40 ms after the previous, so the
  //   jar wobbles as it refills. animate={false} switches motion off; reduced motion is honoured automatically.
  // - rootLabel="Kavanoz": the first crumb of the breadcrumb row ("Kavanoz" = jar); title: the SVG's accessible name.
  // Keyboard: Tab focuses the chart, arrows move between tiles, Enter / Space zooms into a kind, Escape / Backspace go
  // back up.
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" on:click={add}>Bir avuç şeker at 🫙</Button>
      {/* The live candy count, read reactively through a function child. */}
      <span sx={{ color: "muted" }}>{() => `${total()} şeker`}</span>
    </div>
    <Treemap data={() => KINDS.map((k, i) => ({ name: k.name, children: k.flavors.map((f, j) => ({ name: f, value: $jar[i]![j] })) }))}
      format={(n: number) => `${n} adet`} radius={10} padding={4} animate={{ easing: "spring-wobbly", stagger: 40 }} rootLabel="Kavanoz" title="Şeker kavanozu" height={260} />
  </div>
}
