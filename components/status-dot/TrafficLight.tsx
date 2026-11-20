import { StatusDot, Button, Card } from "march/ui"

// trafik lambası: üç büyük nokta; yanan lamba yanıp söner, düğme sıradakine geçer
const LIGHTS = [["danger", "Kırmızı: dur"], ["warn", "Sarı: hazırlan"], ["success", "Yeşil: geç"]] as const

export function TrafficLight() {
  let $on = 0
  return <Card m:theme="night">
    <div sx={{ flex: ["row", "center"], gap: 3 }}>
      <div sx={{ flex: "col", gap: 2 }}>
        {LIGHTS.map(([tone, name], i) => <StatusDot size="lg" tone={tone} hollow={() => $on !== i} pulse={() => ($on === i ? "blink" : false)}
          label={() => ($on === i ? name : null)} />)}
      </div>
      <div sx={{ flex: "col", gap: 2 }}>
        <span sx={{ text: "lg" }}>{() => LIGHTS[$on]![1]}</span>
        <Button size="sm" on:click={() => $on = ($on + 1) % 3}>Sıradaki</Button>
      </div>
    </div>
  </Card>
}
