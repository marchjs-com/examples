import { Heatmap } from "march/charts"
import { Button, Card } from "march/ui"

// HeatmapLab: every Heatmap prop in one place, the full-featured reference example.
// Props used: data (a signal), x, y, value, calendar ({ weeks }), from, to, end, firstDay, months, dayLabels,
// levelLegend, xFormat, yFormat, xDomain, yDomain, format, levels, max, cellSize, gap, radius, cell, valueLabel,
// tooltip, onSelect, animate (spring, { stagger } diagonal wave, false), title, description, empty, class.
// Use it to look up a prop, to compare the grid and the two calendar forms, and as the fixture HeatmapLab.test.tsx
// checks. "New week" changes the data, so every change animation can be seen.

// Grid data: five weekdays × four hours. gun = day, saat = hour, kisi = people in the meeting room. `k` is the week:
// each new week shifts the numbers so the cells fade to new tones.
const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum"]
const make = (k: number) => DAYS.flatMap((gun, d) => [9, 12, 15, 18].map((saat) => ({ gun, saat, kisi: ((d * 7 + saat + k * 5) % 13) })))
// A fixed last day for the four-week calendar, so it looks the same on every load (and in tests).
const END = new Date(2026, 10, 20)

export function HeatmapLab() {
  let $k = 1          // the current week, drives all three heatmaps
  let $picked = "—"   // last selected cell, written by onSelect
  let $empty = false  // shows the `empty` text when true
  // 1. The grid (.lab-grid), prop by prop:
  // - data={() => …}: a function reading signals, so the grid redraws (and animates) when $k or $empty changes.
  // - x="saat" y="gun" value="kisi": column, row and number keys (duplicate cells would be summed).
  // - xDomain / yDomain: the order and completeness of columns and rows (every hour and day, even an empty one).
  // - xFormat / yFormat / format: the hour as "9:00", the day in upper case, the value with its unit (people).
  // - levels={4}: four tones; max={12}: the value of the darkest tone, so weeks stay comparable.
  // - cell={28}: a fixed 28 px pitch (the older form of cellSize).
  // - valueLabel: the name of the value in the tooltip; tooltip: a function for fully custom tooltip text.
  // - onSelect: called on click or Enter with { x, y, value, label, datum }; the Lab shows it in `.lab-picked`.
  // - animate="out": an easing name, so on a new week the cells fade to their new tone without overshoot.
  // - title / description: the SVG's accessible name and description; empty: text shown when data is [].
  // Keyboard: Tab reaches the grid, the arrow keys move between cells, Home / End jump to the first / last cell,
  // Enter or Space selects, Escape clears; the tooltip follows the keyboard cell.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-empty, lab-picked) are hooks for HeatmapLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Yeni hafta</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <Heatmap class="lab-grid" data={() => ($empty ? [] : make($k))} x="saat" y="gun" value="kisi" xDomain={$empty ? undefined : [9, 12, 15, 18]} yDomain={$empty ? undefined : DAYS}
      xFormat={(h: number) => `${h}:00`} yFormat={(g: string) => g.toUpperCase()} format={(v: number) => `${v} kişi`} levels={4} max={12} cell={28}
      valueLabel="Kişi" animate="out" tooltip={(c: { x: unknown; y: unknown; value: number | null }) => `${c.y} ${c.x}:00 → ${c.value} kişi`} onSelect={(c: { x: unknown; y: unknown; value: number | null }) => { $picked = `${c.y} ${c.x}:00` }}
      title="Toplantı odası" description="Gün ve saate göre oda kullanımı" empty="Kayıt yok" />
    {/* 2. A short calendar on a dark theme (m:theme="night"): the same numbers laid on the 20 days up to END.
        In calendar mode `x` is a date (here the default key "x"), the columns are weeks and the rows weekdays.
        calendar with weeks: 4 shows four weeks; end={END} is the last day (the older name of `to`); levels={5} tones;
        animate={false}: no motion at all, a direct comparison with the animated grid above. */}
    <Card m:theme="night">
      <Heatmap class="lab-cal" data={() => make($k).map((r, i) => { const d = new Date(END); d.setDate(END.getDate() - i); return { x: d, value: r.kisi } })}
        calendar={{ weeks: 4 }} end={END} levels={5} title="Takvim" animate={false} />
    </Card>
    {/* 3. A half-year reading calendar, contribution-graph style (gun = day, sayfa = pages read):
        - calendar + from / to: a fixed range; days outside it are gaps.
        - firstDay={1}: weeks start on Monday, whatever the locale says.
        - months: month names over the weeks; dayLabels="all": every weekday name on the side (true = Mon, Wed, Fri).
        - levelLegend with less / more: the "less → more" legend with your own words.
        - cellSize / gap / radius: 10 px squares, 2 px apart, radius 5 = half the size, so the cells are dots.
        - xFormat: in calendar mode it formats the date in the tooltip (here Turkish long dates).
        - animate with stagger: 10: the cells pop in as a diagonal wave, delay = 10 ms × (column + row).
        Keyboard in a calendar: ↑ ↓ move one day, ← → one week; the tooltip says the date and the value. */}
    <Heatmap class="lab-year" data={() => Array.from({ length: 180 }, (_, i) => ({ gun: new Date(2026, 0, 1 + i), sayfa: (i * 7 + $k * 3) % 9 }))} x="gun" value="sayfa"
      calendar from="2026-01-01" to="2026-06-30" firstDay={1} months dayLabels="all" levelLegend={{ less: "Az", more: "Çok" }}
      cellSize={10} gap={2} radius={5} xFormat={(d: Date) => d.toLocaleDateString("tr", { day: "numeric", month: "long" })} valueLabel="Sayfa"
      animate={{ stagger: 10 }} title="Okuma, ilk yarı yıl" />
  </div>
}
