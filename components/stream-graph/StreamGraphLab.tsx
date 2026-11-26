import { StreamGraph } from "march/charts"
import { Button } from "march/ui"

// StreamGraphLab: every StreamGraph prop in one place, as a reference: data (a signal), x, y, series, xType, xFormat,
// format, offset, edges, curve, grid, markers, marks, window, navigator, sync, zoom, xLabel, tooltip, onSelect,
// animate, export, title, description, empty, legend, class, colors, width, height.
// The class names (lab-…) are hooks for StreamGraphLab.test.tsx.

const GENRES = { pop: "Pop", rock: "Rock", rap: "Rap", caz: "Caz" }
const g = (i: number, base: number, amp: number, k: number) => Math.max(4, Math.round(base + amp * Math.sin((i + k) / 2)))
const make = (k: number, n = 12) => Array.from({ length: n }, (_, i) => ({ ay: i + 1, pop: g(i, 60, 25, k), rock: g(i, 40, 18, k + 2), rap: g(i, 30, 20, k + 5), caz: g(i, 18, 10, k + 7) }))

export function StreamGraphLab() {
  let $k = 1
  let $months = 12
  let $picked = "—"
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* New numbers: the layers swell and thin in place. One more month: the stream grows to the right. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Yeni yıl</Button>
      <Button class="lab-more" size="sm" variant="ghost" on:click={() => { $months++ }}>Bir ay daha</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    {/*
      - offset="silhouette" centres the stream; "wiggle" (default) keeps the layers as calm as possible; "expand" fills 0–100 %.
      - edges draws a thin edge between layers; curve="smooth" is the default look of a stream.
      - marks: a band over the summer months. window={12} keeps the last 12 months when "Bir ay daha" adds one;
        navigator shows the whole range under it.
      - animate: layers grow out of the centre one after another (stagger) and morph on changes; false turns it off.
      - Keyboard: Tab to the chart, ← → between months, Enter selects (onSelect); the legend toggles layers.
    */}
    <StreamGraph class="lab-stream" data={() => ($empty ? [] : make($k, $months))} x="ay" xType="linear" xFormat={(m: number) => `${m}. ay`} xLabel="Ay"
      y={Object.keys(GENRES)} series={GENRES} format={(v: number) => `${v} sa`} offset="silhouette" edges curve="smooth" grid="x" markers={false}
      marks={[{ x: [6, 8], label: "Yaz", color: "brand-orange" }]} window={12} navigator={44} sync="lab-stream" zoom
      animate={{ duration: 800, easing: "out", stagger: 100 }} export={["svg", "csv"]}
      colors={["#f2801f", "#2f6fed", "#1fa463", "#8e44ad"]} legend="bottom"
      tooltip={(p: { x: unknown; values: Record<string, number | null> }) => `${p.x}. ay: pop ${p.values.pop} sa`}
      onSelect={(p: { x: unknown }) => { $picked = `${p.x}. ay` }}
      title="Türlere göre dinleme" description="Ay ay müzik türlerine göre dinleme saatleri" empty="Dinleme yok" height={280} />
    {/* A second, narrow stream with the same sync name: hovering either chart shows the same month in both. */}
    <StreamGraph class="lab-mini" data={() => make($k + 3)} x="ay" y={["pop", "rock"]} offset="expand" legend={false} sync="lab-stream"
      width={360} height={120} animate={false} title="Pay (%100)" />
  </div>
}
