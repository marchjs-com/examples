// CoffeeMeter: the creative-minimal StatsBand example.
//
// What it shows: a coffee meter. Every press on the button adds a cup; the three figures (cups, caffeine, focus) count
// up to their new values by themselves, and the note under "odak" changes once you have had more than five cups.
// When to use this pattern: big numbers that change over time. Give an item's `value` (and `note`) as a function and
// the band follows the state; a new value is counted to rather than jumped to.
//
// Animation: the counting runs on March's motion engine (Counter), so the global speed, "Stop all" and the visitor's
// reduced-motion preference apply. Pass `mode="none"` to write the numbers without counting, or `mode="roll"` for an
// odometer style (see StatsBandLab).
// Accessibility: the band is a description list: each label is a <dt> and the number its <dd>, read as its final value.
import { StatsBand } from "march/landing"
import { Button } from "march/ui"

export function CoffeeMeter() {
  // Reactive state: the number of cups drunk.
  let $cups = 1
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button on:click={() => $cups++}>Bir kahve daha ☕</Button>
    {/* variant="cards" draws each figure on its own card (the others are "plain" and "divided"). Every `value` is a
        function of $cups, so the figure is counted to a new value on each press. `suffix` is text after the number;
        `note` is a small line under the label and may be a function too. */}
    <StatsBand variant="cards" items={[
      { value: () => $cups, label: "fincan", suffix: " ☕" },
      { value: () => $cups * 80, label: "mg kafein" },
      { value: () => Math.min(100, $cups * 15), label: "odak", suffix: "%", note: () => ($cups > 5 ? "biraz su iç" : "iyi gidiyor") },
    ]} />
  </div>
}
