import { FunnelChart } from "march/charts"
import { Button, Card } from "march/ui"

// FunnelChartLab: every FunnelChart prop in one place, the full-featured reference example.
// Props used: data (a signal), x, y, shape, orientation, gap, names, showValue, showShare, showConversion, dropoff,
// label, format, shareFormat, conversionFormat, color, xLabel, yLabel, tooltip, onSelect, animate, title, description,
// empty, legend, class, colors, width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture FunnelChartLab.test.tsx checks.
// The buttons start a campaign (more visitors), cycle the shape and empty / refill the data, so every change
// animation, including the morph between shapes, can be seen.

// A shop's funnel: storefront → cart → payment → thank-you page. `k` is the number of campaigns: each one brings more
// visitors to the first two stages, so the top of the funnel widens while the bottom stays put. The keys are Turkish on
// purpose (ad = name, kişi = people) to show that x / y can name any key.
const make = (k: number) => [{ ad: "Vitrin", kişi: 900 + k * 100 }, { ad: "Sepet", kişi: 420 + k * 30 }, { ad: "Ödeme", kişi: 210 }, { ad: "Teşekkürler", kişi: 160 }]
// The three shapes the "Biçim değiştir" button cycles through.
const SHAPES = ["funnel", "bars", "pyramid"] as const

export function FunnelChartLab() {
  let $k = 1          // campaigns so far, drives the data
  let $shape = 0      // index into SHAPES
  let $picked = "—"   // last selected stage, written by onSelect
  let $empty = false  // shows the `empty` text when true
  // Main chart, prop by prop:
  // - data={() => …}: a function reading signals, so the chart redraws (and animates) when $k or $empty changes.
  // - x="ad" y="kişi": the stage name and stage value keys; rows are in flow order, one per stage.
  // - shape: "funnel" (smooth trapezoids), "bars" (centred bars with a ghost of the previous stage) or "pyramid";
  //   switching it morphs one shape into the next.
  // - orientation="vertical": top to bottom (the default); the second chart below runs left to right.
  // - gap={8}: px between stages (default 6).
  // - names / showValue / showShare / showConversion / dropoff: stage names, the value and the share of the first
  //   stage inside each stage, and the step conversion and lost count between stages (all on by default).
  // - format / shareFormat / conversionFormat: number, whole percent, percent with one decimal.
  // - label: a function that replaces the text inside each stage ("kişi" = people, % share).
  // - xLabel / yLabel: headers of the hidden data table.
  // - legend="bottom": one toggle per stage; hiding a stage collapses it and the rest close the gap.
  // - colors: one color per stage (`color` would instead give every stage one hue, fading stage by stage).
  // - tooltip: a function returning custom content; onSelect: called on click or Enter with { label, value, share,
  //   conversion, dropoff, datum }; the Lab shows "name (value)" in `.lab-picked`.
  // - animate={{ easing: "spring-wobbly", stagger: 70 }}: stages pour in one after another, 70 ms apart, with a
  //   bouncy spring. Other forms: true (spring, default), false (no motion), "out" (an easing name), { stagger: 0 }
  //   (all at once), { enter: false } (no pour-in, but updates still morph), or (ctx) => … deciding per stage from
  //   { index, key, phase }. Reduced motion is honoured automatically.
  // - title / description: the SVG's accessible name and description; empty: text shown when data is [].
  // - height: px; export: a toolbar to download PNG and CSV.
  // Keyboard: Tab focuses the chart, ↑ ↓ (or ← →) move between stages, Enter / Space selects, Escape clears; the
  // tooltip follows the keyboard stage.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-shape, lab-empty, lab-picked, …) are hooks for FunnelChartLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Kampanya başlat</Button>
      <Button class="lab-shape" size="sm" variant="secondary" on:click={() => { $shape = ($shape + 1) % 3 }}>Biçim değiştir</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <FunnelChart class="lab-funnel" data={() => ($empty ? [] : make($k))} x="ad" y="kişi" shape={SHAPES[$shape]} orientation="vertical" gap={8}
      names showValue showShare showConversion dropoff format="number" shareFormat={["percent", 0]} conversionFormat={["percent", 1]}
      label={(p: { value: number; share: number }) => `${p.value} kişi · %${Math.round(p.share * 100)}`}
      xLabel="Aşama" yLabel="Kişi" legend="bottom" colors={["#f2801f", "#2f6fed", "#1fa463", "#8e44ad"]}
      tooltip={(p: { label: string; value: number }) => `${p.label}: ${p.value}`}
      onSelect={(p: { label: string; value: number }) => { $picked = `${p.label} (${p.value})` }}
      animate={{ easing: "spring-wobbly", stagger: 70 }} title="Mağaza hunisi" description="Vitrinden teşekkür sayfasına" empty="Ziyaretçi yok"
      height={260} export={["png", "csv"]} />
    {/* Second chart: the same data as a plain horizontal funnel on a dark theme (m:theme="night"). color="brand-blue"
        gives every stage one hue fading stage by stage; names, share, conversion and drop-off are switched off, so
        only the shapes and their values remain. animate={false} draws it in place, a direct comparison with the
        animated chart above; width / height fix the size. */}
    <Card m:theme="night">
      <FunnelChart class="lab-plain" data={() => make($k)} x="ad" y="kişi" orientation="horizontal" color="brand-blue" names={false}
        showShare={false} showConversion={false} dropoff={false} animate={false} width={420} height={140} title="Sade huni" />
    </Card>
  </div>
}
