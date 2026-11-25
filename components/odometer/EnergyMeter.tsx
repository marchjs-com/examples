import { Odometer, Button, Card, KeyValue } from "march/ui"

// evin elektrik sayacı: her saat tüketim kWh çarklarına eklenir, fatura tutarı aynı anda güncellenir
const PRICE = 2.6 // ₺ / kWh

export function EnergyMeter() {
  let $kwh = 1842.35
  let $hours = 0
  const hour = () => { $kwh += 0.4 + Math.random() * 1.8; $hours++ }
  return <Card title="Elektrik sayacı" subtitle="Daire 4 · tek zamanlı">
    <div sx={{ flex: "col", gap: 3 }}>
      <Odometer value={$kwh} digits={5} decimals={2} unit="kWh" label="Sayaç okuması" />
      <KeyValue items={[
        { label: "Geçen süre", value: `${$hours} saat` },
        { label: "Tahmini tutar", value: `${($kwh * PRICE).toFixed(2)} ₺` },
      ]} />
      <Button on:click={hour}>Bir saat geçsin</Button>
    </div>
  </Card>
}
