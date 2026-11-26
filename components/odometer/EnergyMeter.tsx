import { Odometer, Button, Card, KeyValue } from "march/ui"

// EnergyMeter: a home electricity meter. Each simulated hour adds the consumption to the kWh drums, and the bill
// estimate below updates at the same moment, because both read the same reactive value.
// Use an Odometer when a number only grows (or rarely shrinks) and the change itself is worth watching: the drums that
// changed roll, the others stay still.
const PRICE = 2.6 // ₺ / kWh: a made-up tariff for the estimate

export function EnergyMeter() {
  // Reactive state; in a real app $kwh would come from the meter's API or a socket.
  let $kwh = 1842.35
  let $hours = 0
  // One simulated hour: between 0.4 and 2.2 kWh.
  const hour = () => { $kwh += 0.4 + Math.random() * 1.8; $hours++ }
  return <Card title="Elektrik sayacı" subtitle="Daire 4 · tek zamanlı">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* digits={5} integer drums, zero-padded; decimals={2} fraction drums (red, as on a real meter). The fraction is
          truncated, never rounded up. label + unit make the accessible name: one image read as the label, the number
          in the page's locale and "kWh", not digit by digit. */}
      <Odometer value={$kwh} digits={5} decimals={2} unit="kWh" label="Sayaç okuması" />
      {/* Derived values: plain expressions of the same state, recomputed when $kwh or $hours change. */}
      <KeyValue items={[
        { label: "Geçen süre", value: `${$hours} saat` },
        { label: "Tahmini tutar", value: `${($kwh * PRICE).toFixed(2)} ₺` },
      ]} />
      {/* "Bir saat geçsin" (let an hour pass). The drums roll on the motion engine; with reduced motion in the OS the
          digits change at once. Add motion={false} to the Odometer to always skip the roll. */}
      <Button on:click={hour}>Bir saat geçsin</Button>
    </div>
  </Card>
}
