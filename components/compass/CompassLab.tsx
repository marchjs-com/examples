// CompassLab.tsx: the full-featured Compass example.
// Every Compass prop in one place, so you can see what each one changes and copy the line you need.
// Compass shows a heading on a compass rose. It is a Gauge underneath (a 0–360° scale from north that wraps), so it
// shares the bezel, ticks, glass and spring needles of the other instruments.
//
// Props shown below: heading, mode ("rose", "needle"), bearing, points (4, 8), cardinals, readout (true, a function,
// false), label, size, color, parts, motion, class.
import { Compass, Button, Card } from "march/ui"

export function CompassLab() {
  // One heading for every compass: the buttons turn it. It may leave 0–360; the compass wraps it.
  let $h = 30
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The class names (lab-right…) are hooks for CompassLab.test.tsx, not styling. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-left" size="sm" on:click={() => { $h -= 45 }}>−45°</Button>
      <Button class="lab-right" size="sm" on:click={() => { $h += 45 }}>+45°</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      {/* 1. The rose turns (mode="rose", the default) under the fixed lubber line. bearing marks a course on the rose;
          label names the meter (the bearing joins the name: "Gemi, bearing 120° E"). motion={false} turns at once;
          reduced motion in the OS does the same for everyone who asks for it. */}
      <span class="lab-rose"><Compass heading={$h} bearing={120} label="Gemi" motion={false} /></span>
      {/* 2. The needle turns on a fixed rose (mode="needle"), with 8 points and a colour (the theme token of the north
          needle, the lubber line and the bearing). The needle springs on the motion engine. */}
      <span class="lab-needle"><Compass heading={$h} mode="needle" points={8} color="brand-blue" /></span>
      {/* 3. Your own point names (4 or 8, from north, clockwise) and your own readout: a function that gets the heading
          within 0–360 and returns any node. size sets the width in px. */}
      <span class="lab-own"><Compass heading={$h} cardinals={["K", "D", "G", "B"]} size={180}
        readout={(d: number) => <b>{`${Math.round(d)} derece`}</b>} /></span>
      {/* 4. parts: switch the face, ticks, labels, lubber line, bearing, readout, hub and glass on or off; readout={false}
          also removes the readout. class adds your own class to the root. A small bare compass for a map corner. */}
      <span class="lab-bare"><Compass heading={$h} size={120} readout={false} class="lab-mine"
        parts={{ face: false, glass: false, labels: false, bearing: false }} /></span>
    </div>
    {/* m:theme="night": the same compass on a dark background. */}
    <Card m:theme="night">
      <Compass heading={$h} bearing={200} points={8} />
    </Card>
  </div>
}
