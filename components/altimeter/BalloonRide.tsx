// BalloonRide.tsx: the creative-minimal Altimeter example.
// A hot-air balloon: "Isıt" (heat) climbs, "Soğut" (cool) sinks, and the altimeter's three hands show the altitude:
// the long hand hundreds of feet, the short wide one thousands, the thin pointer ten thousands. Big climbs spin the
// long hand round, as on the real instrument.
// Use this pattern for any value that grows far past one turn of a dial (altitude, a counter, a distance): the
// three-hand dial reads to the last hundred while showing the large number too.
import { Altimeter, Button, Card } from "march/ui"

export function BalloonRide() {
  // The altitude in feet, plain reactive state. The altimeter springs its hands to each new value.
  let $alt = 1200
  return <Card title="🎈 Balon turu">
    {/* value: the altitude. pressure: the setting in the small window at 3 o'clock (1013 hPa, standard pressure);
        its digits roll when it changes. label is the accessible name: the altimeter is a role="img" named
        "Balon: 1,200 ft, 1013 hPa", updated at most 4 times a second. The hands move on springs on the motion
        engine; with reduced motion in the OS they stand on the new altitude at once. */}
    <Altimeter value={$alt} pressure={1013} label="Balon" size={230} />
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button on:click={() => { $alt += 800 }}>🔥 Isıt</Button>
      <Button variant="ghost" on:click={() => { $alt = Math.max(0, $alt - 500) }}>❄️ Soğut</Button>
      {/* A big jump to show the long hand spinning through ten whole turns on its way. */}
      <Button variant="ghost" on:click={() => { $alt += 10000 }}>Jet akımı +10.000 ft</Button>
    </div>
  </Card>
}
