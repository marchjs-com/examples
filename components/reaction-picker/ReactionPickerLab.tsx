import { ReactionPicker } from "march/ui"
import { smilePlus } from "march/icons/lucide"

// ReactionPicker'ın özellikleri: onPick, emojis, selected, layout, onMore, pop, label, emojiLabel, moreLabel, moreIcon, class
export function ReactionPickerLab() {
  let $sel = "👍"
  let $more = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <ReactionPicker class="lab-row" emojis={["👍", "🎉", "🔥"]} selected={$sel} onPick={(e: string) => $sel = e} pop={false}
      label="Tepkiler" emojiLabel={(e: string) => `Tepki ${e}`} onMore={() => $more++} moreLabel="Daha çok" moreIcon={smilePlus} />
    {/* layout="grid": hap yerine panel (emoji klavyesi); ok tuşları dört yöne gider */}
    <ReactionPicker class="lab-grid" layout="grid" emojis={["😀", "😂", "😍", "🥳", "😎", "🤔"]} selected={$sel}
      onPick={(e: string) => $sel = e} label="Emoji klavyesi" />
    <span class="lab-sel">{$sel} · {$more}</span>
  </div>
}
