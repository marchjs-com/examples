import { Heatmap } from "march/charts"
import { Button } from "march/ui"

// A water-drinking habit calendar: a playful, minimal Heatmap in calendar mode.
// Eight weeks of glasses per day, contribution-graph style. "Bir bardak" (one glass) adds a glass to today, and
// today's cell gets darker with every click.
// Use a calendar heatmap like this for any daily habit or count: workouts, commits, pages read, study minutes.

// A fixed "today", so the calendar looks the same on every load. Use `new Date()` in a real app.
const TODAY = new Date(2026, 10, 20)
// 56 days back from today (gun = day, bardak = glasses). Today starts at 0; the rest get a deterministic 0–8.
const start = Array.from({ length: 8 * 7 }, (_, i) => { const d = new Date(TODAY); d.setDate(TODAY.getDate() - i); return { gun: d, bardak: i === 0 ? 0 : (i * 5) % 9 } })

export function WaterHabit() {
  let $days = start
  // Today is the first row (i === 0); a new array with one more glass there is what tells March the data changed.
  const drink = () => { $days = $days.map((d, i) => (i === 0 ? { ...d, bardak: d.bardak + 1 } : d)) }
  // Heatmap props:
  // - data={() => $days}: a function reading the signal, so every glass redraws the calendar.
  // - x="gun": in calendar mode x is the date; value="bardak": the number per day.
  // - calendar={{ weeks: 8 }}: weeks as columns and weekdays as rows, eight weeks wide, with month names, weekday
  //   labels and a "less → more" legend on by default.
  // - end={TODAY}: the last day shown (`end` is the older name of `to`).
  // - max={8}: eight glasses is the darkest tone, a daily goal rather than the data maximum.
  // - valueLabel: the name of the value in the tooltip ("Bardak" = glass).
  // - animate: true, the default spring, written out: the cells pop in on first draw and today's cell fades to its
  //   darker tone on each click. animate={{ stagger: 8 }} would bring the cells in as a diagonal wave; animate={false}
  //   draws at once; reduced motion is honoured automatically.
  // - title: the SVG's accessible name; a visually hidden table lists every day for screen readers.
  // Keyboard: Tab reaches the calendar, ↑ ↓ move one day, ← → one week; the tooltip says the date and the value.
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button on:click={drink}>💧 Bir bardak</Button>
      <span>Bugün: {() => $days[0].bardak} bardak</span>
    </div>
    <Heatmap data={() => $days} x="gun" value="bardak" calendar={{ weeks: 8 }} end={TODAY} max={8} valueLabel="Bardak" animate title="Su takvimi" />
  </div>
}
