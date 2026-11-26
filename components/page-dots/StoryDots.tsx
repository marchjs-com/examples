// StoryDots: the creative-minimal PageDots example.
//
// The story of the day: three frames with dots under them. The arrows or the dots change the frame, and the current dot
// grows longer. Use this pattern under a carousel or a story, where the dots are both the indicator and a way to jump.
import { PageDots, Card, IconButton } from "march/ui"
import { chevronLeft, chevronRight } from "march/icons"

const slides = [
  { emoji: "🌅", text: "Güne bir çayla başla" },
  { emoji: "🚲", text: "Öğlen biraz pedal çevir" },
  { emoji: "🌙", text: "Gece yıldızları say" },
]

export function StoryDots() {
  // The current frame. `go` moves by a step and wraps around at both ends (the extra `+ length` handles negative numbers).
  let $i = 0
  const go = (d: number) => $i = (($i + d) % slides.length + slides.length) % slides.length
  // m:theme="night" on the Card makes the card and everything inside use the dark theme tokens.
  return <Card m:theme="night">
    <div sx={{ flex: ["col", "center"], gap: 3 }}>
      <span sx={{ text: "2xl" }}>{slides[$i].emoji}</span>
      <span sx={{ text: "lg" }}>{slides[$i].text}</span>
      <div sx={{ flex: "row", gap: 2 }}>
        {/* The arrow buttons need a `label`: it is their accessible name and tooltip; `inverse` gives them a light icon for use on dark
            surfaces. The dots use bind:value, so clicking a dot jumps to that frame and the arrows move the dots too.
            m:color gives the current dot its colour; labels.page names each dot button for screen readers ("n. frame").
            The dots follow the keyboard: one Tab stop, the arrow keys move and select. Under reduced motion the dots do
            not animate their size. */}
        <IconButton icon={chevronLeft} label="Önceki kare" inverse on:click={() => go(-1)} />
        <PageDots count={slides.length} bind:value={$i} m:color="brand-pink" labels={{ page: (n: number) => `${n}. kare` }} />
        <IconButton icon={chevronRight} label="Sonraki kare" inverse on:click={() => go(1)} />
      </div>
    </div>
  </Card>
}
