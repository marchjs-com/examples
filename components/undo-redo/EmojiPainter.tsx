import { UndoRedo, Button } from "march/ui"

// emoji dizisi: her emoji bir adım; UndoRedo'ya küçük bir geçmiş (history) verilir, ipucu adımı adıyla söyler
// ("Geri al: 🌵"); geçmiş iki sinyalden ibaret: yapılanlar ve geri alınanlar
const palette = ["🌵", "🐙", "🍕", "🚀", "🌈"]

export function EmojiPainter() {
  let $past: string[] = []
  let $future: string[] = []
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
      {palette.map((e) => <Button variant="ghost" on:click={() => { $past = [...$past, e]; $future = [] }}>{e}</Button>)}
      <UndoRedo history={history} size="sm" />
    </div>
    <div sx={{ text: "2xl" }}>{$past.length ? $past.join("") : "Bir emojiye bas"}</div>
  </div>
}
