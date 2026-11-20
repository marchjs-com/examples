import { Stat } from "march/charts"
import { Button } from "march/ui"
import { wallet } from "march/icons"

// kumbara: her "₺50 at" birikimi artırır; değişim geçen haftaya göre, eğilim çizgisi her atışta uzar
export function PiggyBank() {
  let $history = [120, 160, 210, 230]
  const now = () => $history[$history.length - 1]
  return <div sx={{ flex: "col", gap: 2 }}>
    <Button on:click={() => { $history = [...$history, now() + 50] }}>🐷 ₺50 at</Button>
    <Stat icon={wallet} label="Kumbaram" value={now()} previous={$history[0]} format={["money", "TRY"]} spark={$history} hint="ilk haftaya göre" />
  </div>
}
