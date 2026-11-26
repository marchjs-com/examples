// FilterSheet: the real-life Drawer example.
//
// What it shows: shop filters. A drawer slides in from the end edge (the right in left-to-right layouts); the button
// shows how many filters are chosen; "Uygula" closes it.
// When to use this pattern: secondary controls that should not take room on the page, on desktop and on phones.
// Accessibility: the drawer is a modal dialog: focus moves in, Tab stays inside, Escape closes it and focus returns to
// the button. Drawers mirror in right-to-left layouts because `end` follows the reading direction.
import { Drawer, Button, Checkbox } from "march/ui"

// $stock and $sale are the two filters; count() is how many are on, shown on the button.
export function FilterSheet() {
  let $open = false
  let $stock = false
  let $sale = false
  const count = () => Number($stock) + Number($sale)
  return <div>
    <Button on:click={() => $open = true}>Süzgeçler{count() ? ` (${count()})` : ""}</Button>
    {/* open + onClose: shown while $open is true; onClose (Escape, scrim, x) sets it to false.
            side="end": the edge at the end of the reading direction; size="sm": a narrow panel; title: the heading. */}
    <Drawer open={$open} onClose={() => $open = false} side="end" size="sm" title="Süzgeçler">
      <Checkbox label="Stokta olanlar" bind:value={$stock} />
      <Checkbox label="İndirimdekiler" bind:value={$sale} />
      <Button variant="primary" on:click={() => $open = false}>Uygula</Button>
    </Drawer>
  </div>
}
