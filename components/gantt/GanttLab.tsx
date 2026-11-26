import { Gantt } from "march/components/gantt"
import { Button } from "march/ui"

// GanttLab: every Gantt prop in one place, the full-featured reference example.
// Props used: tasks (progress, dependencies, color, milestone), onChange, onSelect, scale, cascade, editable, arrows,
// height, rowHeight, todayLine, names, help, barLabel, labels, animate (smooth and staggered: a new step grows in, a
// removed one fades out, a postponed one glides), label, class.
// Use it to look up a prop, to see how the props combine, and as the fixture GanttLab.test.tsx checks.
// The buttons lock editing, hide the arrows and add / remove a task, so every switch and change animation can be seen.

// Today ± `offset` days as an ISO day, so the plan is always around the current date.
const iso = (offset: number) => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` }
// The task shape: ISO days with `end` inclusive, progress 0–1, deps = predecessor ids, milestone = a one-day diamond.
type Task = { id: string; name: string; start: string; end: string; progress?: number; deps?: string[]; milestone?: boolean; color?: "brand-blue" | "brand-pink" | "success" }

export function GanttLab() {
  let $edit = true    // editable on / off
  let $arrows = true  // dependency arrows on / off
  let $sel = "—"      // last selected task, written by onSelect
  // A small writing process: draft → review → approval (a milestone). The optional "p" (print) task is added and
  // removed by the third button to show the enter and exit animations.
  let $tasks: Task[] = [
    { id: "a", name: "Taslak", start: iso(-3), end: iso(1), progress: 0.8, color: "brand-blue" },
    { id: "b", name: "Gözden geçirme", start: iso(2), end: iso(5), progress: 0.25, deps: ["a"], color: "brand-pink" },
    { id: "c", name: "Onay", start: iso(6), end: iso(6), milestone: true, deps: ["b"], color: "success" },
  ]
  // Gantt, prop by prop:
  // - label: the accessible name of the grid; class: an extra class on the root (a hook for the tests).
  // - tasks={() => $tasks}: an accessor, so adding, removing or editing tasks redraws (and animates) the chart.
  // - scale="day": 40 px per day (the default is "week"); cascade: push successors later when a predecessor grows.
  // - editable={() => $edit} / arrows={() => $arrows}: accessors, so the buttons switch dragging and the arrows live.
  // - height={240} rowHeight={40}: the scroll area and the row height in px (defaults 420 and 36).
  // - todayLine / names: the today line and the pinned task-name column (both on by default, written out here).
  // - help: your own hint text under the chart instead of the built-in one (false would hide it).
  // - barLabel: the content of a bar; here the name plus the percent done.
  // - labels: the built-in texts in your language: today line, the name column header ("step"), day counts.
  // - onChange: called after a drag or keyboard edit, once per changed task; the plan lives in $tasks, so the handler
  //   writes the changed task back into it.
  // - onSelect: a click or Enter on a bar.
  // - animate={{ easing: "out", duration: 450, stagger: 40 }}: changes glide for 450 ms without overshoot, row after
  //   row 40 ms apart. Other forms: true (spring, the default), false (no motion), an easing name like "bounce", or
  //   { delay, enter, update, exit } to switch single phases off. Reduced motion → no motion.
  // Keyboard: one bar is in the tab order; ↑ ↓ move between tasks, Enter selects, Alt + ← → moves a task by a day and
  // Alt + Shift + ← → changes its end; every change is announced.
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* Lock / unlock editing and hide / show the arrows. The button texts are functions, so they follow the state. */}
      <Button size="sm" on:click={() => $edit = !$edit}>{() => ($edit ? "Kilitle" : "Düzenlemeyi aç")}</Button>
      <Button size="sm" on:click={() => $arrows = !$arrows}>{() => ($arrows ? "Okları gizle" : "Okları göster")}</Button>
      {/* Adds a "print" task after the approval, or removes it if it is already there: the enter / exit demo. */}
      <Button class="lab-print" size="sm" variant="ghost" on:click={() => { $tasks = $tasks.some((x) => x.id === "p") ? $tasks.filter((x) => x.id !== "p") : [...$tasks, { id: "p", name: "Baskı", start: iso(7), end: iso(9), deps: ["c"], color: "brand-blue" }] }}>
        {() => ($tasks.some((x) => x.id === "p") ? "Baskıyı kaldır" : "Baskı ekle")}
      </Button>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{() => `Seçili: ${$sel}`}</p>
    <Gantt label="Yazı süreci" class="lab-gantt" tasks={() => $tasks} scale="day" cascade
      editable={() => $edit} arrows={() => $arrows} height={240} rowHeight={40} todayLine names animate={{ easing: "out", duration: 450, stagger: 40 }}
      help="Çubuğu sürükleyin; sağ ucundan uzatın."
      barLabel={(t: Task) => `${t.name} · %${Math.round((t.progress ?? 0) * 100)}`}
      labels={{ today: "Bugün", task: "Adım", days: (n: number) => `${n} gün` }}
      onChange={(t: Task) => $tasks = $tasks.map((x) => (x.id === t.id ? t : x))}
      onSelect={(t: Task) => $sel = t.name} />
  </div>
}
