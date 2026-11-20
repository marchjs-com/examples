import { Window, Button } from "march/ui"
import { messageCircle } from "march/icons/lucide"

// destek sohbeti: küçük pencere; kapatınca "Sohbeti aç" düğmesi geri getirir
export function ChatPopup() {
  let $open = true
  return <div style={{ position: "relative", "block-size": "20rem" }}>
    <Window title="Destek" icon={messageCircle} color="brand-blue" x={20} y={20} width={280} height={200} minimizable={false}
      open={$open} onClose={() => $open = false}>
      <div sx={{ p: 3, flex: "col", gap: 2 }}><p>Merhaba! Size nasıl yardım edebilirim?</p></div>
    </Window>
    {() => ($open ? null : <Button size="sm" on:click={() => $open = true}>Sohbeti aç</Button>)}
  </div>
}
