// PizzaTracker: the creative-minimal Roadmap example.
//
// What it shows: a pizza order that advances one step each time you press the button; finished steps are marked done,
// the current one is marked as now. When to use this pattern: an order or delivery tracker; the status of each entry
// is computed from one number.
//
// Accessibility: the roadmap is an ordered list; the status is text (a badge), not only colour. Animation: the entrance
// of the entries runs on the motion engine (reduced motion shows the line full); `reveal={false}` turns it off.

import { Roadmap } from "march/landing"
import { Button } from "march/ui"

// The steps of an order: title and body (a second line). The status is added below.
const STEPS = [
  { title: "Sipariş alındı", body: "Margarita, bol peynir 🧀" },
  { title: "Fırında", body: "Taş fırın, 3 dakika 🔥" },
  { title: "Yolda", body: "Kurye köşeyi döndü 🛵" },
  { title: "Afiyet olsun", body: "Kapıdayız 🍕" },
]

export function PizzaTracker() {
  // The index of the current step.
  let $stage = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Advance one step, or start a new order after the last one. */}
    <Button on:click={() => $stage = $stage >= STEPS.length - 1 ? 0 : $stage + 1}>{$stage >= STEPS.length - 1 ? "Yeni sipariş" : "Sonraki adım"}</Button>
    {/* The roadmap is drawn inside a function so it is rebuilt whenever $stage changes. */}
    {() => {
      // Read the signal here so this function re-runs when it changes.
      const stage = $stage
      // - scroll={false}: the line is full from the start instead of filling while you scroll.
      // - labels: the texts of the three statuses (done, now, next).
      // - items: each entry gets a status: steps before the current one are "done", the current one "now", the rest
      //   "next".
      return <Roadmap scroll={false} labels={{ done: "Tamam", now: "Şimdi", next: "Bekliyor" }}
        items={STEPS.map((s, i) => ({ ...s, status: (i < stage ? "done" : i === stage ? "now" : "next") as "done" | "now" | "next" }))} />
    }}
  </div>
}
