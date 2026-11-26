// ServerLoad: the real-life Heatmap example.
//
// What it shows: server load (percent) by region and hour, with a Segmented control to switch between the live and the test
// environment. Clicking or pressing Enter on a cell shows it by name under the chart.
// When to use this pattern: a table of intensities (traffic, errors, load). `x` and `y` are keys of your rows, and `yDomain`
// fixes the row order. `max` and `levels` decide the scale: here 100 percent is the darkest of six tones.
// Animation: animate="out" makes cells fade to their new tone when the data changes (the motion engine honours reduced
// motion and "Stop all"); leave `animate` out for an instant change.
// Accessibility: tones never carry the meaning alone; every value is in the tooltip and in a hidden data table.
import { Heatmap } from "march/charts"
import { Card, Segmented } from "march/ui"

// Pretend data: for every region and every second hour a load number that follows a daily curve (and is higher in the live
// environment, so switching shows a change).
const REGIONS = ["İstanbul", "Frankfurt", "Virginia", "Singapur"]
const load = (env: string) => REGIONS.flatMap((bolge, r) => Array.from({ length: 12 }, (_, i) => ({
  saat: i * 2, bolge, yuk: Math.round(30 + 50 * Math.max(0, Math.sin(((i * 2 - r * 5) / 24) * Math.PI)) + ((i * 7 + r * 3) % 11) * (env === "prod" ? 3 : 1)),
})))

export function ServerLoad() {
  // $env is the chosen environment, $cell the text for the last selected cell.
  let $env = "prod"
  let $cell = "Bir hücre seç"
  {/* The environment switch sits in the card's actions; its value is read by the data function below. */}
  return <Card title="Sunucu yükü (%)" actions={[<Segmented size="sm" bind:value={$env} aria-label="Ortam" options={[{ value: "prod", label: "Canlı" }, { value: "staging", label: "Deneme" }]} />]}>
    {/* - data: a function, so changing $env rebuilds the rows. x="saat" / y="bolge" / value="yuk": which keys of a row are the
          column, the row and the value.
        - xFormat / format: how column labels and values are written. yDomain: the row order (and all rows even if one is empty).
        - max={100} and levels={6}: a value of 100 is the darkest of six tones.
        - valueLabel: the word for the value in the tooltip. animate: the cells fade to their new tone.
        - onSelect(cell): called on click or Enter with { x, y, value }; we write it under the chart. */}
    <Heatmap data={() => load($env)} x="saat" y="bolge" value="yuk" xFormat={(h: number) => `${h}:00`} yDomain={REGIONS} max={100} levels={6}
      format={(v: number) => `%${v}`} valueLabel="Yük" animate="out" title="Sunucu yükü" onSelect={(c: { x: unknown; y: unknown; value: number | null }) => { $cell = `${c.y} ${c.x}:00 · %${c.value}` }} />
    <p sx={{ text: "sm", color: "muted" }}>{() => $cell}</p>
  </Card>
}
