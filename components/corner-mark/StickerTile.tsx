// StickerTile: the creative-minimal CornerMark example.
//
// What it shows: a sticker on the corner of a photo. A button changes the sticker (heart, star, sparkles), and with it
// the corner it sits in and its colour.
// When to use this pattern: a mark whose icon, corner or colour depends on state. Put the CornerMark in a function
// child ({() => ...}) so it is drawn again with the new props whenever the state changes.
// Accessibility: the mark has a `label`, so it is an image with a name for screen readers; the photo's `alt` describes
// the picture itself.
import { CornerMark, Picture, Button } from "march/ui"
import { heart, star, sparkles } from "march/icons"

// The three stickers: icon, corner and colour token. `as const` keeps the literal corner names that CornerMark expects.
const stickers = [
  { icon: heart, corner: "top-end", color: "brand-pink" },
  { icon: star, corner: "bottom-start", color: "brand-gold" },
  { icon: sparkles, corner: "top-start", color: "brand-purple" },
] as const

export function StickerTile() {
  let $i = 0
  // The current sticker; the modulo makes the list loop.
  const now = () => stickers[$i % stickers.length]!
  return <div sx={{ flex: "col", gap: 2, w: "sm" }}>
    {/* The class m-corner-host positions the tile so the mark can sit in its corner. variant="solid" fills the mark,
        size="lg" makes it large, m:color (a common prop) sets its colour token. */}
    <div class="m-corner-host" sx={{ radius: 3 }}>
      <Picture src="/media/dusk.jpg" alt="Gün batımında tepeler" fit="cover" />
      {() => <CornerMark icon={now().icon} corner={now().corner} variant="solid" m:color={now().color} size="lg" label="Çıkartma" />}
    </div>
    <Button size="sm" on:click={() => $i++}>Çıkartmayı değiştir</Button>
  </div>
}
