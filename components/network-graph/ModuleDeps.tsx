import { NetworkGraph } from "march/charts"
import { Card, Segmented } from "march/ui"

// Module dependencies of an app: a real-life NetworkGraph.
// Arrows show "who imports whom", node size is the file size and color is the architecture layer (UI, core, data).
// The Segmented control switches the layout (force, circle, grid) and the nodes glide between them; clicking a module
// lists its neighbours under the chart; the legend hides or shows a whole layer.
// Use a graph like this to spot hubs (a file everything depends on) and unexpected links between layers.

// One node per file: `id` and `label` are NetworkGraph's default keys; `layer` and `kb` are read via group / value.
const nodes = [
  { id: "app", label: "app.tsx", layer: "ui", kb: 12 }, { id: "router", label: "router.ts", layer: "core", kb: 8 },
  { id: "store", label: "store.ts", layer: "core", kb: 6 }, { id: "api", label: "api.ts", layer: "data", kb: 9 },
  { id: "auth", label: "auth.ts", layer: "data", kb: 5 }, { id: "home", label: "home.tsx", layer: "ui", kb: 7 },
  { id: "profile", label: "profile.tsx", layer: "ui", kb: 10 }, { id: "chart", label: "chart.tsx", layer: "ui", kb: 14 },
  { id: "cache", label: "cache.ts", layer: "data", kb: 3 }, { id: "i18n", label: "i18n.ts", layer: "core", kb: 4 },
]
// Imports as [importer, imported] pairs, turned into { source, target } rows (the default link keys).
// Replace both lists with the output of your bundler's module graph.
const links = [["app", "router"], ["app", "store"], ["app", "i18n"], ["router", "home"], ["router", "profile"], ["home", "chart"], ["home", "api"],
  ["profile", "api"], ["profile", "auth"], ["api", "cache"], ["auth", "store"], ["chart", "store"], ["api", "auth"]].map(([source, target]) => ({ source, target }))

export function ModuleDeps() {
  let $layout = "force"              // "force", "circle" or "grid", bound to the Segmented control
  let $picked = "Bir modüle tıkla"   // the text under the chart, rewritten by onSelect
  // The Segmented control sits in the Card's `actions` slot; `aria-label` names it for screen readers.
  //
  // NetworkGraph props:
  // - nodes / links: plain arrays here, the graph itself never changes, only how it is laid out.
  // - group="layer": color per layer, plus legend toggles; groupLabels gives the layers readable names.
  // - value="kb": node size follows the file size (without it, size would follow the number of links).
  // - layout={() => $layout}: a function, so switching the control re-lays the graph and the nodes glide over.
  // - directed: an arrow at the target end of each link, which matters for imports (A imports B is not B imports A).
  // - charge={-220} / linkDistance={70}: stronger repulsion and longer links than the defaults (-160, 60 px), so ten
  //   labelled nodes have room to breathe.
  // - format: how the value appears in the tooltip and data table ("12 KB").
  // - onSelect: called on click or Enter with { label, neighbors, … }; here it writes "file → its neighbours".
  // - No animate prop: the default spring is used. animate="out" would give a calmer glide, animate={false} computes
  //   the layout at once; reduced motion is honoured automatically.
  // Keyboard: Tab focuses the graph, the arrows go to the nearest node in that direction, Home / End jump to the
  // first / last node, Enter selects, Escape clears (a second Escape fits the view); + / - zoom, 0 resets.
  return <Card title="Modül bağımlılıkları" actions={[<Segmented size="sm" bind:value={$layout} aria-label="Yerleşim"
    options={[{ value: "force", label: "Kuvvet" }, { value: "circle", label: "Çember" }, { value: "grid", label: "Izgara" }]} />]}>
    <NetworkGraph nodes={nodes} links={links} group="layer" value="kb" layout={() => $layout as "force"} directed charge={-220} linkDistance={70}
      groupLabels={{ ui: "Arayüz", core: "Çekirdek", data: "Veri" }} format={(v: number) => `${v} KB`}
      onSelect={(n: { label: string; neighbors: string[] }) => { $picked = `${n.label} → ${n.neighbors.join(", ")}` }} title="Modül grafiği" height={320} />
    {/* The selection read-out: a function child, so it re-renders whenever onSelect writes $picked. */}
    <p sx={{ text: "sm", color: "muted" }}>{() => $picked}</p>
  </Card>
}
