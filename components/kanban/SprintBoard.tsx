import { Kanban, Chip, Avatar, toast } from "march/ui"

// bir ekip panosu: her kartta iş, öncelik ve kişi; taşınınca bildirim çıkar, sayaç "n iş" yazar
type Task = { id: string; title: string; who: string; prio: "yüksek" | "orta" | "düşük" }
type Col = { id: string; title: string; tone: string; items: Task[] }
const PRIO = { "yüksek": "danger", "orta": "warn", "düşük": "neutral" } as const

// bir iş kartı: başlık, altında öncelik çipi ve kişinin baş harfleri
const TaskCard = (props: { task: Task }) => <div sx={{ flex: "col", gap: 1 }}>
  <strong>{props.task.title}</strong>
  <div sx={{ flex: ["row", "center"], gap: 2 }}>
    <Chip size="sm" tone={PRIO[props.task.prio]}>{props.task.prio}</Chip>
    <Avatar name={props.task.who} size="xs" />
  </div>
</div>

export function SprintBoard() {
  let $cols: Col[] = [
    { id: "todo", title: "Yapılacak", tone: "info", items: [{ id: "s1", title: "Giriş sayfası", who: "Ada Yılmaz", prio: "yüksek" }, { id: "s2", title: "E-posta şablonu", who: "Can Demir", prio: "düşük" }] },
    { id: "doing", title: "Sürüyor", tone: "warn", items: [{ id: "s3", title: "Ödeme hatası", who: "Ece Kaya", prio: "yüksek" }] },
    { id: "review", title: "İncelemede", tone: "primary", items: [] },
    { id: "done", title: "Bitti", tone: "success", items: [{ id: "s4", title: "Kayıt formu", who: "Ada Yılmaz", prio: "orta" }] },
  ]
  const move = (t: Task, from: string, to: string) => {
    $cols = $cols.map((c) => c.id === from ? { ...c, items: c.items.filter((x) => x.id !== t.id) } : c.id === to ? { ...c, items: [...c.items, t] } : c)
    toast(`“${t.title}” → ${$cols.find((c) => c.id === to)!.title}`)
  }
  return <Kanban columns={() => $cols} itemKey={(t: Task) => t.id} card={(t: Task) => <TaskCard task={t} />}
    count={(c: Col) => `${c.items.length} iş`} onMove={move} />
}
