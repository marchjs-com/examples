// UndoRedoLab: the full-featured UndoRedo example; it uses every prop at least once.
//
// Props shown here: history (with past / future step names), canUndo / canRedo / onUndo / onRedo, actions (which buttons,
// in which order), labels (undo, redo, group), steps (your own names, or false), shortcuts (true, false or your own
// keys), icons, partClass, size, disabled, class and the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// UndoRedoLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { UndoRedo, Button, Card } from "march/ui"
import { rotateCcw, rotateCw } from "march/icons"

// One step of the counter: its name and the value before and after it.
interface Step { label: string; from: number; to: number }

export function UndoRedoLab() {
  // 1) A counter and its history (the `history` form).
  let $count = 0
  let $past: Step[] = []
  // It starts with one undone step: Redo is enabled from the first moment (canRedo is visible at once).
  let $future: Step[] = [{ label: "+1", from: 0, to: 1 }]
  let $locked = false
  const step = (label: string, to: number) => { $past = [...$past, { label, from: $count, to }]; $future = []; $count = to }
  // The history object: canUndo / canRedo / undo / redo, and past / future as lists of step names (nearest first), which
  // UndoRedo uses for the tooltip and the accessible name ("Undo: <step>").
  const history = {
    canUndo: () => $past.length > 0,
    canRedo: () => $future.length > 0,
    undo: () => { const s = $past[$past.length - 1]; $past = $past.slice(0, -1); $future = [s, ...$future]; $count = s.from },
    redo: () => { const s = $future[0]; $future = $future.slice(1); $past = [...$past, s]; $count = s.to },
    past: () => $past.map((s) => s.label).reverse(),
    future: () => $future.map((s) => s.label),
  }
  // 2) A pair driven with four props: only a flag.
  let $flag = false
  let $flagUndone = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" on:click={() => step("+1", $count + 1)}>+1</Button>
      <Button size="sm" on:click={() => step("×2", $count * 2)}>×2</Button>
      <strong class="lab-count">{$count}</strong>
      {/* The `history` form with most options:
          - size="lg": the size of the buttons. class: an extra class on the group.
          - disabled: both buttons off (here a read-only mode, switched by the button on the right).
          - labels: your own accessible names and tooltip texts (undo, redo) and the name of the group.
          - shortcuts: the shortcut text in the tooltip; an object gives your own keys (here alt+z and alt+y), true is
            the default (mod+z, mod+shift+z) and false shows none. The component only shows them: binding the keys is
            the editor's job.
          - icons: your own icons for the two buttons.
          - partClass: an extra class on each button (here used by the tests to find them). */}
      <UndoRedo history={history} size="lg" class="lab-history" disabled={$locked}
        labels={{ undo: "Vazgeç", redo: "Yeniden", group: "Sayaç geçmişi" }} shortcuts={{ undo: "alt+z", redo: "alt+y" }}
        icons={{ undo: rotateCcw, redo: rotateCw }} partClass={{ undo: "lab-undo", redo: "lab-redo" }} />
      <Button size="sm" variant="ghost" on:click={() => $locked = !$locked}>{$locked ? "Kilidi aç" : "Kilitle"}</Button>
    </div>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button size="sm" variant="secondary" disabled={$flag} on:click={() => { $flag = true; $flagUndone = false }}>Bayrağı dik</Button>
      <span>{$flag ? "🚩" : "—"}</span>
      {/* The four-prop form: canUndo / canRedo / onUndo / onRedo drive the pair without a history object.
          - actions={["redo", "undo"]}: which buttons are drawn and in which order (here redo first).
          - steps={false}: the tooltip never names a step. shortcuts={false}: no shortcut text. So the tooltip is just
            the plain name. */}
      <UndoRedo canUndo={$flag} canRedo={$flagUndone} onUndo={() => { $flag = false; $flagUndone = true }} onRedo={() => { $flag = true; $flagUndone = false }}
        actions={["redo", "undo"]} steps={false} shortcuts={false} size="sm" class="lab-props" />
    </div>
    {/* m:theme="night" is a common prop (every component takes it): the card and everything in it use the dark theme.
        Here only the undo button is drawn (actions={["undo"]}) with your own step name (steps.undo), size="md", and
        m:color, a common prop, sets the colour token of the component. */}
    <Card m:theme="night">
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <span>Yalnız geri al, kendi adım adı:</span>
        <UndoRedo actions={["undo"]} canUndo onUndo={() => {}} steps={{ undo: "Silme" }} size="md" m:color="brand-purple" class="lab-only" />
      </div>
    </Card>
  </div>
}
