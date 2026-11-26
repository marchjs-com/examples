import { Treemap } from "march/charts"
import { Card, Segmented } from "march/ui"

// A project's disk usage: a real-life Treemap.
// Every file is a tile whose area is its size; folders are groups with a header. Click a folder to zoom into it, click
// a file to see its path and size under the chart. The switch in the header picks how many levels are drawn at once:
// flat tiles, folders with their files, or one level deeper.
// Use a treemap like this to find what takes the space: one glance shows that node_modules dwarfs the source code.

// One root row with nested `children`; leaves carry `value` in KB. A folder's size is the sum of its children.
// Replace PROJECT with your own tree.
const PROJECT = { name: "proje", children: [
  { name: "node_modules", children: [{ name: "esbuild", value: 9800 }, { name: "typescript", value: 22600 }, { name: "march", value: 4100 }, { name: "diğer", value: 6400 }] },
  { name: "src", children: [
    { name: "pages", children: [{ name: "home.tsx", value: 42 }, { name: "settings.tsx", value: 68 }, { name: "billing.tsx", value: 91 }] },
    { name: "components", children: [{ name: "Header.tsx", value: 18 }, { name: "Invoice.tsx", value: 54 }, { name: "Chart.tsx", value: 37 }] },
    { name: "app.tsx", value: 12 }] },
  { name: "public", children: [{ name: "logo.svg", value: 6 }, { name: "hero.webp", value: 840 }, { name: "fonts", value: 1450 }] },
  { name: "dist", children: [{ name: "app.js", value: 310 }, { name: "app.css", value: 48 }, { name: "chunks", value: 520 }] },
] }
// KB below 1 MB, MB with one decimal above; one formatter for the chart and the status line.
const size = (kb: number) => (kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`)

export function DiskUsage() {
  // Levels drawn at once, as the Segmented value (a string): "1" flat, "2" grouped, "3" deep.
  let $depth = "2"
  // The text under the chart; onSelect overwrites it with the clicked file.
  let $file = "Bir dosya seç"
  // The Segmented control sits in the Card's `actions` slot, so the depth switch is in the card header next to the
  // title. `aria-label` ("Derinlik" = depth) names the control for screen readers.
  //
  // Treemap props:
  // - data: a plain object (no signal): the tree never changes, only the depth and the zoom do.
  // - depth={Number($depth)}: 1 = flat tiles, 2 = groups with a header and tiles inside, 3 = one level deeper. Changing
  //   it re-lays out the tiles and they glide to their new rectangles.
  // - format={size}: one formatter for labels, tooltip and the hidden data table.
  // - animate="out": an easing name instead of the default spring, so tiles glide without overshoot, which suits a tool.
  //   animate={false} makes them jump; {{ duration: 400, easing: "out", stagger: 20 }} moves them one after another.
  //   Reduced motion is honoured automatically.
  // - rootLabel="proje": the first crumb of the breadcrumb row; title: the SVG's accessible name.
  // - onSelect: called with a leaf (a file) on click or Enter / Space; a group drills instead. The point carries its
  //   `path` (labels from the top) and `value`.
  // Keyboard: Tab focuses the chart, arrows move between tiles, Enter / Space selects a file or zooms into a folder,
  // Escape / Backspace go up a level.
  return <Card title="Disk kullanımı" actions={[<Segmented size="sm" bind:value={$depth} aria-label="Derinlik" options={[{ value: "1", label: "Düz" }, { value: "2", label: "Gruplu" }, { value: "3", label: "Derin" }]} />]}>
    <Treemap data={PROJECT} depth={Number($depth)} format={size} animate="out" rootLabel="proje" title="Disk kullanımı" height={300}
      onSelect={(p) => { $file = `${p.path.join("/")} · ${size(p.value)}` }} />
    {/* The selected file's path and size, read reactively through a function child. */}
    <p sx={{ text: "sm", color: "muted" }}>{() => $file}</p>
  </Card>
}
