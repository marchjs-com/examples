// CountRollLab: the full-featured CountRoll example; it uses every prop at least once.
//
// Props shown here: value, format (compact / full / your own Intl options), hideZero, duration, formatter, spoken, roll,
// stagger and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CountRollLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { CountRoll, Button } from "march/ui"

export function CountRollLab() {
  // One shared value that the first two counters show; the button raises it by five.
  let $n = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* hideZero: nothing is drawn while the value is 0 (useful for a count next to an icon). */}
    <CountRoll class="lab-zero" value={$n} hideZero />
    {/* formatter replaces the visible text (it wins over `format`); spoken replaces the text that screen readers read
        (by default the full grouped number); roll={false} makes the digits change at once, like reduced motion. */}
    <CountRoll class="lab-own" value={$n} formatter={(n: number) => `${n} beğeni`} spoken={(n: number) => `${n} kişi beğendi`} roll={false} />
    {/* format="compact" writes 1.2M style text in the active locale (format="full" would group the digits instead);
        duration is the roll time in ms and stagger the delay between neighbouring digits. The rolling itself runs on the
        motion engine, so reduced motion, the global speed and "Stop all" apply. */}
    <CountRoll class="lab-slow" value={1234567} format="compact" duration={900} stagger={60} />
    <Button size="sm" on:click={() => $n += 5}>+5</Button>
  </div>
}
