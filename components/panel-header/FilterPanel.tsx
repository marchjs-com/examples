// FilterPanel: the real-life PanelHeader example.
//
// A filter panel with a header on top (an icon, the title and a close button) and a footer bar at the bottom (status
// text and an Apply button). The same component draws both bars. Use this pattern for dialogs, drawers and side panels
// that need a title bar and an action bar.
import { PanelHeader, Button, Checkbox } from "march/ui"
import { filter } from "march/icons"

export function FilterPanel() {
  // Whether the panel is open, and the state of its one filter.
  let $open = true
  let $stock = false
  return <div class="m-card">
    {() => ($open ? <>
      {/* The top bar. icon: drawn before the title. divider: a rule between the bar and the content. onClose: shows the
          close button and is called when it is pressed (the button's accessible name defaults to "Close"; closeLabel
          would change it). */}
      <PanelHeader icon={filter} title="Süzgeçler" divider onClose={() => $open = false} />
      <div sx={{ p: 3 }}><Checkbox label="Yalnız stoktakiler" bind:value={$stock} /></div>
      {/* The bottom bar: as="footer" draws the same component as a <footer> under the panel (the rule goes above it).
          title takes a live expression, so the status text follows the checkbox. actions: the end side, here the Apply
          button. close={false}: no close button on this bar (there is no onClose anyway; written out for clarity). */}
      <PanelHeader as="footer" title={$stock ? "1 süzgeç" : "Süzgeç yok"} divider actions={<Button size="sm" variant="primary">Uygula</Button>} close={false} />
    </> : <Button size="sm" on:click={() => $open = true}>Süzgeçleri aç</Button>)}
  </div>
}
