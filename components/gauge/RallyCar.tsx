import { Gauge, Button, Card } from "march/ui"

// ralli arabası: "Gaz" hızı ve devri artırır, yakıtı yer; devir kırmızıya girince vites büyütülür. Hız, devir ve yakıt
// üç kadranda; yakıt azalınca kırmızı bölgeye iner
export function RallyCar() {
  let $speed = 0
  let $rpm = 900
  let $fuel = 80
  let $gear = 1
  const gas = () => {
    if ($fuel <= 0) return
    $speed = Math.min(220, $speed + 34 / $gear)
    $rpm = Math.min(7900, $rpm + 1500)
    $fuel = Math.max(0, $fuel - 6)
  }
  const shift = (on: boolean) => { if (on && $gear < 5) { $gear++; $rpm = 3200 } }
  return <Card m:theme="night" title={`🏁 Vites ${$gear}`}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      <Gauge value={$speed} max={220} unit="km/h" label="Hız" peak />
      <Gauge variant="tachometer" value={$rpm} label="Devir" onRedline={shift} />
      <Gauge variant="half" value={$fuel} size={170} label="Yakıt" unit="%" caption="⛽"
        zones={[{ from: 0, to: 15, color: "danger" }, { from: 15, to: 30, color: "warning" }]} ticks={{ step: 25, minor: 1 }} />
    </div>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button on:click={gas}>Gaz</Button>
      <Button variant="ghost" on:click={() => { $speed = Math.max(0, $speed - 50); $rpm = Math.max(900, $rpm - 2000); if ($speed < 30) $gear = 1 }}>Fren</Button>
      <Button variant="ghost" on:click={() => { $fuel = 100 }}>Depoyu doldur</Button>
    </div>
  </Card>
}
