// AnalogClockLab.tsx: the full-featured AnalogClock example.
// Every AnalogClock prop in one place, so you can see what each one changes and copy the line you need.
// AnalogClock is a 12-hour dial with hour, minute and second hands. It is built on Gauge (a 360° scale that wraps and
// three needles), so the dial's look (bezel, ticks, glass, hub) matches the other instruments.
//
// Props shown below: time (your own source), timeZone, seconds ("tick", "smooth", false), numerals ("arabic",
// "roman", "quarters", "none", a function), hands, caption, readout, label, size, color, parts, motion, onTick, class.
import { AnalogClock, Button, Card } from "march/ui"

export function AnalogClockLab() {
  // An own time source: a fixed moment the buttons move. Passing a reactive value as `time` makes the clock show it
  // instead of the system clock; the hands take the short way round when it jumps (a watch being set).
  let $time = new Date(2026, 10, 26, 10, 8, 30).getTime()
  // Filled by onTick (once a second), so you can watch the event fire on the live clocks.
  let $ticks = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls. The class names (lab-plus…) are hooks for AnalogClockLab.test.tsx, not styling. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-plus" size="sm" on:click={() => { $time += 3_600_000 }}>+1 saat</Button>
      <Button class="lab-minute" size="sm" variant="ghost" on:click={() => { $time += 60_000 }}>+1 dakika</Button>
    </div>
    <p class="lab-ticks">{`Tik: ${$ticks}`}</p>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      {/* 1. Your own time: `time` takes a Date, a timestamp or a live value. motion={false}: the hands jump straight to
          the new time (reduced motion in the OS does the same for everyone who asks for it). label is the accessible
          name; the clock is a role="img" named "Laboratuvar: 10:08 AM", updated once a minute. */}
      <span class="lab-own"><AnalogClock time={$time} label="Laboratuvar" motion={false} /></span>
      {/* 2. The system clock in a time zone, with a smooth second hand (it sweeps on the motion engine's frames) and
          onTick, called once a second with the shown time. caption prints text on the dial. */}
      <span class="lab-zone"><AnalogClock timeZone="Asia/Tokyo" caption="Tokyo" seconds="smooth" onTick={() => $ticks++} /></span>
      {/* 3. Roman numerals, no second hand, and the hands restyled: each hand takes length, width, tip, tail (shares
          of the radius and viewBox units, the dial is 200 wide), a theme color token and a class. */}
      <span class="lab-roman"><AnalogClock time={$time} numerals="roman" seconds={false} motion={false}
        hands={{ hour: { color: "brand-blue", width: 4 }, minute: { color: "brand-blue", length: 0.86 } }} /></span>
      {/* 4. numerals as a function (here only the even hours), a date window (readout gets the shown Date), the
          second hand's colour (color) and a smaller size. */}
      <span class="lab-fn"><AnalogClock time={$time} numerals={(h: number) => (h % 2 ? "" : String(h))} readout={(d: Date) => String(d.getDate())}
        color="brand-purple" size={160} /></span>
      {/* 5. parts: switch the face, the minute ticks, the numbers, the hub, the glass and the caption on or off, and
          class adds your own class to the root. Here: a bare, flat clock for a toolbar or a table row. */}
      <span class="lab-bare"><AnalogClock time={$time} size={120} parts={{ face: false, glass: false, numbers: false }} class="lab-mine" /></span>
    </div>
    {/* m:theme="night" switches the theme for this subtree: check the hands and the face on a dark background. */}
    <Card m:theme="night">
      <AnalogClock numerals="none" label="Gece" />
    </Card>
  </div>
}
