// MoodPicker: the creative-minimal Button example.
//
// Today's mood: three pill buttons, the chosen one stays pressed. It shows buttons used as a choice (`pressed` gives
// each one aria-pressed and a pressed look) and typed icons given by name. Use the pattern for small pick-one choices
// with a few labelled options.
import { Button } from "march/ui"
import type { IconType } from "march/icons"

// The icon of a Mood has the type IconType: inside the quotes the editor offers the icon list (March's own names and
// the icon packs). The compiler turns every name into the import of that one icon, so only the icons you use enter
// the bundle.
interface Mood {
  id: string
  label: string
  icon: IconType
}

// One row per mood; the icon names come from different sets ("sun" is March's own, the others are "pack:name").
const moods: Mood[] = [
  { id: "sun", label: "Enerjik", icon: "sun" },
  { id: "cloud", label: "Sakin", icon: "lucide:cloud-sun" },
  { id: "moon", label: "Uykulu", icon: "tabler:moon-stars" },
]

export function MoodPicker() {
  // The id of the chosen mood (reactive state).
  let $mood = "sun"
  // shape="pill" rounds the buttons; `pressed` is true for the chosen one, which sets aria-pressed and the pressed look.
  // Each button is a real <button>, so Tab, Enter and Space work.
  return <div sx={{ flex: "row", gap: 2 }}>
    {moods.map((m) => <Button shape="pill" icon={m.icon} pressed={$mood === m.id} on:click={() => $mood = m.id}>{m.label}</Button>)}
  </div>
}
