import { RadialBarChart } from "march/charts"
import { Button, Card } from "march/ui"

// A server's live load: a real-life RadialBarChart drawn as a gauge.
// Four rings (CPU, memory, disk, network) on a 240-degree gauge arc, all out of 100 %. "Yenile" (refresh) fetches a
// new measurement and every arc slides to its new value, one after the other. Clicking a ring writes its value under
// the chart.
// Use a gauge-like radial chart for a handful of percentages that share one scale, where the "how full is it" feeling
// of an arc reads faster than a bar.

// A fake measurement for tick t: smooth sine waves, so consecutive refreshes look like a real, wandering load.
// Replace `sample` with a fetch from your monitoring API.
const sample = (t: number) => [
  { label: "İşlemci", value: Math.round(35 + 40 * Math.abs(Math.sin(t * 1.3))) },
  { label: "Bellek", value: Math.round(55 + 30 * Math.abs(Math.sin(t * 0.7 + 1))) },
  { label: "Disk", value: Math.round(62 + 8 * Math.sin(t * 0.2)) },
  { label: "Ağ", value: Math.round(10 + 60 * Math.abs(Math.sin(t * 2.1 + 2))) },
]

export function ServerLoad() {
  let $t = 1        // the measurement tick; "Yenile" advances it
  let $busy = "—"   // the selected ring, written by onSelect
  // The refresh button sits in the Card's `actions` slot, in the header next to the title.
  //
  // RadialBarChart props:
  // - data={() => sample($t)}: a function reading the signal, so each refresh re-reads the data and animates.
  // - max={100}: every ring's full sweep is 100 %, so the rings compare directly.
  // - startAngle={-120} / endAngle={120}: a 240-degree gauge arc, open at the bottom (0 = 12 o'clock).
  // - innerRadius={0.42}: a bigger hole than the default 0.3, where the center shows the active ring's value.
  // - format: "%62" style, used in the center, tooltip and data table alike (Turkish puts % before the number).
  // - animate={{ easing: "out", duration: 700, stagger: 60 }}: a 700 ms glide, each ring 60 ms after the previous one
  //   (outside in), which reads as one sweep across the gauge. animate={false} jumps; reduced motion is honoured.
  // - onSelect: called on click or Enter / Space with the ring's point ({ label, value, share, … }).
  // Keyboard: Tab focuses the chart, the arrows (Home, End) move from ring to ring, Enter / Space selects, Escape
  // clears. The keyboard ring stays bright while the others dim, the middle and the tooltip show its value.
  return <Card title="api-01 · anlık yük" actions={[<Button size="sm" variant="ghost" on:click={() => { $t++ }}>Yenile</Button>]}>
    <RadialBarChart data={() => sample($t)} max={100} startAngle={-120} endAngle={120} innerRadius={0.42} format={(v: number) => `%${v}`}
      animate={{ easing: "out", duration: 700, stagger: 60 }} title="Sunucu yükü" height={260}
      onSelect={(p: { label: string; value: number }) => { $busy = `${p.label}: %${p.value}` }} />
    {/* The selection read-out: a function child, so it re-renders whenever onSelect writes $busy. */}
    <p sx={{ text: "sm", color: "muted" }}>Seçilen: {() => $busy}</p>
  </Card>
}
