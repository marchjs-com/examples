import { UndoRedo, Button, Card } from "march/ui"
import { rotateCcw, rotateCw } from "march/icons"

// UndoRedo'nun bütün özellikleri bir arada: history (past / future ile adım adları), canUndo / canRedo / onUndo /
// onRedo, actions (hangi düğmeler, hangi sırayla), labels (undo, redo, group), steps (kendi adın ya da false),
// shortcuts (true, false ya da kendi tuşların), icons, partClass, size, disabled, class ve m:color
interface Step { label: string; from: number; to: number }

export function UndoRedoLab() {
  // 1) bir sayaç ve onun geçmişi (history)
  let $count = 0
  let $past: Step[] = []
  // geri alınmış bir adımla başlar: Yeniden ilk anda açık (canRedo hemen görünür)
  let $future: Step[] = [{ label: "+1", from: 0, to: 1 }]
  let $locked = false
  const step = (label: string, to: number) => { $past = [...$past, { label, from: $count, to }]; $future = []; $count = to }
  const history = {
    canUndo: () => $past.length > 0,
    canRedo: () => $future.length > 0,
    undo: () => { const s = $past[$past.length - 1]; $past = $past.slice(0, -1); $future = [s, ...$future]; $count = s.from },
    redo: () => { const s = $future[0]; $future = $future.slice(1); $past = [...$past, s]; $count = s.to },
    past: () => $past.map((s) => s.label).reverse(),
    future: () => $future.map((s) => s.label),
  }
  // 2) dört prop'la sürülen bir çift: yalnız bir bayrak
  let $flag = false
  let $flagUndone = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" on:click={() => step("+1", $count + 1)}>+1</Button>
      <Button size="sm" on:click={() => step("×2", $count * 2)}>×2</Button>
      <strong class="lab-count">{$count}</strong>
      <UndoRedo history={history} size="lg" class="lab-history" disabled={$locked}
        labels={{ undo: "Vazgeç", redo: "Yeniden", group: "Sayaç geçmişi" }} shortcuts={{ undo: "alt+z", redo: "alt+y" }}
        icons={{ undo: rotateCcw, redo: rotateCw }} partClass={{ undo: "lab-undo", redo: "lab-redo" }} />
      <Button size="sm" variant="ghost" on:click={() => $locked = !$locked}>{$locked ? "Kilidi aç" : "Kilitle"}</Button>
    </div>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button size="sm" variant="secondary" disabled={$flag} on:click={() => { $flag = true; $flagUndone = false }}>Bayrağı dik</Button>
      <span>{$flag ? "🚩" : "—"}</span>
      <UndoRedo canUndo={$flag} canRedo={$flagUndone} onUndo={() => { $flag = false; $flagUndone = true }} onRedo={() => { $flag = true; $flagUndone = false }}
        actions={["redo", "undo"]} steps={false} shortcuts={false} size="sm" class="lab-props" />
    </div>
    <Card m:theme="night">
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <span>Yalnız geri al, kendi adım adı:</span>
        <UndoRedo actions={["undo"]} canUndo onUndo={() => {}} steps={{ undo: "Silme" }} size="md" m:color="brand-purple" class="lab-only" />
      </div>
    </Card>
  </div>
}
