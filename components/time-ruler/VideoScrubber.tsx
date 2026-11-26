// VideoScrubber: the real-life TimeRuler example.
//
// What it shows: the time bar of a video editor. A ruler with a draggable playhead, a play / pause button that moves the
// playhead on a timer, and under the ruler three clip rows that use the same scale as the ruler, so each clip lines up with
// the times above it. Labels read minutes:seconds.
// When to use this pattern: any timeline where several things share one time scale. TimeRuler draws the scale, and
// timePercent(ms, duration) turns a time into the matching CSS percentage, so your own rows (here the clips) can be placed
// with `margin-inline-start` and `width`. `onSeekStart` is the place to pause playback when the user grabs the playhead.
//
// Animation: the playhead's grip has a small animation that stops under the visitor's reduced-motion preference. The playback
// itself is a plain timer in this example (not the motion engine), so "Stop all" does not pause it: it has its own pause button.
// Accessibility: with `onSeek` the ruler is a group and its playhead is a slider (its value is spoken as time); Left / Right
// move it by `keyStep` (here a second; ten times as much with Shift), Home / End jump to the ends. Keeping the same time in plain
// text, as the "current / total" line does, is a good habit.
import { onCleanup } from "march"
import { TimeRuler, Button, timePercent } from "march/ui"
import { play, pause } from "march/icons"

// The total duration (30 s), a formatter for minutes:seconds, and the clips: a name and the start and end time of each.
const D = 30_000
const clock = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}`
const CLIPS = [{ name: "Giriş", start: 0, end: 6000 }, { name: "Röportaj", start: 6000, end: 21000 }, { name: "Kapanış", start: 21000, end: 30000 }]

export function VideoScrubber() {
  // Reactive state: the playhead time and whether it is playing; `timer` holds the interval id.
  let $t = 4000
  let $on = false
  let timer = 0
  // Stops the playback; start moves the playhead by 100 ms every 100 ms and wraps to 0 at the end. onCleanup(stop) stops the
  // timer when the component is removed, so no interval is left running.
  const stop = () => { $on = false; clearInterval(timer) }
  const start = () => { $on = true; timer = setInterval(() => $t = $t + 100 >= D ? 0 : $t + 100, 100) as unknown as number }
  onCleanup(stop)
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* duration and value: the scale and the playhead. onSeek moves the playhead; onSeekStart={stop} pauses the playback when
        a drag or a key press starts. format: the labels as minutes:seconds. keyStep: one arrow key press (1000 ms). */}
    <TimeRuler duration={D} value={() => $t} onSeek={(ms: number) => $t = ms} onSeekStart={stop} format={clock} keyStep={1000} />
    {/* The clip rows use the same scale: timePercent(ms, D) is the CSS percentage of a time on the ruler, so a clip starts at
        its start time and is as wide as its length. */}
    {CLIPS.map((c) => <div sx={{ text: "xs" }} style={{ "margin-inline-start": timePercent(c.start, D), width: timePercent(c.end - c.start, D) }}>
      <span sx={{ text: "bold" }}>{c.name}</span>
    </div>)}
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button size="sm" icon={$on ? pause : play} on:click={() => $on ? stop() : start()}>{() => $on ? "Duraklat" : "Oynat"}</Button>
      <span>{() => `${clock($t)} / ${clock(D)}`}</span>
    </div>
  </div>
}
