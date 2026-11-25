import { Odometer, Button, Card } from "march/ui"

// bir yol gezisi: her "Sür" toplam kilometreyi ve günlük yolu çarklarda döndürür; "Sıfırla" yalnız günlük yolu sıfırlar
export function TripMeter() {
  let $total = 48213.6
  let $trip = 0
  const drive = () => { const km = Math.round((8 + Math.random() * 30) * 10) / 10; $total += km; $trip += km }
  return <Card m:theme="night" title="🚗 Yol bilgisayarı">
    <div sx={{ flex: "col", gap: 3 }}>
      <Odometer value={$total} digits={6} decimals={1} unit="km" label="Toplam yol" size="lg" />
      <Odometer value={$trip} digits={4} decimals={1} unit="km" label="Günlük yol" variant="digital" color="brand-orange" />
      <div sx={{ flex: "row", gap: 2 }}>
        <Button on:click={drive}>Sür</Button>
        <Button variant="ghost" on:click={() => { $trip = 0 }}>Günlük yolu sıfırla</Button>
      </div>
    </div>
  </Card>
}
