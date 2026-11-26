// HeatmapLab: the full-featured Heatmap example; it uses every prop at least once.
//
// Props shown here: data (a function), x, y, value, calendar ({ weeks }), end, xFormat, yFormat, xDomain, yDomain, format,
// levels, max, cell, valueLabel, tooltip, onSelect, animate, title, description, empty and class.
// Use it as a reference when you need one option: find the prop below and copy the line.
// HeatmapLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Heatmap } from "march/charts"
import { Button, Card } from "march/ui"

// Row order of the main grid: five weekdays (shortened Turkish names).
const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum"]
// Builds rows { gun, saat, kisi }: five days times four hours, with a made-up headcount. `k` changes the numbers ("new week").
const make = (k: number) => DAYS.flatMap((gun, d) => [9, 12, 15, 18].map((saat) => ({ gun, saat, kisi: ((d * 7 + saat + k * 5) % 13) })))
// The last day of the calendar grid, fixed so the example is the same every time.
const END = new Date(2026, 10, 20)

export function HeatmapLab() {
  // State: which week of data, the last picked cell, and whether the data is emptied (to show the empty content).
  let $k = 1
  let $picked = "—"
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Controls: new data, empty / restore data, and the last selected cell. */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Yeni hafta</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    {/* The grid heatmap.
        - data: a function returning rows (an empty list shows `empty`). x / y / value: the keys of a row that are the column, the
          row and the number.
        - xDomain / yDomain: the order and completeness of columns and rows; they are dropped when the data is empty so only the
          `empty` content shows.
        - xFormat / yFormat / format: how column labels, row labels and values are written.
        - levels={4}: four tones. max={12}: the value of the darkest tone. cell={28}: a fixed cell size in pixels.
        - valueLabel: the word for the value in the tooltip. tooltip: your own tooltip text for a cell (true: default, false: none).
        - onSelect(cell): click or Enter on a cell. animate: cells fade to their new tone on a data change.
        - title / description: the accessible name and longer description (the chart's SVG title and desc). empty: no-data content.
        - class: a hook for tests and CSS. */}
    <Heatmap class="lab-grid" data={() => ($empty ? [] : make($k))} x="saat" y="gun" value="kisi" xDomain={$empty ? undefined : [9, 12, 15, 18]} yDomain={$empty ? undefined : DAYS}
      xFormat={(h: number) => `${h}:00`} yFormat={(g: string) => g.toUpperCase()} format={(v: number) => `${v} kişi`} levels={4} max={12} cell={28}
      valueLabel="Kişi" animate tooltip={(c: { x: unknown; y: unknown; value: number | null }) => `${c.y} ${c.x}:00 → ${c.value} kişi`} onSelect={(c: { x: unknown; y: unknown; value: number | null }) => { $picked = `${c.y} ${c.x}:00` }}
      title="Toplantı odası" description="Gün ve saate göre oda kullanımı" empty="Kayıt yok" />
    {/* A calendar heatmap on a dark card (m:theme="night"). */}
    <Card m:theme="night">
      {/* calendar={{ weeks: 4 }}: columns are weeks and rows weekdays; x is a date in this mode. end: the last day shown.
          levels={5}: five tones. */}
      <Heatmap class="lab-cal" data={() => make($k).map((r, i) => { const d = new Date(END); d.setDate(END.getDate() - i); return { x: d, value: r.kisi } })}
        calendar={{ weeks: 4 }} end={END} levels={5} title="Takvim" />
    </Card>
  </div>
}
