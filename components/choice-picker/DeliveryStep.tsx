import { ChoicePicker, Field, Button, Card, toast } from "march/ui"
import { Icon, creditCard, wallet, banknote, truck } from "march/icons"

// ödeme adımı: teslimat günü (3 seçenek → segmented), saat aralığı (7 seçenek → chips),
// ödeme yöntemi (preview'lu seçenekler → kartlar); hepsi aynı ChoicePicker, görünümü kendisi seçer
const days = ["Bugün", "Yarın", "Cumartesi"]
const slots = ["09-11", "11-13", "13-15", "15-17", "17-19", "19-21", "21-23"]
const payments = [
  { value: "card", label: "Kredi kartı", preview: () => <Icon of={creditCard} /> },
  { value: "wallet", label: "Cüzdan", preview: () => <Icon of={wallet} /> },
  { value: "cash", label: "Kapıda nakit", preview: () => <Icon of={banknote} /> },
]

export function DeliveryStep() {
  let $day = "Yarın"
  let $slot: string | null = null
  let $pay = "card"
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
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
