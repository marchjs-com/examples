import { Drawer, Button, Checkbox } from "march/ui"

// mağaza süzgeçleri: sağdan açılan çekmece; seçilen süzgeç sayısı düğmede
export function FilterSheet() {
  let $open = false
  let $stock = false
  let $sale = false
  const count = () => Number($stock) + Number($sale)
  return <div>
    <Button on:click={() => $open = true}>Süzgeçler{count() ? ` (${count()})` : ""}</Button>
    <Drawer open={$open} onClose={() => $open = false} side="end" size="sm" title="Süzgeçler">
      <Checkbox label="Stokta olanlar" bind:value={$stock} />
      <Checkbox label="İndirimdekiler" bind:value={$sale} />
      <Button variant="primary" on:click={() => $open = false}>Uygula</Button>
    </Drawer>
  </div>
}
