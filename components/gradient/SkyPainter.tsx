// SkyPainter: the creative-minimal GradientEditor example.
//
// What it shows: a sky painter. Pick a morning, noon or evening preset, or move the colour stops yourself, and the sky above
// the editor changes at once.
// When to use this pattern: the editor edits a plain CSS string (`bind:value`), so you can use that string anywhere:
// here as the `background` of a div. Trim the editor to what the task needs by switching parts off.
// Accessibility: the angle dial and every stop are sliders (arrow keys change them); presets and quick angles are named
// buttons.
import { GradientEditor } from "march/ui"

// Presets: each has a label and a value. A value can be a CSS gradient or, as here, a list of colours (they are spread
// evenly over the gradient).
const SKIES = [
  { label: "Sabah", value: ["#ffd3a5", "#fd6585"] },
  { label: "Öğle", value: ["#4cc3e0", "#1d9ad6"] },
  { label: "Akşam", value: ["#f2801f", "#a3338c", "#13233a"] },
]

export function SkyPainter() {
  // The gradient as a CSS string: both the editor and the sky box read it.
  let $sky = "linear-gradient(180deg, #ffd3a5 0%, #fd6585 100%)"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The sky. The editor's value is a ready-to-use CSS background, so it goes straight into the style. */}
    <div style={{ background: $sky, height: "8rem", borderRadius: "1rem", display: "grid", placeItems: "center", fontSize: "3rem" }}>☀️</div>
    {/* - bind:value: two-way link to $sky.
        - types={["linear"]}: only the linear type is offered (the type switcher is not needed for one type).
        - presets: our own list instead of the built-in HADI and theme presets.
        - output={false} / preview={false}: no CSS line with a copy button and no big preview, because the sky is the preview.
        - angles={[0, 180]}: only two quick angle buttons (left to right and top to bottom).
        - aria-label: the accessible name of the whole editor. */}
    <GradientEditor bind:value={$sky} types={["linear"]} presets={SKIES} output={false} preview={false} angles={[0, 180]} aria-label="Gökyüzü" />
  </div>
}
