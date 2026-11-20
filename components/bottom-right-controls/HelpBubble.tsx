import { addCornerControl, IconButton, toast } from "march/ui"
import { helpCircle } from "march/icons"

// yardım balonu: sayfanın alt-son köşesine yuvarlak bir düğme ekler; bileşen gidince düğme de kalkar
export function HelpBubble() {
  addCornerControl("bottom-end", <IconButton icon={helpCircle} label="Yardım" variant="solid" shape="round" on:click={() => toast("Size nasıl yardım edebiliriz?")} /> as Node, 5)
  return <p sx={{ text: "sm", color: "muted" }}>Sağ alt köşedeki yardım düğmesine bakın.</p>
}
