import { BulletChart } from "march/charts"
import { Button } from "march/ui"

// Daily habits: a playful, minimal BulletChart.
// Each button fills one bar a little more towards its target; once the bar passes the target tick it sits in the
// darkest, "great" band. A thin marker shows yesterday, so today's progress is compared with something real. Use a bullet chart like this for "how far am I from my goal" at a glance: it packs the value, the goal and
// "how good is that" (the bands) into one thin row, where a gauge would need far more room.
export function HabitTracker() {
  // Two signals, one per habit. Reading them inside `data` below makes the chart redraw when a button changes them.
  let $water = 3
  let $steps = 4200
  // Rows use BulletChart's default keys (label, subtitle, value, target, previous, ranges), so no key props are needed.
  // `previous` is yesterday's value, drawn as a thin marker across the bar.
  // Each row has its own scale (glasses vs. steps), which is why the ranges differ per row. The emoji is part of the
  // label, so it shows in the names column, the tooltip and the data table without extra code.
  const data = () => [
    { label: "Su 💧", subtitle: "bardak", value: $water, target: 8, previous: 5, ranges: [4, 7, 10] },
    { label: "Adım 👟", subtitle: "bugün", value: $steps, target: 8000, previous: 6500, ranges: [3000, 6000, 10000] },
  ]
  // BulletChart props:
  // - The bands are grey shades by default (the classic bullet look, calm next to a coloured bar); rangeTone="traffic"
  //   tints them bad / warning / good instead. previous={() => null} would hide yesterday's marker.
  // - rangeLabels: names of the three bands (a little / OK / great) for the tooltip and the hidden data table.
  // - color="brand-blue": the bar color, a theme token.
  // - No `animate` prop: the default spring, so every click makes the bar fill with a soft settle. Pass
  //   animate={false} to switch motion off, "out" for a glide without overshoot, or { duration: 300, easing: "out" }
  //   for a timed one. Users who ask for reduced motion get no motion automatically.
  // Accessibility: title names the SVG, a visually hidden table lists value, target and band per habit, and Tab +
  // ↑ ↓ walk the rows. To adapt: add a row per habit and a button (or a real tracker) that updates its value.
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* Math.min caps each value at its last range end, so the bar never runs past the scale. */}
      <Button size="sm" on:click={() => { $water = Math.min(10, $water + 1) }}>Bir bardak su</Button>
      <Button size="sm" variant="secondary" on:click={() => { $steps = Math.min(10000, $steps + 1500) }}>Kısa yürüyüş</Button>
    </div>
    <BulletChart data={data} rangeLabels={["Az", "İdare eder", "Harika"]} color="brand-blue" title="Bugünkü alışkanlıklar" />
  </div>
}
