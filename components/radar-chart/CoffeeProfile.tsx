import { RadarChart } from "march/charts"
import { Segmented } from "march/ui"

// Coffee taste profile: a playful, minimal RadarChart.
// Pick a bean (Ethiopia, Colombia, Sumatra) and its five-taste shape (acidity, body, sweetness, bitterness, aroma)
// morphs into the new one with a wobbly spring.
// Use a radar chart when one thing is scored on several qualities of the same scale (here 0–10) and the overall
// "shape" says more than any single number: a pointy shape means a strong character, a round one a balanced cup.

// Taste scores per bean, in the same order as TASTES below.
const BEANS: Record<string, number[]> = {
  etiyopya: [9, 4, 7, 3, 9],
  kolombiya: [6, 6, 8, 4, 7],
  sumatra: [3, 9, 5, 7, 6],
}
// The spoke names (acidity, body, sweetness, bitterness, aroma), shown around the rim.
const TASTES = ["Asidite", "Gövde", "Tatlılık", "Acılık", "Aroma"]

export function CoffeeProfile() {
  // The selected bean, bound to the Segmented control.
  let $bean = "etiyopya"
  // RadarChart props:
  // - data={() => …}: builds one row per taste as { label, value }, RadarChart's default keys, so no x / y props are
  //   needed. Reading $bean inside the function makes the chart update when the bean changes.
  // - max={10}: the rim is 10 for every bean; without it the rim would be each bean's own highest score and the
  //   shapes would not be comparable.
  // - curve="smooth" + gridShape="circle": a closed curve on circular rings, a softer look that suits a taste profile
  //   (the defaults are straight lines on polygons).
  // - fill={0.4}: a stronger fill than the default 0.22, since there is only one shape to see through.
  // - levels={5}: five rings, one per 2 points.
  // - animate="spring-wobbly": an easing name; the radii morph to the new bean with a bouncy spring.
  //   animate="out" would glide without overshoot, animate={false} jumps; reduced motion is honoured automatically.
  // Keyboard: Tab focuses the chart, ← → (↑ ↓, Home, End) move from taste to taste, Enter / Space selects, Escape
  // clears; the tooltip follows. A hidden table lists every value for screen readers.
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* `aria-label` names the bean picker for screen readers ("Çekirdek" = bean). */}
    <Segmented size="sm" bind:value={$bean} aria-label="Çekirdek" options={[{ value: "etiyopya", label: "Etiyopya" }, { value: "kolombiya", label: "Kolombiya" }, { value: "sumatra", label: "Sumatra" }]} />
    <RadarChart data={() => TASTES.map((label, i) => ({ label, value: BEANS[$bean]![i] }))} max={10} curve="smooth" gridShape="circle"
      fill={0.4} levels={5} animate="spring-wobbly" title="Tat profili" height={260} />
  </div>
}
