import { Waveform, IconButton, Card } from "march/ui"
import { play, pause, skipBack } from "march/icons"
import { onFrame } from "march/motion"
import { onCleanup } from "march"

// podcast oynatıcısı: bölümler dalganın altında renkli bantlar; bölüm adına basınca başına atlar, çalan bölüm üstte yazar
const LENGTH = 32 * 60 + 10 // saniye
const CHAPTERS = [
  { start: 0, end: 150, label: "Giriş", color: "brand-blue" },
  { start: 150, end: 840, label: "Konuğumuz: Ayşe Kaya", color: "brand-orange" },
  { start: 840, end: 1560, label: "Sorular", color: "brand-purple" },
  { start: 1560, end: LENGTH, label: "Kapanış", color: "brand-green" },
] as const
// bir konuşmanın dalgası: cümleler ve aralarında kısa sessizlikler
const PEAKS = Array.from({ length: 400 }, (_, i) => (i % 23 < 2 ? 0.08 : 0.35 + 0.55 * Math.abs(Math.sin(i * 0.9) * Math.sin(i * 0.13 + 1))))

export function PodcastPlayer() {
  let $t = 0
  let $playing = false
  let stop: (() => void) | null = null
  const halt = () => { stop?.(); stop = null; $playing = false }
  const toggle = () => {
    if ($playing) return halt()
    $playing = true
    // 60 kat hızlı: örnekte dalga akarken görülsün
    stop = onFrame((_time: number, dt: number) => { $t = Math.min(LENGTH, $t + (dt / 1000) * 60); if ($t >= LENGTH) halt() })
  }
  onCleanup(() => stop?.())
  const chapter = () => CHAPTERS.find((c) => $t >= c.start && $t < c.end) ?? CHAPTERS[CHAPTERS.length - 1]
  const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`
  return <Card title="Haftanın sohbeti · 42. bölüm" subtitle={() => chapter().label}>
    <div sx={{ flex: "col", gap: 2 }}>
      <Waveform peaks={PEAKS} currentTime={() => $t} duration={LENGTH} regions={CHAPTERS} height={56} barWidth={2} gap={1}
        align="bottom" seekable label="Bölüm konumu" onSeek={(_p: number, s: number) => { $t = s }}
        onRegionClick={(r: { start: number }) => { $t = r.start }} />
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <IconButton icon={skipBack} label="15 saniye geri" on:click={() => { $t = Math.max(0, $t - 15) }} />
        <IconButton variant="solid" shape="round" size="lg" icon={() => ($playing ? pause : play)} label={() => ($playing ? "Duraklat" : "Çal")} on:click={toggle} />
        <span sx={{ text: "sm", color: "muted" }}>{() => `${clock($t)} / ${clock(LENGTH)}`}</span>
      </div>
    </div>
  </Card>
}
