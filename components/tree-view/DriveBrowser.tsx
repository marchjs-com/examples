// DriveBrowser: the real-life TreeView example.
//
// What it shows: a cloud drive with more than 2,000 files in five team folders. You can select several files, drag
// them into another folder, and the "Arsiv" (archive) folder of each team loads its content from a (fake) server only
// when you first open it. The card header reports how many items are selected and the last move.
// When to use this pattern: large hierarchies (file managers, category trees, org charts). TreeView keeps only the
// rows in view in the page, so thousands of open nodes stay smooth; for a short static tree the simpler Tree is enough.
import { TreeView } from "march/components/tree-view"
import { Card } from "march/ui"

// Demo data. A node is { id, label, meta?, children?, lazy? }. Ids must be unique in the whole tree (that is why a
// file id starts with its folder path): selection, expansion and drag events report ids.
const TEAMS = ["Pazarlama", "Satış", "Ürün", "Destek", "Finans"]
const files = (dir: string, n: number) => Array.from({ length: n }, (_, i) => ({ id: `${dir}/dosya-${i + 1}.pdf`, label: `rapor-${i + 1}.pdf`, meta: `${1 + (i * 7) % 90} KB` }))
const drive = TEAMS.map((t) => ({
  id: t, label: t, children: [
    // `lazy: true` marks a folder whose children are not known yet; TreeView calls `load` the first time it opens.
    { id: `${t}/arşiv`, label: "Arşiv", lazy: true },
    ...["2024", "2025", "2026"].map((y) => ({ id: `${t}/${y}`, label: y, children: files(`${t}/${y}`, 140) })),
  ],
}))
// Stands in for the server: returns the children of a lazy node after 600 ms. `load(node)` must return a promise of
// nodes; while it is pending the row shows a spinner (aria-busy), and if it fails the row offers Retry.
const load = (node: { id: string }) => new Promise<{ id: string; label: string }[]>((ok) => setTimeout(() => ok(files(node.id, 8)), 600))

export function DriveBrowser() {
  // Signals for the header text: the number of selected rows and the description of the last move.
  let $picked = 0
  let $moved = "Henüz taşıma yok"
  return <Card title="Sürücü" subtitle={() => `${$picked} seçili · ${$moved}`}>
    {/* TreeView props used here:
        - label: the accessible name of the tree (role="tree").
        - nodes: the data above.
        - expanded: the ids that start open (initial state only).
        - height: the visible height in pixels; the rows scroll inside it.
        - selection="multiple": click, Ctrl / Shift and the keyboard (Shift+arrows, Ctrl+A) select several rows.
        - draggable: rows can be dragged to move them (before, after or inside another node; Alt+Up / Alt+Down moves
          a node among its siblings from the keyboard).
        - load: loads the children of `lazy` nodes.
        - onSelect(ids): called with the selected ids; onMove(ids, target, position): called after a drop, and the
          tree already shows the move, so you only have to record it (for example send it to a server).
        Keyboard: one Tab stop for the whole tree, then arrows, Home / End and Enter. The opening and landing
        animations run on the motion engine (reduced motion and "Stop all" apply); animate={false} turns them off. */}
    <TreeView label="Sürücü" nodes={drive} expanded={["Pazarlama", "Pazarlama/2026"]} height={320}
      selection="multiple" draggable load={load}
      onSelect={(ids: string[]) => $picked = ids.length}
      onMove={(ids: string[], target: string, pos: string) => $moved = `${ids.length} dosya → ${target} (${pos})`} />
  </Card>
}
