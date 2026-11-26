// TaskBoard: the real-life UndoRedo example.
//
// What it shows: the toolbar of a task list. Adding a task and completing a task are steps that can be undone and
// redone with the pair of buttons in the card header; the tooltips name the step ("Ekle: ...", "Tamamla: ...").
// When to use this pattern: an editor or list where each user action is one reversible step. Instead of a `history`
// object, UndoRedo is driven here with four props (canUndo, canRedo, onUndo, onRedo) plus `steps`, which is the simplest
// way when you keep your own two stacks.
import { UndoRedo, Card, Button, IconButton } from "march/ui"
import { check, plus } from "march/icons"

// One step: its name and the whole list before and after it, so undo and redo only have to swap the list.
interface Step { label: string; before: string[]; after: string[] }

export function TaskBoard() {
  // Signals: the tasks, the steps done (undo stack) and the steps undone (redo stack).
  let $tasks = ["Sunumu bitir", "Faturayı öde", "Spor salonu"]
  let $done: Step[] = []
  let $undone: Step[] = []
  let $n = 1
  // run() records a step and applies it; a new step clears the redo stack, as in any editor.
  const run = (label: string, next: string[]) => { $done = [...$done, { label, before: $tasks, after: next }]; $undone = []; $tasks = next }
  const undo = () => { const s = $done[$done.length - 1]; $done = $done.slice(0, -1); $undone = [s, ...$undone]; $tasks = s.before }
  const redo = () => { const s = $undone[0]; $undone = $undone.slice(1); $done = [...$done, s]; $tasks = s.after }
  // UndoRedo props: canUndo / canRedo switch the buttons off when there is nothing to do, onUndo / onRedo run the
  // action, `steps` gives the name of the next undo and redo step (shown in the tooltip and the accessible name, for
  // example "Undo: <step>"), `labels.group` is the accessible name of the pair of buttons, `size="sm"` makes them
  // small. The card's `actions` slot puts the pair at the end of the header.
  return <Card title="Bugün" actions={<UndoRedo canUndo={$done.length > 0} canRedo={$undone.length > 0} onUndo={undo} onRedo={redo}
    steps={{ undo: $done[$done.length - 1]?.label, redo: $undone[0]?.label }} labels={{ group: "Görev geçmişi" }} size="sm" />}>
    <div sx={{ flex: "col", gap: 1 }}>
      {/* Each task has an IconButton; `label` is its accessible name (an icon-only button must have one). */}
      {$tasks.map((t) => <div sx={{ flex: ["row", "between", "center"] }}>
        <span>{t}</span>
        <IconButton icon={check} label={`${t}: tamamlandı`} size="sm" on:click={() => run(`Tamamla: ${t}`, $tasks.filter((x) => x !== t))} />
      </div>)}
      {$tasks.length ? null : <span sx={{ color: "muted" }}>Hepsi bitti 🎉</span>}
      <Button size="sm" variant="ghost" icon={plus} on:click={() => { const name = `Yeni görev ${$n}`; $n += 1; run(`Ekle: ${name}`, [...$tasks, name]) }}>Görev ekle</Button>
    </div>
  </Card>
}
