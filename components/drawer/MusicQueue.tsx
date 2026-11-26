// MusicQueue: the creative-minimal Drawer example.
//
// What it shows: the up-next list of a music player, in a drawer that rises from the bottom and rests at two heights.
// Drag it up for the whole list, down to the lower stop, or past the bottom edge to close it.
// When to use this pattern: bottom sheets with two sizes (a peek and a full view), as on phones.
// Accessibility: with snap points the grab handle is a button that steps through the stops with Enter or Space, so every
// size is reachable without a pointer.
import { Drawer, Button, Card } from "march/ui"

// The songs in the queue.
const queue = ["Gece Yolu", "Sahil", "Kuzey Rüzgârı", "Şafak", "Son Vapur"]

export function MusicQueue() {
  let $open = false
  return <Card m:theme="night">
    <Button on:click={() => $open = true}>Sıradakiler ({queue.length})</Button>
    {/* side="bottom" with snapPoints={[0.4, 0.9]}: the sheet opens at 40% of the viewport height (the first point) and
            can rest at 90%. m:theme="night" on the Card draws this subtree in the dark theme. */}
    <Drawer open={$open} onClose={() => $open = false} side="bottom" snapPoints={[0.4, 0.9]} title="Sıradakiler">
      <ol>{queue.map((s) => <li>{s}</li>)}</ol>
    </Drawer>
  </Card>
}
