import { Treemap } from "march/charts"
import { Button, Card } from "march/ui"

// TreemapLab: every Treemap prop in one place, the full-featured reference example.
// Props used: data (a signal), childrenOf, value, label, id, depth, colorValue, colorScale, colorMid, colorLegend, format,
// colorFormat, labels, valueLabels, padding, radius, headerHeight, drill, breadcrumbs, rootLabel, focus, onDrill,
// xLabel, yLabel, tooltip, onSelect, animate, title, description, empty, legend, class, colors, width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture TreemapLab.test.tsx checks.
// The buttons change the data, empty / full and the zoom from outside, so every change animation can be seen.

// A monthly budget: three groups (food, home, fun) with two items each. The keys are Turkish on purpose to show that
// childrenOf / value / label / id can read any shape: `alt` holds the children, `tutar` the amount, `ad` the name,
// `kod` a stable id and `fark` the change from last month in percent (used by the color-scale chart below).
// `k` grows three of the amounts, so the tiles visibly resize. Every group is kept large enough (Keyif ≈ 15% of the
// total) that it has room for its header and tiles: Treemap draws a branch too small for that as one tile (still
// drillable), which would leave two groups instead of three on a narrow preview.
const make = (k: number) => [
  { kod: "yemek", ad: "Yemek", alt: [{ kod: "market", ad: "Market", tutar: 5200 + k * 400, fark: 8 + k }, { kod: "restoran", ad: "Restoran", tutar: 1800, fark: -12 }] },
  { kod: "ev", ad: "Ev", alt: [{ kod: "kira", ad: "Kira", tutar: 14000, fark: 0 }, { kod: "fatura", ad: "Faturalar", tutar: 2100 + k * 150, fark: 4 }] },
  { kod: "keyif", ad: "Keyif", alt: [{ kod: "sinema", ad: "Sinema", tutar: 2400, fark: 25 }, { kod: "kitap", ad: "Kitap", tutar: 1600 + k * 100, fark: -5 }] },
]

export function TreemapLab() {
  let $k = 0                         // spending steps, drives the data
  let $empty = false                 // shows the `empty` text when true
  let $picked = "—"                  // last selected leaf, written by onSelect
  let $level = "Tümü"                // current zoom level, written by onDrill ("all" at the top)
  let $focus: string | null = null   // node shown as the root from outside (null = top)
  // Main chart, prop by prop:
  // - data={() => …}: a function reading signals, so the chart redraws (and animates) when $k or $empty changes.
  // - childrenOf="alt" / value="tutar" / label="ad": how to read a row; id={(d) => d.kod}: a stable identity, so a tile
  //   keeps its place (and its animation) when names or amounts change, and `focus` can name it.
  // - depth={2}: groups with a header and their tiles inside (the default, written out for reference).
  // - format: money in TRY; labels / valueLabels: names on the tiles and the value under each name.
  // - padding={3} / radius={6} / headerHeight={22}: gap between tiles, corner radius and group header height in px.
  // - drill: click / Enter on a group zooms into it; breadcrumbs + rootLabel: the crumb row and its first crumb.
  // - focus={$focus}: shows the node with that id as the root from outside (the "home in / out" button toggles "ev");
  //   onDrill: called with the new root after a drill (null at the top), written into `.lab-level`.
  // - xLabel / yLabel: the column headers of the hidden data table (item and amount).
  // - tooltip: a function returning custom content, here the tile's share in percent.
  // - onSelect: called with a leaf on click or Enter / Space (a group drills instead), written into `.lab-picked`.
  // - animate={{ duration: 500, easing: "out", stagger: 20 }}: timed easing, each tile 20 ms after the previous. Other
  //   forms: true (spring, default), false (no motion), "bounce" (an easing name), { enter: false } (skip the first
  //   grow-in but keep updates), or (ctx) => … to decide per tile from { index, key, phase }. Reduced motion → no motion.
  // - title / description: the SVG's accessible name and description; empty: content shown when data is [].
  // - legend="bottom": one toggle per top-level branch (off by default, since the tiles carry the names).
  // - colors: one color per branch; height: px; export: a toolbar to download PNG and CSV.
  // Keyboard: Tab focuses the chart, arrows move between tiles, Enter / Space selects a leaf or zooms into a group,
  // Escape / Backspace go up a level (Escape at the top clears).
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-empty, lab-home, …) are hooks for TreemapLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Harcama ekle</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      {/* Drives the `focus` prop: shows "ev" (home) as the root from outside the chart, and back. */}
      <Button class="lab-home" size="sm" variant="ghost" on:click={() => { $focus = $focus ? null : "ev" }}>Eve gir / çık</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
      <span class="lab-level">Seviye: {() => $level}</span>
    </div>
    <Treemap class="lab-map" data={() => ($empty ? [] : make($k))} childrenOf="alt" value="tutar" label="ad" id={(d: { kod: string }) => d.kod}
      depth={2} format={["money", "TRY"]} labels valueLabels padding={3} radius={6} headerHeight={22} drill breadcrumbs rootLabel="Bütçe"
      focus={$focus} onDrill={(p) => { $level = p ? p.label : "Tümü" }}
      xLabel="Kalem" yLabel="Tutar" tooltip={(p: { label: string; share: number }) => `${p.label}: %${Math.round(p.share * 100)}`}
      onSelect={(p) => { $picked = `${p.label} ${p.value}` }} animate={{ duration: 500, easing: "out", stagger: 20 }}
      title="Aylık bütçe" description="Harcamalar kalem kalem" empty="Harcama yok" legend="bottom"
      colors={["#f2801f", "#2f6fed", "#1fa463"]} height={260} export={["png", "csv"]} />
    {/* Second chart: colored by a number instead of by branch, on a dark theme (m:theme="night"). depth={1} draws flat
        tiles; colorValue="fark" colors each tile by its change; colorScale="diverging" with colorMid={0} makes rises and
        falls opposite colors around zero; colorLegend shows the scale under the chart and colorFormat writes its ends
        as percent. No labels, no drill, no legend, a fixed width and animate={false}: it updates instantly. */}
    <Card m:theme="night">
      <Treemap class="lab-change" data={() => make($k)} childrenOf="alt" value="tutar" label="ad" depth={1} colorValue="fark" colorScale="diverging"
        colorMid={0} colorLegend colorFormat={(v: number) => `%${v}`} labels={false} drill={false} legend={false} width={320} height={160}
        title="Değişim" animate={false} />
    </Card>
  </div>
}
