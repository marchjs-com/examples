// StickerMaker: the creative-minimal ImageCropper example.
//
// What it shows: a sticker maker. A smiling face is cropped to a square, turned and mirrored, and a line under it describes
// what you did.
// When to use this pattern: you only need the crop state (zoom, rotation, flip, position), not a saved file.
// `bind:value` keeps a CropState in sync with the cropper, so any part of the page can read it.
// Keyboard: the crop area is focusable. Arrow keys move the image, + and - zoom, [ and ] turn by 1 degree, R turns by 90
// degrees (Shift+R back), F mirrors. Every button and slider has an accessible name.
import { ImageCropper, type CropState } from "march/ui"

// A tiny inline SVG, turned into a blob: URL (an SVG given as a data: URL is not treated as safe and is blocked, and the
// cropper needs a source its canvas can read).
const FACE = URL.createObjectURL(new Blob([`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#ffd27a"/><circle cx="50" cy="50" r="34" fill="#f2801f"/><circle cx="38" cy="42" r="5" fill="#13233a"/><circle cx="62" cy="42" r="5" fill="#13233a"/><path d="M34 60q16 14 32 0" stroke="#13233a" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`], { type: "image/svg+xml" }))

export function StickerMaker() {
  // The crop state: { zoom, rotate, flip, x, y, aspect, w, h }. It is undefined until the cropper has set it.
  let $crop: CropState | undefined
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* - src: the image (same origin, data: or blob:, so the canvas can read it). alt: describes the image for the crop area.
        - aspect={1}: a fixed square frame (this also hides the ratio choices).
        - sliders={["angle"]}: only the fine-angle slider (the zoom slider is left out). hint={false}: no key hint under the area
          (screen readers still get it).
        - bind:value: two-way link to $crop. */}
    <ImageCropper src={FACE} alt="Gülen yüz" aspect={1} sliders={["angle"]} hint={false} bind:value={$crop} />
    {/* The summary line reads the state: the rotation in degrees and whether the picture is mirrored. */}
    <span sx={{ text: "sm", color: "muted" }}>
      Çıkartma: {$crop ? `${Math.round($crop.rotate)}° döndü${$crop.flip ? ", aynalandı" : ""}` : "henüz dokunulmadı"}
    </span>
  </div>
}
