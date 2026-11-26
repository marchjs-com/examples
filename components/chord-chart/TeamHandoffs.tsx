import { ChordChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// Work handed over between teams (tickets): a real-life ChordChart.
// Each team's arc is as long as the tickets it hands over and receives; ribbons join the teams that pass work to each
// other. Switching the quarter turns the arcs to their new shares, and a click on a ribbon writes both directions
// under the chart. Use this to find the busiest handoffs in an organisation, the ones worth a better process.

// Team names in matrix order, and one matrix per quarter: Q[q][i][j] is the tickets team i handed to team j.
// Replace them with your own counts (a matrix from a query, or use `data` with flow rows instead).
const TEAMS = ["Destek", "Ürün", "Mühendislik", "Tasarım", "Satış"]
const Q: Record<string, number[][]> = {
  q1: [[0, 34, 52, 6, 12], [18, 0, 61, 28, 9], [22, 30, 0, 14, 4], [3, 21, 25, 0, 2], [41, 16, 8, 1, 0]],
  q2: [[0, 28, 47, 9, 15], [21, 0, 70, 33, 6], [26, 38, 0, 19, 7], [5, 24, 31, 0, 4], [36, 22, 11, 3, 0]],
}

export function TeamHandoffs() {
  let $q = "q1"                 // the quarter, bound to the Segmented control
  let $info = "Bir şeride tıkla"  // the line under the chart, written by onSelect
  // The Segmented control goes into the Card's `actions` slot, so the quarter switch sits in the card header next to
  // the title. `aria-label` names the control for screen readers.
  //
  // ChordChart props:
  // - matrix={() => Q[$q]}: a function reading the signal, so a quarter switch redraws the chart.
  // - names: the teams round the rim, in matrix order.
  // - Not directed (the default): each pair of teams shares one ribbon, as wide at each end as what goes that way.
  // - ribbonColor="larger": a ribbon takes the color of the team that hands over more, so the dominant direction of
  //   each pair is visible without arrows.
  // - ticks={20}: value ticks every 20 tickets round the rim; format: the value text ("bilet" = tickets).
  // - animate="out": an easing name instead of the default spring, so arcs and ribbons glide to their new angles
  //   without overshoot, which suits a dashboard. animate={false} makes them jump; { duration: 400, easing: "out",
  //   stagger: 30 } gives finer control. Reduced motion is honoured automatically.
  // - onSelect: called on click or Enter. For a ribbon (`kind` "ribbon") it carries source, target, value and `back`
  //   (what flows the other way); for a group, its label and total.
  // Keyboard: Tab focuses the chart, the arrow keys walk the teams round the rim and then the ribbons, Enter / Space
  // selects, Escape clears.
  return <Card title="Takımlar arası iş devri" actions={[<Segmented size="sm" bind:value={$q} aria-label="Çeyrek" options={[{ value: "q1", label: "1. çeyrek" }, { value: "q2", label: "2. çeyrek" }]} />]}>
    <ChordChart matrix={() => Q[$q]} names={TEAMS} ribbonColor="larger" ticks={20} format={(n: number) => `${n} bilet`} animate="out"
      title="Takımlar arası iş devri" height={340}
      onSelect={(p) => { $info = p.kind === "ribbon" ? `${p.source} → ${p.target}: ${p.value} · geri: ${p.back}` : `${p.label}: toplam ${p.value}` }} />
    {/* The info line: a function child, so it re-renders when onSelect writes $info. */}
    <p sx={{ text: "sm", color: "muted" }}>{() => $info}</p>
  </Card>
}
