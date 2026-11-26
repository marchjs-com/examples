// BottomRightControlsLab: the full-featured page-corners example; it uses the whole corner API.
//
// The API shown here: BottomRightControls (label, class), CornerControls (corner), addCornerControl (with the stacking
// order), addBottomRightControl and the off() function they return.
// Page controls (a feedback button, back to top, a chat bubble) do not pick fixed positions and overlap: each one adds
// itself to one of four page corners, and the corner stacks them in `order`.
// Use it as a reference when you need one specific function: find it below, copy the line.
// BottomRightControlsLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab on save.
import { BottomRightControls, CornerControls, addCornerControl, addBottomRightControl, Button } from "march/ui"

export function BottomRightControlsLab() {
  // How many controls were added, and the off() functions that remove them (reactive state for the counter).
  let $count = 0
  const offs: (() => void)[] = []
  // addBottomRightControl(node, order) adds a node to the bottom-end corner; a lower order sits nearer the edge. It
  // returns off(), which takes the control out again: keep it, so the control can be removed when it is no longer
  // needed (for example when your component goes away).
  const add = () => { $count++; offs.push(addBottomRightControl(<Button size="sm">{`Denetim ${$count}`}</Button> as Node, $count)) }
  const clear = () => { offs.splice(0).forEach((off) => off()); $count = 0 }
  // addCornerControl(corner, node, order?) is the general form: the corners are top-start, top-end, bottom-start and
  // bottom-end (start and end mirror in right-to-left text).
  addCornerControl("top-start", <span class="lab-top">Üst baş</span> as Node)
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The corner elements render themselves on first use; drawing them here lets you give them a name and a class.
        BottomRightControls is the bottom-end corner; its label is the accessible name of the group (screen readers),
        and class is added to the corner element so CSS or a test can find it. CornerControls draws any corner. */}
    <BottomRightControls label="Sayfa denetimleri" class="lab-corner" />
    <CornerControls corner="top-start" label="Üst baş köşesi" />
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" on:click={add}>Köşeye ekle</Button>
      <Button size="sm" on:click={clear}>Hepsini çıkar</Button>
    </div>
    <span class="lab-count">{$count} denetim</span>
  </div>
}
