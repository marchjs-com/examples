import { Tooltip, Button } from "march/ui"

// Tooltip'in özellikleri: text (sabit ya da canlı), placement, delay, disabled, motion, color, class ve hedef (çocuk)
export function TooltipLab() {
  let $n = 0
  let $off = false
  return <div sx={{ flex: "row", gap: 2 }}>
    <Tooltip class="lab-tip" text={() => `${$n} kez basıldı`} placement="bottom-end" delay={0} motion="none" color="success" disabled={$off}>
      <Button class="lab-target" on:click={() => $n++}>Bas</Button>
    </Tooltip>
    <Button on:click={() => $off = !$off}>{$off ? "İpucunu aç" : "İpucunu kapat"}</Button>
  </div>
}
