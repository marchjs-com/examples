// DriveBrowser: the real-life Breadcrumbs example.
//
// The header of a cloud drive: pressing a crumb returns to that folder, a crumb's menu opens the other folders at the
// same level, and below the bar the open folder's contents are listed (pressing one enters it). Use this pattern for
// file managers and any tree you navigate: the path is a list of names, and the crumbs are computed from it.
import { Breadcrumbs, Button, Card } from "march/ui"
import { folder, cloud } from "march/icons"

// The folder tree as data: a folder name maps to the names of its sub folders.
const TREE: Record<string, string[]> = {
  "Sürücüm": ["Belgeler", "Fotoğraflar", "Projeler"],
  "Belgeler": ["Faturalar", "Sözleşmeler"],
  "Fotoğraflar": ["2025 Tatil", "Aile"],
  "Projeler": ["March", "HADİ"],
}

export function DriveBrowser() {
  // The current path as a list of folder names (reactive state); go() replaces it.
  let $path = ["Sürücüm", "Belgeler"]
  const go = (path: string[]) => { $path = path }
  // The crumbs are a function of the path, so the bar updates whenever it changes. Each crumb returns to its own folder
  // (onSelect cuts the path there).
  const crumbs = () => $path.map((name, i) => ({
    id: name, label: name, icon: i === 0 ? cloud : folder, onSelect: () => go($path.slice(0, i + 1)),
    // Every crumb except the first gets `siblings`: a menu of the other folders inside its parent. `current` marks the
    // folder the path goes through, and choosing a sibling swaps this level of the path for it.
    ...(i > 0 ? { siblings: TREE[$path[i - 1]!]!.map((s) => ({ id: s, label: s, icon: folder, current: s === name, onSelect: () => go([...$path.slice(0, i), s]) })) } : {}),
  }))
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      {/* label names the navigation landmark for screen readers; items takes the function above, so it stays live. The
          crumb menus are menu buttons: arrow keys move in them and Escape closes them. */}
      <Breadcrumbs label="Klasör yolu" items={crumbs} />
      <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
        {/* The contents of the open folder (a function child, so it redraws with the path). Pressing a folder button
            enters it by appending its name to the path; an empty folder shows a note. */}
        {() => {
          const inside = TREE[$path[$path.length - 1]!] ?? []
          return inside.length
            ? inside.map((name) => <Button variant="ghost" icon={folder} on:click={() => go([...$path, name])}>{name}</Button>)
            : <span sx={{ color: "muted" }}>Bu klasör boş.</span>
        }}
      </div>
    </div>
  </Card>
}
