// StatLab: the full-featured Stat example.
//
// What it shows: every Stat option: label (a node is fine too), value (can be live, or null), previous, delta, format,
// deltaFormat, invert, hint, empty, class, spark (a list of objects) with sparkY, and icon. Buttons change the value
// so you can watch the change, its arrow and its good / bad colour react.
// Use it as a catalogue: copy the prop you need into your own Stat.
//
// Animation: none of its own to turn off; the figures are simply redrawn when the state changes.
// Accessibility: the arrow is decoration; screen readers hear "Up", "Down" or "No change" before the change, and good
// or bad is told by the arrow and the sign, not only by colour. The sparkline is an image whose name is the label and
// a summary of its values.
import { Stat } from "march/charts"
import { Button, Card } from "march/ui"
import { star } from "march/icons"

export function StatLab() {
  // Reactive state: the current value, and whether the value is currently removed.
  let $value = 120
  let $none = false
  // The data of the trend line as a list of objects. Because rows have several fields, `sparkY="puan"` (below) names
  // the field that holds the value; the last point follows $value, so the line moves with the buttons.
  const rows = () => [{ g: 1, puan: 90 }, { g: 2, puan: 104 }, { g: 3, puan: 98 }, { g: 4, puan: $value }]
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Controls. The first button adds 30, the second subtracts 60 (so the value falls below `previous`), the third
        toggles the value between a number and null to show the `empty` text. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-up" size="sm" on:click={() => { $value += 30 }}>Artır</Button>
      <Button class="lab-down" size="sm" on:click={() => { $value -= 60 }}>Azalt</Button>
      <Button class="lab-none" size="sm" variant="ghost" on:click={() => { $none = !$none }}>Değeri sil / geri getir</Button>
    </div>
    {/* label takes a node, so part of it can be styled. value: a number, or null for "no value" (then `empty` shows).
        previous: the change is computed against it. format: a function here (a pipe name or [pipe, ...args] also work).
        deltaFormat: how the size of the change is written, ["percent", 0] means a whole percent. hint: text after the
        change. spark + sparkY: the trend line and the field of each row to plot. icon: a March icon beside the label.
        class is kept on the root (the tests find it). */}
    <Stat class="lab-main" icon={star} label={<span>Puan <span sx={{ text: "xs", color: "muted" }}>(4. hafta)</span></span>} value={$none ? null : $value} previous={100}
      format={(v: number) => `${v} puan`} deltaFormat={["percent", 0]} hint="ilk haftaya göre" empty="ölçülmedi" spark={rows()} sparkY="puan" />
    {/* m:theme="night" draws this subtree in the dark theme. delta={0.25} is given directly (+25 %); invert makes an
        increase bad, as for a latency or a cost, so it is shown red. */}
    <Card m:theme="night">
      <Stat class="lab-cost" label="Gecikme" value={240} delta={0.25} invert hint="kötüleşti" />
    </Card>
  </div>
}
