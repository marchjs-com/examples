// TrafficSources: the real-life PieChart example.
//
// The traffic sources of a website: a switch picks this week or this month and the slices turn to their new shares;
// clicking a slice makes it the filter shown below. Use this pattern for a dashboard card where a chart reacts to a
// period switch and to clicks.
import { PieChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// The data per period: rows with the default keys "label" and "value".
const DATA: Record<string, { label: string; value: number }[]> = {
  week: [{ label: "Arama", value: 4200 }, { label: "Doğrudan", value: 2100 }, { label: "Sosyal", value: 1800 }, { label: "E-posta", value: 640 }],
  month: [{ label: "Arama", value: 16400 }, { label: "Doğrudan", value: 9800 }, { label: "Sosyal", value: 11200 }, { label: "E-posta", value: 3100 }],
}

export function TrafficSources() {
  // The chosen period and the last clicked source (the "filter").
  let $range = "week"
  let $source = "Hepsi"
  return <Card title="Trafik kaynakları" actions={[<Segmented size="sm" bind:value={$range} aria-label="Dönem" options={[{ value: "week", label: "Bu hafta" }, { value: "month", label: "Bu ay" }]} />]}>
    {/* - data as a function: it returns the rows of the chosen period, so the chart follows the Segmented switch.
        - donut={0.7}: a thin ring (the number is the inner radius ratio). padAngle: a small gap between slices.
        - format="compact": values are written in a short, compact form.
        - animate="out": slices turn to their new angles with an easing name (true would use a spring). Under reduced
          motion they take their new angles in place; the motion engine's global speed and "Stop all" apply.
        - legend="bottom": the legend under the chart; its items are toggle buttons that hide a slice (aria-pressed).
        - onSelect: called with the clicked or Enter-pressed slice (the arrow keys move between slices).
        - title: the accessible name of the SVG; a visually hidden data table lists every slice. height: size in pixels. */}
    <PieChart data={() => DATA[$range]} donut={0.7} padAngle={0.02} format="compact" animate="out" legend="bottom" title="Trafik kaynakları"
      onSelect={(p: { label: unknown; share: number }) => { $source = String(p.label) }} height={240} />
    <p sx={{ text: "sm", color: "muted" }}>Süzgeç: {() => $source}</p>
  </Card>
}
