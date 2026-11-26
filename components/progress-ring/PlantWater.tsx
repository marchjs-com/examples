import { ProgressRing } from "march/charts"
import { Button } from "march/ui"

// A potted plant's water level: a playful, minimal ProgressRing.
// The water button adds 30 %, the "let a day pass" button takes 15 % away. The ring sweeps to the new level and
// changes color with it: red when low, yellow in the middle, green when full.
// Use a single ring like this for one score with a clear "full": a battery, a daily goal, a sleep score.

export function PlantWater() {
  // `$water` is a signal (0–100); the buttons clamp it so the ring never goes below empty or past full.
  let $water = 64
  // ProgressRing props:
  // - value: the water level; max is the default 100, so the value reads as a percent.
  // - size={96} thickness={12}: a big, chunky ring that suits the playful theme (defaults are 64 and 8).
  // - label: the accessible name ("Su seviyesi" = water level).
  // - format: the number in the middle with a % sign, rounded so a mid-sweep frame never shows decimals.
  // - No color: the default thresholds (50 % and 80 %) choose the low / mid / high color by themselves.
  // Motion: no `animate` prop, so a spring sweeps the ring from where it is to the new value and the number counts
  // along. animate="out" glides without overshoot, animate={false} jumps; reduced motion is honoured automatically.
  // Accessibility: the ring is an image whose name always says the target value, never a number mid-way, and the
  // level is told by the number as well as the color.
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
    <ProgressRing value={$water} size={96} thickness={12} label="Su seviyesi" format={(v: number) => `${Math.round(v)}%`} />
    <div sx={{ flex: "col", gap: 2 }}>
      {/* Math.min / Math.max keep the level inside 0–100 (the ring clamps too, but the stored number stays honest). */}
      <Button on:click={() => { $water = Math.min(100, $water + 30) }}>🪴 Sula</Button>
      <Button variant="ghost" on:click={() => { $water = Math.max(0, $water - 15) }}>☀️ Bir gün geçsin</Button>
    </div>
  </div>
}
