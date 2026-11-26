// CounterLab: the full-featured Counter example; it uses every prop at least once.
//
// Props shown here: value (a function, so it is live), from, format, decimals, prefix, suffix, mode, duration, easing, start
// and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CounterLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Counter } from "march/landing"
import { Button, Card, Segmented } from "march/ui"

// The three modes: "none" (no motion, the value just changes), "count" (counts up and glides to new values) and
// "roll" (each digit turns like an odometer).
const MODES = ["none", "count", "roll"] as const

export function CounterLab() {
  let $mode: (typeof MODES)[number] = "none"
  let $score = 42
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Tür" options={MODES.map((m) => ({ value: m, label: m }))} bind:value={$mode} />
        <Button variant="secondary" on:click={() => $score += 8}>+8 puan</Button>
      </div>
    </Card>
    {() => {
      // When the mode changes the counter is drawn again (the function child re-runs); the value is a function, so the
      // counter itself updates when $score changes, without being redrawn.
      const mode = $mode
      return <div sx={{ flex: ["row", "center"], gap: 4 }}>
        <span sx={{ text: "2xl" }}>
          {/* value: the target (a function makes it live). from: the first value. mode: the motion. start="now" counts
              at once instead of when the counter scrolls into view (the default, "visible"). duration is in ms and
              easing is an easing name (bounce, spring, expo...). decimals: fixed decimals; format: Intl.NumberFormat
              options (here grouping is off); prefix / suffix go around the number. The motion runs on the motion
              engine, so reduced motion (the value is shown at once), the global speed and "Stop all" apply; mode="none"
              turns it off for this counter. */}
          <Counter class="lab-counter" value={() => $score} from={0} mode={mode} start="now" duration={700} easing="bounce"
            decimals={0} format={{ useGrouping: false }} prefix="★" suffix=" puan" />
        </span>
      </div>
    }}
  </div>
}
