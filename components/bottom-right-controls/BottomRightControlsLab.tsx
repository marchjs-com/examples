import { BottomRightControls, CornerControls, addCornerControl, addBottomRightControl, Button } from "march/ui"

// köşe API'sinin hepsi: BottomRightControls (label, class), CornerControls (corner), addCornerControl (sıra: order),
// addBottomRightControl ve geri dönen off()
export function BottomRightControlsLab() {
  let $count = 0
  const offs: (() => void)[] = []
  const add = () => { $count++; offs.push(addBottomRightControl(<Button size="sm">{`Denetim ${$count}`}</Button> as Node, $count)) }
  const clear = () => { offs.splice(0).forEach((off) => off()); $count = 0 }
  addCornerControl("top-start", <span class="lab-top">Üst baş</span> as Node)
  return <div sx={{ flex: "col", gap: 2 }}>
    <BottomRightControls label="Sayfa denetimleri" class="lab-corner" />
    <CornerControls corner="top-start" label="Üst baş köşesi" />
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" on:click={add}>Köşeye ekle</Button>
      <Button size="sm" on:click={clear}>Hepsini çıkar</Button>
    </div>
    <span class="lab-count">{$count} denetim</span>
  </div>
}
