import { Counter } from "march/landing"
import { Button } from "march/ui"

// adım sayar: her basışta bin adım; sayı yeni değere kayarak gider, 10 binde kupa çıkar
export function StepCounter() {
  let $steps = 2000
  return <div sx={{ flex: ["row", "center"], gap: 3 }}>
    <span sx={{ text: "2xl" }}>{$steps >= 10000 ? "🏆" : "🚶"}</span>
    <Counter value={() => $steps} suffix=" adım" easing="spring" class="steps" />
    <Button on:click={() => $steps = $steps >= 10000 ? 0 : $steps + 1000}>{$steps >= 10000 ? "Yeni gün" : "+1000 adım"}</Button>
  </div>
}
