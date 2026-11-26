// GardenPlan: the creative-minimal Gantt example.
//
// What it shows: a garden season as a timeline: prepare the soil, sow, water, harvest. Each task starts after the one before
// it (dependency arrows), and the harvest is a milestone, a single day.
// When to use this pattern: a fixed, read-only schedule to look at. `editable={false}` turns off dragging, resizing and
// keyboard edits, and `help={false}` removes the hint line under the chart.
// Animation: the arrows and settle animations run on the motion engine (reduced motion and "Stop all" apply); the
// component's `animate={false}` turns them off.
import { Gantt } from "march/components/gantt"

// iso(n) is the date n days from today as an ISO day string (YYYY-MM-DD), the format Gantt expects for start and end.
const iso = (offset: number) => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` }
// The tasks. id is what `deps` refer to; start and end are ISO days (end is inclusive); progress is 0..1; color is a colour
// token; milestone: true marks a single-day task. `as const` keeps each colour a literal token type.
const garden = [
  { id: "soil", name: "🪱 Toprağı hazırla", start: iso(-6), end: iso(-3), progress: 1, color: "brand-gold" as const },
  { id: "seed", name: "🌱 Tohum ek", start: iso(-2), end: iso(0), progress: 0.7, deps: ["soil"], color: "brand-green" as const },
  { id: "water", name: "💧 Düzenli sula", start: iso(1), end: iso(20), progress: 0, deps: ["seed"], color: "brand-blue" as const },
  { id: "harvest", name: "🍅 Hasat", start: iso(21), end: iso(21), milestone: true, deps: ["water"], color: "brand-orange" as const },
]

export function GardenPlan() {
  // - label: the accessible name of the chart. tasks: here a plain array (a function would make it reactive, see GanttLab).
  // - editable={false}: view only. height: the chart height in pixels. help={false}: no hint line.
  // No scale is given, so the default (week) is used.
  return <Gantt label="Bahçe planı" tasks={garden} editable={false} height={220} help={false} />
}
