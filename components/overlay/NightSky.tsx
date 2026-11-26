// NightSky: the creative-minimal Overlay example.
//
// A night sky made only of CSS effects: dots act as stars and a vignette darkens the edge like a horizon. A button cycles
// through four effects, and a second button proves that the layers never block clicks. Use this pattern when you want
// an atmosphere behind content without any image or video.
import { Overlay, Button, Card } from "march/ui"

// The effects the button cycles through (all of them are built-in CSS effects of Overlay).
const looks = ["dots", "grid", "mesh", "spotlight"] as const

export function NightSky() {
  // The index of the current effect, and a counter for the "wish" button.
  let $i = 0
  let $wishes = 0
  // m:theme="night" on the Card makes the card and everything inside use the dark theme tokens.
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 3, p: 6, radius: 3 }}>
      {/* The first Overlay: `effect` is read from state, so changing $i swaps the effect. m:color is the common colour
          token prop: the effect is drawn in that colour. opacity={0.8} keeps it a little transparent. The second one is
          a vignette on top of it (the edge darkening). Both are decoration: aria-hidden and inert, and they take no
          pointer input, so the buttons below stay clickable. */}
      <Overlay effect={looks[$i % looks.length]} m:color="brand-gold" opacity={0.8} />
      <Overlay effect="vignette" />
      <strong sx={{ text: "xl" }}>Bu gece {() => looks[$i % looks.length]} gökyüzü</strong>
      <span sx={{ color: "muted" }}>Tutulan dilek: {() => $wishes}</span>
      <div sx={{ flex: "row", gap: 2 }}>
        <Button size="sm" on:click={() => $i++}>Gökyüzünü değiştir</Button>
        <Button size="sm" variant="ghost" on:click={() => $wishes++}>Dilek tut</Button>
      </div>
    </div>
  </Card>
}
