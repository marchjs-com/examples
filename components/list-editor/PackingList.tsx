// PackingList: the creative-minimal ListEditor example.
//
// What it shows: a holiday suitcase as an editable list with a limit of 8 items. A badge counts the items and turns red
// when the suitcase is full; at that point the add line is locked, and a line of text under the list changes mood.
// When to use this pattern: any short list of strings the visitor builds (tags, packing lists, guests) where a maximum
// makes sense. `max` does the locking for you; you only read the list's length to react around it.
//
// Keyboard: type and press Enter to add; each row has move up / move down / remove buttons with accessible names.
// Animation: none of its own.
import { ListEditor, Card, Badge } from "march/ui"

export function PackingList() {
  // The items, a signal; bind:value below keeps it in sync with the editor.
  let $items = ["mayo", "güneş kremi", "şapka"]
  // A derived signal: true once the list has 8 items. It feeds the badge colour and the sentence under the list.
  const $full = $items.length >= 8
  return <Card title="Bavulum" actions={<Badge tone={$full ? "danger" : "success"}>{$items.length} / 8</Badge>}>
    {/* max={8}: the add line is locked when the list is full. placeholder: the hint in the empty add field.
        addLabel: the text of the add button. labels: accessible names; `item` is a function of the position so each
        row is named "1. item", "2. item"..., and `remove` names the remove buttons. */}
    <ListEditor bind:value={$items} max={8} placeholder="Ne unutuldu?" addLabel="Bavula at"
      labels={{ item: (n: number) => `${n}. eşya`, remove: "Bavuldan çıkar" }} />
    <span sx={{ text: "sm", color: "muted" }}>{$full ? "Bavul doldu, fermuar zorlanıyor!" : "Biraz daha yer var."}</span>
  </Card>
}
