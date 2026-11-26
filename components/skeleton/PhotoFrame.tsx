// PhotoFrame: the creative-minimal Skeleton example.
//
// What it shows: a photo frame. Pressing the button shows a shimmering block for about a second (as if the photo were
// being taken), then a random landscape emoji appears.
// When to use this pattern: any place where an image or card is fetched on demand. The placeholder has the shape of
// what is coming (here a block), so the layout does not jump when the real content arrives.
import { Skeleton, Button, Card } from "march/ui"

const VIEWS = ["🏔️", "🌅", "🏝️", "🌌", "🏜️"]

export function PhotoFrame() {
  // `let $name` variables are March signals: writing one redraws whatever reads it. $busy says a photo is being "taken",
  // $view holds the current emoji.
  let $busy = false
  let $view = "🏔️"
  // Starts the fake work: busy on, and after 900 ms a random emoji is chosen and busy goes off. A real page would await a
  // request here instead of the timer.
  const shoot = () => { $busy = true; setTimeout(() => { $view = VIEWS[Math.floor(Math.random() * VIEWS.length)]!; $busy = false }, 900) }
  return <Card title="Fotoğraf">
    {/* A function child is drawn again whenever the signal it reads changes: while busy it shows a Skeleton, otherwise the
        result. Skeleton options used here:
        - block: one block instead of text lines. height="lg": its height (sm, md or lg).
        - colors="brand": a four-colour shimmer in the brand colours (the default follows the theme).
        A block is decorative (aria-hidden); the region around it should say it is loading.
        The shimmer stops under reduced motion, and shimmer={false} would draw a still shape. */}
    {() => $busy ? <Skeleton block height="lg" colors="brand" /> : <div sx={{ text: "2xl", p: 4 }}>{$view}</div>}
    {/* disabled={() => $busy}: the button cannot be pressed again while a photo is being taken. */}
    <Button size="sm" disabled={() => $busy} on:click={shoot}>Çek</Button>
  </Card>
}
