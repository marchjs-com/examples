import { Stat } from "march/charts"
import { Button, Card } from "march/ui"
import { star } from "march/icons"

// StatLab: every Stat prop in one place, the full-featured reference example.
// Props used: label (a node works too), value (live), previous, delta, format, deltaFormat, invert, hint, empty, class,
// spark (a list of objects) with sparkY, icon, animate (the number counts, the arrow turns, the line morphs).
// Use it to look up a prop, to see how the props combine, and as the fixture StatLab.test.tsx checks.
// The buttons raise, lower and clear the value, so every change animation can be seen.

export function StatLab() {
  let $value = 120   // the current score, drives the main Stat and the last sparkline point
  let $none = false  // when true the value is null, so the `empty` text shows
  // Sparkline rows as objects: `sparkY="puan"` tells Stat which key holds the number (g = week, puan = score).
  // The last row reads $value, so the trend line moves with the buttons.
  const rows = () => [{ g: 1, puan: 90 }, { g: 2, puan: 104 }, { g: 3, puan: 98 }, { g: 4, puan: $value }]
  // Main Stat, prop by prop:
  // - icon={star}; label: a node, not just a string, here with a small muted "(4th week)" note.
  // - value: null when $none is on, which shows the `empty` text ("not measured") instead of a number.
  // - previous={100}: the change is computed as (value − previous) / |previous|; 120 → "+20 %", green and up.
  // - format: a function for the value ("puan" = points); deltaFormat={["percent", 0]}: the change without decimals.
  // - hint: the text after the change (here: vs the first week).
  // - spark + sparkY: the trend line from the object rows above.
  // - animate={{ easing: "out", duration: 700, enter: false }}: on change the number counts to its new value in
  //   700 ms without overshoot, the arrow turns smoothly from up to down and the sparkline morphs. `enter: false` shows
  //   the first value at once instead of counting up from 0. Other forms: true (spring, the default), false (no
  //   motion), an easing name like "bounce", or { duration, easing, delay, enter, update }. Reduced motion → no motion.
  // Accessibility: screen readers hear "Up", "Down" or "No change" before the change; the arrow itself is decoration.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* The class names (lab-up, lab-down, lab-none) are hooks for StatLab.test.tsx. */}
      <Button class="lab-up" size="sm" on:click={() => { $value += 30 }}>Artır</Button>
      <Button class="lab-down" size="sm" on:click={() => { $value -= 60 }}>Azalt</Button>
      <Button class="lab-none" size="sm" variant="ghost" on:click={() => { $none = !$none }}>Değeri sil / geri getir</Button>
    </div>
    <Stat class="lab-main" icon={star} label={<span>Puan <span sx={{ text: "xs", color: "muted" }}>(4. hafta)</span></span>} value={$none ? null : $value} previous={100}
      format={(v: number) => `${v} puan`} deltaFormat={["percent", 0]} hint="ilk haftaya göre" empty="ölçülmedi" spark={rows()} sparkY="puan"
      animate={{ easing: "out", duration: 700, enter: false }} />
    {/* Second Stat on a dark theme (m:theme="night"): a latency ("Gecikme") with a ready delta of +25 % and `invert`, so
        the rise shows as bad (red). animate={false}: no counting at all, a direct comparison with the one above. */}
    <Card m:theme="night">
      <Stat class="lab-cost" label="Gecikme" value={240} delta={0.25} invert hint="kötüleşti" animate={false} />
    </Card>
  </div>
}
