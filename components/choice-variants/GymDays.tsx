// GymDays: the creative-minimal example of the choice-control looks.
//
// What it shows: a weekday picker for gym days: a CheckboxGroup in the chip look with brand colours, and a line below
// that counts the chosen days.
// When to use this pattern: picking several items from a short fixed list (days, tags, sizes). variant="chip" makes
// compact pills, colors="brand" gives each its own colour, inline puts them in a row.
// Accessibility: every chip is a real checkbox (Tab, then Space) and aria-label names the group for screen readers.
import { CheckboxGroup } from "march/ui"

// Option objects: `value` is stored in the array, `label` is the short day name that is shown.
const DAYS = [{ value: "mon", label: "Pzt" }, { value: "tue", label: "Sal" }, { value: "wed", label: "Çar" }, { value: "thu", label: "Per" }, { value: "fri", label: "Cum" }, { value: "sat", label: "Cmt" }, { value: "sun", label: "Paz" }]

export function GymDays() {
  // Monday and Thursday are chosen at the start; bind:value keeps this array and the chips in sync.
  let $days = ["mon", "thu"]
  return <div sx={{ flex: "col", gap: 2 }}>
    <CheckboxGroup bind:value={$days} options={DAYS} variant="chip" colors="brand" inline aria-label="Spor günleri" />
    <span sx={{ text: "sm", color: "muted" }}>{$days.length ? `Haftada ${$days.length} gün 💪` : "Bu hafta dinlenme 😴"}</span>
  </div>
}
