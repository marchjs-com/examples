import { TextInput, EmailInput, Field, Button, Card, toast } from "march/ui"
import { Icon, user, phone, mapPin, arrowRight } from "march/icons"

// ödeme adımı 2 / 3: teslimat bilgileri; telefon yalnız rakam, posta kodu 5 rakam, eksik alan varken devam kilitli
export function DeliveryStep() {
  let $name = ""
  let $mail = ""
  let $phone = ""
  let $zip = ""
  const $zipError = $zip && !/^\d{5}$/.test($zip) ? "Posta kodu 5 rakamdır" : null
  const $ready = !!$name.trim() && $mail.includes("@") && $phone.length >= 10 && /^\d{5}$/.test($zip)
  return <Card title="Teslimat bilgileri" subtitle="Adım 2 / 3"
    footer={<Button variant="primary" iconEnd={arrowRight} disabled={!$ready} on:click={() => toast(`${$name}, siparişin yola çıkmak üzere`)}>Ödemeye geç</Button>}>
    <div sx={{ flex: "col", gap: 3 }}>
      <Field label="Ad soyad" required>
        <TextInput bind:value={$name} autocomplete="name" prefix={<Icon of={user} />} placeholder="Ayşe Kaya" />
      </Field>
      <Field label="E-posta" required help="Kargo takip bağlantısı bu adrese gelir."><EmailInput bind:value={$mail} /></Field>
      <div sx={{ cols: 2, gap: 3 }}>
        <Field label="Telefon" required>
          <TextInput bind:value={$phone} type="tel" inputmode="tel" autocomplete="tel" prefix={<Icon of={phone} />}
            placeholder="05xxxxxxxxx" transform={(v: string) => v.replace(/\D/g, "")} />
        </Field>
        <Field label="Posta kodu" required error={$zipError}>
          <TextInput bind:value={$zip} inputmode="numeric" autocomplete="postal-code" maxLength={5} prefix={<Icon of={mapPin} />} />
        </Field>
      </div>
    </div>
  </Card>
}
