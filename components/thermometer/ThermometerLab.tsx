// ThermometerLab.tsx: the full-featured Thermometer example.
// Every Thermometer prop in one place, so you can see what each one changes and copy the line you need.
// Thermometer is a glass tube with a bulb, a liquid column that springs to the value, a scale in °C or °F (or both),
// coloured zones and a rolling readout. Values are always given in °C.
//
// Props shown below: value, unit, secondary, min, max, zones, color, format, step, label, size, parts, motion, class.
import { Thermometer, Button, Card } from "march/ui"

export function ThermometerLab() {
  // One temperature (°C) every thermometer below reads; the buttons change it.
  let $t = 22
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The class names (lab-up…) are hooks for ThermometerLab.test.tsx, not styling. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-up" size="sm" on:click={() => { $t += 8 }}>+8 °C</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $t -= 8 }}>−8 °C</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
      {/* 1. The default °C scale with zones (the liquid takes the zone's colour), min / max in °C, a label (the
          accessible name of the role="meter") and motion={false}: the column stands on the value at once; reduced
          motion in the OS does the same for everyone who asks for it. */}
      <span class="lab-c"><Thermometer value={$t} min={-10} max={50} label="Oda" motion={false}
        zones={[{ from: -10, to: 5, color: "info" }, { from: 30, to: 50, color: "danger" }]} /></span>
      {/* 2. °F with the °C scale on the other side (secondary). step: the major tick step in the shown unit.
          format: Intl.NumberFormat options of the readout and the spoken value (no decimals here). The column
          springs on the motion engine. */}
      <span class="lab-f"><Thermometer value={$t} unit="F" secondary step={20} format={{ maximumFractionDigits: 0 }} /></span>
      {/* 3. color: one theme token for the liquid instead of the zone colours; size: the height in px. */}
      <span class="lab-color"><Thermometer value={$t} color="brand-blue" size={180} /></span>
      {/* 4. parts: switch the tube, ticks, labels, zones, secondary scale, readout and glass shine on or off. class
          adds your own class to the root. A slim thermometer for a table row. */}
      <span class="lab-bare"><Thermometer value={$t} size={120} class="lab-mine" parts={{ readout: false, labels: false, glass: false }} /></span>
    </div>
    {/* m:theme="night": the glass and the scale on a dark background. */}
    <Card m:theme="night">
      <Thermometer value={$t} secondary />
    </Card>
  </div>
}
