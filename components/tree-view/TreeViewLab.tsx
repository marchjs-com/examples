// TreeViewLab: the full-featured TreeView example; it uses every prop at least once.
//
// Props shown here: nodes (icon, meta, lazy, disabled nodes), load, selection + selected + onSelect, expanded +
// onExpand, search, draggable + canDrop + onMove, onActivate, height, rowHeight, icons, chevron, empty, ghost, labels,
// animate, label, class and the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// TreeViewLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { TreeView } from "march/components/tree-view"
import { Empty, Button } from "march/ui"
import { star } from "march/icons"

// The shape of a node. `lazy` nodes get their children from `load`, `disabled` marks a node as unavailable,
// `meta` is a small text at the end of the row and `icon` replaces the default icon.
type Node = { id: string; label: string; icon?: unknown; meta?: string; lazy?: boolean; disabled?: boolean; children?: Node[] }
const nodes: Node[] = [
  { id: "inbox", label: "Gelen kutusu", meta: "12", children: [
    { id: "work", label: "İş", children: [{ id: "w1", label: "Toplantı notu" }, { id: "w2", label: "Fatura" }] },
    { id: "home", label: "Ev", children: [{ id: "h1", label: "Kira" }] },
    { id: "old", label: "Eski postalar", lazy: true },
  ] },
  { id: "starred", label: "Yıldızlı", icon: star, children: [{ id: "s1", label: "Önemli sözleşme", meta: "PDF" }] },
  { id: "locked", label: "Kilitli klasör", disabled: true },
]

export function TreeViewLab() {
  // Signals: the selection mode, the search text, the selected ids and last event as text, and the plain-look switch.
  let $mode = "multiple"
  let $q = ""
  let $sel = "inbox"
  let $last = "—"
  let $plain = false
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Three buttons change props that accept a function (a "live" value): the selection mode, the search text and the
        look (icons and arrows on / off). Because TreeView reads them as functions, the change applies at once; a
        narrower selection mode trims the current selection. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $mode = $mode === "multiple" ? "single" : "multiple"}>{() => `Seçim: ${$mode}`}</Button>
      <Button size="sm" on:click={() => $q = $q ? "" : "fatura"}>{() => ($q ? "Aramayı temizle" : "“fatura” ara")}</Button>
      <Button size="sm" on:click={() => $plain = !$plain}>{() => ($plain ? "İkon ve ok göster" : "Sade görünüm")}</Button>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{() => `Seçili: ${$sel} · Son olay: ${$last}`}</p>
    {/* The props of the TreeView, in groups:
        - label: the accessible name of the tree. class: an extra class on the tree. m:color: a common prop, the
          colour token of the tree and everything in it.
        - nodes: the data. expanded / selected: the ids that start open / selected (initial state).
        - selection: "single", "multiple" or "none"; here a function, so it can change while the tree is shown.
        - search: highlights the hits and keeps the path to each one open (loaded nodes only).
        - height / rowHeight: the visible height and the height of a row, in pixels. Only the rows in view are drawn.
        - animate: the opening, landing and ghost animations (on the motion engine, so reduced motion and the
          global pause apply); animate={false} turns them off.
        - icons: the default folder / file icons on or off. chevron: false hides the arrow (double click and the
          keyboard still open rows), or a function draws your own: it gets the node and whether it is open.
        - draggable: rows can be dragged; canDrop(ids, target, position) refuses a drop, here onto a disabled node.
        - load(node): returns a promise with the children of a lazy node (loaded once; a failure shows Retry).
        - onSelect / onExpand / onMove / onActivate: events. onActivate is Enter or double click on a leaf.
        - ghost(nodes): the content of the picture that follows the pointer while dragging.
        - empty: what is shown when there are no nodes; labels: your own texts (retry, empty, noMatch). */}
    <TreeView label="Posta klasörleri" class="lab-tv" m:color="brand-purple" nodes={nodes}
      expanded={["inbox", "work"]} selected={["inbox"]} selection={() => $mode as "multiple"}
      search={() => $q} height={300} rowHeight={34} animate
      icons={() => !$plain} chevron={$plain ? false : (_n: unknown, open: boolean) => <b>{open ? "−" : "+"}</b>}
      draggable canDrop={(_ids: string[], target: { disabled?: boolean }) => !target.disabled}
      load={() => new Promise<Node[]>((ok) => setTimeout(() => ok([{ id: "o1", label: "2019 yedeği" }]), 400))}
      onSelect={(ids: string[]) => $sel = ids.join(", ") || "—"}
      onExpand={(id: string, open: boolean) => $last = `${id} ${open ? "açıldı" : "kapandı"}`}
      onMove={(ids: string[], target: string) => $last = `${ids.join(", ")} → ${target}`}
      onActivate={(n: { label: string }) => $last = `${n.label} açıldı`}
      ghost={(list: { label: string }[]) => <b>{`${list.length} öge taşınıyor`}</b>}
      empty={<Empty title="Klasör yok" />}
      labels={{ retry: "Yeniden dene", empty: "Boş", noMatch: (q: string) => `“${q}” bulunamadı` }} />
  </div>
}
