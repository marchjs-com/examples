// HaikuPad: the creative-minimal EditorFrame example.
//
// What it shows: a haiku notebook. The frame's head carries a title and a line counter, the foot gives a hint, and the
// whole frame turns green when the poem has three lines (m:color changes with the count).
// When to use this pattern: an editor of your own (here a textarea) that should look like the other March editors.
// Accessibility: the frame is a plain container, so the textarea has its own aria-label.
import { EditorFrame, Badge } from "march/ui"

// $text is the poem; $lines is derived from it (non-empty lines), so the colour, badge and hint follow every edit.
export function HaikuPad() {
  let $text = "Sessiz göl kıyı\nbir kurbağa atlıyor"
  const $lines = $text.split("\n").filter((l) => l.trim()).length
  // m:color is a common prop: the colour token of the frame; it is green at three lines and purple otherwise.
  // head: the title in the head bar; actions: the end of the head bar (a Badge with the count); foot: the foot bar.
  // The textarea carries m-editor-area, the ready class for a plain editing area inside a frame.
  return <EditorFrame m:color={$lines === 3 ? "success" : "brand-purple"}
    head={<span sx={{ text: "bold" }}>Haiku</span>}
    actions={<Badge tone={$lines === 3 ? "success" : "neutral"}>{`${$lines} / 3 satır`}</Badge>}
    foot={<span>{$lines === 3 ? "Tamam, şiir hazır" : "Üç kısa satır yazın"}</span>}>
    <textarea class="m-editor-area" rows={3} aria-label="Haiku" value={$text}
      on:input={(e: Event) => $text = (e.target as HTMLTextAreaElement).value} />
  </EditorFrame>
}
