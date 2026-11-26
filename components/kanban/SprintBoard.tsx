// SprintBoard: the real-life Kanban example.
//
// What it shows: a team board. Each card shows a task, a priority chip and the person; moving a card shows a toast, and the
// counter of each column reads "n tasks".
// When to use this pattern: boards where cards hold rich content. `card` draws the inside of a card (any node), `itemKey`
// gives each a stable key, `count` replaces the counter, and `onMove` is where you update your data.
// Dragging: pointer drag with a ghost copy; on touch a long press starts it so the board still scrolls; Escape cancels.
// Alt+Left and Alt+Right move a focused card from the keyboard.
import { Kanban, Chip, Avatar, toast } from "march/ui"

type Task = { id: string; title: string; who: string; prio: "yüksek" | "orta" | "düşük" }
type Col = { id: string; title: string; tone: string; items: Task[] }
// Maps a priority (the Turkish words high, medium, low) to a Chip tone.
const PRIO = { "yüksek": "danger", "orta": "warn", "düşük": "neutral" } as const

// One task card: the title, then a priority chip and the person's avatar (initials from the name).
const TaskCard = (props: { task: Task }) => <div sx={{ flex: "col", gap: 1 }}>
  <strong>{props.task.title}</strong>
  <div sx={{ flex: ["row", "center"], gap: 2 }}>
    <Chip size="sm" tone={PRIO[props.task.prio]}>{props.task.prio}</Chip>
    <Avatar name={props.task.who} size="xs" />
  </div>
</div>

export function SprintBoard() {
  // Four columns with a tone each (the colour of the dot) and their tasks.
  let $cols: Col[] = [
    { id: "todo", title: "Yapılacak", tone: "info", items: [{ id: "s1", title: "Giriş sayfası", who: "Ada Yılmaz", prio: "yüksek" }, { id: "s2", title: "E-posta şablonu", who: "Can Demir", prio: "düşük" }] },
    { id: "doing", title: "Sürüyor", tone: "warn", items: [{ id: "s3", title: "Ödeme hatası", who: "Ece Kaya", prio: "yüksek" }] },
    { id: "review", title: "İncelemede", tone: "primary", items: [] },
    { id: "done", title: "Bitti", tone: "success", items: [{ id: "s4", title: "Kayıt formu", who: "Ada Yılmaz", prio: "orta" }] },
  ]
  // onMove(task, from, to): take the task out of its old column, put it in the new one, and show a toast with the new column's title.
  const move = (t: Task, from: string, to: string) => {
    $cols = $cols.map((c) => c.id === from ? { ...c, items: c.items.filter((x) => x.id !== t.id) } : c.id === to ? { ...c, items: [...c.items, t] } : c)
    toast(`“${t.title}” → ${$cols.find((c) => c.id === to)!.title}`)
  }
  // - columns as a function: the board follows $cols. itemKey: a stable key for each card (otherwise its id).
  // - card: the card content (any node). count: our own counter text. onMove: where we update the data.
  return <Kanban columns={() => $cols} itemKey={(t: Task) => t.id} card={(t: Task) => <TaskCard task={t} />}
    count={(c: Col) => `${c.items.length} iş`} onMove={move} />
}
