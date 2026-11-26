import { Gantt } from "march/components/gantt"
import { Card, Segmented } from "march/ui"

// A conference preparation plan: a real-life, editable Gantt.
// Shows five tasks with progress, two milestones and dependency arrows. A scale switch (day / week / month) zooms the
// timeline; dragging a bar moves a task, and with `cascade` every successor that would now start too early slides later
// by itself. The card subtitle reports the last change.
// Use a Gantt like this whenever tasks depend on each other and dates move: events, launches, construction, sprints.

// Today ± `offset` days as an ISO day ("2026-11-26"), so the plan is always around the current date.
const iso = (offset: number) => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` }
// The task shape Gantt expects: dates are ISO days with `end` inclusive, progress is 0–1, deps lists predecessor ids,
// a milestone is a one-day diamond, and color is a theme token.
type Task = { id: string; name: string; start: string; end: string; progress?: number; deps?: string[]; milestone?: boolean; color?: "brand-blue" | "brand-purple" | "brand-orange" | "brand-green" }

export function EventPlanning() {
  let $scale = "day"                       // the zoom level, bound to the Segmented control
  let $note = "Bir çubuğu sürükleyin"      // the card subtitle: a hint first, then the last change
  // The plan. "speakers" and "tickets" both wait for "venue"; the conference day waits for tickets and the program, so
  // moving the venue contract later pushes almost everything with it.
  let $tasks: Task[] = [
    { id: "venue", name: "Mekân sözleşmesi", start: iso(-10), end: iso(-4), progress: 1, color: "brand-purple" },
    { id: "speakers", name: "Konuşmacı davetleri", start: iso(-5), end: iso(6), progress: 0.5, deps: ["venue"], color: "brand-blue" },
    { id: "tickets", name: "Bilet satışı", start: iso(0), end: iso(25), progress: 0.2, deps: ["venue"], color: "brand-green" },
    { id: "program", name: "Program yayını", start: iso(8), end: iso(8), milestone: true, deps: ["speakers"], color: "brand-orange" },
    { id: "day", name: "Konferans günü", start: iso(30), end: iso(30), milestone: true, deps: ["tickets", "program"], color: "brand-orange" },
  ]
  // Gantt props:
  // - label: the accessible name of the timeline grid.
  // - tasks={() => $tasks}: an accessor, so the chart follows every change of the signal.
  // - scale={() => $scale}: also an accessor, so the Segmented control zooms the timeline (day / week / month = 40 /
  //   18 / 5 px per day). A scale change places the bars at once and fades the canvas in.
  // - cascade: successors that would start before their predecessor ends are pushed later, keeping their length
  //   (it is the default; written out here because it is the point of the example).
  // - height={300}: the scroll area in px (default 420).
  // - onChange: called once per changed task after a drag or a keyboard edit, cascaded ones too. The plan lives in
  //   $tasks, so the handler writes the changed task back into it and updates the subtitle.
  // - onSelect: a click or Enter on a bar.
  // Motion: no `animate` prop, so the default spring applies: pushed successors glide to their new dates, a dropped bar
  // settles with a small pop, and the arrows follow the bars. animate={false} turns all of it off; reduced motion is
  // honoured automatically.
  // Keyboard: one bar is in the tab order; ↑ ↓ move between tasks, Enter selects, Alt + ← → moves a task by a day and
  // Alt + Shift + ← → changes its end. Every change is announced to screen readers.
  return <Card title="Konferans hazırlığı" subtitle={() => $note}>
    <Segmented aria-label="Ölçek" bind:value={$scale}
      options={[{ value: "day", label: "Gün" }, { value: "week", label: "Hafta" }, { value: "month", label: "Ay" }]} />
    <Gantt label="Konferans planı" tasks={() => $tasks} scale={() => $scale as "day"} cascade height={300}
      onChange={(t: Task) => { $tasks = $tasks.map((x) => (x.id === t.id ? t : x)); $note = `${t.name}: ${t.start} – ${t.end}` }}
      onSelect={(t: Task) => $note = `Seçildi: ${t.name}`} />
  </Card>
}
