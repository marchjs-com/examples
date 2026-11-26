// OrderTracking: the real-life Steps example.
//
// What it shows: the tracking page of a parcel: a vertical list of stages (order received, shipped, out for delivery,
// delivered), each with a time-stamped description and an icon. The steps are display only: the user cannot click
// them. A button advances the order by one stage.
// When to use this pattern: progress that the system owns, not the user (tracking, a build pipeline, an application
// status). Leave out `onSelect` and the steps are plain list items, not buttons. For a flow the user moves through
// themselves, use `onSelect` (see TeaSteps) or Stepper.
//
// Animation: Steps itself has no motion to switch off.
// Accessibility: an ordered list; the current stage has aria-current="step"; done stages show a check, so progress is
// not told by colour alone. Descriptions stay visible in the vertical layout.
import { Steps, Button, Badge, Card } from "march/ui"
import { packageBox, truck, mapPin, checkCircle } from "march/icons"

// The stages: title, description and icon each (the description and the icon are optional).
const STAGES = [
  { title: "Sipariş alındı", description: "Pzt 09:12 · ödeme onaylandı", icon: packageBox },
  { title: "Kargoya verildi", description: "Pzt 17:40 · İstanbul aktarma", icon: truck },
  { title: "Dağıtımda", description: "Kurye yolda, tahmini 14:00", icon: mapPin },
  { title: "Teslim edildi", description: "İmza: kapıda bırakıldı", icon: checkCircle },
]

export function OrderTracking() {
  // Reactive state: the index of the current stage (0-based), and a value derived from it.
  let $stage = 1
  // A derived value: true once the index is past the last stage (a `const $x` is recomputed when $stage changes).
  const $done = $stage >= STAGES.length
  return <Card title="Sipariş #48213" subtitle="HADİ kahve makinesi + 2 filtre">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* current marks where the order is: earlier steps are done, later ones upcoming. `vertical` stacks the steps
          with their descriptions; m:color tints the active marks with a colour token. No onSelect, so no buttons. */}
      <Steps steps={STAGES} current={$stage} vertical m:color="brand-blue" />
      <div sx={{ flex: ["row", "between"], gap: 2 }}>
        {/* A badge that says the state in words, and the button that simulates a status refresh by moving one stage
            on; it is disabled when everything is done. */}
        <Badge tone={$done ? "success" : "info"}>{$done ? "Teslim edildi" : "Yolda"}</Badge>
        <Button size="sm" disabled={$done} on:click={() => $stage++}>Durumu yenile</Button>
      </div>
    </div>
  </Card>
}
