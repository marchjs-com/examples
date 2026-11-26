import { Heatmap } from "march/charts"
import { Card, Segmented } from "march/ui"

// Server load per region and hour: a real-life Heatmap in a monitoring card.
// Rows are data-center regions, columns are two-hour slots, and the tone is the CPU load. An environment switch
// (production / staging) swaps the data and every cell fades to its new tone; clicking a cell writes its region, hour
// and load under the chart.
// Use a heatmap like this when two categories cross (where × when) and you look for hot spots, not exact numbers.

// The regions, in the order the rows should appear (yDomain below).
const REGIONS = ["İstanbul", "Frankfurt", "Virginia", "Singapur"]
// Fake load data: one row per region and two-hour slot (bolge = region, saat = hour, yuk = load %). A sine wave shifted
// per region gives each one its own busy hours; production adds more noise than staging. Replace with your metrics.
const load = (env: string) => REGIONS.flatMap((bolge, r) => Array.from({ length: 12 }, (_, i) => ({
  saat: i * 2, bolge, yuk: Math.round(30 + 50 * Math.max(0, Math.sin(((i * 2 - r * 5) / 24) * Math.PI)) + ((i * 7 + r * 3) % 11) * (env === "prod" ? 3 : 1)),
})))

export function ServerLoad() {
  let $env = "prod"               // the environment, bound to the Segmented control
  let $cell = "Bir hücre seç"     // the text under the chart, written by onSelect
  // The Segmented control goes into the Card's `actions` slot, so the switch sits in the card header next to the title.
  //
  // Heatmap props:
  // - data={() => load($env)}: a function reading the signal, so switching the environment swaps the data.
  // - x="saat" y="bolge" value="yuk": column, row and number keys of each row.
  // - xFormat: the hour as "14:00"; format: the load as "%62" (the Turkish way of writing a percent).
  // - yDomain={REGIONS}: the row order, so the regions do not reorder with the data.
  // - max={100}: the darkest tone means 100 % load, a fixed scale for both environments; levels={6}: six tones.
  // - valueLabel: the name of the value in the tooltip (here: load).
  // - animate="out": an easing name, so on a switch the cells fade to their new tone without overshoot.
  //   animate={false} switches instantly, { duration: 300, easing: "in-out" } gives finer control, and reduced
  //   motion is honoured automatically.
  // - title: the SVG's accessible name; a visually hidden table carries every cell for screen readers.
  // - onSelect: called on click or Enter with { x, y, value, label, datum }.
  // Keyboard: Tab reaches the grid, the arrow keys move between cells, Enter or Space selects, Escape clears.
  return <Card title="Sunucu yükü (%)" actions={[<Segmented size="sm" bind:value={$env} aria-label="Ortam" options={[{ value: "prod", label: "Canlı" }, { value: "staging", label: "Deneme" }]} />]}>
    <Heatmap data={() => load($env)} x="saat" y="bolge" value="yuk" xFormat={(h: number) => `${h}:00`} yDomain={REGIONS} max={100} levels={6}
      format={(v: number) => `%${v}`} valueLabel="Yük" animate="out" title="Sunucu yükü" onSelect={(c: { x: unknown; y: unknown; value: number | null }) => { $cell = `${c.y} ${c.x}:00 · %${c.value}` }} />
    {/* A function child, so only this text updates when a cell is selected. */}
    <p sx={{ text: "sm", color: "muted" }}>{() => $cell}</p>
  </Card>
}
