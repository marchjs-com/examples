import { SunburstChart } from "march/charts"
import { Card } from "march/ui"

// A laptop's disk: a real-life SunburstChart.
// The folders are rings: top-level folders around the middle, their subfolders one ring further out, every arc as wide
// as its size. Click a folder to zoom into it (its arc opens to the full circle); the breadcrumb path on top, the
// middle of the chart, Escape or Backspace go back up. The line under the chart says where you are.
// Use a sunburst like this for a hierarchy where both the parts and the path to them matter (disk space, budgets,
// org charts) and where the reader should explore by drilling instead of seeing every level at once.

// One root row with nested `children`. Leaves carry `size` (GB); a folder's size is the sum of its children, so you
// never total by hand. Replace DISK with your own tree.
const DISK = { name: "Disk", children: [
  { name: "Kullanıcılar", children: [
    { name: "Belgeler", children: [{ name: "Faturalar", size: 1.2 }, { name: "Sözleşmeler", size: 0.8 }, { name: "Tezler", size: 3.4 }] },
    { name: "Fotoğraflar", children: [{ name: "2025", size: 38 }, { name: "2026", size: 51 }] },
    { name: "Müzik", size: 22 }, { name: "İndirilenler", size: 14 }] },
  { name: "Uygulamalar", children: [{ name: "Tasarım", size: 18 }, { name: "Geliştirme", size: 31 }, { name: "Oyunlar", size: 64 }] },
  { name: "Sistem", children: [{ name: "Önbellek", size: 9 }, { name: "Günlükler", size: 2.5 }, { name: "Çekirdek", size: 16 }] },
] }
// One formatter for the chart and the status line: sizes rounded to one decimal, in GB.
const gb = (v: number) => `${Math.round(v * 10) / 10} GB`

export function DiskUsage() {
  // The current zoom level as text, written by onDrill.
  let $where = "Disk"
  // SunburstChart props:
  // - data: a plain object here (no signal): the tree never changes, only the zoom does.
  // - label="name" / value="size": which keys hold a node's name and its number (defaults are label / value).
  // - format={gb}: one formatter for the middle, the arc labels, the tooltip and the hidden data table.
  // - maxDepth={2}: only two rings at once, so the deepest folders (Belgeler › Faturalar …) appear only after a zoom;
  //   this keeps the rings wide enough for labels. Raise it to see more levels at a glance.
  // - animate={{ easing: "out", duration: 650 }}: on a zoom every arc tweens to its new angles in 650 ms without
  //   overshoot, slow enough to follow where the chosen folder went. animate={false} jumps; "spring-wobbly" bounces;
  //   { stagger: 80 } opens the rings one after another. Reduced motion is honoured automatically.
  // - onDrill: called with the new zoomed node after every drill ({ path, value, … }), or null back at the top.
  // - title: the SVG's accessible name; height: px.
  // Keyboard: Tab focuses the chart, ← → move along a ring, ↓ goes to the first child, ↑ to the parent, Enter / Space
  // zooms in, Escape / Backspace zoom out. The breadcrumb path is a nav of buttons.
  return <Card title="Depolama">
    <SunburstChart data={DISK} label="name" value="size" format={gb} maxDepth={2} animate={{ easing: "out", duration: 650 }} title="Disk kullanımı" height={320}
      onDrill={(p: { path: string[]; value: number } | null) => { $where = p ? `${p.path.join(" / ")} · ${gb(p.value)}` : "Disk" }} />
    {/* "Now at": the zoomed folder's path and size, read reactively through a function child. */}
    <p sx={{ text: "sm", color: "muted" }}>Şu an: {() => $where}</p>
  </Card>
}
