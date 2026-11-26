// ToastEntrance: the real-life KeyframeTimeline example.
//
// What it shows: designing the entrance of a notification. Two tracks move the "Bildirim" target: it drops in from
// above (y from -40 to 0, with a "back" easing that overshoots slightly) while it fades in (opacity 0 to 1). The
// visitor drags the keyframes, and below the timeline the equivalent motion-engine code is generated live and can be
// copied with one button.
// When to use this pattern: a design tool for motion where the result is code you paste into your app: tune the
// animation visually, then copy `timelineCode(model)`.
//
// Animation: playback runs on the motion engine, so the global speed, "Stop all" and reduced motion apply to the
// preview. Keyboard: keyframes are focusable sliders (arrow keys move them by the snap step, Delete removes one) and
// Space plays; see the KeyframeTimeline docs.
import { KeyframeTimeline, CopyButton, timelineCode, type TimelineModel, CodeView } from "march/ui"

// The starting model. Two tracks on the same target, each animating one property with its own keys and easings.
const ENTRANCE: TimelineModel = { duration: 900, tracks: [
  { id: "y", target: "Bildirim", prop: "y", keys: [{ at: 0, value: -40 }, { at: 450, value: 0, easing: "back" }] },
  { id: "o", target: "Bildirim", prop: "opacity", keys: [{ at: 0, value: 0 }, { at: 300, value: 1, easing: "out" }] },
] }

export function ToastEntrance() {
  // The model in a signal: bind:value writes the edited model back into it when keyframes are dragged.
  let $anim = ENTRANCE
  // Derived signal: the engine code for the current model, rewritten whenever the model changes.
  const $code = timelineCode($anim)
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* snap={25}: keyframes and the playhead move in 25 ms steps (hold Alt while dragging for free movement).
        loop={false}: play once, like a real entrance. transport lists only the parts of the playback bar we want:
        play, back to start and the time field. */}
    <KeyframeTimeline bind:value={$anim} snap={25} loop={false} transport={["play", "start", "time"]} aria-label="Bildirim girişi" />
    {/* The generated code and a copy button. Both take a function so they follow $code as you edit. */}
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <CodeView code={() => $code} lang="ts" toolbar={false} />
      <CopyButton text={() => $code} />
    </div>
  </div>
}
