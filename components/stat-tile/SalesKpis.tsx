// SalesKpis: the real-life StatTile example.
//
// What it shows: the indicators of a sales dashboard. Three KPI cards (label first, left-aligned, with a hint line) and
// two plain tiles that act as navigation: one is a link to a report, one is a disabled link ("coming soon").
// When to use this pattern: a row of headline figures where each figure may also lead somewhere. A StatTile without
// onClick / href is static text; with `href` it becomes a real link and with `onClick` a real button.
//
// Animation: StatTile has no motion of its own, so there is nothing to switch off here. If you put a rolling number in
// `value` (see StepCounter), that motion runs on March's motion engine and follows the global speed, "Stop all" and the
// visitor's reduced-motion preference.
// Accessibility: a static tile is read as plain text in order (value, label, hint). Links and buttons are native
// elements named by that same text, with a focus ring; `disabled` takes the tile out of the tab order.
import { StatTile, Card } from "march/ui"

// The data of the dashboard, kept apart from the markup so the tiles can be generated with one map().
// Per KPI: label (what it counts), value (the figure), hint (a small line under them) and an optional colour token.
// Without a colour the tile keeps the default colour.
const KPIS = [
  { label: "Ciro", value: "₺248.300", hint: "geçen aya göre %12 ↑", color: "success" as const },
  { label: "Sipariş", value: "1.284", hint: "günde ortalama 41" },
  { label: "İade oranı", value: "%2,1", hint: "hedef %3'ün altında", color: "brand-blue" as const },
]

export function SalesKpis() {
  return <Card title="Kasım özeti">
    {/* grid: "fit" lays the tiles out in as many columns as fit the width, so the row wraps on a narrow screen
        without a media query. gap: 3 is a step of the spacing scale. */}
    <div sx={{ grid: "fit", gap: 3 }}>
      {/* The three KPIs. variant="card" gives each a border and surface; align="start" left-aligns the text;
          order="label" puts the label above the value (the default is value first); size="lg" enlarges the figure.
          m:color is a common prop: it tints the tile and everything in it with one colour token, and an
          undefined colour (the second KPI) simply leaves the default. */}
      {KPIS.map((k) => <StatTile variant="card" align="start" order="label" size="lg" label={k.label} value={k.value} hint={k.hint} m:color={k.color} />)}
      {/* href turns the tile into a link (a native <a>), so it can be opened in a new tab and read as "link". */}
      <StatTile variant="tile" align="start" order="label" label="Ayrıntılı rapor" value="Aç →" href="#rapor" />
      {/* disabled keeps the tile visible but inert and out of the tab order: use it for something not available yet. */}
      <StatTile variant="tile" align="start" order="label" label="Tahmin" value="Yakında" href="#tahmin" disabled />
    </div>
  </Card>
}
