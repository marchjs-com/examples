// FriendsTray: the real-life StoryRing example.
//
// What it shows: a row of friends' story rings. A new story has the colourful ring, the friends-only person has the
// green "close" ring, and pressing a ring turns it into the quiet "seen" ring.
// When to use this pattern: the story tray at the top of a feed. `state` carries the meaning (new, seen, close, none)
// and you derive it from your own data; `onClick` makes the ring a button where you open the stories.
//
// Animation: the ring has no animation here (it only turns while `loading` is on, see MyStory); that motion would run
// on March's motion engine and follow the visitor's reduced-motion preference.
// Accessibility: a StoryRing with `onClick` is a button named with the person and the state, for example "Elif Arslan,
// new story" or "..., story seen" (`ariaLabel` replaces it). The ring itself is decoration.
import { StoryRing } from "march/ui"

// The people to show.
const friends = ["Elif Arslan", "Can Demir", "Deniz Kaya", "Ada Yıldız"]

export function FriendsTray() {
  // Reactive state: the names whose story was opened. Replaced, not mutated, so the rings update.
  let $seen: string[] = []
  return <div sx={{ flex: "row", gap: 3 }}>
    {/* name: the person (initials appear in the ring and it is the accessible name). state: "seen" once opened,
        otherwise "close" for the third friend and "new" for the others. onClick adds the name to the seen list; a
        real app would open a story viewer here (see StoryViewer's StoryTray). */}
    {friends.map((f, i) => <StoryRing name={f} state={$seen.includes(f) ? "seen" : i === 2 ? "close" : "new"} onClick={() => $seen = [...$seen, f]} />)}
  </div>
}
