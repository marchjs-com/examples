// SleepCalc: the creative-minimal TimeInput example.
//
// What it shows: pick a bedtime and a wake-up time on the clock dial (hour first, then minutes) and see at once how
// long you sleep and whether it is enough. The result is plain derived state: no button, no submit.
// When to use this pattern: when a time is easier to choose by looking at a clock than by typing it (alarms, sleep
// trackers, reminders). `picker="clock"` adds a clock button beside the field that opens the dial; the field itself
// still works as a normal time input.
import { TimeInput, Field, Card } from "march/ui"

// Turns "HH:MM" into minutes since midnight. `|| 0` keeps a half-typed or empty value from becoming NaN.
const minutes = (t: string) => { const [h, m] = t.split(":").map(Number); return (h || 0) * 60 + (m || 0) }

export function SleepCalc() {
  let $bed = "23:30"
  let $wake = "07:00"
  // Sleep length in minutes. Adding 1440 (a day) before `% 1440` makes a wake-up time that is earlier on the clock
  // than the bedtime (the next morning) come out right.
  const $sleep = (minutes($wake) - minutes($bed) + 1440) % 1440
  const $enough = $sleep >= 7 * 60
  // m:theme="night" is a common prop (it works on every component): the card and everything inside it use the dark
  // theme. Colours come from tokens, so the inputs and the dial adapt without extra code.
  return <Card m:theme="night">
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      {/* picker="clock": a clock button opens the dial (Alt+ArrowDown in the field opens it too). On the dial the hour
          is picked first, then the minutes; picking the minute closes it, Escape closes it and returns to the field.
          step={300} (seconds) snaps the minutes to five-minute marks. */}
      <Field label="Yatış"><TimeInput bind:value={$bed} picker="clock" step={300} /></Field>
      <Field label="Kalkış"><TimeInput bind:value={$wake} picker="clock" step={300} /></Field>
    </div>
    {/* The colour is a theme token chosen from the derived value; the text re-draws when either time changes. */}
    <p sx={{ text: "lg", color: $enough ? "brand-green" : "brand-orange" }}>
      {Math.floor($sleep / 60)} sa {$sleep % 60} dk uyku · {$enough ? "dinç uyanırsın" : "biraz erken yat"}
    </p>
  </Card>
}
