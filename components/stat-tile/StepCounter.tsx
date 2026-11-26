// StepCounter: the creative-minimal StatTile example.
//
// What it shows: a step counter. Each press on the tile adds 500 steps, the number rolls to the new value, the hint
// counts down to the 10,000 goal and the tile turns green when it is reached. A second tile derives calories from the
// same state.
// When to use this pattern: one big figure that the user can tap and that reacts to its own state. Because `value`,
// `hint` and `m:color` are accessors (functions), the tile re-renders only those parts when $steps changes.
//
// Animation: the rolling digits come from CountRoll and run on March's motion engine, so the global speed, "Stop all"
// and the visitor's reduced-motion preference apply (with reduced motion the digits change at once). CountRoll's own
// `roll={false}` switches the rolling off for this one number.
// Accessibility: onClick makes the tile a real button named by its text (value, label, hint); CountRoll hides the
// rolling digits and exposes the full number to screen readers.
import { StatTile, CountRoll } from "march/ui"

export function StepCounter() {
  // Reactive state: $steps is read by the accessors below, so they update on every press.
  let $steps = 8500
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    {/* The main tile. variant="card" + size="xl" make it a large framed figure. The hint switches between a goal
        message and the remaining steps; m:color is an accessor too, so the colour changes from orange to green
        (the "success" token) as soon as the goal is reached. onClick adds 500 steps and makes the tile a button.
        `value` takes a node: a CountRoll with format="full" shows the whole grouped number instead of a compact one. */}
    <StatTile variant="card" size="xl" label="Bugünkü adım" hint={() => $steps >= 10000 ? "Hedef tamam! 🎉" : `Hedefe ${10000 - $steps} adım`}
      value={<CountRoll value={() => $steps} format="full" />} m:color={() => $steps >= 10000 ? "success" : "brand-orange"}
      onClick={() => $steps += 500} />
    {/* A static tile derived from the same state: a plain accessor value, no click handler, so it is just text. */}
    <StatTile variant="tile" label="Kalori" value={() => Math.round($steps * 0.04)} hint="kcal" />
  </div>
}
