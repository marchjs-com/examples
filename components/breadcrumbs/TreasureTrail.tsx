// TreasureTrail: the creative-minimal Breadcrumbs example.
//
// A treasure trail: every step adds a stop to the path, the separator is a footprint, and pressing an earlier stop
// shortens the trail back to it. It shows that Breadcrumbs is just a view of a list: the path here is the first $steps
// places. Use the pattern for any "where have I been" trail in a game or a guided flow.
import { Breadcrumbs, Button } from "march/ui"

// The places in order; each has an id, a label and an emoji used as its icon.
const PLACES = [
  { id: "home", label: "Ev", icon: "🏠" },
  { id: "forest", label: "Orman", icon: "🌲" },
  { id: "river", label: "Nehir", icon: "🌊" },
  { id: "mountain", label: "Dağ", icon: "⛰️" },
  { id: "cave", label: "Mağara", icon: "🕯️" },
  { id: "treasure", label: "Hazine", icon: "💎" },
]

export function TreasureTrail() {
  // How many places are on the trail (reactive state) and whether the last one was reached.
  let $steps = 1
  const done = () => $steps >= PLACES.length
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* items is a function that takes the first $steps places, so the bar grows with each step. Giving each crumb an
        onSelect makes it a button: pressing a past stop sets $steps back to it, which shortens the trail. The last
        crumb is the current stop. separator="👣" uses an emoji as the mark between crumbs (hidden from screen
        readers). label is the nav landmark's accessible name. */}
    <Breadcrumbs label="Yürüdüğün yol" separator="👣" items={() => PLACES.slice(0, $steps).map((p, i) => ({ ...p, onSelect: () => $steps = i + 1 }))} />
    {/* The button's label names the next stop; at the end it turns primary and disables itself, so it cannot be
        pressed past the last place. */}
    <Button variant={done() ? "primary" : "secondary"} disabled={done()} on:click={() => $steps++}>
      {done() ? "Hazineyi buldun!" : `Bir adım daha: ${PLACES[$steps]?.label}`}
    </Button>
  </div>
}
