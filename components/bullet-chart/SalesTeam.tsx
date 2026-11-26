import { BulletChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// Sales quota per rep: a real-life BulletChart in compact rows.
// Pick a month and each rep's bar fills to what they sold, with a dashed marker at last month and a target tick at the
// 100 % quota. The thin compact rows read like a table, which is how a sales dashboard usually shows a team.
// Use this shape when many people (or products) are measured against the same goal: one shared scale makes the rows
// directly comparable, and the bands say at a glance who is under, on or above quota.

// Sales in percent of quota per rep, for two months. `last` is the previous month, shown as the dashed marker.
// Replace MONTHS with your own rows; any keys work, they are named by the props below.
const MONTHS: Record<string, { rep: string; sold: number; last: number }[]> = {
  oct: [{ rep: "Ayşe", sold: 118, last: 96 }, { rep: "Mert", sold: 84, last: 90 }, { rep: "Selin", sold: 131, last: 120 }, { rep: "Kaan", sold: 62, last: 71 }],
  nov: [{ rep: "Ayşe", sold: 104, last: 118 }, { rep: "Mert", sold: 97, last: 84 }, { rep: "Selin", sold: 126, last: 131 }, { rep: "Kaan", sold: 88, last: 62 }],
}

export function SalesTeam() {
  // `$month` is a signal: reading it inside `data={() => …}` makes the chart re-run the function whenever it changes.
  let $month = "nov"
  // The Segmented control goes into the Card's `actions` slot, so the month switch sits in the card header next to the
  // title. `aria-label` names the control for screen readers.
  //
  // BulletChart props:
  // - label / value / previous: which keys hold the rep name, the bar value and the comparison marker.
  // - target={() => 100}: a getter instead of a key, because every rep has the same quota (100 %).
  // - ranges={[70, 100, 140]}: one array for every row (instead of a key per row): under 70 %, up to quota, above.
  // - rangeLabels: names of those three bands in the tooltip and the hidden data table.
  // - sharedScale: one scale for every row, so 62 % and 131 % are drawn against the same axis and can be compared.
  // - compact: thin rows without subtitles and ticks, for a table-like list.
  // - No `animate` prop: the default spring, so on a month switch every bar, tick and marker glides to its new place.
  //   Use animate="out" for a calmer glide, animate={false} to jump; reduced motion is honoured automatically.
  // Keyboard: Tab focuses the chart, ↑ ↓ move between reps, Enter / Space selects, Escape clears.
  return <Card title="Satış kotası" actions={[<Segmented size="sm" bind:value={$month} aria-label="Ay" options={[{ value: "oct", label: "Ekim" }, { value: "nov", label: "Kasım" }]} />]}>
    <BulletChart data={() => MONTHS[$month]} label="rep" value="sold" previous="last" target={() => 100} ranges={[70, 100, 140]}
      rangeLabels={["Kotanın altında", "Kotada", "Kotanın üstünde"]} sharedScale compact title="Satış kotası" />
  </Card>
}
