// DeliveryStep: the real-life ChoicePicker example.
//
// What it shows: the delivery step of a checkout. The delivery day (3 options), the time slot (7 options) and the payment
// method (options with a preview) are all the same ChoicePicker; with kind="auto" it draws segmented buttons, chips and
// cards respectively, so the form looks right without choosing a component for each field.
// When to use this pattern: forms and settings with single-choice fields of different sizes. Wrap each picker in a
// Field so the label names the group for screen readers; `required` on the Field marks the slot as mandatory.
// Confirm stays disabled until a slot is chosen (the slot starts as null = nothing selected).
import { ChoicePicker, Field, Button, Card, toast } from "march/ui"
import { Icon, creditCard, wallet, banknote, truck } from "march/icons"

const days = ["Bugün", "Yarın", "Cumartesi"]
const slots = ["09-11", "11-13", "13-15", "15-17", "17-19", "19-21", "21-23"]
// A `preview` (a function returning a node) is what turns the auto look into cards.
const payments = [
  { value: "card", label: "Kredi kartı", preview: () => <Icon of={creditCard} /> },
  { value: "wallet", label: "Cüzdan", preview: () => <Icon of={wallet} /> },
  { value: "cash", label: "Kapıda nakit", preview: () => <Icon of={banknote} /> },
]

export function DeliveryStep() {
  let $day = "Yarın"
  // null means "nothing chosen yet": no chip is selected and the button below stays disabled.
  let $slot: string | null = null
  let $pay = "card"
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      {/* Three fields, one component: segmented (3 short labels), chips (7 options), cards (with previews). */}
      <Field label="Teslimat günü"><ChoicePicker bind:value={$day} options={days} /></Field>
      <Field label="Saat aralığı" required><ChoicePicker bind:value={$slot} options={slots} /></Field>
      <Field label="Ödeme"><ChoicePicker bind:value={$pay} options={payments} /></Field>
      <div sx={{ flex: ["row", "between", "center"] }}>
        <span sx={{ text: "sm", color: "muted" }}>{$day}{$slot ? `, ${$slot}` : ""}</span>
        <Button variant="primary" icon={truck} disabled={!$slot} on:click={() => toast(`Sipariş: ${$day} ${$slot}`)}>Siparişi onayla</Button>
      </div>
    </div>
  </Card>
}
