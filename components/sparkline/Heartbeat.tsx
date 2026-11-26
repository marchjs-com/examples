// Heartbeat: the creative-minimal Sparkline example.
//
// What it shows: a live pulse line. "Run" raises the heart rate and "Rest" lowers it; the small line follows the last 20 readings
// and the number beside it shows the latest one.
// When to use this pattern: a tiny trend next to a number, fed by data that keeps changing. Pass `data` as a function (or a
// signal) and the line redraws itself whenever the data changes.
import { Sparkline } from "march/charts"
import { Button } from "march/ui"

export function Heartbeat() {
  // `let $beats` is a March signal holding the readings. add(d) appends the last reading plus d (kept between 55 and 180) and keeps
  // only the newest 20, so the line scrolls along.
  let $beats = [72, 74, 71, 73, 75, 72, 70, 74]
  const add = (d: number) => { const last = $beats[$beats.length - 1]; $beats = [...$beats, Math.max(55, Math.min(180, last + d))].slice(-20) }
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
    <Button size="sm" on:click={() => add(14)}>🏃 Koş</Button>
    <Button size="sm" variant="secondary" on:click={() => add(-10)}>🧘 Dinlen</Button>
    {/* Sparkline options used here:
        - data={() => $beats}: a function, so the line follows the signal and redraws when it changes.
        - width and height: the size in px (the default is 120 by 32).
        - area: fills the space under the line.
        - color={4}: a slot of the chart palette (0-based); `colors` would give your own colours instead.
        - title: the accessible name. The line is an image (role="img") whose label is the title followed by a summary (how many
          values, first and last, minimum and maximum). There is nothing to focus, so the latest number is also shown as text
          next to it. */}
    <Sparkline data={() => $beats} width={160} height={40} area color={4} title="Nabız" />
    <strong>{() => `${$beats[$beats.length - 1]} bpm`}</strong>
  </div>
}
