import { UndoRedo, Card, Button, IconButton } from "march/ui"
import { check, plus } from "march/icons"

// bir görev listesinin araç çubuğu: ekle ve tamamla adımları geri alınabilir; UndoRedo dört prop'la sürülür
// (canUndo, canRedo, onUndo, onRedo) ve steps her düğmenin ipucuna adımın adını yazar
interface Step { label: string; before: string[]; after: string[] }

export function TaskBoard() {
  let $tasks = ["Sunumu bitir", "Faturayı öde", "Spor salonu"]
  let $done: Step[] = []
  let $undone: Step[] = []
  let $n = 1
  const run = (label: string, next: string[]) => { $done = [...$done, { label, before: $tasks, after: next }]; $undone = []; $tasks = next }
  const undo = () => { const s = $done[$done.length - 1]; $done = $done.slice(0, -1); $undone = [s, ...$undone]; $tasks = s.before }
  const redo = () => { const s = $undone[0]; $undone = $undone.slice(1); $done = [...$done, s]; $tasks = s.after }
  return <Card title="Bugün" actions={<UndoRedo canUndo={$done.length > 0} canRedo={$undone.length > 0} onUndo={undo} onRedo={redo}
    steps={{ undo: $done[$done.length - 1]?.label, redo: $undone[0]?.label }} labels={{ group: "Görev geçmişi" }} size="sm" />}>
    <div sx={{ flex: "col", gap: 1 }}>
      {$tasks.map((t) => <div sx={{ flex: ["row", "between", "center"] }}>
        <span>{t}</span>
        <IconButton icon={check} label={`${t}: tamamlandı`} size="sm" on:click={() => run(`Tamamla: ${t}`, $tasks.filter((x) => x !== t))} />
      </div>)}
      {$tasks.length ? null : <span sx={{ color: "muted" }}>Hepsi bitti 🎉</span>}
      <Button size="sm" variant="ghost" icon={plus} on:click={() => { const name = `Yeni görev ${$n}`; $n += 1; run(`Ekle: ${name}`, [...$tasks, name]) }}>Görev ekle</Button>
    </div>
  </Card>
}
