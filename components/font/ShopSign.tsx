// ShopSign: the creative-minimal FontPicker example.
//
// What it shows: a shop sign. Type the shop's name, pick one of the fonts that are already on the device, and the sign
// on the dark card is drawn in that font. Nothing is requested from the network.
// When to use this pattern: you only need a font choice for a preview, and you do not want to load web fonts at all.
// `catalog={false}` removes the web font catalog, so only device fonts are listed and nothing is downloaded.
// Keyboard: the button opens a popover with a search field; arrow keys move the highlighted family, Enter picks it and
// Escape closes.
import { FontPicker, TextInput, Card, type FontChoice } from "march/ui"

export function ShopSign() {
  // $name is the sign text, $font is the picked family (the picker's value), and $stack is the CSS font-family string that
  // the sign uses. They are separate because the picker's value is the family name, while CSS needs the full stack.
  let $name = "Kahve Durağı"
  let $font = "Georgia"
  let $stack = "Georgia, serif"
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* A plain text field bound to $name; aria-label gives it an accessible name because it has no visible label. */}
      <TextInput bind:value={$name} aria-label="Dükkânın adı" />
      {/* - bind:value: the chosen family name.
          - catalog={false}: no web font catalog, so only fonts on the device are offered and nothing is downloaded.
          - specimen={false}: hides the sample-text panel to keep the popover small.
          - closeOnPick: closes the popover after a pick.
          - onPick(choice): receives { family, stack, weight, ... }; `stack` is the ready-to-use CSS font-family value. */}
      <FontPicker bind:value={$font} catalog={false} specimen={false} closeOnPick onPick={(c: FontChoice) => $stack = c.stack} />
    </div>
    {/* m:theme="night" draws the card in the dark colour theme; the sign text uses the picked font stack. */}
    <Card m:theme="night">
      <div style={{ fontFamily: $stack, fontSize: "2.4rem", textAlign: "center", letterSpacing: "0.04em" }}>{$name}</div>
    </Card>
  </div>
}
