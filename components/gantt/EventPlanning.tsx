// EventPlanning: the real-life Gantt example.
//
// What it shows: the preparation plan of a conference. A segmented control picks the scale (day, week, month); bars can be
// dragged or resized, and tasks that depend on a moved task are pushed later automatically (`cascade`).
// When to use this pattern: a plan people edit. Keep the tasks in reactive state, write each changed task back in
// `onChange` (it is called once per changed task, cascaded ones included) and use `onSelect` to react to a click.
// Keyboard: bars can also be edited with the keyboard (see the Gantt docs); the animations run on the motion engine, so
// reduced motion and "Stop all" apply.
import { Gantt } from "march/components/gantt"
import { Card, Segmented } from "march/ui"

// iso(n) is the date n days from today as an ISO day string (YYYY-MM-DD), the format Gantt expects.
const iso = (offset: number) => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` }
// The shape of a task: id, name, start and end (ISO days), optional progress (0..1), deps (ids of predecessors), milestone and a colour token.
type Task = { id: string; name: string; start: string; end: string; progress?: number; deps?: string[]; milestone?: boolean; color?: "brand-blue" | "brand-purple" | "brand-orange" | "brand-green" }

export function EventPlanning() {
  // $scale is the zoom (day, week or month), $note the line shown under the card title, $tasks the plan itself.
  let $scale = "day"
  let $note = "Bir çubuğu sürükleyin"
  let $tasks: Task[] = [
    { id: "venue", name: "Mekân sözleşmesi", start: iso(-10), end: iso(-4), progress: 1, color: "brand-purple" },
    { id: "speakers", name: "Konuşmacı davetleri", start: iso(-5), end: iso(6), progress: 0.5, deps: ["venue"], color: "brand-blue" },
    { id: "tickets", name: "Bilet satışı", start: iso(0), end: iso(25), progress: 0.2, deps: ["venue"], color: "brand-green" },
    { id: "program", name: "Program yayını", start: iso(8), end: iso(8), milestone: true, deps: ["speakers"], color: "brand-orange" },
    { id: "day", name: "Konferans günü", start: iso(30), end: iso(30), milestone: true, deps: ["tickets", "program"], color: "brand-orange" },
  ]
  {/* The card's subtitle is a function, so it updates when $note changes. */}
  return <Card title="Konferans hazırlığı" subtitle={() => $note}>
    {/* Picks the scale; bind:value keeps $scale in sync. aria-label names the group for screen readers. */}
    <Segmented aria-label="Ölçek" bind:value={$scale}
      options={[{ value: "day", label: "Gün" }, { value: "week", label: "Hafta" }, { value: "month", label: "Ay" }]} />
    {/* - tasks and scale as functions: Gantt reads the current state each time, so changes show at once.
        - cascade: a successor that would start before its predecessor ends is pushed later, keeping its length.
        - height: chart height in pixels. label: accessible name.
        - onChange(task): after a drag or edit, once per changed task; we write it back into $tasks and describe it in the note.
        - onSelect(task): click or Enter on a bar. */}
    <Gantt label="Konferans planı" tasks={() => $tasks} scale={() => $scale as "day"} cascade height={300}
      onChange={(t: Task) => { $tasks = $tasks.map((x) => (x.id === t.id ? t : x)); $note = `${t.name}: ${t.start} – ${t.end}` }}
      onSelect={(t: Task) => $note = `Seçildi: ${t.name}`} />
  </Card>
}
