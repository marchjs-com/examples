// PartyGuests: the creative-minimal AvatarGroup example.
//
// Party guests: every press on "Katil" adds one more person to the group, and everything past four collapses into a
// "+N" bubble. It shows that `names` can be reactive: the group simply redraws when the list changes. Use the pattern
// for any list of people that grows as the user interacts.
import { AvatarGroup, Button } from "march/ui"

// All possible guests; the group shows the first $n of them.
const names = ["Elif", "Can", "Deniz", "Ada", "Mert", "Zeynep", "Kerem", "Selin"]

export function PartyGuests() {
  // How many guests have arrived (reactive: the group and the button read it).
  let $n = 3
  // names.slice(0, $n) is a new list on every change, so the group updates; max={4} shows at most four avatars and
  // puts the rest in the "+N" bubble. The button disables itself when everyone is already in, so it cannot be pressed
  // with nothing left to add.
  return <div sx={{ flex: ["row", "center"], gap: 3 }}>
    <AvatarGroup names={names.slice(0, $n)} max={4} size="md" />
    <Button size="sm" disabled={$n >= names.length} on:click={() => $n++}>Katıl</Button>
  </div>
}
