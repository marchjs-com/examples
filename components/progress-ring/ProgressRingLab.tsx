// ProgressRingLab: the full-featured ProgressRing example; it uses every prop at least once.
//
// Props shown here: value (live), max, size, thickness, thresholds, format, label, color, colors ("brand", a list,
// "single") and paint (gradient, segments, cycle).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ProgressRingLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { ProgressRing } from "march/charts"
import { Button, Card } from "march/ui"

export function ProgressRingLab() {
  // The shared value, 0 to 100; the two buttons change it.
  let $v = 40
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* Buttons that move the value, so you can watch every ring follow it. */}
      <Button class="lab-up" size="sm" on:click={() => { $v = Math.min(100, $v + 40) }}>Artır</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $v = Math.max(0, $v - 30) }}>Azalt</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      {/* The rings, one prop group each:
          - Score: value / max (a score out of 10), thresholds (percent limits of the low / mid / high levels), size and
            thickness in px, label (the accessible name) and format (the text in the middle).
          - Blue: color paints the ring with one colour token instead of the level colour.
          - Brand: colors="brand" uses the four brand colors, laid out as equal segments (paint="segments").
          - Two colours: your own list of tokens as a gradient (the default paint).
          - Flowing: paint="cycle" makes the colours flow around the ring; it stands still under reduced motion.
          - One colour: colors="single" keeps one colour even in a multicolour theme. */}
      <span class="lab-score"><ProgressRing value={$v / 10} max={10} thresholds={[40, 70]} size={88} thickness={10} label="Puan" format={(v: number) => `${v}/10`} /></span>
      <span class="lab-color"><ProgressRing value={$v} color="brand-blue" label="Mavi" /></span>
      <span class="lab-brand"><ProgressRing value={$v} colors="brand" paint="segments" label="HADİ" /></span>
      <ProgressRing value={$v} colors={["brand-orange", "brand-pink"]} paint="gradient" label="İki renk" />
      <ProgressRing value={100} colors="brand" paint="cycle" label="Akan" />
      <ProgressRing value={$v} colors="single" label="Tek renk" />
    </div>
    {/* The same ring on a dark surface (m:theme="night" works on every component). */}
    <Card m:theme="night">
      <ProgressRing value={$v} size={72} label="Koyu zeminde" />
    </Card>
  </div>
}
