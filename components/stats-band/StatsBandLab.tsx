// StatsBandLab: the full-featured StatsBand example.
//
// What it shows: every StatsBand option: the figures (value, label, note, format, decimals, prefix, suffix), the look
// (variant), the counter style (mode), duration, easing, the entrance (reveal) and class. Two Segmented controls change
// the variant and the mode live, and a button grows the member count to show a live (function) value.
//
// Animation: in "count" and "roll" modes the numbers animate on March's motion engine, so the global speed, "Stop all"
// and the visitor's reduced-motion preference apply. mode="none" writes the numbers without any counting, and
// `reveal={false}` removes the entrance of the items. Here `duration` and `easing` tune the count, and
// reveal={{ effect: "scale", stagger: 60 }} picks the entrance and the delay between items.
// Accessibility: the band is a description list: each label is a <dt> and the number a <dd>, read as its final value.
import { StatsBand } from "march/landing"
import { Button, Card, Segmented } from "march/ui"

// The allowed values of the two choices, as `const` arrays so their types can be derived from them below.
const VARIANTS = ["plain", "divided", "cards"] as const
const MODES = ["none", "count", "roll"] as const

export function StatsBandLab() {
  // Reactive state. The type annotation limits each to the allowed values; the mode starts as "none" so the numbers are
  // written at once (the tests rely on that).
  let $variant: (typeof VARIANTS)[number] = "divided"
  let $mode: (typeof MODES)[number] = "none"
  let $members = 42
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls. Segmented is a group of toggle buttons: `options` lists value/label pairs and bind:value keeps the
        state in sync both ways. aria-label names each group for screen readers. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görünüm" options={VARIANTS.map((v) => ({ value: v, label: v }))} bind:value={$variant} />
        <Segmented aria-label="Sayaç" options={MODES.map((m) => ({ value: m, label: m }))} bind:value={$mode} />
        <Button variant="secondary" on:click={() => $members++}>+1 üye</Button>
      </div>
    </Card>
    {/* The function child is redrawn whenever a state read at its top changes, here $variant and $mode. It is used
        because StatsBand takes variant and mode as plain values, so a new band is built when they change. */}
    {() => {
      // The band is redrawn when a state read on the next line changes; the member count is a function, so it updates
      // by itself without redrawing.
      const variant = $variant, mode = $mode
      // variant: plain / divided / cards. mode: count, roll or none. duration (ms) and easing shape the count. reveal
      // sets the entrance of the items (effect and stagger in ms). class is kept on the list for the tests.
      // items: value is a number or a function (a new value is counted to); `note` is a line under the label;
      // `format` takes Intl options ("compact" turns 2400000 into 2.4M-style text); `decimals` fixes the digits;
      // `prefix` / `suffix` add text before / after the number.
      return <StatsBand class="lab-stats" variant={variant} mode={mode} duration={800} easing="in-out"
        reveal={{ effect: "scale", stagger: 60 }} items={[
          { value: () => $members, label: "üye", note: "her gün artıyor" },
          { value: 2400000, label: "mesaj", format: { notation: "compact" }, suffix: "+" },
          { value: 99.5, decimals: 1, label: "çalışma süresi", suffix: "%" },
          { value: 12, label: "ortalama bilet", prefix: "€" },
        ]} />
    }}
  </div>
}
