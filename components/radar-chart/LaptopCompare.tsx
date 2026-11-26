import { RadarChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// Comparing two laptops: a real-life RadarChart with a per-spoke scale.
// "Benimki" (mine) is always shown; the Segmented control picks the rival (Air, Pro, Studio). On a switch the old
// rival's shape shrinks back into the center and the new one grows out of it.
// Use a per-spoke scale (axisMax) when the qualities have different units: CPU points in thousands, battery in hours,
// memory in GB. On one shared scale the CPU spoke would squash everything else to the middle.

// One row per spec: its name, its own maximum (`top`, the rim of that spoke) and one value per laptop.
// Note "Hafiflik" (lightness): higher is better on every spoke, so a bigger shape always means a better machine.
const SPECS = [
  { spec: "İşlemci (puan)", top: 3000, mine: 2450, air: 2600, pro: 2900, studio: 2100 },
  { spec: "Pil (saat)", top: 24, mine: 18, air: 20, pro: 22, studio: 11 },
  { spec: "Ekran (nit)", top: 1600, mine: 500, air: 500, pro: 1600, studio: 1000 },
  { spec: "Bellek (GB)", top: 64, mine: 16, air: 16, pro: 36, studio: 64 },
  { spec: "Depolama (TB)", top: 4, mine: 1, air: 0.5, pro: 1, studio: 4 },
  { spec: "Hafiflik", top: 10, mine: 7, air: 9, pro: 5, studio: 3 },
]

// Display names of the rival keys, used as the second series label.
const NAMES: Record<string, string> = { air: "Air", pro: "Pro", studio: "Studio" }

export function LaptopCompare() {
  // The rival's key in SPECS, bound to the Segmented control in the card header.
  let $rival = "pro"
  // The Segmented control sits in the Card's `actions` slot; `aria-label` names it for screen readers ("Rakip" = rival).
  //
  // RadarChart props:
  // - x="spec": the spoke name of each row.
  // - y={["mine", $rival]}: two series, two polygons. Because $rival is read here, the binding is reactive: a new
  //   rival key means the old series leaves and a new one enters.
  // - series: the legend / tooltip / table labels, aligned with y.
  // - axisMax="top": each spoke's rim comes from its row's `top` value, which also turns on the per-spoke scale.
  // - fill={0.18}: a light fill so the two overlapping shapes stay readable.
  // - animate={{ easing: "out", duration: 500 }}: a 500 ms glide with no overshoot; the leaving shape shrinks into the
  //   center while the new one grows out of it. Add stagger: 120 to start the series one after the other, or use
  //   animate={false} to switch instantly; reduced motion is honoured automatically.
  // - legend="bottom": series toggles under the chart; hiding a series shrinks it into the center.
  // Keyboard: Tab focuses the chart, ← → (↑ ↓, Home, End) move from spec to spec, Enter / Space selects, Escape clears.
  return <Card title="Hangisini almalı?" actions={[<Segmented size="sm" bind:value={$rival} aria-label="Rakip" options={[{ value: "air", label: "Air" }, { value: "pro", label: "Pro" }, { value: "studio", label: "Studio" }]} />]}>
    <RadarChart data={SPECS} x="spec" y={["mine", $rival]} series={["Benimki", NAMES[$rival]!]}
      axisMax="top" fill={0.18} animate={{ easing: "out", duration: 500 }} legend="bottom" title="Özellik karşılaştırması" height={300} />
  </Card>
}
