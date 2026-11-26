import { Gantt } from "march/components/gantt"

// A garden's season: a playful, minimal, read-only Gantt.
// Prepare the soil, sow, water, harvest: each step starts after the one before it (the dependency arrows show the
// chain), and the harvest is a milestone, a single-day diamond.
// Use a read-only Gantt like this to show a plan people should follow, not edit: a course schedule, a release roadmap.

// Today ± `offset` days as an ISO day, so the season is always drawn around the current date.
const iso = (offset: number) => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` }
// The tasks. The emoji is part of the name, so it shows in the name column and in each bar's accessible name.
// progress (0–1) fills the bar; deps links each step to the previous one; `as const` keeps the color a theme token
// type instead of a plain string.
const garden = [
  { id: "soil", name: "🪱 Toprağı hazırla", start: iso(-6), end: iso(-3), progress: 1, color: "brand-gold" as const },
  { id: "seed", name: "🌱 Tohum ek", start: iso(-2), end: iso(0), progress: 0.7, deps: ["soil"], color: "brand-green" as const },
  { id: "water", name: "💧 Düzenli sula", start: iso(1), end: iso(20), progress: 0, deps: ["seed"], color: "brand-blue" as const },
  { id: "harvest", name: "🍅 Hasat", start: iso(21), end: iso(21), milestone: true, deps: ["water"], color: "brand-orange" as const },
]

export function GardenPlan() {
  // Gantt props:
  // - label: the accessible name of the timeline grid.
  // - tasks={garden}: a plain array is fine when the plan never changes.
  // - editable={false}: no dragging, resizing or keyboard edits; the bars can still be focused and read.
  // - height={220}: a short scroll area for four rows (default 420).
  // - help={false}: hides the hint under the chart, which would only explain dragging.
  // - scale is the default "week", which fits a month-long season in view.
  // Motion: no `animate` prop, so the default spring grows the bars in on first draw and the arrows draw themselves
  // in. animate={false} draws everything at once; reduced motion is honoured automatically.
  // Keyboard: one bar is in the tab order and ↑ ↓ move between tasks; each bar is named with its task, dates,
  // progress and predecessors.
  return <Gantt label="Bahçe planı" tasks={garden} editable={false} height={220} help={false} />
}
