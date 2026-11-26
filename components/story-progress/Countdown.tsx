// Countdown: the creative-minimal StoryProgress example.
//
// What it shows: a five-second countdown. StoryProgress draws five segments; each one fills over one second, and when it
// is full `onDone` moves to the next, while the big number counts down. The last segment stops the chain.
// When to use this pattern: any timed sequence of equal slots (a countdown, a slideshow, onboarding). StoryProgress is
// only the bars: you own the index and decide what happens when a segment is full.
//
// Animation: the fill runs on March's motion engine. It is an "essential" animation, so it keeps time even under the
// visitor's reduced-motion preference (a countdown that skipped at once would be wrong), while "pause all" and the global
// speed still apply. `paused` holds the fill where it is (see Onboarding).
// Accessibility: the bars are a progressbar named "Stories" whose value is read as text like "Story 2 of 5" (change
// it with the `label` prop). The moving fill itself is not announced, so the number beside it says the time.
import { StoryProgress, Card } from "march/ui"

export function Countdown() {
  // Reactive state: the index of the segment that is filling now.
  let $i = 0
  // m:theme="night" draws the card in the dark theme: the default bar colour is white, which needs a dark ground.
  return <Card m:theme="night">
    {/* count: the number of segments. index: the current one (earlier ones are full, later ones empty). duration: the
        fill time of the current segment in ms. color: a colour token for the fill (the default is white). onDone runs
        when the current segment is full; here it advances until the last one. */}
    <StoryProgress count={5} index={$i} duration={1000} color="brand-orange" onDone={() => { if ($i < 4) $i++ }} />
    {/* The remaining seconds, as big text. */}
    <span sx={{ text: ["2xl", "bold"] }}>{5 - $i}</span>
  </Card>
}
