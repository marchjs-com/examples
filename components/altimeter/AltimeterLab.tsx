// AltimeterLab.tsx: the full-featured Altimeter example.
// Every Altimeter prop in one place, so you can see what each one changes and copy the line you need.
// Altimeter is an aircraft's three-pointer altitude dial (hundreds, thousands, ten thousands) with a pressure window.
// It is a Gauge underneath: one wrapping 0–1000 scale and three needles of three shapes.
//
// Props shown below: value, unit, pressure, pressureUnit, caption, hands, label, size, color, parts, motion, class.
import { Altimeter, Button, Card } from "march/ui"

export function AltimeterLab() {
  // The altitude and the pressure setting every altimeter below reads; the buttons change them.
  let $alt = 12500
  let $qnh = 1013
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The class names (lab-climb…) are hooks for AltimeterLab.test.tsx, not styling. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-climb" size="sm" on:click={() => { $alt += 1000 }}>+1000 ft</Button>
      <Button class="lab-qnh" size="sm" variant="ghost" on:click={() => { $qnh += 2 }}>QNH +2</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      {/* 1. The standard altimeter: value (feet), pressure in hPa in the window, label (the accessible name: a
          role="img" named "Laboratuvar: 12,500 ft, 1013 hPa"). motion={false}: the hands stand on the altitude at
          once; reduced motion in the OS does the same for everyone who asks for it. */}
      <span class="lab-std"><Altimeter value={$alt} pressure={$qnh} label="Laboratuvar" motion={false} /></span>
      {/* 2. Metres and inHg: unit is printed on the dial and spoken; pressureUnit="inHg" shows two decimals. caption
          replaces the "ALT · ft" text on the dial. color is the theme token of the ten-thousands pointer. The hands
          spring on the motion engine. */}
      <span class="lab-metric"><Altimeter value={() => $alt * 0.3048} unit="m" pressure={$qnh / 33.8639} pressureUnit="inHg"
        caption="İRTİFA · m" color="danger" /></span>
      {/* 3. Each hand's look (length, width, tip, tail as shares of the radius / viewBox units; a theme colour; a
          class) and a size. */}
      <span class="lab-hands"><Altimeter value={$alt} size={180}
        hands={{ hundreds: { color: "brand-blue", width: 3 }, thousands: { color: "brand-purple" }, tenThousands: { tip: 8 } }} /></span>
      {/* 4. parts: switch the face, ticks, labels, caption, each hand, the window, the hub and the glass on or off; no
          `pressure` means no window either. class adds your own class to the root. */}
      <span class="lab-bare"><Altimeter value={$alt} size={140} class="lab-mine"
        parts={{ tenThousands: false, window: false, caption: false, glass: false, face: false }} /></span>
    </div>
    {/* m:theme="night": a cockpit at night. */}
    <Card m:theme="night">
      <Altimeter value={$alt} pressure={$qnh} />
    </Card>
  </div>
}
