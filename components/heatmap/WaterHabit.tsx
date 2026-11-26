// WaterHabit: the creative-minimal Heatmap example.
//
// What it shows: a calendar of water-drinking habit over eight weeks. The button adds one glass to today, and today's cell
// gets darker.
// When to use this pattern: a habit or contribution calendar. With `calendar` the columns are weeks and the rows are weekdays;
// `x` is a date, and `value` the number that picks the tone.
// Animation: with `animate` the cell fades to its new tone (motion engine; reduced motion and "Stop all" apply); leave it
// out and the tone changes at once.
// Accessibility: the chart has a title, a hidden data table carries every cell, and the arrow keys move between cells.
import { Heatmap } from "march/charts"
import { Button } from "march/ui"

// A fixed "today" keeps the example the same every time. The data: eight weeks of days, newest first, with a pretend number
// of glasses per day (today starts at zero).
const TODAY = new Date(2026, 10, 20)
const start = Array.from({ length: 8 * 7 }, (_, i) => { const d = new Date(TODAY); d.setDate(TODAY.getDate() - i); return { gun: d, bardak: i === 0 ? 0 : (i * 5) % 9 } })

export function WaterHabit() {
  // $days is the data list; Heatmap reads it through a function below, so a change redraws only the cells.
  let $days = start
  // Adds one glass to the first item (today) and keeps every other day as it is.
  const drink = () => { $days = $days.map((d, i) => (i === 0 ? { ...d, bardak: d.bardak + 1 } : d)) }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The action; the text next to it reads the live count for today. */}
      <Button on:click={drink}>💧 Bir bardak</Button>
      <span>Bugün: {() => $days[0].bardak} bardak</span>
    </div>
    {/* - data: a function returning the rows, so the chart follows $days.
        - x="gun": the key that holds the date; value="bardak": the key that holds the number.
        - calendar={{ weeks: 8 }}: weeks as columns and weekdays as rows; end: the last day shown.
        - max={8}: the value of the darkest tone (default: the biggest value in the data).
        - valueLabel: the word for the value in the tooltip. animate: cells fade to their new tone. title: accessible name. */}
    <Heatmap data={() => $days} x="gun" value="bardak" calendar={{ weeks: 8 }} end={TODAY} max={8} valueLabel="Bardak" animate title="Su takvimi" />
  </div>
}
