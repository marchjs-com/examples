// FlightPanel.tsx: the real-life Altimeter example.
// The middle of a flight simulator's panel: the artificial horizon and the altimeter side by side, a climb / level /
// descend control and the pressure setting the pilot dials in (hPa in Europe, inHg in the Americas).
// Use this pattern when several instruments read one state: each instrument gets the piece it shows, and one set of
// controls changes the state.
import { Altimeter, AttitudeIndicator, Segmented, Button, Card } from "march/ui"

export function FlightPanel() {
  // The aircraft's state: altitude (ft), pitch (degrees, nose up), and the pressure setting with its unit.
  let $alt = 4500
  let $pitch = 0
  let $unit = "hPa"
  let $qnh = 1013
  // A climb or descent: pitch the nose and change the altitude (a simple step per press, not a physics model).
  const fly = (pitch: number, delta: number) => { $pitch = pitch; $alt = Math.max(0, $alt + delta) }
  return <Card m:theme="night" title="Uçuş paneli">
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      {/* AttitudeIndicator: pitch from our state, roll level. Both instruments are Gauges underneath, so their
          bezels and glass match. */}
      <AttitudeIndicator pitch={$pitch} roll={0} size={200} label="Yapay ufuk" />
      {/* Altimeter: the window shows the setting in the chosen unit; switching the unit converts the number too
          (1 inHg = 33.8639 hPa), and pressureUnit tells the window how to format it (whole hPa, two-decimal inHg). */}
      <Altimeter value={$alt} size={200} label="İrtifa"
        pressure={$unit === "hPa" ? $qnh : $qnh / 33.8639} pressureUnit={$unit as "hPa" | "inHg"} />
    </div>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => fly(8, 700)}>Tırman</Button>
      <Button size="sm" variant="ghost" on:click={() => fly(0, 0)}>Düz uç</Button>
      <Button size="sm" variant="ghost" on:click={() => fly(-6, -600)}>Alçal</Button>
      {/* The pressure setting: the pilot dials it per the airport's report; the window's digits roll. */}
      <Button size="sm" variant="ghost" on:click={() => { $qnh += 1 }}>QNH +1</Button>
      <Segmented size="sm" aria-label="Basınç birimi" bind:value={$unit} options={[{ value: "hPa", label: "hPa" }, { value: "inHg", label: "inHg" }]} />
    </div>
  </Card>
}
