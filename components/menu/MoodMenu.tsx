// MoodMenu: the creative-minimal Menu example.
//
// What it shows: a mood picker. A round smiley button opens a menu of four moods; the chosen one is shown in large letters
// next to it. The entries are a radio group, so exactly one is checked.
// When to use this pattern: choosing one value from a short list without taking room on the page. Give each entry
// `radio: true` and a `checked` function that reads your state, and `onSelect` that changes it.
//
// Keyboard: the trigger has aria-haspopup, aria-expanded and aria-controls; the arrow keys open it on the first or last item
// and move between entries, Enter chooses, Esc closes and returns focus to the trigger. The entries are announced as radio
// items with aria-checked. Animation: none of its own.
import { Menu, Card } from "march/ui"
import { smile } from "march/icons"

// The moods: an emoji and a name each.
const moods = [
  { emoji: "😍", name: "Bayıldım" },
  { emoji: "😎", name: "Havalı" },
  { emoji: "🤔", name: "Düşünceli" },
  { emoji: "😴", name: "Uykulu" },
]

// The mood chosen at the start.
const start = moods[1]!

export function MoodMenu() {
  // The chosen mood object, a signal. Comparing objects (not names) keeps `checked` simple.
  let $mood = start
  // m:theme="night" (a common prop that works on every element) draws the card and its content in the dark theme.
  return <Card m:theme="night">
    <div sx={{ flex: ["row", "center", "between"], gap: 3 }}>
      <span sx={{ text: "2xl" }}>{`${$mood.emoji} ${$mood.name}`}</span>
      {/* - label: the trigger's accessible name; with `icon` the trigger shows only the icon.
          - m:color: a common prop; the colour token of the trigger and the check marks.
          - placement="bottom-end": the panel opens below the trigger, aligned to its end edge (it flips when there is no
            room).
          - items: one entry per mood. radio: true makes them a radio group; checked is a function, so the check mark
            follows $mood; onSelect stores the choice (the menu closes by itself after a choice). */}
      <Menu label="Ruh hâlini seç" icon={smile} m:color="brand-gold" placement="bottom-end"
        items={moods.map((m) => ({ label: `${m.emoji}  ${m.name}`, radio: true, checked: () => $mood === m, onSelect: () => $mood = m }))} />
    </div>
  </Card>
}
