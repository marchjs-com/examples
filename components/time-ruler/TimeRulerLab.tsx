// TimeRulerLab: the full-featured TimeRuler example.
//
// What it shows: every TimeRuler option: duration, value, onSeek, onSeekStart, step, major, minor, ticks, format, valueText,
// snap, keyStep, head (none, or your own), headClass, labels and class. Four rulers: a seekable one with most options, a
// read-only one with its own playhead mark, one with ticks you give by hand, and one without a playhead on a dark card.
// Use it as a catalogue: copy the prop you need.
//
// Animation: the playhead's grip has a small animation that stops under the visitor's reduced-motion preference.
// Accessibility: read-only, a ruler is decoration (aria-hidden), so announce the time where you write it. With `onSeek` it is
// a group named by `labels.ruler` and its playhead is a slider named by `labels.playhead`, with its value spoken through
// `valueText`. Left / Right move it by `keyStep` (mirrored in right-to-left text, ten times as much with Shift), and Home / End
// jump to the ends.
import { TimeRuler, Card } from "march/ui"

export function TimeRulerLab() {
  // Reactive state: the playhead position in ms, and how many times a drag or a key press started.
  let $ms = 1500
  let $starts = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* A line that shows the position and the number of starts. */}
    <p>Konum: <b>{() => `${$ms} ms`}</b> · sürükleme / tuş: <b>{() => $starts}</b></p>
    {/* The seekable ruler. duration and value may be functions (live). onSeek receives the time in ms and makes the ruler
        draggable and the playhead a slider. onSeekStart runs when a drag or a key press starts (a good place to pause playback).
        step and major: the distances of minor and labelled ticks (250 and 1000 ms). keyStep: one arrow key press (500 ms).
        snap: rounds a dragged time to a quarter second. valueText: the spoken value of the playhead. headClass: an extra class
        on the playhead (the tests find it). labels: our own accessible names for the ruler and the playhead. */}
    <TimeRuler class="lab-ruler" duration={() => 4000} value={() => $ms} onSeek={(ms: number) => $ms = Math.round(ms)} onSeekStart={() => $starts++}
      step={250} major={1000} keyStep={500} snap={(ms: number) => Math.round(ms / 250) * 250}
      valueText={(ms: number) => `${ms} milisaniye`} headClass="lab-head" labels={{ ruler: "Lab cetveli", playhead: "Lab başı" }} />
    {/* A read-only ruler (no onSeek). minor={false}: no ticks between the labels. format: the label of a major tick. m:color
        tints it with a colour token. head: our own mark for the playhead (decoration, so it is aria-hidden). */}
    <TimeRuler duration={4000} value={() => $ms} minor={false} format={(ms: number) => `${ms / 1000} sn`} m:color="brand-purple"
      head={<span aria-hidden="true">▼</span> as Node} />
    {/* ticks: our own ticks instead of the computed ones: each has a position `at`, whether it is `major` and a `label`. */}
    <TimeRuler duration={3000} ticks={(d: number) => [{ at: 0, major: true, label: "başla" }, { at: d / 2, label: "yarı" }, { at: d, major: true, label: "bitir" }]} />
    {/* m:theme="night" draws the card in the dark theme. head={false}: no playhead at all. */}
    <Card m:theme="night">
      <TimeRuler duration={4000} value={() => $ms} head={false} />
    </Card>
  </div>
}
