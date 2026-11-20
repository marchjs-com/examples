import { StatsBand } from "march/landing"
import { Button } from "march/ui"

// kahve ölçer: her fincanda rakamlar yeni değere sayarak gider (değerler birer işlev, kendileri güncellenir)
export function CoffeeMeter() {
  let $cups = 1
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button on:click={() => $cups++}>Bir kahve daha ☕</Button>
    <StatsBand variant="cards" items={[
      { value: () => $cups, label: "fincan", suffix: " ☕" },
      { value: () => $cups * 80, label: "mg kafein" },
      { value: () => Math.min(100, $cups * 15), label: "odak", suffix: "%", note: () => ($cups > 5 ? "biraz su iç" : "iyi gidiyor") },
    ]} />
  </div>
}
