// PlantWater: the creative-minimal ProgressRing example.
//
// What it shows: a plant's water level as one ring with the percent inside. "Water" refills it, "A day passes" lowers
// it. When to use this pattern: one live value (a score, a level, a goal) with a ring that follows a signal.
//
// The ring takes its level colour (low / mid / high) from the default thresholds, so no colour logic is written here.
// Animation: the ring's change runs on the motion engine (reduced motion, global speed and "Stop all" apply).
//  Accessibility: the ring is an image named "<label>: <value> of <max>"; the middle number is hidden from screen
// readers.

import { ProgressRing } from "march/charts"
import { Button } from "march/ui"

export function PlantWater() {
  // The water level, 0 to 100. Both buttons change it, and the ring follows because `value` reads the signal.
  let $water = 64
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
    {/* value: the live score (clamped to 0...max, max defaults to 100); size and thickness in px; label names the ring;
        format writes the number in the middle. */}
    <ProgressRing value={$water} size={96} thickness={12} label="Su seviyesi" format={(v: number) => `${Math.round(v)}%`} />
    <div sx={{ flex: "col", gap: 2 }}>
      {/* Math.min / Math.max keep the value inside 0...100. */}
      <Button on:click={() => { $water = Math.min(100, $water + 30) }}>🪴 Sula</Button>
      <Button variant="ghost" on:click={() => { $water = Math.max(0, $water - 15) }}>☀️ Bir gün geçsin</Button>
    </div>
  </div>
}
