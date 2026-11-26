// TrafficLight: the creative-minimal StatusDot example.
//
// What it shows: a traffic light made of three large StatusDots. The lit lamp is a filled dot that blinks; the other two
// are hollow rings. A button moves to the next lamp and the sentence beside the lights says what to do.
// When to use this pattern: a state machine drawn with dots. Every prop that changes (`hollow`, `pulse`, `label`) is
// given as a function of the same state, so the dots follow it with no other code.
//
// Animation: pulse="blink" fades the dot and stops under the visitor's reduced-motion preference; a lamp that is not lit
// has pulse false, so it stays still.
// Accessibility: only the lit lamp gets a `label` (a function that returns null for the others), so a screen reader
// hears just the current instruction; the dots without a label are hidden from assistive technology. The text on the
// right says the same in words.
import { StatusDot, Button, Card } from "march/ui"

// For each lamp: its tone and the instruction it gives. `as const` keeps the tones as literal types for the prop.
const LIGHTS = [["danger", "Kırmızı: dur"], ["warn", "Sarı: hazırlan"], ["success", "Yeşil: geç"]] as const

export function TrafficLight() {
  // Reactive state: the index of the lit lamp.
  let $on = 0
  // m:theme="night" draws the card in the dark theme, where the lamps look best.
  return <Card m:theme="night">
    <div sx={{ flex: ["row", "center"], gap: 3 }}>
      <div sx={{ flex: "col", gap: 2 }}>
        {/* size="lg": a big lamp. hollow: a ring when the lamp is off and a filled dot when it is on. pulse: only the
            lit lamp blinks. label: the instruction, only while lit (null removes the name, making the dot decoration). */}
        {LIGHTS.map(([tone, name], i) => <StatusDot size="lg" tone={tone} hollow={() => $on !== i} pulse={() => ($on === i ? "blink" : false)}
          label={() => ($on === i ? name : null)} />)}
      </div>
      <div sx={{ flex: "col", gap: 2 }}>
        {/* The same instruction in text, and a button that moves to the next lamp (wrapping around after the last). */}
        <span sx={{ text: "lg" }}>{() => LIGHTS[$on]![1]}</span>
        <Button size="sm" on:click={() => $on = ($on + 1) % 3}>Sıradaki</Button>
      </div>
    </div>
  </Card>
}
