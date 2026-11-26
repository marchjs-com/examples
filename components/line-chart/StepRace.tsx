// StepRace: the creative-minimal LineChart example.
//
// What it shows: a step race between two friends. Each press of the walk button adds a day with a pseudo-random number of steps
// for both, the lines grow, and a headline says who is ahead. After 14 days the button is disabled.
// When to use this pattern: a chart that grows as data arrives (a live score, a race, a progress history). `data` is a
// function that reads a signal, so replacing the array with a longer copy is all it takes to update the chart.
//
// Accessibility (built in): the chart has a title and a hidden data table with every value, and its points can be
// reached with the keyboard.
import { LineChart } from "march/charts"
import { Button } from "march/ui"

export function StepRace() {
  // The rows so far, one per day: { gun: day number, ayse: her total steps, mert: his total steps }. A signal.
  let $days = [{ gun: 1, ayse: 6200, mert: 5400 }]
  // Add a day: totals grow by a deterministic "random" amount (a modulo of the row count, so the demo looks the same
  // every time). We assign a NEW array instead of pushing, so the signal notices the change.
  const walk = () => {
    const last = $days[$days.length - 1]
    if ($days.length >= 14) return
    $days = [...$days, { gun: last.gun + 1, ayse: last.ayse + 3000 + ($days.length * 977) % 5000, mert: last.mert + 2500 + ($days.length * 1361) % 6000 }]
  }
  // Who leads on the last day. A function, so the headline below is written again after every walk.
  const lead = () => { const l = $days[$days.length - 1]; return l.ayse >= l.mert ? "Ayşe önde 🏃‍♀️" : "Mert önde 🏃" }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* disabled as a function: the button locks itself once the race is 14 days long. */}
      <Button on:click={walk} disabled={() => $days.length >= 14}>Yürü</Button>
      <strong>{lead}</strong>
    </div>
    {/* data={() => $days}: the chart follows the signal. y lists the two series by key; series names them; xLabel is the
        x column header of the data table; title is the chart's accessible name. */}
    <LineChart data={() => $days} x="gun" y={["ayse", "mert"]} series={{ ayse: "Ayşe", mert: "Mert" }} xLabel="Gün" title="Adım yarışı" height={220} />
  </div>
}
