// BatteryGaugeLab.tsx: the full-featured BatteryGauge example.
// Every BatteryGauge prop in one place, so you can see what each one changes and copy the line you need.
// BatteryGauge draws a charge as a battery: a case with a cap, a fill or cells that spring to the level, low and
// critical colours, a bolt while charging and a rolling percentage.
//
// Props shown below: value, charging, low, critical, variant, segments, orientation, readout, chargeIcon, color,
// size, label, parts, motion, onStateChange, class.
import { BatteryGauge, Button, Card } from "march/ui"

export function BatteryGaugeLab() {
  // One level every battery below reads; the buttons change it. $state is written by onStateChange.
  let $v = 50
  let $state = "ok"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The class names (lab-drain…) are hooks for BatteryGaugeLab.test.tsx, not styling. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-drain" size="sm" on:click={() => { $v = Math.max(0, $v - 20) }}>−20%</Button>
      <Button class="lab-fill" size="sm" variant="ghost" on:click={() => { $v = Math.min(100, $v + 20) }}>+20%</Button>
    </div>
    <p class="lab-state">{`Durum: ${$state}`}</p>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
      {/* 1. The default fill with its thresholds (low / critical, in percent), onStateChange ("ok", "low",
          "critical"), a label (the accessible name of the role="meter") and motion={false}: the fill stands on the
          level at once; reduced motion in the OS does the same for everyone who asks for it. */}
      <span class="lab-fillbar"><BatteryGauge value={$v} low={30} critical={15} label="Ana pil" motion={false}
        onStateChange={(s: string) => { $state = s }} /></span>
      {/* 2. Segments, vertical, charging with your own icon (any icon, node or text; false: none), the percentage
          outside. The fill springs on the motion engine. */}
      <span class="lab-seg"><BatteryGauge value={$v} variant="segments" segments={4} orientation="vertical" charging
        chargeIcon="🔌" readout="outside" size={90} /></span>
      {/* 3. color: one theme token instead of the state colours; size: the long side in px. */}
      <span class="lab-color"><BatteryGauge value={$v} color="brand-purple" size={160} /></span>
      {/* 4. parts: switch the cap, the bolt, the readout and the frame on or off; readout={false} hides the
          percentage too. class adds your own class to the root. A tiny battery for a status bar. */}
      <span class="lab-bare"><BatteryGauge value={$v} size={44} readout={false} class="lab-mine" parts={{ frame: false, cap: false }} /></span>
    </div>
    {/* m:theme="night": the case and the colours on a dark background. */}
    <Card m:theme="night">
      <BatteryGauge value={$v} charging />
    </Card>
  </div>
}
