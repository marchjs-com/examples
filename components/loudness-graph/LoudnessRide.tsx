import { LoudnessGraph, Slider } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// LoudnessRide: the creative-minimal LoudnessGraph example.
// Ride a fader and draw your own loudness curve: a steady tone whose level follows the slider, measured in LUFS and
// drawn against the −14 (streaming) and −23 (broadcast) target lines. Use this pattern to teach what LUFS means, or to
// let people feel how a fader move shows up on a loudness meter.
export function LoudnessRide() {
  // The fader position 0–100. A number source reads it on every frame of the motion clock: a tone (220 Hz with two
  // harmonics) as loud as the number, with no permission, no file and no sound.
  let $fader = 35
  const tone = audioSource(() => $fader / 100)
  onCleanup(() => tone.stop())
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The graph.
        - source={tone}: march/audio measures its loudness (momentary over 400 ms, short-term over 3 s, K-weighted).
        - span={20}: twenty seconds of history; the line scrolls to the left as readings come in (10 a second).
        - The target lines are the defaults: −14 LUFS (streaming services) and −23 LUFS (broadcast, EBU R128).
        - The readouts above the graph tween to each new reading on the motion engine; under the OS reduced-motion
          setting (or motion={false}) they jump. Each readout is a meter for screen readers, updated at most four times
          a second, and the graph has a hidden data table. */}
    <LoudnessGraph source={tone} span={20} height={180} label="Fader" parts={{ correlation: false }} />
    {/* A Slider: drag it or use the arrow keys; aria-label names it for screen readers. */}
    <Slider aria-label="Fader" min={0} max={100} step={1} bind:value={$fader} />
  </div>
}
