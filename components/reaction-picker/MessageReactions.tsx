// MessageReactions: the real-life ReactionPicker example.
//
// What it shows: reacting to a chat message. The row offers quick reactions; pressing the picked emoji again removes
// the reaction, and the + button opens the full emoji panel (the grid layout).
// When to use this pattern: chat and feed reactions where you keep the choice in your own state.
//
// Keyboard and accessibility: the picker is a toolbar of buttons with aria-pressed and one tab stop; arrow keys move
// between emoji, Home / End jump. Animation: the pop-in runs on the motion engine (reduced motion, global speed and
// "Stop all" apply); `pop={false}` removes it.

import { ReactionPicker } from "march/ui"

export function MessageReactions() {
  // The emoji picked for this message (an empty text means none).
  let $sel = ""
  // Whether the full panel is open.
  let $panel = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <p>“Yarın 7'de sahilde!”</p>
    {/* selected: the emoji shown as pressed; onPick(emoji): picking the same emoji again clears it; onMore: giving it
        shows
        the + button at the end of the row. */}
    <ReactionPicker selected={$sel} onPick={(e: string) => $sel = $sel === e ? "" : e} onMore={() => $panel = !$panel} />
    {/* The grid layout is the emoji panel (the arrow keys also move up and down by rows). It is drawn only while $panel
        is true. */}
    {() => ($panel ? <ReactionPicker layout="grid" onPick={(e: string) => { $sel = e; $panel = false }} /> : null)}
  </div>
}
