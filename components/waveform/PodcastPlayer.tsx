import { Waveform, IconButton, Card } from "march/ui"
import { play, pause, skipBack } from "march/icons"
import { onFrame } from "march/motion"
import { onCleanup } from "march"

// PodcastPlayer: chapters lie under the waveform as coloured bands; pressing a chapter jumps to its start, and the
// card's subtitle names the chapter that is playing.
// It teaches a player built on seconds (currentTime + duration), chapters as `regions`, and a playback clock driven
// by the motion engine's frame loop. To play a real file, replace the clock with an <audio> element and set $t from
// its timeupdate event.
const LENGTH = 32 * 60 + 10 // seconds (32:10)
// The chapters, in seconds. Each becomes a band under the bars in its theme color, with its label below.
const CHAPTERS = [
  { start: 0, end: 150, label: "Giriş", color: "brand-blue" },
  { start: 150, end: 840, label: "Konuğumuz: Ayşe Kaya", color: "brand-orange" },
  { start: 840, end: 1560, label: "Sorular", color: "brand-purple" },
  { start: 1560, end: LENGTH, label: "Kapanış", color: "brand-green" },
] as const
// The peaks of a conversation: sentences with short silences between them (every 23rd bar drops low).
const PEAKS = Array.from({ length: 400 }, (_, i) => (i % 23 < 2 ? 0.08 : 0.35 + 0.55 * Math.abs(Math.sin(i * 0.9) * Math.sin(i * 0.13 + 1))))

export function PodcastPlayer() {
  // $t: the playback position in seconds; $playing: the play button's state. `stop` holds the frame loop's stop
  // function while playing.
  let $t = 0
  let $playing = false
  let stop: (() => void) | null = null
  const halt = () => { stop?.(); stop = null; $playing = false }
  const toggle = () => {
    if ($playing) return halt()
    $playing = true
    // onFrame calls back on every animation frame with the time since the last one (dt, in ms). Here the clock runs
    // 60 times faster than real time, so the playhead visibly moves in the example. It stops at the end.
    stop = onFrame((_time: number, dt: number) => { $t = Math.min(LENGTH, $t + (dt / 1000) * 60); if ($t >= LENGTH) halt() })
  }
  // Stop the frame loop when the component goes away.
  onCleanup(() => stop?.())
  // The chapter under the playhead (derived from $t), and a m:ss clock.
  const chapter = () => CHAPTERS.find((c) => $t >= c.start && $t < c.end) ?? CHAPTERS[CHAPTERS.length - 1]
  const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`
  return <Card title="Haftanın sohbeti · 42. bölüm" subtitle={() => chapter().label}>
    <div sx={{ flex: "col", gap: 2 }}>
      {/* The waveform:
          - currentTime as a function plus duration: the playhead follows $t, and regions are read in seconds.
          - regions={CHAPTERS}: coloured bands and labels for the chapters.
          - barWidth / gap in px, align="bottom" grows the bars from the bottom, height in px.
          - seekable: a slider. Press or drag to seek, or use the keyboard (arrows ±5 %, PageUp / PageDown ±10 %, Home,
            End). onSeek gives (progress, seconds); we store the seconds.
          - onRegionClick: a press without a drag on a chapter; we jump to its start.
          - Accessibility: role="slider" named by label; the spoken value reads like "1:05 of 32:10" plus the chapter's
            label, at most once a second. */}
      <Waveform peaks={PEAKS} currentTime={() => $t} duration={LENGTH} regions={CHAPTERS} height={56} barWidth={2} gap={1}
        align="bottom" seekable label="Bölüm konumu" onSeek={(_p: number, s: number) => { $t = s }}
        onRegionClick={(r: { start: number }) => { $t = r.start }} />
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        {/* IconButtons need a label: it is their accessible name (and tooltip), since the icon alone says nothing to a
            screen reader. "15 saniye geri" = back 15 seconds. */}
        <IconButton icon={skipBack} label="15 saniye geri" on:click={() => { $t = Math.max(0, $t - 15) }} />
        {/* Play / pause: icon and label are functions of $playing, so both switch together. */}
        <IconButton variant="solid" shape="round" size="lg" icon={() => ($playing ? pause : play)} label={() => ($playing ? "Duraklat" : "Çal")} on:click={toggle} />
        <span sx={{ text: "sm", color: "muted" }}>{() => `${clock($t)} / ${clock(LENGTH)}`}</span>
      </div>
    </div>
  </Card>
}
