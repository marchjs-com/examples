// EmojiPainter: the creative-minimal UndoRedo example.
//
// What it shows: a row of emoji buttons that build a line of emoji, one emoji per step, with an undo / redo pair at the
// end. The tooltip of each button names the step it would undo or redo.
// When to use this pattern: when you already have your own history (two lists: what was done and what was undone) and
// want the standard undo / redo buttons for it. UndoRedo only needs a small `history` object that follows the shape
// below; it does not store the steps itself.
import { UndoRedo, Button } from "march/ui"

const palette = ["🌵", "🐙", "🍕", "🚀", "🌈"]

export function EmojiPainter() {
  // The whole history is two signals: the steps done so far and the steps that were undone (the redo stack).
  let $past: string[] = []
  let $future: string[] = []
  // The `history` object UndoRedo follows:
  // - canUndo / canRedo: functions that read the signals, so the buttons switch off when there is nothing to do.
  // - undo / redo: move the last step between the two lists.
  // - past / future: the step names, nearest step first; UndoRedo shows the nearest one in the tooltip and the
  //   accessible name ("Undo: <step>"). Here the labels are the emoji themselves.
  const history = {
    canUndo: () => $past.length > 0,
    canRedo: () => $future.length > 0,
    undo: () => { const last = $past[$past.length - 1]; $past = $past.slice(0, -1); $future = [last, ...$future] },
    redo: () => { const [next, ...rest] = $future; $future = rest; $past = [...$past, next] },
    past: () => [...$past].reverse(),
    future: () => $future,
  }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "center"], gap: 1 }}>
      {/* A new step is added to the end of $past and clears $future: after a new action the old redo steps are gone,
          as in any editor. */}
      {palette.map((e) => <Button variant="ghost" on:click={() => { $past = [...$past, e]; $future = [] }}>{e}</Button>)}
      {/* size="sm" makes the two buttons small. The component shows the shortcut in the tooltip (Ctrl+Z / Ctrl+Shift+Z,
          written for the platform) but binding the keys is the editor's job; there is no animation to turn off. A
          button with nothing to do is disabled, not hidden. */}
      <UndoRedo history={history} size="sm" />
    </div>
    <div sx={{ text: "2xl" }}>{$past.length ? $past.join("") : "Bir emojiye bas"}</div>
  </div>
}
