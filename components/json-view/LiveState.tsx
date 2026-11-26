// LiveState: the creative-minimal JsonView example.
//
// What it shows: live state in a tree. Two buttons change a number and a list; the tree on screen follows them.
// When to use this pattern: debugging panels and teaching pages. `value` can be a function, so JsonView reads fresh data each
// time the state changes: the tree is redrawn when the object changes.
// Accessibility: every object and array is a disclosure button with aria-expanded (Tab, then Enter or Space).
import { JsonView, Button } from "march/ui"

export function LiveState() {
  // Two pieces of state: a counter and a list of tags.
  let $likes = 0
  let $tags = ["march"]
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: "row", gap: 2 }}>
      {/* Each button changes one piece of state. */}
      <Button size="sm" on:click={() => $likes++}>Beğen</Button>
      <Button size="sm" on:click={() => $tags = [...$tags, `etiket${$tags.length}`]}>Etiket ekle</Button>
    </div>
    {/* - label: the accessible name of the root list. open={2}: two levels are expanded at the start.
        - value as a function: a new object is built from the state each time, so the tree follows the buttons. */}
    <JsonView label="Gönderi durumu" open={2} value={() => ({ post: { title: "Sinyaller", likes: $likes, tags: $tags } })} />
  </div>
}
