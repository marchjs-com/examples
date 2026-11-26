import { SankeyChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// An app's signup funnel: a real-life SankeyChart.
// Visitors flow from their source (search, social, invite) to a visit, a signup, a trial and finally a payment; at
// every step the ones who drop out branch off (left, inactive, quit). Switching week / month makes every ribbon flow
// to its new width; clicking a step writes how many came in and how many went on.
// Use a Sankey funnel instead of a plain funnel chart when people both arrive from several sources and leave at
// several points: the ribbons show both the merges and the drop-offs in one picture.

// Funnel flows per period, in SankeyChart's default { source, target, value } shape. Both periods have the same
// links, so a switch morphs the widths instead of adding or removing ribbons. Replace with your analytics export.
const DATA: Record<string, { source: string; target: string; value: number }[]> = {
  week: [
    { source: "Arama", target: "Ziyaret", value: 4200 }, { source: "Sosyal", target: "Ziyaret", value: 2600 }, { source: "Davet", target: "Ziyaret", value: 900 },
    { source: "Ziyaret", target: "Kayıt", value: 1900 }, { source: "Ziyaret", target: "Ayrıldı", value: 5800 },
    { source: "Kayıt", target: "Deneme", value: 1300 }, { source: "Kayıt", target: "Pasif", value: 600 },
    { source: "Deneme", target: "Ödeme", value: 410 }, { source: "Deneme", target: "Bıraktı", value: 890 },
  ],
  month: [
    { source: "Arama", target: "Ziyaret", value: 17800 }, { source: "Sosyal", target: "Ziyaret", value: 12100 }, { source: "Davet", target: "Ziyaret", value: 5200 },
    { source: "Ziyaret", target: "Kayıt", value: 8900 }, { source: "Ziyaret", target: "Ayrıldı", value: 26200 },
    { source: "Kayıt", target: "Deneme", value: 6400 }, { source: "Kayıt", target: "Pasif", value: 2500 },
    { source: "Deneme", target: "Ödeme", value: 2300 }, { source: "Deneme", target: "Bıraktı", value: 4100 },
  ],
}

export function SignupFunnel() {
  let $range = "week"              // "week" or "month", bound to the Segmented control
  let $info = "Bir adıma tıkla"    // the text under the chart, rewritten by onSelect
  // The Segmented control sits in the Card's `actions` slot; `aria-label` names it for screen readers ("Dönem" = period).
  //
  // SankeyChart props:
  // - links={() => DATA[$range]}: a function reading the signal, so the period switch re-reads the flows.
  // - format="compact": a pipe name; large counts read as "17K" instead of "17800".
  // - align="left": every node stands in the column of its step from the start, so drop-offs ("Ayrıldı", "Pasif",
  //   "Bıraktı") sit right next to the step they left from instead of being pushed to the last column (the default
  //   "justify" puts every end node there).
  // - linkColor="source": each ribbon takes its source node's color, so you can follow where a step's people go.
  // - animate="out": an easing name instead of the default spring; ribbons and nodes glide to their new widths without
  //   overshoot, calm enough for a dashboard. animate={false} jumps; reduced motion is honoured automatically.
  // - onSelect: called on click or Enter / Space with a node or a link (`kind` says which). For a node it has incoming
  //   and outgoing totals; for a link its value.
  // Keyboard: Tab focuses the chart, the arrows walk the steps (column by column, top down) and then the links,
  // Enter / Space selects, Escape clears; the flow highlight and the tooltip follow.
  return <Card title="Kayıt hunisi" actions={[<Segmented size="sm" bind:value={$range} aria-label="Dönem" options={[{ value: "week", label: "Bu hafta" }, { value: "month", label: "Bu ay" }]} />]}>
    <SankeyChart links={() => DATA[$range]} format="compact" align="left" linkColor="source" animate="out" title="Kayıt hunisi" height={300}
      onSelect={(p) => { $info = p.kind === "node" ? `${p.label}: ${p.incoming} geldi, ${p.outgoing} devam etti` : `${p.label}: ${p.value}` }} />
    {/* The selection read-out: a function child, so it re-renders whenever onSelect writes $info. */}
    <p sx={{ text: "sm", color: "muted" }}>{() => $info}</p>
  </Card>
}
