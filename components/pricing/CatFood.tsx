import { Pricing } from "march/landing"
import { Button } from "march/ui"

// kedi maması aboneliği: kedi sayısı arttıkça fiyatlar sayaç gibi döner
export function CatFood() {
  let $cats = 1
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button variant="secondary" on:click={() => $cats = Math.max(1, $cats - 1)}>– Kedi</Button>
      <span sx={{ text: "xl" }}>{"🐱".repeat($cats)}</span>
      <Button variant="secondary" on:click={() => $cats = Math.min(5, $cats + 1)}>+ Kedi</Button>
    </div>
    {() => {
      const cats = $cats
      return <Pricing currency="TRY" saving="1 ay bedava" plans={[
      { name: "Kuru mama", price: { monthly: 250 * cats, yearly: 230 * cats }, features: [`${cats * 3} kg / ay`, "Kapıya teslim"] },
      { name: "Gurme", price: { monthly: 420 * cats, yearly: 380 * cats }, featured: true, badge: "Miyav!", features: [`${cats * 3} kg / ay`, "Haftada 2 yaş mama", "Oyuncak sürprizi"] },
    ]} />
    }}
  </div>
}
