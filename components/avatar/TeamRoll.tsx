// TeamRoll: the creative-minimal Avatar example.
//
// A team roll call: press a person's avatar when they arrive. Present people show in their own colour, the others in a
// neutral grey, and a counter says how many are here. It shows an Avatar used as the content of a toggle Button, so
// the whole picture is a real, keyboard-reachable control. Use the pattern for pickers made of people.
import { Avatar, Button } from "march/ui"

const team = ["Elif Arslan", "Can Demir", "Deniz Kaya", "Ada Yıldız", "Mert Öz"]

export function TeamRoll() {
  // The names of the people who arrived, and a toggle that adds or removes one (it builds a new list each time, so
  // the view updates).
  let $here: string[] = []
  const toggle = (n: string) => $here = $here.includes(n) ? $here.filter((x) => x !== n) : [...$here, n]
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: "row", gap: 2 }}>
      {/* Each avatar sits inside a ghost Button. `pressed` makes the button a toggle (aria-pressed), and aria-label
          gives it the person's name, since the avatar alone is a picture. The avatar's colour is undefined (its own
          colour from the name) when present and "neutral" when not. Enter and Space work because it is a real button. */}
      {team.map((n) => <Button variant="ghost" pressed={$here.includes(n)} on:click={() => toggle(n)} aria-label={n} sx={{ p: 1 }}>
        <Avatar name={n} size="lg" color={$here.includes(n) ? undefined : "neutral"} />
      </Button>)}
    </div>
    <span sx={{ text: "sm", color: "muted" }}>{$here.length} / {team.length} kişi geldi</span>
  </div>
}
