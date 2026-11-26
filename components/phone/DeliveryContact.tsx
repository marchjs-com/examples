// DeliveryContact: the real-life PhoneInput example.
//
// The delivery step of a checkout: a name and a mobile phone number; the courier calls before delivery, and a switch
// adds SMS updates. The number counts as valid only when it is complete, and the button stays off until then. Use this
// pattern for any form that needs a phone number with a fixed country.
import { PhoneInput, TextInput, Toggle, Field, Button, Card, toast } from "march/ui"
import { truck } from "march/icons"

export function DeliveryContact() {
  // The form state. The stored phone is "+" and digits, so a complete Turkish number is "+90" and ten digits.
  let $name = "Elif Arslan"
  let $phone = ""
  let $sms = true
  // +90 and ten digits are 13 characters in total.
  const $valid = $phone.length === 13
  const next = () => toast(`Kurye ${$phone} numarasını arayacak${$sms ? "; durum SMS ile de gelecek" : ""}`, { kind: "success" })
  return <Card title="Teslimat bilgileri" subtitle="Adım 2 / 3">
    <div sx={{ flex: "col", gap: 3 }}>
      <Field label="Ad soyad"><TextInput bind:value={$name} autocomplete="name" /></Field>
      {/* Field draws the visible label, the help text and the error message. `required` marks the field as required.
          error takes text or null: it shows the message while the number is started but not complete.
          PhoneInput: country="+90" shows the code as a prefix and puts it in front of the national number you type, so
          typing "0532 111 22 33" stores "+905321112233". The placeholder shows the expected shape. */}
      <Field label="Cep telefonu" help="Kurye teslimattan önce arar" required error={$phone && !$valid ? "Numara eksik görünüyor" : null}>
        <PhoneInput bind:value={$phone} country="+90" placeholder="532 111 22 33" />
      </Field>
      <Toggle bind:value={$sms} label="Kargo durumunu SMS ile bildir" />
      <div sx={{ flex: ["row", "end"] }}>
        {/* The button turns itself off until the number is complete and the name is not empty; the toast is the
            feedback after a click and its motion follows the motion engine (reduced motion, global speed, "Stop all"). */}
        <Button variant="primary" icon={truck} disabled={!$valid || !$name} on:click={next}>Devam et</Button>
      </div>
    </div>
  </Card>
}
