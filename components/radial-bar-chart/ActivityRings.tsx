import { RadialBarChart } from "march/charts"
import { Button } from "march/ui"

// The day's rings: a playful, minimal RadialBarChart in the style of fitness activity rings.
// Three rings (move, water, stand), each measured against its own daily goal. Every button pushes its own
// ring a bit further, and the ring sweeps to its new length with a wobbly spring. The middle shows the label and
// percentage of the ring under the pointer or keyboard focus (the outermost ring otherwise).
// Use concentric rings for a few progress-towards-a-goal values that have different units (calories, glasses,
// hours): each ring is a share of its own goal, so they can sit side by side.

export function ActivityRings() {
  let $move = 320   // move calories so far (goal 600)
  let $water = 3    // glasses of water (goal 8)
  let $stand = 6    // hours stood (goal 12)
  // RadialBarChart props:
  // - data={() => […]}: rows built from the three signals, so any button click updates the chart. `label` and `value`
  //   are the default keys, so no x / y props are needed. The first row is the outermost ring.
  // - rowMax="goal": every ring's full sweep is its own row's goal, not one shared max.
  // - The rings sweep three quarters (0 to 270 degrees, the default), so the free quarter holds each ring's label at
  //   its start. endAngle={360} would draw full circles; then labels={false} keeps the labels off the bars.
  // - innerRadius={0.35} / gap={0.18}: the hole in the middle and the space between rings, as shares.
  // - legend="bottom": the ring names again under the chart; its items toggle a ring on and off.
  // - colors: one color per ring, outermost first.
  // - center: a function of the active ring's point; here its label and its share of the goal as a percentage.
  // - animate="spring-wobbly": the sweep overshoots a little and settles, a reward-like feel. animate="out" glides
  //   calmly, animate={false} jumps; reduced motion is honoured automatically.
  // Keyboard: Tab focuses the chart, the arrows (Home, End) move from ring to ring, Enter / Space selects, Escape
  // clears. The keyboard ring stays bright while the others dim, and the middle shows its value.
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* One button per ring: each only writes its own signal, and only that ring animates. */}
      <Button size="sm" on:click={() => { $move += 60 }}>Yürü 🚶</Button>
      <Button size="sm" on:click={() => { $water += 1 }}>Su iç 💧</Button>
      <Button size="sm" on:click={() => { $stand += 1 }}>Ayağa kalk 🧍</Button>
    </div>
    <RadialBarChart data={() => [{ label: "Hareket", value: $move, goal: 600 }, { label: "Su", value: $water, goal: 8 }, { label: "Ayakta", value: $stand, goal: 12 }]}
      rowMax="goal" innerRadius={0.35} gap={0.18} legend="bottom" colors={["#fa114f", "#2f6fed", "#1fd1a5"]}
      center={(p: { share: number; label: string }) => `${p.label} %${Math.round(p.share * 100)}`} animate="spring-wobbly" title="Günün halkaları" height={260} />
  </div>
}
