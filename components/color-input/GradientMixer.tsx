// GradientMixer: the creative-minimal ColorInput example.
//
// What it shows: pick two colours; the circle between them draws a gradient of the two, and the CSS line below it is ready
// to copy.
// When to use this pattern: when a colour feeds something visual that should update as the user picks. bind:value gives
// you the live `#rrggbb` text, which you can use in any template; the Swatch is the preview.
// Accessibility: each ColorInput has a swatchLabel (the name of the colour box) and an aria-label (the name of the code
// field), so both are reachable by keyboard and named for screen readers.
import { ColorInput, Swatch } from "march/ui"

export function GradientMixer() {
  let $from = "#f2801f"
  let $to = "#a3338c"
  // A derived value: the CSS gradient text; it is recomputed whenever one of the colours changes.
  const $css = `linear-gradient(135deg, ${$from}, ${$to})`
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center", "wrap"], gap: 3 }}>
      <ColorInput bind:value={$from} swatchLabel="Başlangıç rengi" aria-label="Başlangıç kodu" />
      {/* Swatch accepts a gradient as its colour; shape="circle" and size="lg" make the round preview. */}
      <Swatch color={$css} shape="circle" size="lg" label="Gradyan" />
      <ColorInput bind:value={$to} swatchLabel="Bitiş rengi" aria-label="Bitiş kodu" />
    </div>
    <code sx={{ text: ["sm", "mono"], color: "muted" }}>background: {$css};</code>
  </div>
}
