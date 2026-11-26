// KettleLoader: the creative-minimal Loader example.
//
// What it shows: a tea-house card where "brew" starts a countdown. While brewing, the Loader shows a cup emoji instead of
// the usual ring and its text counts down; when it reaches zero the card says the tea is ready and offers to brew again.
// When to use this pattern: a loading state with a personality of its own. `spinner` takes any node, so the mark can be a
// logo, an icon or an emoji, and `text` can be a function that follows a signal.
//
// Accessibility: the Loader is role="status" with a polite live region, so its text is announced; here the text changes
// each tick. Animation: `fade={false}` makes the loader show at once instead of after the short default delay (which
// exists so a fast load never flashes a spinner). Your own spinner node animates (or not) by itself.
import { Loader, Button, Card } from "march/ui"

export function KettleLoader() {
  // Seconds left of the brewing countdown (0 means not brewing), a signal.
  let $left = 0
  // Start: three ticks, 0.7 s apart; the interval stops itself at zero.
  const brew = () => {
    $left = 3
    const t = setInterval(() => { $left--; if ($left <= 0) clearInterval(t) }, 700)
  }
  return <Card title="Çay ocağı">
    {/* A live region choosing between the loader (brewing) and the "ready" row (not brewing). On the loader:
        - spinner: your own node replaces the default spinner (here a large cup emoji).
        - fade={false}: no delayed fade-in, it appears at once because the visitor just asked for it.
        - text: a function reading $left, so the line counts down. */}
    {() => $left > 0
      ? <Loader spinner={<span sx={{ text: "2xl" }}>☕</span> as Node} fade={false} text={() => `Demleniyor… ${$left}`} />
      : <div sx={{ flex: ["row", "center"], gap: 2 }}><span>Çay hazır 🫖</span><Button size="sm" on:click={brew}>Demle</Button></div>}
  </Card>
}
