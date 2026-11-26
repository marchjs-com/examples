import { Gauge, Button, Card } from "march/ui"

// RallyCar: a car's instrument cluster, three gauges driven by plain state.
// "Gaz" (throttle) raises the speed and the revs and burns fuel; when the revs enter the red zone the car shifts up a
// gear. Speed, revs and fuel each get a dial, and the fuel dial drops into its red band as the tank empties.
// Use this pattern when related values belong together and one of them should trigger an action (onRedline here)
// instead of you comparing numbers by hand.
export function RallyCar() {
  // Reactive state: the gauges read these `$` variables, so assigning them is all it takes to move the needles.
  let $speed = 0
  let $rpm = 900
  let $fuel = 80
  let $gear = 1
  // Throttle: a higher gear adds less speed per press (34 / gear), like a real gearbox. Each value is clamped to its scale.
  const gas = () => {
    if ($fuel <= 0) return
    $speed = Math.min(220, $speed + 34 / $gear)
    $rpm = Math.min(7900, $rpm + 1500)
    $fuel = Math.max(0, $fuel - 6)
  }
  // onRedline calls this with true when the revs enter the red zone and false when they leave it. Only entering
  // matters: shift up (at most 5 gears) and drop the revs, which takes the needle out of the red again.
  const shift = (on: boolean) => { if (on && $gear < 5) { $gear++; $rpm = 3200 } }
  // m:theme="night" gives the card a dark dashboard look; the gauges pick up the theme's colors on their own.
  return <Card m:theme="night" title={`🏁 Vites ${$gear}`}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      {/* Speedometer: max={220} widens the default 0–100 scale, and `peak` keeps a mark at the top speed reached.
          label is the accessible name: a screen reader hears the name and "120 km/h", at most 4 updates a second. */}
      <Gauge value={$speed} max={220} unit="km/h" label="Hız" peak />
      {/* Tachometer: the variant brings a 0–8000 scale, ×1000 labels and a default red line, so the only addition is
          the onRedline handler that shifts gear. */}
      <Gauge variant="tachometer" value={$rpm} label="Devir" onRedline={shift} />
      {/* Fuel: a smaller half dial. Here the danger is at the LOW end, so zones colour 0–15 (danger) and 15–30
          (warning); redline would mark the high end instead. caption prints ⛽ on the dial; ticks every 25 with one
          minor tick between. */}
      <Gauge variant="half" value={$fuel} size={170} label="Yakıt" unit="%" caption="⛽"
        zones={[{ from: 0, to: 15, color: "danger" }, { from: 15, to: 30, color: "warning" }]} ticks={{ step: 25, minor: 1 }} />
    </div>
    {/* The controls are ordinary Buttons: keyboard users reach them with Tab and press Enter or Space. The needles
        animate on the motion engine; with reduced motion in the OS they stand on the new value at once. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button on:click={gas}>Gaz</Button>
      {/* "Fren" (brake): slow down and drop the revs; below 30 km/h fall back to first gear. */}
      <Button variant="ghost" on:click={() => { $speed = Math.max(0, $speed - 50); $rpm = Math.max(900, $rpm - 2000); if ($speed < 30) $gear = 1 }}>Fren</Button>
      {/* "Depoyu doldur" (fill the tank). */}
      <Button variant="ghost" on:click={() => { $fuel = 100 }}>Depoyu doldur</Button>
    </div>
  </Card>
}
