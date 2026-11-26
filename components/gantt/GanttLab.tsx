// GanttLab: the full-featured Gantt example; it uses every prop at least once.
//
// Props shown here: tasks (progress, dependencies, colour, milestone), onChange, onSelect, scale, cascade, editable, arrows,
// height, rowHeight, todayLine, names, help, barLabel, labels, animate, label and class.
// Use it as a reference when you need one option: find the prop below and copy the line.
// GanttLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Gantt } from "march/components/gantt"
import { Button } from "march/ui"

// iso(n) is the date n days from today as an ISO day string (YYYY-MM-DD), the format Gantt expects.
const iso = (offset: number) => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` }
// The shape of a task: id, name, start and end (ISO days), optional progress (0..1), deps (ids), milestone and a colour token.
type Task = { id: string; name: string; start: string; end: string; progress?: number; deps?: string[]; milestone?: boolean; color?: "brand-blue" | "brand-pink" | "success" }

export function GanttLab() {
  // State: whether editing is on, whether arrows show, the name of the selected task, and the tasks themselves.
  let $edit = true
  let $arrows = true
  let $sel = "—"
  let $tasks: Task[] = [
    { id: "a", name: "Taslak", start: iso(-3), end: iso(1), progress: 0.8, color: "brand-blue" },
    { id: "b", name: "Gözden geçirme", start: iso(2), end: iso(5), progress: 0.25, deps: ["a"], color: "brand-pink" },
    { id: "c", name: "Onay", start: iso(6), end: iso(6), milestone: true, deps: ["b"], color: "success" },
  ]
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Two switches that drive the editable and arrows props (they take functions, so they can change at any time). */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $edit = !$edit}>{() => ($edit ? "Kilitle" : "Düzenlemeyi aç")}</Button>
      <Button size="sm" on:click={() => $arrows = !$arrows}>{() => ($arrows ? "Okları gizle" : "Okları göster")}</Button>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{() => `Seçili: ${$sel}`}</p>
    {/* - label: accessible name; class: a hook for tests and CSS; tasks: a function so edits show at once.
        - scale="day": a fixed scale (a function would let you change it). cascade: successors are pushed later when needed.
        - editable / arrows as functions: drag, resize, progress and keyboard edits on or off; dependency arrows on or off.
        - height / rowHeight: pixel sizes. todayLine: the today marker. names: the pinned column of task names. animate: arrow
          drawing and settle animations (on the motion engine; false turns them off, reduced motion is honoured anyway).
        - help: your own hint text under the chart (false would hide it).
        - barLabel(task): the content of each bar; here the name plus the percent done.
        - labels: replaces built-in texts (today, task column title, the "n days" function).
        - onChange(task): write the changed task back. onSelect(task): which task was clicked or opened with Enter. */}
    <Gantt label="Yazı süreci" class="lab-gantt" tasks={() => $tasks} scale="day" cascade
      editable={() => $edit} arrows={() => $arrows} height={240} rowHeight={40} todayLine names animate
      help="Çubuğu sürükleyin; sağ ucundan uzatın."
      barLabel={(t: Task) => `${t.name} · %${Math.round((t.progress ?? 0) * 100)}`}
      labels={{ today: "Bugün", task: "Adım", days: (n: number) => `${n} gün` }}
      onChange={(t: Task) => $tasks = $tasks.map((x) => (x.id === t.id ? t : x))}
      onSelect={(t: Task) => $sel = t.name} />
  </div>
}
