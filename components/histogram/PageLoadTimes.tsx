import { Histogram } from "march/charts"
import { Card, Segmented } from "march/ui"

// Page load times: a real-life Histogram with two overlaid groups.
// Shows phone and desktop load times on the same bins, a smoothed density curve per device, the phone median and a
// 2.5 s performance budget line. Switching the period (today / this week) loads more data and re-bins, and every bar
// morphs to its new position, width and height.
// Use an overlaid histogram when you compare the shape of two distributions on one scale: here it shows at a glance
// that phones are both slower and more spread out, which an average alone would not tell you.

// Fake measurements: n load times around `base` seconds with roughly normal spread (Box–Muller transform on a sine-hash
// "random", so the chart is the same on every load). Never below 0.3 s, rounded to hundredths. Replace with real data.
const sample = (n: number, base: number, spread: number, seed: number) => Array.from({ length: n }, (_, i) => {
  const a = Math.sin(i * 12.9898 + seed) * 43758.5453, b = Math.sin(i * 78.233 + seed) * 12543.123
  const u = a - Math.floor(a), v = b - Math.floor(b)
  return Math.max(0.3, Math.round((base + spread * Math.sqrt(-2 * Math.log(u || 1e-9)) * Math.cos(2 * Math.PI * v)) * 100) / 100)
})
// One row per page view: { s: seconds, device }. "week" has twice as many views as "day", so the switch visibly
// changes the counts. The `device` value doubles as the group name in the legend, tooltip and data table.
const loads = (range: string) => {
  const k = range === "day" ? 1 : 2
  return [...sample(140 * k, 2.4, 0.7, k).map((s) => ({ s, device: "Telefon" })), ...sample(120 * k, 1.3, 0.35, k + 5).map((s) => ({ s, device: "Masaüstü" }))]
}

export function PageLoadTimes() {
  // The selected period; bound to the Segmented control in the card header.
  let $range = "day"
  // The Segmented control sits in the Card's `actions` slot, next to the title; `aria-label` names it for screen readers.
  //
  // Histogram props:
  // - value="s": which key of a row holds the number to bin.
  // - group="device": overlay one translucent distribution per device on shared bins; the legend toggles them.
  // - bins: about 16 bins for a day, 28 for a week (more data supports finer bins). The chart rounds this to nice
  //   thresholds; use binWidth for an exact width.
  // - curve="kde": a kernel density estimate per group, a smooth outline of each shape.
  // - marks: { x: "median", series: "Telefon" } draws the phone group's median (it moves with the data by itself);
  //   { x: 2.5, color: "danger", dash: "solid" } is a fixed budget line, solid instead of the default dashed.
  // - xFormat: the format of the bin edges on the axis and in the tooltip ("sn" = seconds).
  // - xTitle / yTitle: axis titles ("Ziyaret" = visits).
  // - legend="bottom": group toggles under the chart, which keeps the plot wide.
  // - animate="out": an easing name instead of the default spring, so re-binned bars glide into place without
  //   overshoot, calm enough for a dashboard. animate={false} makes them jump; {{ duration: 400, stagger: 10 }} sweeps
  //   them left to right. Reduced motion is honoured automatically.
  // Keyboard: Tab focuses the plot, ← → move between bins, Home / End jump to the ends, Enter selects, Escape clears.
  // To adapt: point `data` at your own rows and set `value` / `group` to your keys.
  return <Card title="Sayfa yüklenme süreleri" actions={[<Segmented size="sm" bind:value={$range} aria-label="Dönem" options={[{ value: "day", label: "Bugün" }, { value: "week", label: "Bu hafta" }]} />]}>
    <Histogram data={() => loads($range)} value="s" group="device" bins={$range === "day" ? 16 : 28} curve="kde"
      marks={[{ x: "median", series: "Telefon", label: "Telefon ortancası" }, { x: 2.5, label: "Bütçe 2,5 sn", color: "danger", dash: "solid" }]}
      xFormat={(v: number) => `${v} sn`} xTitle="Yüklenme süresi" yTitle="Ziyaret" animate="out" legend="bottom" title="Yüklenme süreleri" height={260} />
  </Card>
}
