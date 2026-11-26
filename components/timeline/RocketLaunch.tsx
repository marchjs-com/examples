// RocketLaunch: the creative-minimal Timeline example.
//
// What it shows: a rocket countdown where every press of the "next step" button adds one more stage to the timeline. The
// button turns itself off after the last stage.
// When to use this pattern: when the list of events grows while the user watches (a live build log, a progress
// story, a tutorial that reveals itself). `items` may be a function, so the Timeline follows a signal on its own.
import { Timeline, Button } from "march/ui"
import { zap, check } from "march/icons"

// The stages in order; `as const` keeps `tone` typed as one of the allowed tone words instead of a plain string.
const STEPS = [
  { title: "Yakıt dolduruldu", tone: "info" },
  { title: "Motorlar ısındı", tone: "warn" },
  { title: "Kalkış!", tone: "danger" },
  { title: "Yörüngede", tone: "success" },
] as const

export function RocketLaunch() {
  // $n is how many stages are shown so far (a signal: the view updates when it changes).
  let $n = 1
  // Builds the items of the visible stages: a fake clock text (`T+0 sn`, `T+30 sn`...), the tone as the dot colour and
  // a tick icon for the final stage, a bolt for the others.
  const items = () => STEPS.slice(0, $n).map((s, i) => ({ time: `T+${i * 30} sn`, title: s.title, tone: s.tone, icon: i === STEPS.length - 1 ? check : zap }))
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Passing the function itself (not items()) lets Timeline read $n inside and redraw when it changes. A text
        `time` such as "T+30 sn" is shown as it is; only dates are formatted. */}
    <Timeline items={items} />
    {/* `disabled` as a function is re-evaluated when $n changes, so the button turns off after the last stage. A
        disabled button cannot be pressed or focused, which is also what a keyboard user needs here. */}
    <Button disabled={() => $n >= STEPS.length} on:click={() => $n++}>Sonraki adım</Button>
  </div>
}
