import { ProgressRing } from "march/charts"
import { Button, Card } from "march/ui"

// ProgressRingLab: every ProgressRing prop in one place, the full-featured reference example.
// Props used: value (live), max, size, thickness, thresholds, format, label, color, colors ("brand", a list, "single"),
// paint (gradient, segments, cycle), animate (the ring sweeps, the number counts; easing, enter, false).
// Use it to look up a prop, to compare the color modes side by side, and as the fixture ProgressRingLab.test.tsx checks.
// The buttons raise and lower one shared value, so every ring animates at once and the motion settings can be compared.

export function ProgressRingLab() {
  // One shared value (0–100) for all rings; the first ring shows it on a 0–10 scale.
  let $v = 40
  // The rings, one idea each:
  // - .lab-score: value={$v / 10} max={10} shows a score out of 10; thresholds={[40, 70]} moves the level limits (in
  //   percent of max), so 4/10 is "mid" and 8/10 "high"; size / thickness make it bigger; format writes "4/10";
  //   animate={{ easing: "out", duration: 500, enter: false }}: a 500 ms glide on change, no sweep on first draw.
  // - .lab-color: color="brand-blue" paints one theme color instead of the level color; animate={false} jumps.
  // - .lab-brand: colors="brand" + paint="segments": the four HADI brand colors as equal segments (default
  //   animate: spring).
  // - colors={[...]} + paint="gradient": your own color list as a gradient; animate="bounce" is an easing name.
  // - colors="brand" + paint="cycle" at value 100: the colors flow around the ring and keep turning (reduced motion
  //   stops them).
  // - colors="single": one color even when the theme is multicolor.
  // animate forms: true (spring, the default), false, an easing name, or { duration, easing, delay, enter, update }.
  // Reduced motion → the rings jump, and the accessible name always says the target value, never a number mid-way.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* The class names (lab-up, lab-down) are hooks for ProgressRingLab.test.tsx. */}
      <Button class="lab-up" size="sm" on:click={() => { $v = Math.min(100, $v + 40) }}>Artır</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $v = Math.max(0, $v - 30) }}>Azalt</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      {/* The <span class="lab-…"> wrappers only give the tests a handle on each ring. */}
      <span class="lab-score"><ProgressRing value={$v / 10} max={10} thresholds={[40, 70]} size={88} thickness={10} label="Puan" format={(v: number) => `${v}/10`}
        animate={{ easing: "out", duration: 500, enter: false }} /></span>
      <span class="lab-color"><ProgressRing value={$v} color="brand-blue" label="Mavi" animate={false} /></span>
      <span class="lab-brand"><ProgressRing value={$v} colors="brand" paint="segments" label="HADİ" /></span>
      <ProgressRing value={$v} colors={["brand-orange", "brand-pink"]} paint="gradient" label="İki renk" animate="bounce" />
      <ProgressRing value={100} colors="brand" paint="cycle" label="Akan" />
      <ProgressRing value={$v} colors="single" label="Tek renk" />
    </div>
    {/* The same ring on a dark theme (m:theme="night") with default props: the level colors adapt to the theme. */}
    <Card m:theme="night">
      <ProgressRing value={$v} size={72} label="Koyu zeminde" />
    </Card>
  </div>
}
