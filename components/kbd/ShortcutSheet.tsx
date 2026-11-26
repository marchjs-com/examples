// ShortcutSheet: the real-life Kbd example.
//
// What it shows: the "Keyboard shortcuts" dialog content of an app: grouped sections, one row per action with what it
// does on the left and its keys on the right. Some rows have a shortcut string (`keys`), one has plain key text.
// When to use this pattern: help screens, command-palette footers, documentation tables. The data is a plain array, so
// the same list can also feed the real key handlers and never go out of date.
//
// Accessibility: each key is a real <kbd> element. SectionLabel names each group and shows its count.
// Animation: none; everything here is static.
import { Card, Kbd, SectionLabel } from "march/ui"

// One shortcut row: `what` is the label; give either `keys` (a shortcut string, written per platform) or `text` (a
// fixed key name such as "Esc").
interface Shortcut { what: string; keys?: string; text?: string }

const groups: { title: string; items: Shortcut[] }[] = [
  { title: "Genel", items: [{ what: "Komut paleti", keys: "mod+k" }, { what: "Ara", keys: "mod+f" }, { what: "Pencereyi kapat", text: "Esc" }] },
  { title: "Düzenleme", items: [{ what: "Geri al", keys: "mod+z" }, { what: "Yinele", keys: "mod+shift+z" }, { what: "Kaydet", keys: "mod+s" }] },
]

// A small local component for one row: the description at the start and the keys at the end ("between" pushes them
// apart). It picks Kbd's `keys` form when a shortcut string exists and the `children` form otherwise.
const Row = (props: { item: Shortcut }) => <div sx={{ flex: ["row", "between"], py: 1 }}>
  <span>{props.item.what}</span>
  {props.item.keys ? <Kbd keys={props.item.keys} /> : <Kbd>{props.item.text}</Kbd>}
</div>

export function ShortcutSheet() {
  return <Card title="Klavye kısayolları">
    <div sx={{ flex: "col", gap: 2 }}>
      {/* One block per group: a SectionLabel heading (count shows how many shortcuts it holds) and its rows. To add a
          shortcut, add an item to `groups`; nothing else changes. */}
      {groups.map((g) => <div>
        <SectionLabel count={g.items.length}>{g.title}</SectionLabel>
        {g.items.map((it) => <Row item={it} />)}
      </div>)}
    </div>
  </Card>
}
