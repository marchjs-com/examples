import { SiteSection } from "march/landing"
import { Button } from "march/ui"

// ruh hâli bölümü: her basışta bölümün tonu ve başlığı değişir (düz → soluk → marka → ters)
const MOODS = [
  { tone: "plain", emoji: "🙂", title: "Sakin bir gün" },
  { tone: "muted", emoji: "☁️", title: "Biraz bulutlu" },
  { tone: "brand", emoji: "🎉", title: "Kutlama zamanı" },
  { tone: "inverse", emoji: "🌙", title: "Gece modu" },
] as const

export function MoodSection() {
  let $i = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button on:click={() => $i = ($i + 1) % MOODS.length}>Ruh hâlini değiştir</Button>
    {() => {
      const m = MOODS[$i]!
      return <SiteSection tone={m.tone} space="sm" width="narrow" reveal={false} eyebrow={m.emoji} title={m.title}
        lead={`Bu bölümün tonu: ${m.tone}`} />
    }}
  </div>
}
