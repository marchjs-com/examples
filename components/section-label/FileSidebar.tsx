// FileSidebar: the real-life SectionLabel example.
//
// What it shows: the side panel of a code editor with two groups, "open files" and "project". Each group starts with a
// SectionLabel (small uppercase heading) that carries an icon, a live count and a button at the end: close all for the
// first group, new file for the second. The counts change together with the lists.
// When to use this pattern: sidebars, menus and property panels where every group needs a small heading that can also
// hold a count and a quick action.
import { Card, SectionLabel, IconButton } from "march/ui"
import { fileText, folder, x, plus } from "march/icons"

// One file row: the name, and (only when onClose is given) a small close button with its own accessible name.
const Item = (props: { name: string; onClose?: () => void }) => <div sx={{ flex: ["row", "between", "center"], px: 1 }}>
  <span>{props.name}</span>
  {props.onClose ? <IconButton icon={x} label={`${props.name} kapat`} size="xs" on:click={props.onClose} /> : null}
</div>

export function FileSidebar() {
  // Plain `let $name` variables are March signals: assigning one redraws whatever reads it, here the lists and the
  // counts on the labels. $n only numbers the new files.
  let $open = ["App.tsx", "router.ts"]
  let $files = ["App.tsx", "router.ts", "main.css"]
  let $n = 1
  const addFile = () => { $files = [...$files, `yeni-${$n}.ts`]; $n += 1 }
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      {/* SectionLabel options used here:
          - icon: an icon before the text. count: a number after the text; it is live, so it follows the list length.
          - actions: a node placed at the end of the label, here an IconButton. An icon-only button needs `label`, its
            accessible name.
          - rule (second label only): a thin line that fills the rest of the row after the text.
          Both labels share the same look because they are the same component; the text is uppercase by CSS only, so
          screen readers read it as written. The default element is a div; use `as` for a heading element when the label
          starts a real section of the page. */}
      <SectionLabel icon={fileText} count={$open.length}
        actions={<IconButton icon={x} label="Hepsini kapat" size="xs" on:click={() => $open = []} />}>Açık dosyalar</SectionLabel>
      {$open.map((f) => <Item name={f} onClose={() => $open = $open.filter((o) => o !== f)} />)}
      <SectionLabel icon={folder} count={$files.length} rule
        actions={<IconButton icon={plus} label="Yeni dosya" size="xs" on:click={addFile} />}>Proje</SectionLabel>
      {$files.map((f) => <Item name={f} />)}
    </div>
  </Card>
}
