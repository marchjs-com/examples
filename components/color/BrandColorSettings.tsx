// BrandColorSettings: the real-life ColorPicker example.
//
// What it shows: the settings of an online shop. The owner picks the brand colour from the shop's own palette (or
// anywhere on the picker), sees how the "add to cart" button will look and saves; Save is enabled only after a change.
// When to use this pattern: a colour setting where a simple hex field is not enough but a full picker is too much:
// switch off the parts you do not need (alpha, the preview, the contrast row) and give your own palette.
// For one compact `#rrggbb` field use ColorInput instead.
import { ColorPicker, Card, Button, toast } from "march/ui"

// `palettes` takes a list of { label, colors }: the colours are CSS colours or theme tokens. Giving your own list
// replaces the built-in palettes, so the shop sees only its own colours.
const PALETTES = [{ label: "Mağaza renkleri", colors: ["#e4572e", "#17bebb", "#ffc914", "#2e282a", "#76b041"] }]

export function BrandColorSettings() {
  // $brand is the live value; $saved is the last saved one, so the button knows whether something changed.
  let $brand = "#17bebb"
  let $saved = "#17bebb"
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      <b>Marka rengi</b>
      {/* bind:value keeps $brand and the picker in sync. alpha={false} removes the transparency slider (a brand colour
          is opaque); palettes is our own list; recent={4} keeps the last four picks; preview={false} hides the old /
          new comparison because the example draws its own preview below; aria-label names the picker for screen
          readers. */}
      <ColorPicker bind:value={$brand} alpha={false} palettes={PALETTES} recent={4} preview={false} aria-label="Marka rengi" />
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <span sx={{ text: "sm", color: "muted" }}>Önizleme:</span>
        <span style={{ background: $brand, color: "white", padding: "0.4rem 0.9rem", borderRadius: "0.5rem" }}>Sepete ekle</span>
      </div>
      <Button disabled={$brand === $saved} on:click={() => { $saved = $brand; toast(`Marka rengi ${$brand} kaydedildi`) }}>Kaydet</Button>
    </div>
  </Card>
}
