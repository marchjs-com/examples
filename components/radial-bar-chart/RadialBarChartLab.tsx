import { RadialBarChart } from "march/charts"
import { Button, Card } from "march/ui"

// RadialBarChartLab: every RadialBarChart prop in one place, the full-featured reference example.
// Props used: data (a signal), x, y, max, rowMax, startAngle, endAngle, innerRadius, gap, rounded, track, labels,
// center, format, xLabel, yLabel, tooltip, onSelect, animate, title, description, empty, legend, class, colors,
// width, height, export.
// Use it to look up a prop, to see how the props combine, and as the fixture RadialBarChartLab.test.tsx checks.
// The buttons advance the data and empty / refill it, so the sweep, enter and exit animations can be seen.

// Three monthly habits (reading, running, coding) with progress and a goal per habit. `k` is the day: each day adds
// progress at a different speed. The keys are Turkish on purpose (ad = name, sayfa = progress, hedef = goal) to show
// that x / y / rowMax can name any key; the progress key is called "sayfa" (pages) for every habit.
const make = (k: number) => [
  { ad: "Okuma", sayfa: 120 + k * 30, hedef: 300 },
  { ad: "Koşu", sayfa: 18 + k * 4, hedef: 40 },
  { ad: "Kodlama", sayfa: 9 + k, hedef: 20 },
]

export function RadialBarChartLab() {
  let $k = 0          // the current day, drives the data
  let $empty = false  // shows the `empty` text when true
  let $picked = "—"   // last selected ring, written by onSelect
  // Main chart, prop by prop:
  // - data={() => …}: a function reading signals, so the rings sweep when $k or $empty changes.
  // - x="ad" / y="sayfa": the ring label and the ring value; the first row is the outermost ring.
  // - rowMax="hedef": each ring's full sweep is its own goal (wins over `max`).
  // - startAngle={0} / endAngle={270}: three quarters of a circle (the defaults, written out for reference);
  //   the labels sit in the free quarter.
  // - innerRadius={0.3} / gap={0.25}: the hole in the middle and the space between rings, as shares.
  // - rounded / track / labels: round bar ends, the faint full ring behind each bar, ring labels (all default on).
  // - center: a function of the active ring's point; here its share of the goal as a percentage.
  // - format / xLabel / yLabel: value format and the data table headers ("Alışkanlık" = habit, "İlerleme" = progress).
  // - tooltip: custom content from the ring's label and value.
  // - onSelect: called on click or Enter / Space with { index, label, value, max, share, datum }.
  // - animate={{ duration: 600, easing: "out", stagger: 90 }}: timed easing, ring after ring (outside in) 90 ms apart.
  //   Other forms: true (spring, default), false (no motion), "bounce" (an easing name), { exit: false } (rings leave
  //   at once instead of unwinding), or (ctx) => … to decide per ring from { index, key, phase }.
  //   Reduced motion → rings take their sweeps at once.
  // - title / description: the SVG's accessible name and description; empty: text shown when data is [].
  // - legend="right": one toggle per ring (off by default); colors: one per ring; height: px; export: PNG and CSV.
  // Keyboard: Tab focuses the chart, the arrows (Home, End) move from ring to ring, Enter / Space selects, Escape
  // clears. The keyboard ring stays bright while the others dim, the middle and the tooltip show its value.
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* The class names (lab-next, lab-empty, …) are hooks for RadialBarChartLab.test.tsx. */}
      <Button class="lab-next" size="sm" on:click={() => { $k++ }}>Bir gün geçti</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
      <span class="lab-picked">Seçilen: {() => $picked}</span>
    </div>
    <RadialBarChart class="lab-rings" data={() => ($empty ? [] : make($k))} x="ad" y="sayfa" rowMax="hedef" startAngle={0} endAngle={270}
      innerRadius={0.3} gap={0.25} rounded track labels center={(p: { share: number }) => `%${Math.round(p.share * 100)}`}
      format={(v: number) => `${v}`} xLabel="Alışkanlık" yLabel="İlerleme" tooltip={(p: { label: string; value: number }) => `${p.label}: ${p.value}`}
      onSelect={(p: { label: string; share: number }) => { $picked = `${p.label} %${Math.round(p.share * 100)}` }}
      animate={{ duration: 600, easing: "out", stagger: 90 }} title="Kasım hedefleri" description="Üç alışkanlığın aylık ilerlemesi"
      empty="Hedef yok" legend="right" colors={["#f2801f", "#2f6fed", "#1fa463"]} height={260} export={["png", "csv"]} />
    {/* Second chart: the same data as a bare gauge on a dark theme (m:theme="night"): one shared max={300} instead of
        per-row goals (so the small habits become thin slivers, which shows why rowMax exists), a -135…135 degree arc,
        square ends, and no track, labels, center or legend; a fixed width and animate={false}: it updates instantly. */}
    <Card m:theme="night">
      <RadialBarChart class="lab-gauge" data={() => make($k)} x="ad" y="sayfa" max={300} startAngle={-135} endAngle={135} rounded={false}
        track={false} labels={false} center={false} legend={false} width={240} height={180} title="Gösterge" animate={false} />
    </Card>
  </div>
}
