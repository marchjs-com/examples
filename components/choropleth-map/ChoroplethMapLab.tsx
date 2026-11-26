import { ChoroplethMap } from "march/charts"
import { Button, Card } from "march/ui"

// ChoroplethMapLab: every ChoroplethMap prop in one place, the full-featured reference example.
// Props used: data (a signal), id, value, map, shapes, viewBox, colorScale, bins, min, max, mid, noData, labels, focus,
// zoom, format, xLabel, yLabel, tooltip, onSelect, animate, title, description, empty, legend, class, colors, width,
// height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture ChoroplethMapLab.test.tsx checks.
// The buttons move to a new year, focus the view on Marmara and empty / refill the data, so every change animation
// can be seen. The first map is the built-in Turkey map; the second draws its own shapes.

// Yearly population growth per province, a few provinces only. Rows find their province by name; plate codes ("34") and
// ISO ids ("TR-34") work too, and case and Turkish letters do not matter. Provinces without a row get `noData`.
const GROWTH = [["İstanbul", 1.2], ["Ankara", 0.8], ["İzmir", 0.4], ["Bursa", 1.5], ["Antalya", 2.1], ["Sinop", -0.6], ["Tunceli", -1.4], ["Kars", -1.1]]
// Our own shapes: a greenhouse with three rooms, as SVG paths in a 120 × 30 box. Each shape has an id, a name (shown
// in the tooltip and table) and its path `d`; cx / cy optionally place the label (here only for the third room).
const ROOMS = [
  { id: "a", name: "Domates", d: "M0 0h40v30h-40z" },
  { id: "b", name: "Biber", d: "M40 0h40v30h-40z" },
  { id: "c", name: "Fesleğen", d: "M80 0h40v30h-40z", cx: 100, cy: 15 },
]

export function ChoroplethMapLab() {
  let $k = 0                         // the current "year", drives both maps' data
  let $picked = "—"                  // last selected region, written by onSelect
  let $empty = false                 // shows the `empty` text when true
  let $focus: string[] | null = null  // regions the first map fits its view to; null = the whole map
  // Main map, prop by prop:
  // - map="turkey": the built-in map of the 81 provinces (the default). It is loaded on first use, with a light
  //   skeleton holding its place until then.
  // - data={() => …} + id / value: the province and value keys; the function reads signals, so a new year recolours
  //   the map. ($k % 3) * 0.3 shifts every value a little, cycling over three years.
  // - colorScale="diverging" with min={-2} max={3} mid={0}: shrinking provinces and growing ones get opposite hues,
  //   centred on zero, and a fixed domain keeps the colours comparable from year to year.
  // - noData="--m-surface-2": provinces without a row are a flat surface colour instead of the default light hatch.
  // - labels="value": the value on each province, shown only where it fits (zooming in reveals more).
  // - focus={() => $focus}: the regions to fit the view to; changing it glides there. Kocaeli has no data row, but it
  //   is still a region on the map, so it can be focused.
  // - zoom: Ctrl / ⌘ + wheel, pinch, drag to pan, the + − ⟲ buttons and the keys + − 0 (on by default).
  // - format: the values are percent points (1.2 = %1.2), so a function writes them with one decimal for tooltip, labels, legend and table.
  // - xLabel / yLabel: the region and value headers of the hidden table; yLabel also names the value in the tooltip.
  // - legend="bottom": the colour gradient under the map (the default place).
  // - tooltip: a function returning custom content; onSelect: called on click or Enter with { id, name, value, label,
  //   bin, datum, shape }; the Lab shows the name in `.lab-picked`.
  // - animate={{ duration: 500, easing: "out", stagger: 40 }}: on the first draw the provinces colour in as a wave from
  //   west to east, 40 ms apart; a new value morphs each colour. Other forms: true (spring, default), false (no
  //   motion), "in-out" (an easing name), { enter: false } (no wave, but colours still morph), or (ctx) => … deciding
  //   per region from { index, key, phase }. Reduced motion is honoured automatically.
  // - title / description: the SVG's accessible name and description; empty: text shown when data is [].
  // - export: toolbar buttons to download PNG and SVG.
  // Keyboard: Tab focuses the map, the arrow keys move to the nearest region in that direction, Enter / Space select,
  // Escape clears, + / − / 0 zoom.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-focus, lab-empty, lab-picked, …) are hooks for ChoroplethMapLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Yeni yıl</Button>
      <Button class="lab-focus" size="sm" variant="ghost" on:click={() => { $focus = $focus ? null : ["İstanbul", "Bursa", "Kocaeli"] }}>Marmara'ya odaklan</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <ChoroplethMap class="lab-map" map="turkey" data={() => ($empty ? [] : GROWTH.map(([il, g]) => ({ il, g: (g as number) + ($k % 3) * 0.3 })))}
      id="il" value="g" colorScale="diverging" min={-2} max={3} mid={0} noData="--m-surface-2" labels="value" focus={() => $focus} zoom
      format={(v: number) => `%${v.toFixed(1)}`} xLabel="İl" yLabel="Nüfus artışı" legend="bottom"
      tooltip={(p: { name: string; label: string }) => `${p.name}: ${p.label}`} onSelect={(p: { name: string }) => { $picked = p.name }}
      animate={{ duration: 500, easing: "out", stagger: 40 }} title="Nüfus artışı" description="İllere göre yıllık nüfus artışı"
      empty="Veri yok" export={["png", "svg"]} />
    {/* Second map: your own regions on a dark theme (m:theme="night"). shapes + viewBox replace the built-in map. Rows
        match a shape by id ("b", "c") or by name ("Domates"). bins={[25, 30]} cuts the values into three classes,
        coloured by `colors` (one per class); legend="right" lists the classes beside the map, and a class click dims
        the other rooms. format adds the °C unit, animate={false} recolours instantly, and width / height fix the size. */}
    <Card m:theme="night">
      <ChoroplethMap class="lab-rooms" shapes={ROOMS} viewBox={[120, 30]} data={() => [{ id: "Domates", v: 20 + $k }, { id: "b", v: 35 }, { id: "c", v: 28 - $k }]}
        id="id" value="v" bins={[25, 30]} colors={["#22c55e", "#eab308", "#ef4444"]} legend="right" width={420} height={140}
        format={(v: number) => `${v} °C`} animate={false} title="Sera sıcaklığı"
        onSelect={(p: { name: string }) => { $picked = p.name }} />
    </Card>
  </div>
}
