import { VideoBackground } from "march/landing"
import { Button } from "march/ui"

// ruh hâli düğmesi: her basışta videonun üstündeki renk katmanı ve yazı değişir
const MOODS = [
  { tint: "dark", text: "Gece modu 🌙" },
  { tint: "light", text: "Sabah serinliği ☀️" },
  { tint: "brand", text: "Parti zamanı 🎉" },
] as const

export function MoodSwitch() {
  let $mood = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button variant="secondary" on:click={() => $mood = ($mood + 1) % MOODS.length}>Ruh hâlini değiştir</Button>
    {() => {
      const m = MOODS[$mood]!
      return <VideoBackground src="/media/hadi-waves.webm" poster="/media/hadi-waves.jpg" tint={m.tint} tintOpacity={0.55}>
        <div sx={{ p: 6, text: "2xl" }}><strong>{m.text}</strong></div>
      </VideoBackground>
    }}
  </div>
}
