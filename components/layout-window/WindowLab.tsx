import { Window, Button } from "march/ui"
import { fileText } from "march/icons"

// Window'un özellikleri: title, icon, chrome, x / y / width / height, minWidth / minHeight, state ve onStateChange,
// open / onClose, minimizable / maximizable / closable, movable, resizable, snap, labels, icons, color, stripe,
// animated, persist, class
export function WindowLab() {
  let $state = "normal"
  let $open = true
  let $closes = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button size="sm" disabled={$open} on:click={() => $open = true}>Raporu aç</Button>
      <span class="lab-closes">Kapatma: {$closes}</span>
    </div>
    {/* open: true iken görünür; onClose: kapat düğmesine basılınca çağrılır (burada open'ı kapatır)
        persist: yer, boyut ve durum localStorage'da "m.win.lab-rapor" altında saklanır, sayfa yenilenince geri gelir */}
    <div style={{ position: "relative", "block-size": "20rem" }}>
      <Window class="lab-win" title="Rapor" icon={fileText} chrome="hadi" x={10} y={10} width={300} height={180} minWidth={200} minHeight={120}
        state={$state as "normal"} onStateChange={(s: string) => $state = s} snap resizable movable color="brand-purple" stripe={false} animated={false}
        open={$open} onClose={() => { $open = false; $closes++ }} persist="lab-rapor"
        labels={{ close: "Raporu kapat" }} icons={{ close: "✕" }}>
        <p sx={{ p: 2 }} class="lab-state">Durum: {$state}</p>
      </Window>
      <Window class="lab-fixed" title="Sabit" chrome="mac" x={200} y={120} width={200} height={120} movable={false} resizable={false} closable={false} maximizable={false} minimizable={false} />
    </div>
  </div>
}
