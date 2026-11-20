import { onCleanup } from "march"
import { TimeRuler, Button, timePercent } from "march/ui"
import { play, pause } from "march/icons"

// bir video düzenleyicinin zaman çubuğu: oynat / duraklat, sürükleyince durur; altındaki klip satırları aynı ölçeği
// (timePercent) kullanır; etiketler dakika:saniye
const D = 30_000
const clock = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}`
const CLIPS = [{ name: "Giriş", start: 0, end: 6000 }, { name: "Röportaj", start: 6000, end: 21000 }, { name: "Kapanış", start: 21000, end: 30000 }]

export function VideoScrubber() {
  let $t = 4000
  let $on = false
  let timer = 0
  const stop = () => { $on = false; clearInterval(timer) }
  const start = () => { $on = true; timer = setInterval(() => $t = $t + 100 >= D ? 0 : $t + 100, 100) as unknown as number }
  onCleanup(stop)
  return <div sx={{ flex: "col", gap: 2 }}>
    <TimeRuler duration={D} value={() => $t} onSeek={(ms: number) => $t = ms} onSeekStart={stop} format={clock} keyStep={1000} />
    {CLIPS.map((c) => <div sx={{ text: "xs" }} style={{ "margin-inline-start": timePercent(c.start, D), width: timePercent(c.end - c.start, D) }}>
      <span sx={{ text: "bold" }}>{c.name}</span>
    </div>)}
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button size="sm" icon={$on ? pause : play} on:click={() => $on ? stop() : start()}>{() => $on ? "Duraklat" : "Oynat"}</Button>
      <span>{() => `${clock($t)} / ${clock(D)}`}</span>
    </div>
  </div>
}
