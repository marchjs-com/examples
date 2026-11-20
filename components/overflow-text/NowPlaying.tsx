import { OverflowText, IconButton, Card } from "march/ui"
import { play, pause, arrowRight } from "march/icons"

// çalan şarkı: uzun ad durmadan akar, ♪ ile ayrılır; duraklatınca yazı da durur, sonraki şarkıda yeni ad akar
const SONGS = [
  "HADİ Orkestrası — Moda'da gün batımı (akustik, uzun versiyon, canlı kayıt)",
  "Kadıköy Sokak Müzisyenleri — Vapur düdüğü ve martılar eşliğinde sabah",
  "Gece Treni — İstanbul'dan Ankara'ya, pencere kenarında",
]

export function NowPlaying() {
  let $i = 0
  let $playing = true
  return <Card m:theme="night" sx={{ w: "sm" }}>
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ text: "xs", color: "brand-pink" }}>{$playing ? "ŞİMDİ ÇALIYOR" : "DURAKLATILDI"}</span>
      <div sx={{ text: "lg" }}>
        <OverflowText text={SONGS[$i]} trigger="always" mode="loop" separator="♪" speed={45} disabled={!$playing} />
      </div>
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <IconButton icon={$playing ? pause : play} label={$playing ? "Duraklat" : "Çal"} variant="solid" shape="round" m:color="brand-pink"
          on:click={() => $playing = !$playing} />
        <IconButton icon={arrowRight} label="Sonraki şarkı" on:click={() => $i = ($i + 1) % SONGS.length} />
      </div>
    </div>
  </Card>
}
