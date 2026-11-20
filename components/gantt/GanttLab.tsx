import { Gantt } from "march/components/gantt"
import { Button } from "march/ui"

// Gantt'ın bütün özellikleri bir arada: tasks (ilerleme, bağımlılık, renk, dönüm noktası), onChange, onSelect, scale,
// cascade, editable, arrows, height, rowHeight, todayLine, names, help, barLabel, labels, animate, label, class
const iso = (offset: number) => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` }
type Task = { id: string; name: string; start: string; end: string; progress?: number; deps?: string[]; milestone?: boolean; color?: "brand-blue" | "brand-pink" | "success" }

export function GanttLab() {
  let $edit = true
  let $arrows = true
  let $sel = "—"
  let $tasks: Task[] = [
    { id: "a", name: "Taslak", start: iso(-3), end: iso(1), progress: 0.8, color: "brand-blue" },
    { id: "b", name: "Gözden geçirme", start: iso(2), end: iso(5), progress: 0.25, deps: ["a"], color: "brand-pink" },
    { id: "c", name: "Onay", start: iso(6), end: iso(6), milestone: true, deps: ["b"], color: "success" },
  ]
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $edit = !$edit}>{() => ($edit ? "Kilitle" : "Düzenlemeyi aç")}</Button>
      <Button size="sm" on:click={() => $arrows = !$arrows}>{() => ($arrows ? "Okları gizle" : "Okları göster")}</Button>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{() => `Seçili: ${$sel}`}</p>
    <Gantt label="Yazı süreci" class="lab-gantt" tasks={() => $tasks} scale="day" cascade
      editable={() => $edit} arrows={() => $arrows} height={240} rowHeight={40} todayLine names animate
      help="Çubuğu sürükleyin; sağ ucundan uzatın."
      barLabel={(t: Task) => `${t.name} · %${Math.round((t.progress ?? 0) * 100)}`}
      labels={{ today: "Bugün", task: "Adım", days: (n: number) => `${n} gün` }}
      onChange={(t: Task) => $tasks = $tasks.map((x) => (x.id === t.id ? t : x))}
      onSelect={(t: Task) => $sel = t.name} />
  </div>
}
