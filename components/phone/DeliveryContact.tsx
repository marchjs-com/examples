import { PhoneInput, TextInput, Toggle, Field, Button, Card, toast } from "march/ui"
import { truck } from "march/icons"

// ödeme adımı: teslimat için ad ve cep telefonu; kurye teslimattan önce arar, istersen kargo durumu SMS ile de gelir
export function DeliveryContact() {
  let $name = "Elif Arslan"
  let $phone = ""
  let $sms = true
  // +90 ve on hane
  const $valid = $phone.length === 13
  const next = () => toast(`Kurye ${$phone} numarasını arayacak${$sms ? "; durum SMS ile de gelecek" : ""}`, { kind: "success" })
  return <Card title="Teslimat bilgileri" subtitle="Adım 2 / 3">
    <div sx={{ flex: "col", gap: 3 }}>
      <Field label="Ad soyad"><TextInput bind:value={$name} autocomplete="name" /></Field>
      <Field label="Cep telefonu" help="Kurye teslimattan önce arar" required error={$phone && !$valid ? "Numara eksik görünüyor" : null}>
        <PhoneInput bind:value={$phone} country="+90" placeholder="532 111 22 33" />
      </Field>
      <Toggle bind:value={$sms} label="Kargo durumunu SMS ile bildir" />
      <div sx={{ flex: ["row", "end"] }}>
        <Button variant="primary" icon={truck} disabled={!$valid || !$name} on:click={next}>Devam et</Button>
      </div>
    </div>
  </Card>
}
