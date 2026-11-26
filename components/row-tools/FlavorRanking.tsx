// FlavorRanking: the creative-minimal RowTools example.
//
// What it shows: an ice cream ranking. Flavours are reordered by dragging the grip or with the arrows; the first one is
// written big, in gold. When to use this pattern: a ranking or priority list.
//
// Accessibility: each tool is an icon button with a name; a tool that cannot act (up on the first row) is disabled, not
// hidden. The grip is for pointers and is hidden from screen readers; the arrows are the keyboard way.

import { RowTools, Card } from "march/ui"

export function FlavorRanking() {
  // The ranked flavours (content, so they stay Turkish).
  let $list = ["Fıstıklı", "Vişneli", "Limonlu", "Karamelli"]
  // Swap a flavour with its neighbour (d is -1 for up, 1 for down).
  const move = (i: number, d: number) => { const n = [...$list]; [n[i], n[i + d]] = [n[i + d]!, n[i]!]; $list = n }
  // Move a flavour from one index to another; RowTools calls it once when a drag ends.
  const reorder = (from: number, to: number) => { const n = [...$list]; const [x] = n.splice(from, 1); n.splice(to, 0, x!); $list = n }
  // The card is dark: m:theme="night" works on every component.
  return <Card m:theme="night" title="Dondurma sıralaman">
    <ol sx={{ flex: "col", gap: 2 }}>
      {$list.map((name, i) => <li sx={{ flex: ["row", "between", "center"], gap: 2 }}>
        <span sx={{ text: i === 0 ? "xl" : "md", color: i === 0 ? "brand-gold" : "muted" }}>{i + 1}. {name}</span>
        {/* actions: which tools, in this order (a grip, up and down; no remove); onReorder makes the grip work; index
            and count
            switch off the arrows at the ends; size="sm" makes the tools small; labels name the tools for each flavour. */}
        <RowTools actions={["drag", "up", "down"]} onReorder={reorder} index={i} count={$list.length} size="sm"
          labels={{ up: `${name} yukarı`, down: `${name} aşağı` }} onUp={() => move(i, -1)} onDown={() => move(i, 1)} />
      </li>)}
    </ol>
  </Card>
}
