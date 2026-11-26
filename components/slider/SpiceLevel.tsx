// SpiceLevel: the creative-minimal Slider example.
//
// What it shows: a spice-level picker from 0 to 5. The slider's value is drawn as chili peppers, the colour switches from
// orange to red above level 3, and the sentence below describes the level.
// When to use this pattern: a small whole-number scale where each step has a meaning. `format` changes what is shown and
// `valueText` changes what a screen reader says, so the picture and the speech both fit the scale.
import { Slider, Card } from "march/ui"

// One sentence per level, indexed by the slider value.
const notes = ["Hiç acı yok", "Hafif", "Tatlı sert", "Acı", "Çok acı", "Ateş! 🔥"]

export function SpiceLevel() {
  // `let $spice` is a March signal that the Slider writes (bind:value).
  let $spice = 2
  return <Card title="Adana dürüm">
    <div sx={{ flex: "col", gap: 2 }}>
      {/* Slider options used here:
          - bind:value={$spice}, min={0}, max={5}: a whole-number scale (the step is 1 by default).
          - track: a ramp track in the control's colour; the input stays a native range, so arrows, Page Up / Down and Home /
            End work.
          - m:color: a common prop that sets the colour token; here it turns red (danger) above level 3 and is orange before.
          - format: the text shown next to the slider: as many peppers as the level, or a bell pepper for zero.
          - valueText: what a screen reader speaks (aria-valuetext): the sentence of the level instead of the bare number.
          - aria-label: the accessible name (there is no visible label). */}
      <Slider bind:value={$spice} min={0} max={5} track m:color={$spice > 3 ? "danger" : "brand-orange"}
        format={(v: number) => (v ? "🌶️".repeat(v) : "🫑")} valueText={(v: number) => notes[v] ?? ""} aria-label="Acı seviyesi" />
      <span sx={{ text: "lg", color: $spice > 3 ? "danger" : "brand-orange" }}>{notes[$spice]}</span>
    </div>
  </Card>
}
