// SaveBar: the real-life Button example.
//
// The bottom bar of a settings form: while saving, the Kaydet button locks and shows a spinner, and Vazgec waits
// (it is disabled too), then a toast confirms. Use this pattern for any action that takes a moment: the busy state
// stops double submits and tells the user something is happening.
import { Button, toast } from "march/ui"
import { check, x } from "march/icons"

export function SaveBar() {
  // Whether a save is running (reactive state). The fake save takes 1.2 seconds, then clears the flag and shows a toast
  // (a short, polite status message).
  let $saving = false
  const save = () => {
    $saving = true
    setTimeout(() => { $saving = false; toast("Değişiklikler kaydedildi") }, 1200)
  }
  // flex ["row", "end"] puts the buttons at the end of the row. Cancel is a ghost button, disabled while saving, so the
  // user cannot walk away mid-save. Save is the primary action: loading locks it, sets aria-busy and swaps the icon for
  // a spinner (motion that follows reduced motion and the global speed / "Stop all" settings).
  return <div sx={{ flex: ["row", "end"], gap: 2 }}>
    <Button variant="ghost" icon={x} disabled={$saving}>Vazgeç</Button>
    <Button variant="primary" icon={check} loading={$saving} on:click={save}>Kaydet</Button>
  </div>
}
