import { PieChart } from "march/charts"
import { Button } from "march/ui"

// PizzaSlices: a creative, minimal PieChart. Three friends share a pizza; every "dilim al" button grows that
// person's share and shrinks "Kalan" (what is left), and the donut's centre counts the slices left.
// The slices turn to their new angles because charts animate by default.
const PEOPLE = ["Ece", "Can", "Deniz"]

export function PizzaSlices() {
  // Slices eaten per person; `left()` is derived from it, so the buttons, the data and the centre text stay in sync.
  let $eaten = [1, 1, 1]
  const left = () => 8 - $eaten.reduce((a, b) => a + b, 0)
  const take = (i: number) => { if (left() > 0) $eaten = $eaten.map((v, j) => (j === i ? v + 1 : v)) }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {PEOPLE.map((p, i) => <Button size="sm" on:click={() => take(i)} disabled={() => left() === 0}>{p} dilim al 🍕</Button>)}
    </div>
    {/* labels="value" writes each person's slice count on the pie; `animate` is on by default (here written out). */}
    <PieChart labels="value" data={() => [...PEOPLE.map((label, i) => ({ label, value: $eaten[i] })), { label: "Kalan", value: left() }]}
      donut center={left() ? `${left()} dilim kaldı` : "Bitti!"} animate legend="right" title="Pizza" height={220} />
  </div>
}
