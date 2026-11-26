// KeyframeTimelineLab: the full-featured KeyframeTimeline example; it uses every prop at least once.
//
// Props shown here: value / bind:value and onChange, renderTarget (your own preview element), snap, autoplay, loop,
// stage, transport (which parts of the playback bar), speeds, inspector, hint, curves, labels (every text, including
// functions), class, readonly, disabled and aria-label.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// KeyframeTimelineLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Animation: playback is a motion-engine Playback, so the global speed, "Stop all" and reduced motion apply.
import { KeyframeTimeline, Toggle, type TimelineModel } from "march/ui"

// The model: a duration in ms and tracks. A track animates one property (x, y, scale, rotate, opacity) of a target;
// each key is { at, value, easing? }. Two tracks here move the same target, "Roket": its x position and its rotation.
const SCENE: TimelineModel = { duration: 1200, tracks: [
  { id: "x", target: "Roket", prop: "x", color: "brand-orange", keys: [{ at: 0, value: -100 }, { at: 1200, value: 100, easing: "in-out" }] },
  { id: "r", target: "Roket", prop: "rotate", keys: [{ at: 0, value: -10 }, { at: 600, value: 10 }, { at: 1200, value: -10 }] },
] }
// Own texts: every label the timeline writes. The last two are functions that build the accessible name of a keyframe
// and of a lane from the target and property, which is where wording differs most between languages.
const LABELS = {
  timeline: "Roket çizelgesi", playback: "Oynatma", play: "Oynat", pause: "Duraklat", start: "Başa sar", loop: "Döngü", speed: "Hız",
  playhead: "Oynatma imleci", hint: "Bir kare seç", time: "Zaman", value: "Değer", remove: "Kareyi sil", easing: "Eğri",
  keyframe: (n: number, target: string, prop: string) => `${target} ${prop} ${n}. kare`,
  lane: (target: string, prop: string) => `${target} · ${prop} izi`,
}

export function KeyframeTimelineLab() {
  // Signals: the model (kept in sync by bind:value), a counter for onChange, and a lock switch.
  let $scene = SCENE
  let $changes = 0
  let $locked = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      {/* The switch drives `readonly` below; the text shows onChange firing and the model's first key time. */}
      <Toggle label="Kilitle" bind:value={$locked} />
      <span sx={{ text: "sm" }}>değişiklik: {$changes} · ilk x karesi: {$scene.tracks[0]!.keys[0]!.at} ms</span>
    </div>
    {/* The props, one by one:
        - bind:value / onChange: the model is two-way bound; onChange runs after every edit.
        - renderTarget: your own element for a target on the stage (it gets the target's name). The default is a
          labelled pill. The stage moves it with CSS variables.
        - snap={100}: keyframes and scrubbing move in 100 ms steps (0 turns snapping off; Alt-drag is free).
        - autoplay={false}: do not start by itself. loop: repeat when it reaches the end. stage: show the preview of
          the targets above the lanes.
        - transport: the playback bar, or only the listed parts (here play, start, loop, time, speed). Space still plays.
        - speeds: the choices of the speed control.
        - inspector: the panel for the selected keyframe (time, value, delete, easing). hint: the text shown in its
          place while nothing is selected. curves: draw the value curve in every lane.
        - labels: your own texts (see LABELS above). class: added to the root, next to m-kt.
        - readonly: viewing and playing only; here it follows the switch. disabled: the whole control is inactive.
        - aria-label: the accessible name of the timeline. */}
    <KeyframeTimeline
      bind:value={$scene}
      onChange={() => $changes++}
      renderTarget={(name) => <span sx={{ text: "xl" }} aria-label={name}>🚀</span> as Element}
      snap={100}
      autoplay={false}
      loop
      stage
      transport={["play", "start", "loop", "time", "speed"]}
      speeds={[0.5, 1, 3]}
      inspector
      hint
      curves
      labels={LABELS}
      class="lab-kt"
      readonly={$locked}
      disabled={false}
      aria-label="Roket zaman çizelgesi"
    />
  </div>
}
