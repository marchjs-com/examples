import { BoxPlot } from "march/charts"
import { Button } from "march/ui"

// How many hours a day do pets sleep? A playful, minimal BoxPlot in violin mode.
// Shows each pet's nap distribution as a violin (a smooth density silhouette) with every single day as a dot.
// "Bir hafta daha" adds another week of data, and the violins reshape with a wobbly spring.
// Use violins instead of boxes when the shape of the distribution matters (two humps, a long tail), and showPoints
// when there are few enough values that each one is worth seeing.

// One week of naps per pet (hours). The emoji in the label is part of the category name, so it shows on the axis,
// in the tooltip and in the data table without any extra code.
const NAPS: Record<string, number[]> = {
  "🐱 Kedi": [13, 14, 15, 12.5, 16, 14.5, 13.5],
  "🐶 Köpek": [11, 12, 10.5, 13, 12.5, 11.5, 14],
  "🐹 Hamster": [12, 13.5, 14, 13, 12, 15, 14.5],
  "🐰 Tavşan": [8, 9, 8.5, 10, 7.5, 9.5, 8],
}

export function PetNaps() {
  // Number of weeks shown (1–6); the button cycles it.
  let $weeks = 1
  // Rows in the "one row per category with a list" shape: { label, value: [..] }. These are BoxPlot's default keys,
  // so no x / y props are needed. Each extra week repeats the base week with a small deterministic wiggle, so the
  // violins change shape a little instead of only getting taller.
  const data = () => Object.entries(NAPS).map(([label, h]) => ({ label, value: Array.from({ length: 7 * $weeks }, (_, i) => (h[i % 7] as number) + ((i * 37) % 7) / 4 - 0.75) }))
  // BoxPlot props:
  // - mode="violin": a kernel density silhouette per pet instead of a box ("both" would keep a slim box inside).
  // - showPoints + jitter={0.9}: every day as a dot, spread over 90 % of the band width so dots overlap less.
  //   The jitter is deterministic, so dots do not jump around on every render.
  // - format: hours with one decimal ("sa" = hours), used by the axis, tooltip and data table alike.
  // - animate={{ easing: "spring-wobbly", stagger: 80 }}: a bouncy spring that fits the playful theme; stagger starts
  //   each pet 80 ms after the previous one so the change ripples across the chart. Use animate={false} to switch
  //   motion off; reduced motion is honoured automatically.
  // Accessibility: title names the SVG, a visually hidden table lists the numbers per pet, and Tab + ← → walk the pets.
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* Cycles 1 → 6 weeks, then back to 1, so the demo never runs out of clicks. */}
      <Button size="sm" on:click={() => { $weeks = $weeks < 6 ? $weeks + 1 : 1 }}>Bir hafta daha 💤</Button>
    </div>
    <BoxPlot data={data} mode="violin" showPoints jitter={0.9} format={(v: number) => `${v.toFixed(1)} sa`}
      animate={{ easing: "spring-wobbly", stagger: 80 }} yTitle="Günlük uyku" title="Kim ne kadar uyur?" height={260} />
  </div>
}
