import { AudioReactive, Button } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// dans pisti: demo döngüsü başlayınca emojiler basla zıplar, sesle büyür; ses kapalı çalar, yalnız hareket görünür
export function DancingEmoji() {
  const beat = audioSource("demo")
  onCleanup(() => beat.stop())
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
    <Button on:click={() => beat.start()}>▶ Müziği başlat</Button>
    <AudioReactive source={beat} as="span" effect={["bounce", "pulse"]} gain={2} sx={{ text: "2xl" }} role="img" aria-label="Dans eden kişi">🕺</AudioReactive>
    <AudioReactive source={beat} as="span" effect="bounce" gain={2} intensity={1.6} sx={{ text: "2xl" }} role="img" aria-label="Dans eden kadın">💃</AudioReactive>
    <AudioReactive source={beat} as="span" effect={["pulse", "glow"]} gain={2.5} color="brand-gold" sx={{ text: "2xl" }} role="img" aria-label="Disko topu">🪩</AudioReactive>
  </div>
}
