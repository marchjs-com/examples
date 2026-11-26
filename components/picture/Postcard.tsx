// Postcard: the creative-minimal Picture example.
//
// A postcard: the front is a picture; when you press the button, the back appears as a ready node. Both go through the
// same Picture slot, because Picture draws a picture object as an <img> and returns a node as it is. Use this pattern
// when a slot may hold either an image or custom content.
import { Picture, Card, Button } from "march/ui"

// The front: a picture object (src, alt for screen readers, and the size that reserves the space).
const front = { src: "/media/dusk.jpg", alt: "Gün batımında tepeler", width: 1200, height: 800 }

export function Postcard() {
  // Whether the back is shown, and the back itself: a ready node (any content).
  let $back = false
  const back = <div sx={{ flex: "col", gap: 2, p: 6 }}><strong>Sevgili Deniz,</strong><span>Tepelerde gün batımı harikaydı. Yakında görüşürüz!</span></div>
  // m:theme is a common prop: the card uses the dark theme tokens on the back and the normal ones on the front.
  return <Card title="Kartpostal" m:theme={$back ? "night" : undefined}>
    <div sx={{ flex: "col", gap: 3 }}>
      {/* A function child is re-evaluated when $back changes, so the slot is redrawn with the other side. `source`
          takes the object (drawn as an <img>) or the node (returned as it is); `as Node` only tells TypeScript that the
          JSX is a DOM node. fit="cover" applies to the image. */}
      {() => <Picture source={$back ? back as Node : front} fit="cover" />}
      <Button size="sm" on:click={() => $back = !$back}>{() => ($back ? "Ön yüzü göster" : "Arkasını çevir")}</Button>
    </div>
  </Card>
}
