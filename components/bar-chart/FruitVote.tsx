import { BarChart } from "march/charts"
import { Button } from "march/ui"

// FruitVote: a creative, minimal BarChart. A class votes for fruit; every button adds a vote and that bar springs up.
// The shape to copy for any live tally: keep counts in state, map them to rows, let the chart animate the change.
const FRUITS = ["🍎 Elma", "🍌 Muz", "🍓 Çilek", "🍉 Karpuz"]

export function FruitVote() {
  // One count per fruit; replacing the array (not mutating it) is what tells March the data changed.
  let $votes = [4, 2, 6, 3]
  const vote = (i: number) => { $votes = $votes.map((v, j) => (j === i ? v + 1 : v)) }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {FRUITS.map((f, i) => <Button size="sm" variant="secondary" on:click={() => vote(i)}>{f}</Button>)}
    </div>
    {/* labels shows the vote count on each bar; animate={{ stagger: 80 }} makes the bars grow in one by one on the
        first draw and spring to new counts afterwards (animate={false} would jump). One series: no legend needed. */}
    <BarChart data={() => FRUITS.map((meyve, i) => ({ meyve, oy: $votes[i] }))} x="meyve" y="oy" series="Oy" labels animate={{ stagger: 80 }} legend={false} title="Meyve oylaması" height={220} />
  </div>
}
