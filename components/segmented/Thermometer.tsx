import { Segmented, Card } from "march/ui"

// termometre: aynı sıcaklık üç birimde; kayan gösterge seçilen birime süzülür, sayı ve rengi birlikte değişir
const celsius = 23
const units = {
  "°C": { value: celsius, color: "brand-orange" },
  "°F": { value: Math.round(celsius * 9 / 5 + 32), color: "brand-purple" },
  "K": { value: Math.round(celsius + 273.15), color: "brand-blue" },
} as const

export function Thermometer() {
  let $unit = "°C"
  const $now = units[$unit as keyof typeof units]
  return <Card title="İstanbul, şu an">
    <div sx={{ flex: ["row", "between", "center"], gap: 3 }}>
      <span sx={{ text: "2xl", color: $now.color }}>{$now.value} {$unit}</span>
      <Segmented bind:value={$unit} indicator="slide" m:color={$now.color} options="°C, °F, K" aria-label="Birim" />
    </div>
  </Card>
}
