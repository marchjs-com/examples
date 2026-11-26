// Campfire: the creative-minimal PixelSprite example.
//
// A crackling pixel campfire under a starry sky: three built-in animated sprites side by side. Each sprite plays its
// own frames at its own speed on the motion engine's clock; nothing else is needed.
import { PixelSprite } from "march/ui"

export function Campfire() {
  // sprite picks a built-in drawing by name; fps overrides its speed; pitch is the size of one LED in px.
  // panel="none" lets the three tiles sit on the page without their black housing, so they read as one scene.
  return <div sx={{ flex: "row", gap: 1 }}>
    <PixelSprite sprite="sparkle" fps={2} pitch={9} panel="none" />
    <PixelSprite sprite="fire" fps={6} pitch={14} panel="none" label="Kamp ateşi" />
    <PixelSprite sprite="moon" pitch={9} panel="none" />
  </div>
}
