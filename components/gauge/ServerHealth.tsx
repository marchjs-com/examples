import { Gauge, Button, Card } from "march/ui"

// ServerHealth: a server dashboard card with two gauges.
// - CPU load on a half dial: green and amber zones, a red line at 85 and a peak mark that remembers the highest load.
// - Download speed with its readout on number drums (an odometer) instead of a rolling number.
// "Yenile" (refresh) brings a new reading; here it is random, in your app it would be your API's answer.
// Use a gauge like this for a value with known safe and unsafe ranges: the zones say "fine" or "too high" at a glance.
export function ServerHealth() {
  // The gauges read these reactive values; replace refresh() with a fetch or a timer that assigns them.
  let $cpu = 38
  let $mbps = 412
  const refresh = () => { $cpu = Math.round(10 + Math.random() * 88); $mbps = Math.round(80 + Math.random() * 900) }
  return <Card title="api-eu-1" subtitle="Canlı durum">
    <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
      {/* CPU load: variant="half" (a 180° dial) fits a card. zones colour 0–60 green and 60–85 amber; redline={85}
          makes everything above it red, and past it the face glows and the needle turns red. `peak` leaves a mark at
          the highest load since the card opened, so a spike between two glances is not missed. label names the meter
          for screen readers, which hear the name and "72%". */}
      <Gauge variant="half" value={$cpu} unit="%" label="İşlemci yükü" peak redline={85}
        zones={[{ from: 0, to: 60, color: "success" }, { from: 60, to: 85, color: "warning" }]} />
      {/* Download speed: max={1000} sets the scale. readout="odometer" rolls only the digits that changed, which reads
          well for a counter-like number. color tints the needle and the value arc with a theme token. */}
      <Gauge value={$mbps} max={1000} unit="Mbps" label="İndirme hızı" readout="odometer" color="brand-blue" />
    </div>
    <Button on:click={refresh}>Yenile</Button>
  </Card>
}
