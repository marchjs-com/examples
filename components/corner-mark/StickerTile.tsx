import { CornerMark, Picture, Button } from "march/ui"
import { heart, star, sparkles } from "march/icons"

// çıkartma köşesi: fotoğrafın köşesine bir çıkartma; düğme çıkartmayı ve köşesini değiştirir
const stickers = [
  { icon: heart, corner: "top-end", color: "brand-pink" },
  { icon: star, corner: "bottom-start", color: "brand-gold" },
  { icon: sparkles, corner: "top-start", color: "brand-purple" },
] as const

export function StickerTile() {
  let $i = 0
  const now = () => stickers[$i % stickers.length]!
  return <div sx={{ flex: "col", gap: 2, w: "sm" }}>
    <div class="m-corner-host" sx={{ radius: 3 }}>
      <Picture src="/media/dusk.jpg" alt="Gün batımında tepeler" fit="cover" />
      {() => <CornerMark icon={now().icon} corner={now().corner} variant="solid" m:color={now().color} size="lg" label="Çıkartma" />}
    </div>
    <Button size="sm" on:click={() => $i++}>Çıkartmayı değiştir</Button>
  </div>
}
