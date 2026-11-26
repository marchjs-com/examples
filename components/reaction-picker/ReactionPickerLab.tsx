// ReactionPickerLab: the full-featured ReactionPicker example; it uses every prop at least once.
//
// Props shown here: onPick, emojis, selected, layout, onMore, pop, label, emojiLabel, moreLabel, moreIcon and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ReactionPickerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { ReactionPicker } from "march/ui"
import { smilePlus } from "march/icons/lucide"

export function ReactionPickerLab() {
  // The picked emoji, shared by both pickers.
  let $sel = "👍"
  // How many times the + button was pressed.
  let $more = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The row layout: emojis (your own list), selected (shown as pressed), onPick, pop={false} (no pop-in animation),
        label (the toolbar's accessible name), emojiLabel(emoji) (the accessible name of each button), onMore (shows the
        +
        button), moreLabel (its accessible name), moreIcon (your own content for it) and class. */}
    <ReactionPicker class="lab-row" emojis={["👍", "🎉", "🔥"]} selected={$sel} onPick={(e: string) => $sel = e} pop={false}
      label="Tepkiler" emojiLabel={(e: string) => `Tepki ${e}`} onMore={() => $more++} moreLabel="Daha çok" moreIcon={smilePlus} />
    {/* layout="grid": a panel instead of a pill (an emoji keyboard); the arrow keys move in four directions. */}
    <ReactionPicker class="lab-grid" layout="grid" emojis={["😀", "😂", "😍", "🥳", "😎", "🤔"]} selected={$sel}
      onPick={(e: string) => $sel = e} label="Emoji klavyesi" />
    {/* The picked emoji and the number of + presses, for the tests and for you to watch. */}
    <span class="lab-sel">{$sel} · {$more}</span>
  </div>
}
