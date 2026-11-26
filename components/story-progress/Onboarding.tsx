// Onboarding: the real-life StoryProgress example.
//
// What it shows: three intro screens driven by StoryProgress. Each screen is shown for four seconds and then moves on
// by itself (wrapping to the first); one button holds the timer, another skips to the next screen.
// When to use this pattern: auto-advancing content where the user must be able to stop it: onboarding, a tour, a
// slideshow. The bars show how long is left; the content below is yours and just follows the index.
//
// Animation: the fill runs on March's motion engine. It is an "essential" animation: it keeps time even under the
// visitor's reduced-motion preference (the screens would otherwise skip at once), while "pause all" and the global
// speed still apply. `paused` holds the fill where it is, and `run` restarts it when its value changes.
// Accessibility: the bars are a progressbar named "Stories" read as text like "Story 2 of 3" (change it with `label`).
// Because the content changes by itself, the pause button is what lets a user read at their own pace.
import { StoryProgress, Button } from "march/ui"

// The texts of the screens, one per segment.
const steps = ["Hoş geldin!", "Arkadaşlarını bul", "İlk hikâyeni paylaş"]

export function Onboarding() {
  // Reactive state: the current screen, and whether the timer is held.
  let $i = 0
  let $hold = false
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* count: one segment per screen. index: the current screen. run: the fill restarts whenever this value changes
        (here the index, so a skip restarts the bar). duration: 4000 ms per screen. paused: holds the fill. onDone: when
        the segment is full, go to the next screen, wrapping to the first after the last. */}
    <StoryProgress count={steps.length} index={$i} run={$i} duration={4000} paused={$hold} onDone={() => $i = ($i + 1) % steps.length} />
    <h3 sx={{ text: ["lg", "bold"] }}>{steps[$i]}</h3>
    {/* The first button toggles `paused` (its label follows the state); the second skips ahead with the same
        wrap-around as onDone. */}
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" on:click={() => $hold = !$hold}>{$hold ? "Sürdür" : "Duraklat"}</Button>
      <Button size="sm" variant="primary" on:click={() => $i = ($i + 1) % steps.length}>İleri</Button>
    </div>
  </div>
}
