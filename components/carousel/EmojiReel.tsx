// EmojiReel: the creative-minimal Carousel example.
//
// An emoji reel: the slides are plain text, and the dots are numbered. It shows the smallest Carousel: a few strings as
// children (each string gets its own slide box, so no slide component is needed), two slides per view and a custom dot.
// Use the pattern for short rows of simple items.
import { Carousel, Card } from "march/ui"

// The slides: emoji and a word each.
const faces = ["😀 Neşeli", "😎 Havalı", "🤔 Düşünceli", "😴 Uykulu", "🥳 Kutlamada"]

export function EmojiReel() {
  // label names the carousel for screen readers. perView={2} shows two slides at a time on wide screens. m:color tints
  // the buttons and dots. dots as a function draws the content of each dot button: here its number. The previous /
  // next buttons and the arrow keys come with the component; the scrolling follows the user's reduced-motion setting.
  return <Card title="Bugün nasılsın?">
    <Carousel label="Ruh hâli" perView={2} m:color="brand-orange" dots={(i: number) => String(i + 1)}>
      {faces}
    </Carousel>
  </Card>
}
