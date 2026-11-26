// HeartCounter: the creative-minimal LiveCounter example.
//
// What it shows: a "people loved this photo" counter you drive yourself. Each press of a button raises the number, and
// a custom "+N" bubble with a heart rises above it, showing how much it grew.
// When to use this pattern: a counter fed by your own state (likes, online users, orders). With `value` as a function
// of a signal, LiveCounter animates every change and tells you the difference to the bubble.
//
// Animation: the digits roll, the dot pulses, and the bubble rises; reduced motion turns these off (the digits then
// change without animation). `effect="none"`, `dot={false}`, `bubble={false}` and `beat={false}` switch the parts off
// one by one; see LiveCounterLab.
import { LiveCounter } from "march/landing"
import { Button } from "march/ui"

export function HeartCounter() {
  // The number of likes, a signal.
  let $likes = 41
  return <div sx={{ flex: ["row", "center"], gap: 4 }}>
    {/* value={() => $likes}: the live value; every increase animates. label: what is counted. dotColor: colour token
        of the live dot. bubble: a function that receives the increase (diff) and returns your own content for the
        rising bubble (instead of the default "+N"). */}
    <LiveCounter value={() => $likes} label="kişi bu fotoğrafı sevdi" dotColor="brand-pink"
      bubble={(d: number) => <b>❤ +{d}</b>} />
    {/* Two buttons raise the signal by 1 and by 10, so you can see the bubble show different differences. */}
    <Button on:click={() => $likes++}>❤ Sev</Button>
    <Button variant="secondary" on:click={() => $likes += 10}>❤ ×10</Button>
  </div>
}
