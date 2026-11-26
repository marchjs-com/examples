// FruitVote: the creative-minimal BarChart example.
//
// A class's fruit poll: each button adds a vote to its fruit and the bar springs up to its new length. It shows the
// smallest live chart: data as a function over reactive state, plus `animate`. Use the pattern for any chart that
// reacts at once to something the user does.
import { BarChart } from "march/charts"
import { Button } from "march/ui"

// The fruits (the category labels, emoji included).
const FRUITS = ["🍎 Elma", "🍌 Muz", "🍓 Çilek", "🍉 Karpuz"]

export function FruitVote() {
  // The votes per fruit. vote(i) builds a new list with one more vote for fruit i; assigning a new list is what makes
  // the chart update.
  let $votes = [4, 2, 6, 3]
  const vote = (i: number) => { $votes = $votes.map((v, j) => (j === i ? v + 1 : v)) }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {FRUITS.map((f, i) => <Button size="sm" variant="secondary" on:click={() => vote(i)}>{f}</Button>)}
    </div>
    {/* data is a function, so the chart re-reads it when $votes changes; x and y name the keys of each row. series
        names the single series ("Oy"). animate (true) makes the bars glide to the new values with a spring; this
        follows reduced motion (the bars then jump) and the global speed / "Stop all" settings. legend={false}: one
        series needs no legend. title is the chart's accessible name; a hidden data table gives screen readers every
        value. */}
    <BarChart data={() => FRUITS.map((meyve, i) => ({ meyve, oy: $votes[i] }))} x="meyve" y="oy" series="Oy" animate legend={false} title="Meyve oylaması" height={220} />
  </div>
}
