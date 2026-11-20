import { PageDots, Card, IconButton } from "march/ui"
import { chevronLeft, chevronRight } from "march/icons"

// günün hikâyesi: üç kare, altında noktalar; oklar ya da noktalar kareyi değiştirir, etkin nokta uzar
const slides = [
  { emoji: "🌅", text: "Güne bir çayla başla" },
  { emoji: "🚲", text: "Öğlen biraz pedal çevir" },
  { emoji: "🌙", text: "Gece yıldızları say" },
]

export function StoryDots() {
  let $i = 0
  const go = (d: number) => $i = (($i + d) % slides.length + slides.length) % slides.length
  return <Card m:theme="night">
    <div sx={{ flex: ["col", "center"], gap: 3 }}>
      <span sx={{ text: "2xl" }}>{slides[$i].emoji}</span>
      <span sx={{ text: "lg" }}>{slides[$i].text}</span>
      <div sx={{ flex: "row", gap: 2 }}>
        <IconButton icon={chevronLeft} label="Önceki kare" inverse on:click={() => go(-1)} />
        <PageDots count={slides.length} bind:value={$i} m:color="brand-pink" labels={{ page: (n: number) => `${n}. kare` }} />
        <IconButton icon={chevronRight} label="Sonraki kare" inverse on:click={() => go(1)} />
      </div>
    </div>
  </Card>
}
