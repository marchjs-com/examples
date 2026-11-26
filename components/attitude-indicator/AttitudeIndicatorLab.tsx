// AttitudeIndicatorLab.tsx: the full-featured AttitudeIndicator example.
// Every AttitudeIndicator prop in one place, so you can see what each one changes and copy the line you need.
// AttitudeIndicator is an artificial horizon: sky and ground with a pitch ladder, a roll scale with a sky pointer and a
// fixed aircraft symbol. It is a Gauge underneath (the case, glass and roll scale) with the horizon drawn on its face.
//
// Props shown below: pitch, roll, range, colors, color, label, size, parts, motion, class.
import { AttitudeIndicator, Button, Card } from "march/ui"

export function AttitudeIndicatorLab() {
  // The attitude every indicator below reads; the buttons change it.
  let $pitch = 10
  let $roll = 20
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The class names (lab-bank…) are hooks for AttitudeIndicatorLab.test.tsx, not styling. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-bank" size="sm" on:click={() => { $roll += 10 }}>Sağa yat +10°</Button>
      <Button class="lab-nose" size="sm" variant="ghost" on:click={() => { $pitch -= 5 }}>Burun −5°</Button>
      <Button class="lab-level" size="sm" variant="ghost" on:click={() => { $pitch = 0; $roll = 0 }}>Düz</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      {/* 1. pitch and roll, a label (the accessible name: a role="img" named "Laboratuvar: pitch 10° up, bank 20°
          right") and motion={false}: the horizon stands on the attitude at once; reduced motion in the OS does the
          same for everyone who asks for it. */}
      <span class="lab-std"><AttitudeIndicator pitch={$pitch} roll={$roll} label="Laboratuvar" motion={false} /></span>
      {/* 2. range: degrees of pitch from the horizon to the rim (20: a magnified ladder). colors: the sky and ground
          theme tokens; color: the aircraft symbol. This one moves on the gyro spring (motion engine). */}
      <span class="lab-colors"><AttitudeIndicator pitch={$pitch} roll={$roll} range={20}
        colors={{ sky: "brand-purple", ground: "brand-gold" }} color="danger" size={200} /></span>
      {/* 3. parts: switch the face, ladder, ladder numbers, roll scale, sky pointer, aircraft and glass on or off.
          class adds your own class to the root. A minimal horizon for a small HUD. */}
      <span class="lab-bare"><AttitudeIndicator pitch={$pitch} roll={$roll} size={140} class="lab-mine"
        parts={{ labels: false, pointer: false, glass: false, face: false }} /></span>
    </div>
    {/* m:theme="night": the instrument on a dark panel. */}
    <Card m:theme="night">
      <AttitudeIndicator pitch={$pitch} roll={$roll} />
    </Card>
  </div>
}
