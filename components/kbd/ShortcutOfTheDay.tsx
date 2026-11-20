import { Kbd, IconButton } from "march/ui"
import { refresh } from "march/icons"

// günün kısayolu: yenile düğmesi bir sonrakini getirir; keys canlı, mod macOS'ta ⌘, ötekilerde Ctrl yazılır
const tips = [
  { keys: "mod+k", what: "komut paletini aç" },
  { keys: "mod+shift+z", what: "yinele" },
  { keys: "alt+arrowleft", what: "geri git" },
  { keys: "shift+enter", what: "yeni satır" },
]

export function ShortcutOfTheDay() {
  let $i = 0
  const $tip = tips[$i % tips.length]
  return <div sx={{ flex: ["row", "center"], gap: 2 }}>
    <span sx={{ text: "bold" }}>Günün kısayolu:</span>
    <Kbd keys={$tip.keys} />
    <span sx={{ color: "muted" }}>{$tip.what}</span>
    <IconButton icon={refresh} label="Başka bir kısayol" size="sm" on:click={() => $i++} />
  </div>
}
