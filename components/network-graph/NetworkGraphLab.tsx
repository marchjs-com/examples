import { NetworkGraph } from "march/charts"
import { Button, Card } from "march/ui"

// NetworkGraphLab: every NetworkGraph prop in one place, the full-featured reference example.
// Props used: nodes (a signal), links (a signal), id, label, group, value, source, target, weight, layout, charge,
// linkDistance, linkStrength, center, collide, nodeSize, labels, directed, zoom, draggable, groupLabels, format,
// tooltip, onSelect, animate, title, description, empty, legend, class, colors, width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture NetworkGraphLab.test.tsx checks.
// The buttons add a person and empty / refill the graph, so the enter and exit animations can be seen.

// A small team: five people in three teams, and who works with whom. The keys are Turkish on purpose (ad = name,
// ekip = team, puan = score, kat = weight) and the id key is `key`, to show that every field can be remapped.
const people = [{ key: "a", ad: "Ada", ekip: "tasarim", puan: 8 }, { key: "b", ad: "Bora", ekip: "tasarim", puan: 3 },
  { key: "c", ad: "Cem", ekip: "mobil", puan: 5 }, { key: "d", ad: "Dila", ekip: "mobil", puan: 2 }, { key: "e", ad: "Ece", ekip: "web", puan: 6 }]
// Links with custom keys (from / to) and a weight (kat) that sets the line's thickness and pull.
const ties = [{ from: "a", to: "b", kat: 3 }, { from: "a", to: "c", kat: 1 }, { from: "c", to: "d", kat: 2 }, { from: "d", to: "e", kat: 1 }]

export function NetworkGraphLab() {
  let $nodes = people   // node rows, grows with "Kişi ekle"
  let $links = ties     // link rows, grows with "Kişi ekle"
  let $picked = "—"     // last selected node, written by onSelect
  let $empty = false    // shows the `empty` text when true
  // Adds a new web-team member linked to Ece. New arrays are assigned, so both signals notify the graph and the new
  // node pops in while the others keep their positions.
  const add = () => {
    const i = $nodes.length
    $nodes = [...$nodes, { key: `n${i}`, ad: `Yeni ${i}`, ekip: "web", puan: 4 }]
    $links = [...$links, { from: `n${i}`, to: "e", kat: 1 }]
  }
  // Main graph, prop by prop:
  // - nodes / links as functions reading signals, so the graph updates (and animates) when they change.
  // - id / label / group / value: node fields (defaults "id", "label", "group", "value"); value sets the node size.
  // - source / target / weight: link fields (defaults "source", "target", "value"); weight sets thickness and pull.
  // - layout="force": the force simulation (the default; "circle" and "grid" are the other layouts).
  // - charge={-200}: repulsion between nodes (default -160; more negative pushes them further apart).
  // - linkDistance={70} / linkStrength={0.8}: rest length of a link in px and its stiffness 0…2.
  // - center={0.08}: pull towards the middle 0…1 (default 0.06); collide={6}: nodes stay at least 6 px apart.
  // - nodeSize={[6, 18]}: smallest and largest radius in px.
  // - labels: names always on (default up to 60 nodes); directed: arrows at the target end.
  // - zoom / draggable: wheel / pinch zoom with background pan, and dragging nodes to pin them (both default on).
  // - groupLabels: readable team names for legend and tooltip; format: the "number" pipe for the value.
  // - tooltip: custom content from the node's label and degree (its number of links).
  // - onSelect: called on click or Enter with { id, label, group, value, degree, neighbors, datum }.
  // - animate={{ duration: 300, easing: "out", stagger: 30 }}: timed easing; on enter nodes pop in from the middle
  //   30 ms one after another. Other forms: true (spring, default), false (the layout is computed at once), "bounce"
  //   (an easing name), { enter: false } (no pop-in, but updates still move), or (ctx) => … to decide per node from
  //   { index, key, phase }. Reduced motion → the layout is computed at once.
  // - title / description: the SVG's accessible name and description; empty: text shown when there are no nodes.
  // - legend="bottom": team toggles; colors: one color per team; height: px; export: PNG and SVG download buttons.
  // Keyboard: Tab focuses the graph, the arrows go to the nearest node in that direction, Home / End jump to the
  // first / last node, Enter selects, Escape clears (a second Escape fits the view); + / - zoom, 0 resets.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-add, lab-empty, …) are hooks for NetworkGraphLab.test.tsx. */}
      <Button class="lab-add" size="sm" on:click={add}>Kişi ekle</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <NetworkGraph class="lab-net" nodes={() => ($empty ? [] : $nodes)} links={() => $links} id="key" label="ad" group="ekip" value="puan"
      source="from" target="to" weight="kat" layout="force" charge={-200} linkDistance={70} linkStrength={0.8} center={0.08} collide={6}
      nodeSize={[6, 18]} labels directed zoom draggable groupLabels={{ tasarim: "Tasarım", mobil: "Mobil", web: "Web" }} format="number"
      tooltip={(n: { label: string; degree: number }) => `${n.label}: ${n.degree} bağ`} onSelect={(n: { label: string }) => { $picked = n.label }}
      animate={{ duration: 300, easing: "out", stagger: 30 }} title="Ekip ağı" description="Kim kiminle çalışıyor" empty="Kimse yok"
      legend="bottom" colors={["#f2801f", "#2f6fed", "#1fa463"]} height={300} export={["png", "svg"]} />
    {/* Second graph: the same people on a dark theme (m:theme="night"), laid out on a circle, with everything
        interactive switched off (labels, zoom, dragging, legend, tooltip) and a fixed width: a static thumbnail.
        Without group / value every node has one color and its size follows its number of links. */}
    <Card m:theme="night">
      <NetworkGraph class="lab-ring" nodes={() => $nodes} links={() => $links} id="key" label="ad" source="from" target="to" layout="circle"
        labels={false} zoom={false} draggable={false} legend={false} tooltip={false} width={260} height={200} title="Çember" />
    </Card>
  </div>
}
