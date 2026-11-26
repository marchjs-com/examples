// EggTimer: the creative-minimal TimeRuler example.
//
// What it shows: an egg timer. You drag along a 12-minute ruler to choose the cooking time; the choice snaps to whole minutes,
// the labels read in minutes, and the text below says how done the egg will be. A button resets to six minutes.
// When to use this pattern: picking a point on a time scale. With `onSeek` the ruler is draggable (a press anywhere jumps there)
// and its playhead becomes a slider. The ruler only draws the scale: you keep the value, and you choose how it is formatted,
// spoken and rounded (`format`, `valueText`, `snap`).
//
// Animation: the playhead's grip has a small animation that stops under the visitor's reduced-motion preference.
// Accessibility: the ruler is a group named by `labels.ruler` and its playhead is a slider (named by `labels.playhead`, its
// value read through `valueText`, here "N dakika"). Left / Right move it by `keyStep` (mirrored in right-to-left text, ten
// times as much with Shift) and Home / End jump to the ends. The grip shows a focus ring.
import { TimeRuler, Button } from "march/ui"

// One minute in milliseconds: the ruler's unit is the millisecond.
const MIN = 60_000

export function EggTimer() {
  // Reactive state: the chosen time in ms, and a derived description of the egg for that time.
  let $at = 6 * MIN
  const egg = () => $at <= 4 * MIN ? "rafadan 🥚" : $at <= 7 * MIN ? "kayısı 🍳" : "katı 🥚"
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* duration: the time across the ruler (12 min). value: the playhead (a function, so it follows $at). onSeek: called with
        the time in ms when the user drags or uses the keys, which makes the ruler draggable. major and step: the distance
        between labelled ticks (2 min) and between minor ticks (1 min). format: the label of a major tick. valueText: what a
        screen reader hears for the playhead. snap: rounds a dragged time to a whole minute. m:color tints the ruler with a colour
        token. labels: our own accessible names for the ruler and the playhead. */}
    <TimeRuler duration={12 * MIN} value={() => $at} onSeek={(ms: number) => $at = ms} major={2 * MIN} step={MIN}
      format={(ms: number) => `${ms / MIN} dk`} valueText={(ms: number) => `${Math.round(ms / MIN)} dakika`}
      snap={(ms: number) => Math.round(ms / MIN) * MIN} m:color="brand-orange" labels={{ ruler: "Pişme süresi", playhead: "Süre" }} />
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <span sx={{ text: "bold" }}>{() => `${$at / MIN} dakika: ${egg()}`}</span>
      <Button size="sm" on:click={() => $at = 6 * MIN}>Sıfırla</Button>
    </div>
  </div>
}
