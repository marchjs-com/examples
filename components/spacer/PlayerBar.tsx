import { Spacer, IconButton } from "march/ui"
import { play, pause } from "march/icons"
import { volume2 } from "march/icons/lucide"

// müzik çubuğu: şarkı adı başta, Spacer ses düğmesini sona iter (sağdan sola yazımda aynalanır)
export function PlayerBar() {
  let $playing = false
  return <div sx={{ flex: ["row", "center"], gap: 2, p: 2, radius: 2 }} class="m-card">
    <IconButton icon={$playing ? pause : play} label={$playing ? "Duraklat" : "Çal"} variant="solid" shape="round" on:click={() => $playing = !$playing} />
    <span sx={{ text: "bold" }}>Gece Yolu</span>
    <Spacer />
    <IconButton icon={volume2} label="Ses" />
  </div>
}
