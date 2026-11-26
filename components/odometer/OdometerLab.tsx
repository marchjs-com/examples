import { Odometer, Button, Card } from "march/ui"

// OdometerLab: every Odometer prop in one place.
// Odometer draws a number on drums: a car's mileage counter, a water or power meter, a visitor counter, a flip clock.
// Only the drums whose digit changed roll (upward when the value grows, downward when it shrinks), so it suits a number
// that keeps counting and whose small changes you want to see. For a free-standing big number use CountRoll; for a value
// with a "too much" range use Gauge.
//
// Props shown below: value (a live accessor), digits, decimals, unit (text, a node, false), label, variant
// (mechanical, digital, flip), size (sm, md, lg, px), color, frame, motion, duration, stagger, spoken, class.
export function OdometerLab() {
  // Reactive state: every counter below reads $n, so one click rolls all of them at once.
  let $n = 1234.5
  // digits can change while the counter is on screen; the drums are rebuilt to the new count.
  let $digits = 6
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls; the lab-* classes are hooks for OdometerLab.test.tsx. "Artır" adds, "Azalt" subtracts (the drums
        then roll downward), and the third button toggles the drum count between 6 and 4. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-up" size="sm" on:click={() => { $n += 11.1 }}>Artır</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $n -= 7.3 }}>Azalt</Button>
      <Button class="lab-digits" size="sm" variant="ghost" on:click={() => { $digits = $digits === 6 ? 4 : 6 }}>Hane: 6 ↔ 4</Button>
    </div>
    <div sx={{ flex: "col", gap: 3 }}>
      {/* 1. The classic mechanical counter (the default variant: metal drums).
          - digits: the integer drums, zero-padded (1234 shows as 001234). Past the last drum it rolls over, like a
            real car: 999999 → 000000.
          - decimals: fraction drums after the decimal mark, drawn on the red drum. They show the fraction truncated,
            never rounded up, as a meter would.
          - unit: text after the drums. label: the accessible name. The whole counter is one role="img" named
            "Yol: 1,234.5 km" in the page's locale, so a screen reader hears the number, not six separate digits. */}
      <span class="lab-mech"><Odometer value={$n} digits={$digits} decimals={1} unit="km" label="Yol" /></span>
      {/* 2. variant="digital": a lit display. color is the theme token of the lit digits; size="lg" makes the drums
          taller. duration (ms per drum roll) and stagger (ms between neighbouring drums) tune the animation: short
          values feel snappy, longer ones feel mechanical. */}
      <span class="lab-digital"><Odometer value={$n} digits={5} decimals={2} unit="kWh" variant="digital" color="success" size="lg" duration={180} stagger={20} /></span>
      {/* 3. variant="flip": flip-clock cards. size={40} sets the drum height in px. unit can be any node (an emoji
          here). spoken replaces the screen-reader text for a value: here "1234 adım" (1234 steps) instead of the
          number with a decimal mark, because steps are whole. */}
      <span class="lab-flip"><Odometer value={$n} digits={4} variant="flip" size={40} unit={<span>👣</span>} spoken={(v: number) => `${Math.floor(v)} adım`} label="Adımlar" /></span>
      {/* 4. The quietest counter. frame={false} removes the bezel, unit={false} removes the unit, and motion={false}
          swaps digits at once instead of rolling. Users who ask their OS for reduced motion get that automatically;
          set it yourself where movement would distract (a dense table). class adds your own class to the root. */}
      <span class="lab-still"><Odometer value={$n} digits={4} size="sm" frame={false} motion={false} unit={false} class="lab-mine" /></span>
    </div>
    {/* m:theme="night" switches the theme for this subtree: check the drums and the red fraction drum on a dark
        background. digits is left out, so the default (6) applies. */}
    <Card m:theme="night">
      <Odometer value={$n} decimals={1} unit="km" label="Koyu zeminde" />
    </Card>
  </div>
}
