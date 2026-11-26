import { SankeyChart } from "march/charts"
import { Button, Card } from "march/ui"

// SankeyChartLab: every SankeyChart prop in one place, the full-featured reference example.
// Props used: links (a signal), nodes, source, target, value, nodeId, nodeLabel, align, nodeWidth, nodePadding,
// iterations, linkColor, labels, valueLabels, format, tableLabels, tooltip, onSelect, animate, title, description,
// empty, legend, class, colors, width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture SankeyChartLab.test.tsx checks.
// The buttons grow the income and empty / refill the flows, so the morph, enter and exit animations can be seen.

// A monthly budget: salary and a side job flow into the budget, the budget flows into rent, groceries and savings.
// `k` is the number of "add income" presses: the side job, groceries and savings grow with it. The keys are Turkish on
// purpose (kaynak = source, hedef = target, tutar = amount) to show that every field can be remapped.
const make = (k: number) => [
  { kaynak: "maas", hedef: "butce", tutar: 42000 }, { kaynak: "ek", hedef: "butce", tutar: 4000 + k * 1500 },
  { kaynak: "butce", hedef: "kira", tutar: 16000 }, { kaynak: "butce", hedef: "market", tutar: 8000 + k * 300 },
  { kaynak: "butce", hedef: "birikim", tutar: 22000 + k * 1200 },
]
// Node rows: the links name nodes by a short code (`kod`), these rows give each code a display name (`ad`).
const NODES = [{ kod: "maas", ad: "Maaş" }, { kod: "ek", ad: "Ek iş" }, { kod: "butce", ad: "Bütçe" }, { kod: "kira", ad: "Kira" }, { kod: "market", ad: "Market" }, { kod: "birikim", ad: "Birikim" }]

export function SankeyChartLab() {
  let $k = 0          // income presses, drives the data
  let $empty = false  // shows the `empty` text when true
  let $picked = "—"   // last selected node or link, written by onSelect
  // Main chart, prop by prop:
  // - links={() => …}: a function reading signals, so the ribbons morph when $k or $empty changes.
  // - nodes={NODES} + nodeId="kod" / nodeLabel="ad": node rows with a custom id key and display-name key.
  // - source / target / value: the link fields (defaults are the same names; here the Turkish keys).
  // - align="justify": end nodes in the last column (the default, written out for reference).
  // - nodeWidth={12} / nodePadding={16}: node width and the vertical gap between nodes of a column, in px.
  // - iterations={8}: relaxation passes toward fewer crossings (default 6; 0 keeps the input order).
  // - linkColor="gradient": each ribbon fades from its source color to its target color (the default).
  // - labels / valueLabels: node names, and each node's value after its name.
  // - format={["money", "TRY"]}: a pipe with arguments, Turkish lira money format.
  // - tableLabels: headers of the hidden data table ("Nereden" = from, "Nereye" = to, "Tutar" = amount).
  // - tooltip: custom content from the hovered node's or link's label and raw value.
  // - onSelect: called on click or Enter / Space with a node or a link; `kind` says which.
  // - animate={{ duration: 600, easing: "out", stagger: 40 }}: timed easing, link after link 40 ms apart in column
  //   order. Other forms: true (spring, default), false (no motion), "bounce" (an easing name), { enter: false } (no
  //   draw-in on first render, updates still morph), or (ctx) => … to decide per mark from { index, key, phase }.
  //   Reduced motion → everything takes its place at once.
  // - title / description: the SVG's accessible name and description; empty: text shown when there are no links.
  // - legend="bottom": one toggle per node (hiding a node hides its links); colors: per node, in node order;
  //   height: px; export: SVG and CSV download buttons.
  // Keyboard: Tab focuses the chart, the arrows walk the nodes (column by column, top down) and then the links,
  // Enter / Space selects, Escape clears; the focused mark wears a ring and its flow lights up.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-empty, …) are hooks for SankeyChartLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Gelir ekle</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <SankeyChart class="lab-flow" links={() => ($empty ? [] : make($k))} nodes={NODES} source="kaynak" target="hedef" value="tutar"
      nodeId="kod" nodeLabel="ad" align="justify" nodeWidth={12} nodePadding={16} iterations={8} linkColor="gradient"
      labels valueLabels format={["money", "TRY"]} tableLabels={{ source: "Nereden", target: "Nereye", value: "Tutar" }}
      tooltip={(p: { label: string; value: number }) => `${p.label}: ${p.value} ₺`} onSelect={(p) => { $picked = `${p.kind} ${p.label}` }}
      animate={{ duration: 600, easing: "out", stagger: 40 }} title="Bütçe akışı" description="Gelir kalemlerden giderlere" empty="Akış yok"
      legend="bottom" colors={["#2f6fed", "#8e44ad", "#f2801f", "#d42a2f", "#1fa463", "#e2b100"]} height={260} export={["svg", "csv"]} />
    {/* Second chart: the same flows as a small thumbnail on a dark theme (m:theme="night"), without node rows (so the
        nodes come from the codes in the links), aligned right, plain grey ribbons (linkColor="neutral", no
        gradients), no labels, no legend, a fixed width, and animate={false}: it updates instantly. */}
    <Card m:theme="night">
      <SankeyChart class="lab-mini" links={() => make($k)} source="kaynak" target="hedef" value="tutar" align="right" linkColor="neutral"
        labels={false} legend={false} width={320} height={140} title="Küçük akış" animate={false} />
    </Card>
  </div>
}
