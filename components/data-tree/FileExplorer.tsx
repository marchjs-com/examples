// FileExplorer: the real-life Tree example.
//
// What it shows: a project explorer. Folders and files carry icons and a size, the arrow opens and closes a folder, a
// click on a row selects it, and the selected file is "opened" in the card on the right.
// When to use this pattern: small hierarchies (file lists, settings sections). For thousands of nodes, lazy children or
// drag and drop use TreeView instead.
// Keyboard: Tab enters the tree once (roving focus); Up / Down / Home / End move between visible rows, Right opens a
// folder (and then goes to its first child), Left closes it (or goes to the parent), Enter / Space selects.
import { Tree, Card } from "march/ui"
import { folder, fileText, code, settings, image } from "march/icons"

// The data: nested nodes. `icon` is drawn before the label, `meta` is the small text at the end (a size, or the number
// of items in a folder), `children` makes a node a folder.
const files = [
  { id: "src", label: "src", icon: folder, children: [
    { id: "app", label: "app.tsx", icon: code, meta: "4 KB" },
    { id: "ui", label: "ui", icon: folder, meta: "2", children: [
      { id: "button", label: "button.tsx", icon: code, meta: "2 KB" },
      { id: "logo", label: "logo.svg", icon: image, meta: "1 KB" },
    ] },
  ] },
  { id: "readme", label: "README.md", icon: fileText, meta: "3 KB" },
  { id: "config", label: "march.config.js", icon: settings, meta: "1 KB" },
]

// $file is the selected node id; the preview card reads it, so it follows every selection.
export function FileExplorer() {
  let $file = "app"
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    {/* Tree props: label is the accessible name; expanded={["src"]} opens the src folder at start;
            toggle="chevron" means only the arrow opens a folder, so a click on a folder row selects it without moving
            anything (like an IDE); selected takes an accessor so the highlight follows $file, and onSelect receives the node. */}
    <Card title="Dosyalar">
      <Tree label="Proje dosyaları" nodes={files} expanded={["src"]} toggle="chevron" selected={() => $file} onSelect={(n: { id: string; children?: unknown }) => { $file = n.id }} />
    </Card>
    <Card title="Önizleme">
      <span sx={{ color: "muted" }}>{() => `${$file} dosyası düzenleyicide açıldı`}</span>
    </Card>
  </div>
}
