import { Histogram } from "march/charts"
import { Button } from "march/ui"

// Roll two dice: a playful, minimal Histogram that grows with every throw.
// Shows how often each sum (2–12) comes up, with a fitted normal (bell) curve on top. After a few hundred rolls the
// bell makes it obvious why 7 is the most common sum: it has the most dice combinations (1+6, 2+5, 3+4, …).
// Use a histogram like this when you collect raw values one by one and want to see their shape build up live; the
// chart does the counting (binning) itself, you only hand it the list of values.

// A tiny deterministic random generator (Park–Miller), so the same sequence of rolls appears on every load. Swap it for
// Math.random() if you want real chance. `seed` lives at module level, so it keeps going while the page stays open.
let seed = 7
const die = () => { seed = (seed * 16807) % 2147483647; return 1 + (seed % 6) }

export function DiceRolls() {
  // Every roll's sum, as plain numbers. A Histogram reads plain numbers directly, so no `value` prop is needed.
  let $rolls: number[] = []
  // Adds n new sums. A new array is assigned (not pushed into), which is what makes the signal notify the chart.
  const roll = (n: number) => { $rolls = [...$rolls, ...Array.from({ length: n }, () => die() + die())] }
  // Histogram props:
  // - data={() => $rolls}: a function reading the signal, so the chart re-bins and animates after every click.
  // - binWidth={1} + domain={[2, 13]}: exactly one bar per possible sum, 2 to 12 (the domain's end is the last bin's
  //   right edge). Without them the chart would pick "nice" bins itself, which could merge two sums into one bar.
  // - curve="normal": a fitted normal curve over the bars ("kde" would follow the data more closely instead).
  // - gap={3}: 3 px between bars (default 1 px), so each sum reads as its own block.
  // - tooltip: custom text per bar from the bin's lower edge (x0) and its count.
  // - empty: shown before the first roll, telling the user what to do instead of drawing an empty axis.
  // - animate={{ easing: "spring-wobbly" }}: bars grow with a bouncy spring that suits a game. Bars are keyed by their
  //   bin, so on each roll the existing bars stretch to their new heights. animate={false} turns motion off,
  //   animate="out" gives a calm glide; reduced motion is honoured automatically.
  // Keyboard: Tab focuses the plot, ← → move between sums, Home / End jump to the ends, Enter selects, Escape clears.
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* Two batch sizes: 10 rolls to watch the bars move, 100 rolls to see the bell shape appear quickly. */}
      <Button size="sm" on:click={() => roll(10)}>10 kez at 🎲</Button>
      <Button size="sm" on:click={() => roll(100)}>100 kez at</Button>
      <Button size="sm" variant="ghost" on:click={() => { $rolls = [] }}>Sıfırla</Button>
      {/* A live roll counter: the function child re-renders whenever $rolls changes. */}
      <span sx={{ text: "sm", color: "muted" }}>{() => `${$rolls.length} atış`}</span>
    </div>
    <Histogram data={() => $rolls} binWidth={1} domain={[2, 13]} curve="normal" gap={3}
      tooltip={(p: { x0: number; count: number }) => `Toplam ${p.x0}: ${p.count} kez`}
      empty="Zarları atmak için bir düğmeye bas" animate={{ easing: "spring-wobbly" }} title="İki zarın toplamı" height={220} />
  </div>
}
