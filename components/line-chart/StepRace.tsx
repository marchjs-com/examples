import { LineChart } from "march/charts"
import { Button } from "march/ui"

// StepRace: a creative, minimal LineChart. Two friends race by steps; "Yürü" adds a day with new steps and the lines
// grow to the right. Use this shape whenever data arrives one row at a time: the chart follows the signal by itself.

export function StepRace() {
  // One more day after `last`: deterministic "random" steps (the same every run), so the example and its screenshots
  // stay stable. `i` is the day's index, which drives the pseudo-random part.
  const next = (last: { gun: number; ayse: number; mert: number }, i: number) =>
    ({ gun: last.gun + 1, ayse: last.ayse + 3000 + (i * 977) % 5000, mert: last.mert + 2500 + (i * 1361) % 6000 })
  // The race starts on day 10, so there is a history to look back on (and a live `window` has something to cut).
  const start = [{ gun: 1, ayse: 6200, mert: 5400 }]
  while (start.length < 10) start.push(next(start[start.length - 1], start.length))
  // The data is plain state; every `$days = …` assignment redraws the chart (no manual update calls).
  let $days = start
  const walk = () => {
    if ($days.length >= 30) return
    $days = [...$days, next($days[$days.length - 1], $days.length)]
  }
  const lead = () => { const l = $days[$days.length - 1]; return l.ayse >= l.mert ? "Ayşe önde 🏃‍♀️" : "Mert önde 🏃" }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button on:click={walk} disabled={() => $days.length >= 30}>Yürü</Button>
      <strong>{lead}</strong>
    </div>
    {/*
      y lists two series; `series` names them for the legend, the tooltip and the hidden data table.
      curve="smooth" gives the race a softer look; markers="auto" shows a dot per day while there are few days.
      The new day's point slides in from the right because the chart animates by default (animate={false} turns it off).
      window={7} would keep only the last 7 days on screen while the data keeps growing: a live ticker in one prop.
      Keyboard: Tab to the chart, ← → walk the days, the tooltip follows.
    */}
    <LineChart data={() => $days} x="gun" y={["ayse", "mert"]} series={{ ayse: "Ayşe", mert: "Mert" }} xLabel="Gün"
      curve="smooth" markers="auto" title="Adım yarışı" height={220} />
  </div>
}
