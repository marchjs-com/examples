import { PanelHeader, Button, Checkbox } from "march/ui"
import { filter } from "march/icons"

// süzgeç paneli: üstte başlık ve kapat, altta alt çubuk (as="footer") ile uygula
export function FilterPanel() {
  let $open = true
  let $stock = false
  return <div class="m-card">
    {() => ($open ? <>
      <PanelHeader icon={filter} title="Süzgeçler" divider onClose={() => $open = false} />
      <div sx={{ p: 3 }}><Checkbox label="Yalnız stoktakiler" bind:value={$stock} /></div>
      <PanelHeader as="footer" title={$stock ? "1 süzgeç" : "Süzgeç yok"} divider actions={<Button size="sm" variant="primary">Uygula</Button>} close={false} />
    </> : <Button size="sm" on:click={() => $open = true}>Süzgeçleri aç</Button>)}
  </div>
}
