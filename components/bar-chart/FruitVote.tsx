import { BarChart } from "march/charts"
import { Button } from "march/ui"

// sınıfın meyve oylaması: her düğme kendi meyvesine bir oy ekler, çubuk yaylanarak uzar
const FRUITS = ["🍎 Elma", "🍌 Muz", "🍓 Çilek", "🍉 Karpuz"]

export function FruitVote() {
  let $votes = [4, 2, 6, 3]
  const vote = (i: number) => { $votes = $votes.map((v, j) => (j === i ? v + 1 : v)) }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {FRUITS.map((f, i) => <Button size="sm" variant="secondary" on:click={() => vote(i)}>{f}</Button>)}
    </div>
    <BarChart data={() => FRUITS.map((meyve, i) => ({ meyve, oy: $votes[i] }))} x="meyve" y="oy" series="Oy" animate legend={false} title="Meyve oylaması" height={220} />
  </div>
}
