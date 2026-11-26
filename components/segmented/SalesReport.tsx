// SalesReport: the real-life Segmented example.
//
// What it shows: the header of a sales dashboard. A period switch (day / week / month / year) with a sliding highlight,
// where the year is disabled on the current plan and says why in a tooltip; and, in the card's action slot, an
// icon-only switch between a list and a grid layout. The numbers below follow the chosen period.
// When to use this pattern: 2-6 short options that change what a panel shows (periods, units, view modes). For more
// options use Select or a Combobox.
import { Segmented, Card, Badge } from "march/ui"
import { list, grid, sun, calendar, columns } from "march/icons"

// Segmented options are objects { value, label, icon, title, disabled }:
// - icon: drawn before the label.
// - disabled: the segment is shown but cannot be chosen. title: a tooltip, used here to say why it is disabled.
const periods = [
  { value: "day", label: "Gün", icon: sun }, { value: "week", label: "Hafta", icon: calendar }, { value: "month", label: "Ay", icon: columns },
  { value: "year", label: "Yıl", disabled: true, title: "Yıllık rapor Pro planda" },
]
// An icon-only segment: label "" with an icon; its accessible name and tooltip come from `title`.
const views = [{ value: "list", label: "", icon: list, title: "Liste" }, { value: "grid", label: "", icon: grid, title: "Izgara" }]
// The data of the three available periods.
const sales = { day: { total: "18.450 ₺", orders: 42, change: "+%6" }, week: { total: "126.900 ₺", orders: 311, change: "+%12" }, month: { total: "534.200 ₺", orders: 1288, change: "-%3" } }

export function SalesReport() {
  // `let $name` variables are March signals: the Segmented controls write them (bind:value) and everything that reads
  // them redraws. `const $now` is a derived value: it is computed again whenever $period changes.
  let $period = "week"
  let $view = "list"
  const $now = sales[$period as keyof typeof sales]
  // Card's `actions` slot holds the view switch (a Segmented with icon-only options).
  return <Card title="Satışlar" actions={<Segmented bind:value={$view} options={views} aria-label="Görünüm" />}>
    <div sx={{ flex: "col", gap: 3 }}>
      {/* The period switch:
          - bind:value={$period}: two-way binding with the signal.
          - indicator="slide": one highlight glides to the chosen segment (the default "fill" colours it in place).
          - m:color="brand-blue": a common prop that sets the colour token of the component and what is in it.
          - aria-label: the name of the group. Segmented is a radiogroup of radio buttons: arrow keys move and select
            (mirrored in right-to-left), only the chosen segment is in the Tab order, and Home / End jump to the ends.
          The sliding highlight is moved by the motion engine, so reduced motion and the global speed apply. */}
      <Segmented bind:value={$period} indicator="slide" m:color="brand-blue" options={periods} aria-label="Dönem" />
      {/* The numbers: the direction of this block depends on the view switch (a column for the list, a row for the grid),
          and the Badge is green for a rise and red for a fall. */}
      <div sx={{ flex: $view === "list" ? "col" : "row", gap: 2 }}>
        <span sx={{ text: ["xl", "bold"] }}>{$now.total}</span>
        <span sx={{ color: "muted" }}>{$now.orders} sipariş</span>
        <Badge tone={$now.change.startsWith("+") ? "success" : "danger"}>{$now.change}</Badge>
      </div>
    </div>
  </Card>
}
