// CatFood: the creative-minimal Pricing example.
//
// What it shows: a cat-food subscription with two plans. A - / + pair changes the number of cats and the prices
// follow it, rolling to their new value. When to use this pattern: prices that depend on a quantity the visitor
// chooses (seats, pets, rooms) instead of a fixed price list.
//
// Animation: price changes use Pricing's `priceEffect` (roll by default, or count / none); it runs on the motion
// engine, so reduced motion, global speed and "Stop all" apply. Accessibility: the price is read once as its final
// value; the rolling digits are hidden from screen readers.

import { Pricing } from "march/landing"
import { Button } from "march/ui"

export function CatFood() {
  // Number of cats, 1 to 5. The two buttons below change it.
  let $cats = 1
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button variant="secondary" on:click={() => $cats = Math.max(1, $cats - 1)}>– Kedi</Button>
      <span sx={{ text: "xl" }}>{"🐱".repeat($cats)}</span>
      <Button variant="secondary" on:click={() => $cats = Math.min(5, $cats + 1)}>+ Kedi</Button>
    </div>
    {/* Pricing takes plain numbers, so it is drawn inside a function: when $cats changes the plans are rebuilt. */}
    {() => {
      // Read the signal here so this function re-runs when it changes.
      const cats = $cats
      // - currency="TRY": amounts are formatted with Intl for that currency and the locale.
      // - saving: the badge next to the monthly / yearly switch (it is bright while yearly is chosen).
      // - plans: price is a number or { monthly, yearly } (per month); `featured` lifts a plan, `badge` labels it.
      return <Pricing currency="TRY" saving="1 ay bedava" plans={[
      { name: "Kuru mama", price: { monthly: 250 * cats, yearly: 230 * cats }, features: [`${cats * 3} kg / ay`, "Kapıya teslim"] },
      { name: "Gurme", price: { monthly: 420 * cats, yearly: 380 * cats }, featured: true, badge: "Miyav!", features: [`${cats * 3} kg / ay`, "Haftada 2 yaş mama", "Oyuncak sürprizi"] },
    ]} />
    }}
  </div>
}
