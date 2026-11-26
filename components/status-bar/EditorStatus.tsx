// EditorStatus: the real-life StatusBar example.
//
// What it shows: the status strip at the bottom of a code editor: the branch and the problem count at the start, the
// cursor line and a save button at the end. The save button switches to a busy tone while "saving" and announces the
// change to screen readers.
// When to use this pattern: any app or editor that needs a thin strip of state and small actions. An item with
// `onSelect` is a real button; an item without it is plain text.
//
// Animation: the "busy" tone shows a breathing dot on March's motion engine (global speed, "Stop all" and the
// visitor's reduced-motion preference apply); `pulse={false}` on the StatusBar keeps it still (see StatusBarLab).
// Accessibility: the bar is a named region (`label`). Items marked `live` are announced politely when their text
// changes, so "Kaydediliyor…" and "Kaydet" are heard without moving focus. Tones are never colour alone: the text
// says the state.
import { StatusBar } from "march/ui"
import { gitBranch, alertTriangle } from "march/icons"

export function EditorStatus() {
  // Reactive state: whether a save is running, and the cursor line.
  let $saving = false
  let $line = 1
  // items: `id` identifies an item; `icon` and `text` are what it shows; `side: "end"` puts it at the far end (the
  // default is the start, in the writing direction); `tone` colours the dot; `title` is the tooltip; `onSelect` makes
  // it a button; `live` announces text changes; `priority` decides who stays when the bar gets narrow: the lowest
  // priority items move to the "…" menu first, so the save item (9) is the last to go. A text or a tone given as a
  // function stays up to date.
  return <StatusBar label="Editör durumu" items={[
    { id: "branch", icon: gitBranch, text: "main", priority: 5 },
    { id: "problems", icon: alertTriangle, text: "0 hata", priority: 3 },
    // A button that moves the cursor to the next line, to show a live text.
    { id: "pos", side: "end", text: () => `Sa ${$line}`, title: "Sonraki satır", onSelect: () => $line++, priority: 4 },
    // Pressing it starts a fake 800 ms save: the tone and the text follow $saving.
    { id: "save", side: "end", text: () => ($saving ? "Kaydediliyor…" : "Kaydet"), tone: () => ($saving ? "busy" : "success"), onSelect: () => { $saving = true; setTimeout(() => $saving = false, 800) }, live: true, priority: 9 },
  ]} />
}
