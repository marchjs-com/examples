import { Odometer, Button, Card } from "march/ui"

// TripMeter: a car's trip computer. Each "Sür" (drive) adds a random leg to the total distance and to the trip
// distance, and both roll on their drums; the reset button zeroes only the trip.
// It shows two looks side by side: the classic mechanical counter for the total and a lit digital one for the trip.
export function TripMeter() {
  // Two reactive values: the counters read them, so assigning is all it takes to roll the drums.
  let $total = 48213.6
  let $trip = 0
  // One leg of 8–38 km, rounded to one decimal so it matches the single fraction drum.
  const drive = () => { const km = Math.round((8 + Math.random() * 30) * 10) / 10; $total += km; $trip += km }
  return <Card m:theme="night" title="🚗 Yol bilgisayarı">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* Total: six integer drums and one fraction drum, large (size="lg"). Only the drums whose digit changed roll,
          so a short leg moves just the last few. label + unit give the screen-reader name ("Toplam yol: 48,213.6 km"
          in the page's locale). */}
      <Odometer value={$total} digits={6} decimals={1} unit="km" label="Toplam yol" size="lg" />
      {/* Trip: variant="digital" draws lit digits in color (a theme token). When the trip is reset to 0 the drums
          roll downward, the direction of the change. */}
      <Odometer value={$trip} digits={4} decimals={1} unit="km" label="Günlük yol" variant="digital" color="brand-orange" />
      {/* Ordinary Buttons: Tab to reach, Enter or Space to press. "Günlük yolu sıfırla" resets the trip only. */}
      <div sx={{ flex: "row", gap: 2 }}>
        <Button on:click={drive}>Sür</Button>
        <Button variant="ghost" on:click={() => { $trip = 0 }}>Günlük yolu sıfırla</Button>
      </div>
    </div>
  </Card>
}
