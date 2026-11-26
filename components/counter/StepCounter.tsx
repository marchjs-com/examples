// StepCounter: the creative-minimal Counter example.
//
// What it shows: a step counter. Every press adds a thousand steps and the number glides to its new value with a spring;
// at ten thousand a trophy appears and the button starts a new day.
// When to use this pattern: a number that should feel physical when it changes. `value` is a function so the counter
// follows the state; `easing="spring"` gives it a little overshoot (other names: expo, bounce, linear...), and
// `suffix` adds the unit next to the number.
// Animation: runs on the motion engine, so reduced motion (the number is shown at once), the global speed and "Stop
// all" apply; mode="none" would turn the motion off for this counter.
import { Counter } from "march/landing"
import { Button } from "march/ui"

export function StepCounter() {
  let $steps = 2000
  return <div sx={{ flex: ["row", "center"], gap: 3 }}>
    <span sx={{ text: "2xl" }}>{$steps >= 10000 ? "🏆" : "🚶"}</span>
    <Counter value={() => $steps} suffix=" adım" easing="spring" class="steps" />
    <Button on:click={() => $steps = $steps >= 10000 ? 0 : $steps + 1000}>{$steps >= 10000 ? "Yeni gün" : "+1000 adım"}</Button>
  </div>
}
