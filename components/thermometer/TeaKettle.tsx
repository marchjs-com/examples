// TeaKettle.tsx: the creative-minimal Thermometer example.
// Heat the water for tea: each press of "Isıt" warms it, the liquid column springs up, and the zones beside the tube
// tell you when it is right for green tea (70–80 °C) or for black tea (95–100 °C). The liquid takes the colour of the
// zone it is in.
// Use this pattern when a temperature has meaningful bands: the zones explain them without a legend.
import { Thermometer, Button, Card } from "march/ui"

export function TeaKettle() {
  // The water temperature in °C, plain reactive state; the thermometer springs to each new value.
  let $temp = 20
  // What the zones mean, for the text under the buttons (the colour is never the only signal).
  const say = () => ($temp >= 95 ? "Siyah çay için hazır ☕" : $temp >= 70 && $temp <= 80 ? "Yeşil çay için ideal 🍵" : $temp > 80 ? "Biraz daha…" : "Su ısınıyor")
  return <Card title="🫖 Çaydanlık">
    <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
      {/* value is always in °C. min / max: the scale (here 0–100, water). zones: { from, to, color } bands in °C with
          theme color tokens; the liquid takes the colour of the zone the value is in (default red outside zones).
          The column moves on a spring on the motion engine; with reduced motion in the OS it stands on the value at
          once. The thermometer is a role="meter" that speaks "75 °C". */}
      <Thermometer value={$temp} min={0} max={100} label="Su sıcaklığı" size={240}
        zones={[{ from: 70, to: 80, color: "success" }, { from: 95, to: 100, color: "brand-orange" }]} />
      <div sx={{ flex: "col", gap: 2 }}>
        <Button on:click={() => { $temp = Math.min(100, $temp + 12) }}>🔥 Isıt</Button>
        <Button variant="ghost" on:click={() => { $temp = Math.max(20, $temp - 15) }}>🧊 Soğut</Button>
        <b>{say()}</b>
      </div>
    </div>
  </Card>
}
