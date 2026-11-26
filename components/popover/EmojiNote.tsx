// EmojiNote: the creative-minimal Popover example.
//
// What it shows: a mood picker. A button opens a small panel of emoji; picking one writes it into the button's label
// and closes the panel. When to use this pattern: a short list of choices that should not take over the page (a
// reaction, a status, a quick filter), where a Dialog would be too heavy.
//
// Accessibility: the trigger gets aria-haspopup / aria-expanded / aria-controls from Popover; the panel is a
// non-modal dialog named by its title, Escape and a press outside close it and focus goes back to the trigger.
// Animation: the panel's entrance runs on the motion engine (reduced motion shows it without movement); pass
// `motion="none"` to switch it off for this one Popover.

import { Popover, Button } from "march/ui"

// The choices. A plain array: add or remove an emoji and the panel follows.
const moods = ["😀", "😌", "😴", "🤩", "😤", "🥳"]

export function EmojiNote() {
  // `$mood` is a signal (a `$` variable): the trigger's label below updates by itself when it changes.
  let $mood = "😀"
  // - trigger: a node (here a Button) receives the click and the ARIA attributes; a plain string would become a Button.
  // - title: a small header inside the panel; with a title the close button is shown by default (see `closable`).
  // - placement="bottom-start": below the trigger, aligned to its start edge; the panel flips if there is no room.
  return <Popover trigger={<Button variant="secondary">Ruh hali: {$mood}</Button>} title="Bugün nasılsın?" placement="bottom-start">
    {/* A function child receives `close`: call it to dismiss the panel after a pick. close(true) would also return
        focus to the trigger. Each emoji is a ghost Button, so it is keyboard reachable (Tab, Enter / Space). */}
    {(close: () => void) => <div sx={{ flex: "row", gap: 1 }}>
      {moods.map((m) => <Button variant="ghost" on:click={() => { $mood = m; close() }}>{m}</Button>)}
    </div>}
  </Popover>
}
