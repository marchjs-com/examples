// EmojiParade: the creative-minimal Reveal example.
//
// What it shows: a row of emoji that enter one after another. Each press of the button plays the entrance again with
// the next effect (up, scale, flip, blur, start, down).
// When to use this pattern: when you want to see or choose an entrance effect, or to replay an entrance on demand. In a
// real page you would pick one effect and let it play once, when the block scrolls into view.
import { Reveal } from "march/landing"
import { Button } from "march/ui"

// The effect words Reveal accepts as ready-made effects (the full list is in the Reveal docs; "none" also exists and
// shows the content without any entrance).
type RevealEffect = "fade" | "up" | "down" | "start" | "end" | "scale" | "blur" | "flip"

const EFFECTS: RevealEffect[] = ["up", "scale", "flip", "blur", "start", "down"]
const EMOJI = ["🍕", "🎈", "🚲", "🌵", "🎧", "🐙"]

export function EmojiParade() {
  // The number of rounds played so far (a signal); it picks the next effect.
  let $round = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button variant="secondary" on:click={() => $round = $round + 1}>Bir daha ({EFFECTS[$round % EFFECTS.length]})</Button>
    {/* A function child is a live region: it reads $round, so each press draws a new Reveal, and a new Reveal plays its
        entrance. Props used on Reveal:
        - effect: the entrance (here the effect of this round).
        - stagger={90}: the delay in milliseconds between one child and the next (the default is 70).
        - sx: Reveal takes the usual layout props; they apply to the block that wraps the children.
        The motion engine plays the effect (transform, opacity, filter), so reduced motion and the global speed apply;
        with reduced motion the content is simply there. Only presentation changes: the emoji are in the document from
        the start, and each one has an accessible name (role="img" with an aria-label) for screen readers. */}
    {() => {
      const effect = EFFECTS[$round % EFFECTS.length]
      return <Reveal effect={effect} stagger={90} sx={{ flex: "row", gap: 3, text: "2xl" }}>
        {EMOJI.map((e) => <span role="img" aria-label="emoji">{e}</span>)}
      </Reveal>
    }}
  </div>
}
