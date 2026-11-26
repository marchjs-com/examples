// BirdWatch: the creative-minimal LiveFeed example.
//
// What it shows: a bird-watching log. Each press of the button adds a new sighting at the top of the list; the list keeps
// only the four newest, so the oldest bird flies away (it falls out as the next one drops in).
// When to use this pattern: a feed you drive yourself from your own state (activity from a store or a socket). Give
// `items` a function that returns the list, newest first, and LiveFeed animates the new head in and the oldest out.
//
// Animation: `enter` and `leave` pick the arrival and departure presets. They run on the motion engine, so reduced motion
// makes items appear without sliding, and the global speed and pause apply. `enter="none"` / `leave="none"` turn them off.
// Accessibility: a labelled section with a list. New items are not announced unless you pass `live="polite"`.
import { LiveFeed } from "march/landing"
import { Button } from "march/ui"

// What can be spotted: [emoji, name, place]. The emoji becomes the item's avatar.
const BIRDS = [["🐦", "Serçe", "balkonda"], ["🦜", "Muhabbet kuşu", "komşunun penceresinde"], ["🦉", "Baykuş", "çam ağacında"], ["🦆", "Yaban ördeği", "gölette"], ["🕊️", "Güvercin", "meydanda"]]

export function BirdWatch() {
  // The sightings, newest first: each is a FeedItem ({ id, title, body, avatar, meta }). $n is the next id and also
  // picks the next bird from BIRDS (wrapping around).
  let $seen = [{ id: 0, avatar: "🐦", title: "Serçe", body: "bahçede", meta: "sabah" }]
  let $n = 1
  // Add a sighting at the head of the list. We assign a NEW array so the signal notices the change.
  const spot = () => {
    const [emoji, name, where] = BIRDS[$n % BIRDS.length]!
    $seen = [{ id: $n, avatar: emoji, title: name, body: where, meta: "şimdi" }, ...$seen]
    $n++
  }
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button on:click={spot}>Kuş gördüm ({$n})</Button>
    {/* items: a function returning the list, so the feed follows it. max={4}: only the four newest stay on screen.
        enter="drop": the new item falls in and bounces; leave="fall": the oldest falls away. label: the accessible
        name of the feed. pausable={false}: no pause button (the feed is driven by clicks, not by a timer, so there is
        nothing to pause). */}
    <LiveFeed items={() => $seen} max={4} enter="drop" leave="fall" label="Kuş defteri" pausable={false} />
  </div>
}
