// TopBar: the creative-minimal Spacer example.
//
// What it shows: an app's top bar with the logo and a draft badge at the start and two actions at the end, separated by a
// Spacer. A button below flips the text direction, so you can watch the whole bar mirror.
// When to use this pattern: the standard "title on one side, actions on the other" bar. Spacer works with the logical end of
// the row, so right-to-left pages get the mirrored layout without any extra code.
import { Spacer, Button, Badge } from "march/ui"

export function TopBar() {
  // `let $rtl` is a March signal: the button flips it and the dir attribute below follows.
  let $rtl = false
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* dir="rtl" or "ltr" sets the text direction of this bar (a page would set it on the document instead). The row is a
        flex row, and Spacer pushes the two buttons to the logical end: the right in left-to-right text, the left in
        right-to-left text. */}
    <div dir={$rtl ? "rtl" : "ltr"} sx={{ flex: ["row", "center"], gap: 2 }}>
      <strong>HADİ</strong>
      <Badge>Taslak</Badge>
      <Spacer />
      <Button size="sm">Paylaş</Button>
      <Button size="sm" variant="primary">Yayınla</Button>
    </div>
    {/* The switch: its label says which direction it will change to. */}
    <Button size="sm" variant="ghost" on:click={() => $rtl = !$rtl}>{$rtl ? "Soldan sağa" : "Sağdan sola"}</Button>
  </div>
}
