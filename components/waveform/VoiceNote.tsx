import { Waveform, IconButton, Button, Card } from "march/ui"
import { play, pause } from "march/icons"
import { onFrame } from "march/motion"
import { onCleanup } from "march"

// VoiceNote: a voice-message bubble in a chat. Play / pause, press the waveform to jump there, and a speed button
// that cycles 1× → 1.5× → 2×.
// It teaches the smallest useful player: stored peaks, a playhead in seconds, seeking, and a playback rate. To play a
// real recording, drive $t from an <audio> element's timeupdate event and set its playbackRate from $rate.
// The bar heights of the message (0–1). Store these with the recording so the bubble draws without decoding the file.
const PEAKS = Array.from({ length: 64 }, (_, i) => 0.25 + 0.7 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.17)))
const LENGTH = 23 // seconds

export function VoiceNote() {
  // $t: position in seconds; $playing: play state; $rate: playback speed. `stop` ends the frame loop.
  let $t = 0
  let $playing = false
  let $rate = 1
  let stop: (() => void) | null = null
  const toggle = () => {
    $playing = !$playing
    stop?.(); stop = null
    if ($playing) {
      // Played to the end? Start again from the beginning.
      if ($t >= LENGTH) $t = 0
      // onFrame calls back on every animation frame with dt (ms since the last frame); advancing by dt × rate keeps
      // the clock correct at any frame rate and speed. At the end it stops itself.
      stop = onFrame((_time: number, dt: number) => {
        $t = Math.min(LENGTH, $t + (dt / 1000) * $rate)
        if ($t >= LENGTH) { $playing = false; stop?.(); stop = null }
      })
    }
  }
  // Stop the frame loop when the bubble goes away.
  onCleanup(() => stop?.())
  const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`
  return <Card sx={{ w: "sm" }}><div sx={{ flex: ["row", "center"], gap: 2 }}>
    {/* Play / pause. The label is the accessible name and switches with the state ("Sesli mesajı çal" = play voice
        message). Enter or Space press it, as with any button. */}
    <IconButton variant="solid" shape="round" color="brand-green" icon={() => ($playing ? pause : play)}
      label={() => ($playing ? "Duraklat" : "Sesli mesajı çal")} on:click={toggle} />
    <div sx={{ flex: ["col", "grow"], gap: 1 }}>
      {/* A compact waveform: 30 px high, 3 px bars with 2 px gaps. progressColor paints the played part in the
          bubble's green. seekable makes it a slider (press, drag, arrows, Home / End); onSeek's second argument is
          the position in seconds. Screen readers hear label and a position like "0:05 of 0:23". */}
      <Waveform peaks={PEAKS} currentTime={() => $t} duration={LENGTH} height={30} barWidth={3} gap={2}
        progressColor="brand-green" seekable label="Sesli mesaj" onSeek={(_p: number, s: number) => { $t = s }} />
      {/* Before playing, show the message's length; while playing, the position. */}
      <span sx={{ text: "xs", color: "muted" }}>{() => ($t > 0 ? clock($t) : clock(LENGTH))}</span>
    </div>
    {/* The speed button cycles 1 → 1.5 → 2 → 1; the frame loop reads $rate each frame, so it applies at once. */}
    <Button size="sm" variant="ghost" on:click={() => { $rate = $rate === 1 ? 1.5 : $rate === 1.5 ? 2 : 1 }}>{() => `${$rate}×`}</Button>
  </div></Card>
}
