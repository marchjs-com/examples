// RowToolsLab: the full-featured RowTools example; it uses every prop at least once.
//
//  Props shown here: index / count (the arrows are off at the ends), onUp / onDown / onRemove, onAction, onReorder (a
// drag
// grip), actions (a subset, your own order, a text of names), disabled (all or some), labels (the group name too),
// icons (an icon or text), size, danger, class and a dark surface.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// RowToolsLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { RowTools, Button, Card } from "march/ui"
import { chevronUp, chevronDown, trash } from "march/icons"

// The starting list (it is also what "restore" goes back to).
const START = ["Elma", "Armut", "Kiraz"]
// The four sizes.
const sizes = ["xs", "sm", "md", "lg"] as const

// A small helper: a muted title with its examples in a row under it.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function RowToolsLab() {
  // The list the first example edits.
  let $list = START
  // The last tool that was used, reported by onAction.
  let $last = "yok"
  // Whether every tool of the list is turned off.
  let $locked = false
  // Swap an item with its neighbour (d is -1 for up, 1 for down).
  const move = (i: number, d: number) => { const n = [...$list]; [n[i], n[i + d]] = [n[i + d]!, n[i]!]; $list = n }
  // Take an item out.
  const remove = (i: number) => { $list = $list.filter((_, j) => j !== i) }
  // Move an item from one index to another; RowTools calls it once when a drag ends.
  const reorder = (from: number, to: number) => { const n = [...$list]; const [x] = n.splice(from, 1); n.splice(to, 0, x!); $list = n }
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The main example: a list whose rows carry the tools. */}
    <Row title="Liste: index / count, olaylar, son satır silinemez, kilit">
      <ol sx={{ flex: "col", gap: 1 }}>
        {$list.map((name, i) => <li sx={{ flex: ["row", "between", "center"], gap: 2 }}>
          <span>{name}</span>
          {/* - index / count: Up is off on the first row, Down on the last. onReorder adds a drag grip. danger: remove
              in the danger colour.
              - disabled: true for all tools, or an object ({ remove: true }) for some; here Remove is off while one row
                is left.
              - labels: accessible names, including the group name; onUp, onDown, onRemove: one callback per tool;
                onAction: one callback for every tool (it receives the tool's name); class: on the group (the tests use
                it). */}
          <RowTools index={i} count={$list.length} onReorder={reorder} danger class="lab-row" disabled={$locked ? true : { remove: $list.length <= 1 }}
            labels={{ up: `${name} yukarı`, down: `${name} aşağı`, remove: `${name} sil`, group: `${name} araçları` }}
            onUp={() => move(i, -1)} onDown={() => move(i, 1)} onRemove={() => remove(i)} onAction={(a: string) => { $last = a }} />
        </li>)}
      </ol>
    </Row>
    {/* The order and the last tool used. */}
    <span>Sıra: {$list.join(", ")} · Son araç: {$last}</span>
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" variant="secondary" on:click={() => { $locked = !$locked }}>{$locked ? "Kilidi aç" : "Kilitle"}</Button>
      <Button size="sm" variant="ghost" on:click={() => { $list = START }}>Geri yükle</Button>
    </div>
    {/* actions as an array picks the tools and their order; actions as a text ("up down") does the same with names;
        these have no index / count, so no tool switches off by position. */}
    <Row title="Kendi sıram (sil, yukarı) ve ad metniyle yalnız taşıma">
      <RowTools actions={["remove", "up"]} class="lab-order" labels={{ remove: "Sil", up: "Yukarı", group: "Ters sıra" }} />
      <RowTools actions="up down" class="lab-move" labels={{ up: "Taşı yukarı", down: "Taşı aşağı", group: "Yalnız taşıma" }} />
    </Row>
    {/* icons: an icon, a text or a node for each tool; a text such as a word replaces the icon. */}
    <Row title="Kendi ikonlarım ve metin">
      <RowTools icons={{ up: chevronUp, down: chevronDown, remove: trash }} labels={{ group: "İkonlar" }} />
      <RowTools actions={["remove"]} icons={{ remove: "Kaldır" }} labels={{ remove: "Metinle kaldır" }} />
    </Row>
    {/* size: xs, sm, md or lg. */}
    <Row title="Boyut">{sizes.map((s) => <RowTools size={s} labels={{ group: `Boyut ${s}` }} />)}</Row>
    {/* disabled alone: every tool is off. */}
    <Row title="Hepsi kapalı">
      <RowTools disabled class="lab-off" labels={{ group: "Kapalı araçlar" }} />
    </Row>
    {/* The same component on a dark surface (m:theme="night" works on every component). */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <RowTools danger icons={{ remove: trash }} labels={{ group: "Koyuda araçlar" }} />
      </Row>
    </Card>
  </div>
}
