// HeartSwap: the creative-minimal MadeWithMarch example.
//
// What it shows: the credit line on a dark card, with a button that swaps its heart for the next mark (a coffee cup, a
// rocket, sparkles...). The accessible name of the heart changes with it, while the rest of the sentence stays in place.
// When to use this pattern: when you want the credit to carry your own personality. `heart` takes any text or node, and
// `heartLabel` is the name a screen reader gives it, so always change the two together.
//
// Accessibility: the heart is role="img" with an aria-label (heartLabel), so the swapped mark is not read as a stray
// emoji. Animation: none.
import { MadeWithMarch, Card, Button } from "march/ui"

// The marks the button cycles through, each as [mark, accessible name]. `as const` keeps them as literal tuples.
const marks = [["💗", "Sevgi"], ["☕", "Kahve"], ["🚀", "Roket"], ["✨", "Pırıltı"], ["🎵", "Müzik"]] as const
const markAt = (i: number) => marks[i % marks.length]!

export function HeartSwap() {
  // $i is the index of the current mark, a signal. $mark is a derived signal: it is recomputed whenever $i changes.
  let $i = 0
  const $mark = markAt($i)
  // m:theme="night" (a common prop that works on every element) draws the card and its content in the dark theme.
  return <Card m:theme="night">
    <div sx={{ flex: ["col", "center"], gap: 3 }}>
      {/* variant="badge": the credit as a bordered pill. heart: the mark that replaces the default heart.
          heartLabel: its accessible name. Both read $mark, so the line is updated when the button is pressed. */}
      <MadeWithMarch variant="badge" heart={$mark[0]} heartLabel={$mark[1]} />
      {/* The button moves to the next mark and wraps around at the end; its text shows the name of the current mark. */}
      <Button variant="secondary" size="sm" on:click={() => $i = ($i + 1) % marks.length}>{`Kalbi değiştir (${$mark[1]})`}</Button>
    </div>
  </Card>
}
