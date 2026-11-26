// ArchiveUndo: the real-life Toast example.
//
// What it shows: archiving an e-mail from a list. The mail disappears at once and a toast with a "Geri al" (undo)
// button appears; pressing it puts the mail back into the list.
// When to use this pattern: reversible actions (archive, delete to trash, move). Doing the action first and offering
// an undo in a toast is faster for the user than asking "are you sure?" in a dialog.
import { Button, toast } from "march/ui"

export function ArchiveUndo() {
  // The list is a signal: when it is reassigned, the list below is drawn again.
  let $mails = ["Toplantı notları", "Fatura", "Bülten"]
  const archive = (m: string) => {
    $mails = $mails.filter((x) => x !== m)
    // kind: "success" picks the icon and colour. `action` adds a button inside the toast: `label` is its text and
    // `run` is called when it is pressed (the toast closes first). A toast with an action stays longer by default (8
    // seconds instead of 4) and its timer pauses while the pointer or focus is on it, so there is time to reach the
    // button, also with the keyboard (Tab). Here undo appends the mail to the end of the list again.
    toast(`"${m}" arşivlendi`, { kind: "success", action: { label: "Geri al", run: () => { $mails = [...$mails, m] } } })
  }
  // No ToastHost is needed: the first toast() call mounts one for you.
  return <ul>{$mails.map((m) => <li>{m} <Button size="sm" variant="ghost" on:click={() => archive(m)}>Arşivle</Button></li>)}</ul>
}
