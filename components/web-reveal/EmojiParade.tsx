import { Reveal } from "march/landing"
import { Button } from "march/ui"

type RevealEffect = "fade" | "up" | "down" | "start" | "end" | "scale" | "blur" | "flip"

// emoji geçidi: her basışta sıradaki efektle emojiler yeniden girer
const EFFECTS: RevealEffect[] = ["up", "scale", "flip", "blur", "start", "down"]
const EMOJI = ["🍕", "🎈", "🚲", "🌵", "🎧", "🐙"]

export function EmojiParade() {
  let $round = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button variant="secondary" on:click={() => $round = $round + 1}>Bir daha ({EFFECTS[$round % EFFECTS.length]})</Button>
    {() => {
      const effect = EFFECTS[$round % EFFECTS.length]
      return <Reveal effect={effect} stagger={90} sx={{ flex: "row", gap: 3, text: "2xl" }}>
        {EMOJI.map((e) => <span role="img" aria-label="emoji">{e}</span>)}
      </Reveal>
    }}
  </div>
}
