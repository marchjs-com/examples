import { Odometer, Button, Card } from "march/ui"

// Odometer'ın bütün özellikleri: value (erişimci), digits, decimals, unit (metin, düğüm, false), label, variant
// (mechanical, digital, flip), size (sm, md, lg, px), color, frame, motion, duration, stagger, spoken, class
export function OdometerLab() {
  let $n = 1234.5
  let $digits = 6
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-up" size="sm" on:click={() => { $n += 11.1 }}>Artır</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $n -= 7.3 }}>Azalt</Button>
      <Button class="lab-digits" size="sm" variant="ghost" on:click={() => { $digits = $digits === 6 ? 4 : 6 }}>Hane: 6 ↔ 4</Button>
    </div>
    <div sx={{ flex: "col", gap: 3 }}>
      <span class="lab-mech"><Odometer value={$n} digits={$digits} decimals={1} unit="km" label="Yol" /></span>
      <span class="lab-digital"><Odometer value={$n} digits={5} decimals={2} unit="kWh" variant="digital" color="success" size="lg" duration={180} stagger={20} /></span>
      <span class="lab-flip"><Odometer value={$n} digits={4} variant="flip" size={40} unit={<span>👣</span>} spoken={(v: number) => `${Math.floor(v)} adım`} label="Adımlar" /></span>
      <span class="lab-still"><Odometer value={$n} digits={4} size="sm" frame={false} motion={false} unit={false} class="lab-mine" /></span>
    </div>
    <Card m:theme="night">
      <Odometer value={$n} decimals={1} unit="km" label="Koyu zeminde" />
    </Card>
  </div>
}
