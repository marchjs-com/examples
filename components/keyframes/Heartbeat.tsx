// Heartbeat: the creative-minimal KeyframeTimeline example.
//
// What it shows: a heart that beats twice per second, drawn by a one-track timeline. The scene is a single "scale"
// track with five keyframes; the heart emoji replaces the default labelled pill as the thing being animated, and the
// timeline plays by itself and loops.
// When to use this pattern: a small, decorative, self-running animation described as data (a model of tracks and
// keyframes) instead of CSS or hand-written motion code. Remove `transport` and `inspector` and the editing chrome is
// gone, leaving only the animated stage.
//
// Animation: playback is a motion-engine Playback, so the global speed, "Stop all" and reduced motion apply without
// any code here. `easing` on a key shapes the curve into that key ("out" decelerates, "in-out" eases both ends).
import { KeyframeTimeline, type TimelineModel } from "march/ui"

// The model: `duration` in ms, and a list of tracks. One track animates one property (`prop`) of a `target` (a name
// the stage asks renderTarget to draw). Each key is { at: time in ms, value, easing? }. Here the scale goes
// 1 → 1.35 → 1 → 1.25 → 1 : two beats, the second a bit smaller, then it relaxes until 1000 ms. `color` tints the lane.
const BEAT: TimelineModel = { duration: 1000, tracks: [
  { id: "beat", target: "Kalp", prop: "scale", color: "danger", keys: [{ at: 0, value: 1 }, { at: 120, value: 1.35, easing: "out" }, { at: 240, value: 1 }, { at: 360, value: 1.25, easing: "out" }, { at: 600, value: 1, easing: "in-out" }] },
] }

export function Heartbeat() {
  // The model lives in a signal so bind:value keeps it two-way (an editing UI could change it); here nobody edits it.
  let $beat = BEAT
  // - autoplay: starts playing when shown (the default is off). The timeline loops by default.
  // - transport={["play"]}: of the playback bar only the play / pause button is shown (Space still plays).
  // - inspector={false}: no time / value / easing panel for a selected keyframe.
  // - renderTarget: draws the target. It receives the target's name and must return an element; the stage moves it
  //   with CSS variables. The default is a labelled pill.
  // - aria-label: the accessible name of the timeline.
  return <KeyframeTimeline bind:value={$beat} autoplay transport={["play"]} inspector={false}
    renderTarget={() => <span sx={{ text: "2xl" }}>❤️</span> as Element} aria-label="Kalp atışı" />
}
