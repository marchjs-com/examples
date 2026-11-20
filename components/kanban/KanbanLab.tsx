import { Kanban, Card } from "march/ui"
import { layers, star, Icon } from "march/icons"

// Kanban'ın bütün özellikleri bir arada: columns (tone ya da color), card, itemKey, onMove, dot (yok / kendi),
// count (yok / kendi), animate ve class; son hareket üstte yazılır
type Item = { key: string; name: string }
type Col = { id: string; title: string; tone?: string; color?: "brand-purple" | "brand-orange"; items: Item[] }

const start = (): Col[] => [
  { id: "a", title: "Fikir", tone: "info", items: [{ key: "i1", name: "Karanlık mod" }, { key: "i2", name: "Paylaşım" }] },
  { id: "b", title: "Tasarım", color: "brand-purple", items: [{ key: "i3", name: "Logo" }] },
  { id: "c", title: "Yayında", color: "brand-orange", items: [] },
]

// bir pano ve üstünde adı
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function KanbanLab() {
  let $cols = start()
  let $last = "henüz yok"
  const move = (it: Item, from: string, to: string) => {
    $cols = $cols.map((c) => c.id === from ? { ...c, items: c.items.filter((x) => x.key !== it.key) } : c.id === to ? { ...c, items: [...c.items, it] } : c)
    $last = `${it.name}: ${from} → ${to}`
  }
  const card = (it: Item) => <span>{it.name}</span>
  const key = (it: Item) => it.key
  return <div sx={{ flex: "col", gap: 3 }}>
    <p>Son hareket: <b>{() => $last}</b></p>
    <Box title="Varsayılan: tonlu / renkli nokta, sayaç, giriş hareketi">
      <Kanban columns={() => $cols} card={card} itemKey={key} onMove={move} class="lab-board" />
    </Box>
    <Box title="Kendi noktam ve sayacım, hareketsiz">
      <Kanban columns={() => $cols} card={card} itemKey={key} onMove={move} animate={false}
        dot={(c: Col) => <Icon of={c.id === "c" ? star : layers} size="sm" />} count={(c: Col) => `${c.items.length} kart`} />
    </Box>
    <Card m:theme="night">
      <Box title="Noktasız, sayaçsız, koyu zemin">
        <Kanban columns={() => $cols} card={card} itemKey={key} onMove={move} dot={false} count={false} />
      </Box>
    </Card>
  </div>
}
