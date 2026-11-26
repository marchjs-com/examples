// HelpBubble: the creative-minimal page-corners example.
//
// A help bubble: a round button added to the page's bottom-end corner. It is the smallest use of the corner API, one
// call to addCornerControl. Use the pattern for a chat or help button that every page of an app should have.
import { addCornerControl, IconButton, toast } from "march/ui"
import { helpCircle } from "march/icons"

export function HelpBubble() {
  // addCornerControl("bottom-end", node, order) adds the node to that page corner; order 5 sits further from the
  // edge than lower numbers, so other corner controls can stack around it. The node is an IconButton: `label` is its
  // accessible name (the icon alone says nothing to a screen reader), shape="round" makes the bubble, and a click
  // shows a toast (a short, polite status message). The returned off() is not kept here: the library also removes the
  // control when the component is cleaned up, so the button goes away with the example.
  addCornerControl("bottom-end", <IconButton icon={helpCircle} label="Yardım" variant="solid" shape="round" on:click={() => toast("Size nasıl yardım edebiliriz?")} /> as Node, 5)
  return <p sx={{ text: "sm", color: "muted" }}>Sağ alt köşedeki yardım düğmesine bakın.</p>
}
