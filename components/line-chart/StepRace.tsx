import { LineChart } from "march/charts"
import { Button } from "march/ui"

// StepRace: a creative, minimal LineChart. Two friends race by steps; "Yürü" adds a day with new steps and the lines
// grow to the right. Use this shape whenever data arrives one row at a time: the chart follows the signal by itself.

export function StepRace() {
  // The data is plain state; every `$days = …` assignment redraws the chart (no manual update calls).
  let $days = [{ gun: 1, ayse: 6200, mert: 5400 }]
  const walk = () => {
    const last = $days[$days.length - 1]
    if ($days.length >= 14) return
    // Deterministic "random" steps (the same every run), so the example and its screenshots stay stable.
    $days = [...$days, { gun: last.gun + 1, ayse: last.ayse + 3000 + ($days.length * 977) % 5000, mert: last.mert + 2500 + ($days.length * 1361) % 6000 }]
  }
  const lead = () => { const l = $days[$days.length - 1]; return l.ayse >= l.mert ? "Ayşe önde 🏃‍♀️" : "Mert önde 🏃" }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button on:click={walk} disabled={() => $days.length >= 14}>Yürü</Button>
      <strong>{lead}</strong>
    </div>
    {/*
      y lists two series; `series` names them for the legend, the tooltip and the hidden data table.
      curve="smooth" gives the race a softer look; markers="auto" shows a dot per day while there are few days.
      The new day's point slides in from the right because the chart animates by default (animate={false} turns it off).
      Keyboard: Tab to the chart, ← → walk the days, the tooltip follows.
    */}
    <LineChart data={() => $days} x="gun" y={["ayse", "mert"]} series={{ ayse: "Ayşe", mert: "Mert" }} xLabel="Gün"
      curve="smooth" markers="auto" title="Adım yarışı" height={220} />
  </div>
}
