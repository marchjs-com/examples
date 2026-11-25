import { Waveform, IconButton, Button, Card } from "march/ui"
import { play, pause } from "march/icons"
import { onFrame } from "march/motion"
import { onCleanup } from "march"

// sohbette bir sesli mesaj balonu: çal / duraklat, dalgaya basınca oraya atlar, hız düğmesi 1× → 1,5× → 2×
const PEAKS = Array.from({ length: 64 }, (_, i) => 0.25 + 0.7 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.17)))
const LENGTH = 23 // saniye

export function VoiceNote() {
  let $t = 0
  let $playing = false
  let $rate = 1
  let stop: (() => void) | null = null
  const toggle = () => {
    $playing = !$playing
    stop?.(); stop = null
    if ($playing) {
      if ($t >= LENGTH) $t = 0
      stop = onFrame((_time: number, dt: number) => {
        $t = Math.min(LENGTH, $t + (dt / 1000) * $rate)
        if ($t >= LENGTH) { $playing = false; stop?.(); stop = null }
      })
    }
  }
  onCleanup(() => stop?.())
  const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`
  return <Card sx={{ w: "sm" }}><div sx={{ flex: ["row", "center"], gap: 2 }}>
    <IconButton variant="solid" shape="round" color="brand-green" icon={() => ($playing ? pause : play)}
      label={() => ($playing ? "Duraklat" : "Sesli mesajı çal")} on:click={toggle} />
    <div sx={{ flex: ["col", "grow"], gap: 1 }}>
      <Waveform peaks={PEAKS} currentTime={() => $t} duration={LENGTH} height={30} barWidth={3} gap={2}
        progressColor="brand-green" seekable label="Sesli mesaj" onSeek={(_p: number, s: number) => { $t = s }} />
      <span sx={{ text: "xs", color: "muted" }}>{() => ($t > 0 ? clock($t) : clock(LENGTH))}</span>
    </div>
    <Button size="sm" variant="ghost" on:click={() => { $rate = $rate === 1 ? 1.5 : $rate === 1.5 ? 2 : 1 }}>{() => `${$rate}×`}</Button>
  </div></Card>
}
