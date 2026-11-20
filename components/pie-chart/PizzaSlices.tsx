import { PieChart } from "march/charts"
import { Button } from "march/ui"

// pizza paylaşımı: her "dilim al" düğmesi o kişinin payını büyütür, ortada kalan dilim sayısı yazar
const PEOPLE = ["Ece", "Can", "Deniz"]

export function PizzaSlices() {
  let $eaten = [1, 1, 1]
  const left = () => 8 - $eaten.reduce((a, b) => a + b, 0)
  const take = (i: number) => { if (left() > 0) $eaten = $eaten.map((v, j) => (j === i ? v + 1 : v)) }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {PEOPLE.map((p, i) => <Button size="sm" on:click={() => take(i)} disabled={() => left() === 0}>{p} dilim al 🍕</Button>)}
    </div>
    <PieChart data={() => [...PEOPLE.map((label, i) => ({ label, value: $eaten[i] })), { label: "Kalan", value: left() }]}
      donut center={left() ? `${left()} dilim kaldı` : "Bitti!"} animate legend="right" title="Pizza" height={220} />
  </div>
}
