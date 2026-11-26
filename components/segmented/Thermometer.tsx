// Thermometer: the creative-minimal Segmented example.
//
// What it shows: the same temperature in three units. A sliding highlight glides to the chosen unit, and the number and
// its colour change together with it.
// When to use this pattern: a unit or mode switch where the choice also changes how something else looks: the colour
// of the Segmented itself (m:color) and of the number are both taken from the same data row.
import { Segmented, Card } from "march/ui"

// 23 degrees Celsius, converted for the other two units. Each unit also has a colour token.
const celsius = 23
const units = {
  "°C": { value: celsius, color: "brand-orange" },
  "°F": { value: Math.round(celsius * 9 / 5 + 32), color: "brand-purple" },
  "K": { value: Math.round(celsius + 273.15), color: "brand-blue" },
} as const

export function Thermometer() {
  // `let $unit` is a March signal that the Segmented writes (bind:value). `const $now` is a derived value: it is computed
  // again whenever $unit changes, so the number and the colour follow the chosen unit.
  let $unit = "°C"
  const $now = units[$unit as keyof typeof units]
  return <Card title="İstanbul, şu an">
    <div sx={{ flex: ["row", "between", "center"], gap: 3 }}>
      <span sx={{ text: "2xl", color: $now.color }}>{$now.value} {$unit}</span>
      {/* Segmented options used here:
          - options="°C, °F, K": a comma-separated text; each part is both a value and its label.
          - indicator="slide": one highlight glides to the chosen unit (the default "fill" colours it in place). The glide
            runs on the motion engine, so reduced motion and the global speed apply.
          - m:color={$now.color}: the common colour prop, bound to the current unit's token, so the control changes colour
            with the number.
          - aria-label: the name of the group. It is a radiogroup, so the arrow keys move and select, and only the chosen
            unit is in the Tab order. */}
      <Segmented bind:value={$unit} indicator="slide" m:color={$now.color} options="°C, °F, K" aria-label="Birim" />
    </div>
  </Card>
}
