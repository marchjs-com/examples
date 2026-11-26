import { SankeyChart } from "march/charts"
import { Button } from "march/ui"

// A coffee bar, from bean to cup: a playful, minimal SankeyChart.
// Beans flow into brewing methods, brewing methods into drinks (milk joins the latte); each ribbon is as wide as the
// cups it carries.
// "Sabah telaşı" (morning rush) raises the orders: ribbons thicken, and from the third press a cold brew branch with
// iced coffee appears. The fourth press goes back to a quiet morning, so the new branch also leaves again.
// Use a Sankey diagram when quantities split and merge across stages, and you want to see where most of it goes.

// The flows for a rush level 0–3. Rows use SankeyChart's default keys (source, target, value), so no source / target
// / value props are needed, and the nodes come from the names in the links. Above level 1 two extra links add the
// cold brew branch: new nodes slide in and new ribbons draw from source to target.
// The filter link is listed first on purpose: node order starts as the input order, which would put Filtre above
// Espresso and cross the bean ribbons. The layout's relaxation passes (`iterations`, default 6) pull every node towards
// its neighbours and untangle that; iterations={0} keeps the input order, crossings and all.
// Milk (Süt) only feeds the latte, so it is a source one step shorter than the beans: with the default align
// "justify" it starts at the left edge, align="right" moves it next to the brewing methods.
const base = (rush: number) => [
  { source: "Filtre", target: "☕ Filtre kahve", value: 18 },
  { source: "Etiyopya", target: "Espresso", value: 30 + rush * 10 }, { source: "Kolombiya", target: "Espresso", value: 20 + rush * 6 },
  { source: "Kolombiya", target: "Filtre", value: 18 }, { source: "Espresso", target: "☕ Latte", value: 22 + rush * 8 },
  { source: "Espresso", target: "☕ Americano", value: 16 + rush * 4 }, { source: "Espresso", target: "☕ Kortado", value: 12 + rush * 4 },
  { source: "Süt 🥛", target: "☕ Latte", value: 10 + rush * 4 },
  ...(rush > 1 ? [{ source: "Etiyopya", target: "Soğuk demleme", value: 14 }, { source: "Soğuk demleme", target: "🧊 Buzlu kahve", value: 14 }] : []),
]

export function CoffeeBar() {
  // The rush level, cycling 0 → 1 → 2 → 3 → 0.
  let $rush = 0
  // SankeyChart props:
  // - links={() => base($rush)}: a function reading the signal, so each press re-reads the flows and animates.
  // - format: values as "N fincan" (cups) in tooltip, value labels and the hidden table.
  // - nodeWidth={10} / nodePadding={18}: slimmer nodes and more space between them than the defaults (14 / 14), so
  //   the drink names with emoji have room.
  // - animate={{ easing: "spring-wobbly", stagger: 50 }}: a bouncy spring, ribbon after ribbon 50 ms apart in column
  //   order, so a change ripples from beans to cups. Leaving ribbons thin out and leaving nodes collapse before they
  //   go. animate="out" is calmer, animate={false} jumps; reduced motion is honoured automatically.
  // Hover a node to light its whole flow upstream and downstream, or a ribbon to light that one link.
  // Keyboard: Tab focuses the chart, the arrows walk the nodes (column by column, top down) and then the links,
  // Enter / Space selects, Escape clears; the tooltip and the highlight follow.
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The button's text is a function child, so it shows the current rush level ("×2", "×3", …). */}
      <Button size="sm" on:click={() => { $rush = ($rush + 1) % 4 }}>{() => ($rush ? `Sabah telaşı ×${$rush + 1}` : "Sabah telaşı başlasın")}</Button>
    </div>
    <SankeyChart links={() => base($rush)} format={(n: number) => `${n} fincan`} nodeWidth={10} nodePadding={18}
      animate={{ easing: "spring-wobbly", stagger: 50 }} title="Çekirdekten fincana" height={280} />
  </div>
}
