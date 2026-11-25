import { AudioReactive } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// dans pisti: bir ritim (saniyede iki vuruş, bir sayı kaynağı: izin yok, ses yok, hemen çalar) emojileri basla zıplatır,
// sesle büyütür. Ritim bir sayı erişimcisidir: her vuruşta 1'e çıkar, sonra söner
export function DancingEmoji() {
  const beat = audioSource(() => { const t = (performance.now() % 500) / 500; return Math.max(0.1, 1 - t * 1.6) })
  onCleanup(() => beat.stop())
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
    <AudioReactive source={beat} as="span" effect={["bounce", "pulse"]} gain={1.2} sx={{ text: "2xl" }} role="img" aria-label="Dans eden kişi">🕺</AudioReactive>
    <AudioReactive source={beat} as="span" effect="bounce" gain={1.2} intensity={1.6} sx={{ text: "2xl" }} role="img" aria-label="Dans eden kadın">💃</AudioReactive>
    <AudioReactive source={beat} as="span" effect={["pulse", "glow"]} gain={1.5} color="brand-gold" sx={{ text: "2xl" }} role="img" aria-label="Disko topu">🪩</AudioReactive>
  </div>
}
