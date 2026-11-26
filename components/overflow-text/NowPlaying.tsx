// NowPlaying: the creative-minimal OverflowText example.
//
// A "now playing" card on a dark background: the long song title scrolls without stopping, with a note symbol between
// the repeats. Pausing the music stops the text too, and the next song brings a new title. Use this pattern for a live
// label that should always move (a ticker, a player title) and that you want to stop with a simple switch.
import { OverflowText, IconButton, Card } from "march/ui"
import { play, pause, arrowRight } from "march/icons"

const SONGS = [
  "HADİ Orkestrası — Moda'da gün batımı (akustik, uzun versiyon, canlı kayıt)",
  "Kadıköy Sokak Müzisyenleri — Vapur düdüğü ve martılar eşliğinde sabah",
  "Gece Treni — İstanbul'dan Ankara'ya, pencere kenarında",
]

export function NowPlaying() {
  // The index of the song and whether it is playing.
  let $i = 0
  let $playing = true
  // m:theme="night" on the Card makes the card and everything inside use the dark theme tokens.
  return <Card m:theme="night" sx={{ w: "sm" }}>
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ text: "xs", color: "brand-pink" }}>{$playing ? "ŞİMDİ ÇALIYOR" : "DURAKLATILDI"}</span>
      <div sx={{ text: "lg" }}>
        {/* - trigger="always": scroll without waiting for hover or focus (the default waits for them).
            - mode="loop": an endless loop, with `separator` (here a note) between the repeats; "bounce" would go to the
              end and back, "once" would scroll one time.
            - speed={45}: pixels per second (the default is 40).
            - disabled={!$playing}: while true the text never scrolls; it stays clipped with the faded edge. That is how
              the pause button stops it.
            Text that fits stays still. Under reduced motion the text does not move at all (the end fades and the full
            text is in the tooltip); the motion engine's global speed and "Stop all" also apply. Screen readers read the
            text once, the loop's repeats are hidden from them. */}
        <OverflowText text={SONGS[$i]} trigger="always" mode="loop" separator="♪" speed={45} disabled={!$playing} />
      </div>
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        {/* Icon buttons need a `label`: it is their accessible name and tooltip. The first one flips play and pause
            (its icon and label follow the state); m:color gives the pair its colour token. */}
        <IconButton icon={$playing ? pause : play} label={$playing ? "Duraklat" : "Çal"} variant="solid" shape="round" m:color="brand-pink"
          on:click={() => $playing = !$playing} />
        <IconButton icon={arrowRight} label="Sonraki şarkı" on:click={() => $i = ($i + 1) % SONGS.length} />
      </div>
    </div>
  </Card>
}
