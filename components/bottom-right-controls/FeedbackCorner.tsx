// FeedbackCorner: the real-life page-corners example.
//
// A feedback button whose corner you choose: pick a corner and the button moves there, leaving the old corner. Use
// this pattern when a page-wide control must live in a corner without covering other controls: addCornerControl stacks
// it with the others, and the off() function it returns is how you move or remove it.
import { addCornerControl, Button, Segmented } from "march/ui"

export function FeedbackCorner() {
  // The current corner (reactive state) and the off() function of the control that is currently placed.
  let $corner = "bottom-start"
  let off = () => {}
  // place(c): first take the old button out (off()), then add a new one to corner c and keep its new off(). The last
  // argument (1) is the stacking order: a lower number sits nearer the page edge.
  const place = (c: string) => { off(); off = addCornerControl(c as "bottom-start", <Button size="sm" variant="primary">Geri bildirim</Button> as Node, 1); $corner = c }
  place("bottom-start")
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The Segmented control lists the four corners; aria-label names the group for screen readers, and onChange
        calls place. The corners are fixed to the page (not to this box), so the button appears at the page's edge. */}
    <Segmented aria-label="Köşe" value={$corner} options={["top-start", "top-end", "bottom-start", "bottom-end"]} onChange={place} />
    <span sx={{ text: "sm", color: "muted" }}>Düğme şimdi {$corner} köşesinde</span>
  </div>
}
