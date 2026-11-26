// PhoneMock: the creative-minimal OverlayScope example.
//
// A phone mock-up: the menu drawer opens inside the "screen" as a bottom sheet and does not cover the page around it.
// Use this pattern for device frames and component previews, where a drawer or dialog must stay inside the frame.
import { OverlayScope, Button, openDrawer } from "march/ui"

export function PhoneMock() {
  // OverlayScope is the frame: class="m-card" gives it the card look, and `sx` adds padding and a width. Anything opened
  // from the button inside it is looked up from the button, so the drawer belongs to this scope and opens in it.
  // side: "bottom" makes the drawer a bottom sheet, like on a phone. The drawer's own behaviour (Escape and the scrim
  // close it, focus moves in and back) still works inside the frame; only the inside of the frame is inert while it is
  // open, so the rest of the page stays usable.
  return <OverlayScope class="m-card" sx={{ p: 3, w: "sm" }}>
    <div sx={{ flex: "col", gap: 2 }}>
      <strong>HADİ</strong>
      <Button size="sm" on:click={() => openDrawer(() => <p sx={{ p: 3 }}>Telefonun içindeki menü</p>, { title: "Menü", side: "bottom" })}>Menüyü aç</Button>
    </div>
  </OverlayScope>
}
