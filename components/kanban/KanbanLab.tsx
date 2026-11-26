// KanbanLab: the full-featured Kanban example; it uses every prop at least once.
//
// Props shown here: columns (with a tone or a colour), card, itemKey, onMove, dot (default, none or your own), count (default,
// none or your own), animate and class. The last move is written above the boards.
// Use it as a reference when you need one option: find the prop below and copy the line.
// KanbanLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Kanban, Card } from "march/ui"
import { layers, star, Icon } from "march/icons"

// A card and a column. A column's `tone` (primary, info, success, warn) or `color` (any theme colour token; it wins) tints its dot.
type Item = { key: string; name: string }
type Col = { id: string; title: string; tone?: string; color?: "brand-purple" | "brand-orange"; items: Item[] }

// The starting board: three columns, the last one empty.
const start = (): Col[] => [
  { id: "a", title: "Fikir", tone: "info", items: [{ key: "i1", name: "Karanlık mod" }, { key: "i2", name: "Paylaşım" }] },
  { id: "b", title: "Tasarım", color: "brand-purple", items: [{ key: "i3", name: "Logo" }] },
  { id: "c", title: "Yayında", color: "brand-orange", items: [] },
]

// A caption above a board. It only organises the lab.
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function KanbanLab() {
  // The board data and the text of the last move.
  let $cols = start()
  let $last = "henüz yok"
  // onMove(item, from, to): the board never moves cards itself, it only tells us; we rebuild the columns and log the move.
  const move = (it: Item, from: string, to: string) => {
    $cols = $cols.map((c) => c.id === from ? { ...c, items: c.items.filter((x) => x.key !== it.key) } : c.id === to ? { ...c, items: [...c.items, it] } : c)
    $last = `${it.name}: ${from} → ${to}`
  }
  // card(item): what to draw inside a card (the default would use the item's `title`). itemKey(item): a stable key (the default is `id`).
  const card = (it: Item) => <span>{it.name}</span>
  const key = (it: Item) => it.key
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The last move, as text. */}
    <p>Son hareket: <b>{() => $last}</b></p>
    {/* 1. The defaults: a toned dot, a count, and the entrance animation (cards scale in when they appear). */}
    <Box title="Varsayılan: tonlu / renkli nokta, sayaç, giriş hareketi">
      {/* columns as a function, so the board follows $cols; class is a hook for tests and CSS. */}
      <Kanban columns={() => $cols} card={card} itemKey={key} onMove={move} class="lab-board" />
    </Box>
    {/* 2. Your own dot and counter: dot(column) and count(column) return any content. animate={false} switches the entrance animation off. */}
    <Box title="Kendi noktam ve sayacım, hareketsiz">
      <Kanban columns={() => $cols} card={card} itemKey={key} onMove={move} animate={false}
        dot={(c: Col) => <Icon of={c.id === "c" ? star : layers} size="sm" />} count={(c: Col) => `${c.items.length} kart`} />
    </Box>
    {/* 3. On a dark surface (m:theme="night"): dot={false} and count={false} remove the dot and the counter. */}
    <Card m:theme="night">
      <Box title="Noktasız, sayaçsız, koyu zemin">
        <Kanban columns={() => $cols} card={card} itemKey={key} onMove={move} dot={false} count={false} />
      </Box>
    </Card>
  </div>
}
