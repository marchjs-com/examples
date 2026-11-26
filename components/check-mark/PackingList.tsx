// PackingList: the creative-minimal CheckMark example.
//
// What it shows: a holiday packing list. Each row has a CheckMark that flips from ✕ to ✓ when you press the row, and the
// card title counts the packed items and celebrates when all are done.
// When to use this pattern: a visible, tappable "done / not done" state in a list (to-dos, packing, onboarding),
// where the mark must animate when the state changes. For a read-only yes/no table see PlanCompare.
//
// Animation: motion="flip" runs on March's motion engine, so reduced motion (the glyph then changes at once), the
// global speed and "Stop all" apply without code here. Use motion="none" (the default) for no animation at all.
// Accessibility: the mark's text (the labels below) is what a screen reader reads; the row itself is a real button.
import { CheckMark, Card, Button } from "march/ui"

const ITEMS = ["Pasaport", "Güneş kremi", "Mayo", "Şarj aleti"]

// One row: a ghost Button holding the mark and the name; pressing anywhere on the row toggles it.
// `done` is an accessor (a function) so the CheckMark follows the signal and plays its motion when it changes.
// labels: the text read for each state, here "ready" / "missing" instead of the default Yes / No.
const Item = (p: { name: string; done: () => boolean; toggle: () => void }) =>
  <Button variant="ghost" on:click={p.toggle}>
    <CheckMark value={p.done} motion="flip" variant="soft" labels={{ yes: "Hazır", no: "Eksik" }} />
    <span>{p.name}</span>
  </Button>

export function PackingList() {
  // The names already packed; toggling adds or removes a name, which redraws only the affected mark.
  let $packed: string[] = ["Pasaport"]
  const toggle = (n: string) => { $packed = $packed.includes(n) ? $packed.filter((x) => x !== n) : [...$packed, n] }
  // The Card title is a function so it updates with the count; when everything is packed it becomes a celebration.
  return <Card title={() => ($packed.length === ITEMS.length ? "Çanta hazır! 🏖️" : `Çanta: ${$packed.length} / ${ITEMS.length}`)}>
    <div sx={{ flex: "col", gap: 1 }}>
      {ITEMS.map((n) => <Item name={n} done={() => $packed.includes(n)} toggle={() => toggle(n)} />)}
    </div>
  </Card>
}
