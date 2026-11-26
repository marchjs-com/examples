// PizzaSlices: the creative-minimal PieChart example.
//
// Sharing a pizza: each "take a slice" button grows that person's share, and the middle of the donut says how many slices
// are left. Use this pattern for a small live chart where the data is a function of your state, and the donut hole
// carries the one number that matters.
import { PieChart } from "march/charts"
import { Button } from "march/ui"

const PEOPLE = ["Ece", "Can", "Deniz"]

export function PizzaSlices() {
  // The slices each person has eaten, and helpers: `left` counts what remains of the 8 slices, `take` gives a person one
  // more slice while there are any left.
  let $eaten = [1, 1, 1]
  const left = () => 8 - $eaten.reduce((a, b) => a + b, 0)
  const take = (i: number) => { if (left() > 0) $eaten = $eaten.map((v, j) => (j === i ? v + 1 : v)) }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* `disabled` is a function, so every button turns itself off when no slice is left. */}
      {PEOPLE.map((p, i) => <Button size="sm" on:click={() => take(i)} disabled={() => left() === 0}>{p} dilim al 🍕</Button>)}
    </div>
    {/* - data as a function: the rows are rebuilt from the state, so the chart follows it. The row keys are the defaults
          ("label" and "value"), so x and y are not needed. The last row, "Kalan" (left), is the unclaimed part.
        - donut: a ring; center: the text in its hole (it replaces the default total).
        - animate: slices turn to their new angles on a change (they take their new angles in place under reduced motion).
        - legend="right": the legend beside the chart; its items are toggle buttons. title: the accessible name of the SVG.
          A visually hidden data table lists every slice for screen readers. height: the size in pixels. */}
    <PieChart data={() => [...PEOPLE.map((label, i) => ({ label, value: $eaten[i] })), { label: "Kalan", value: left() }]}
      donut center={left() ? `${left()} dilim kaldı` : "Bitti!"} animate legend="right" title="Pizza" height={220} />
  </div>
}
