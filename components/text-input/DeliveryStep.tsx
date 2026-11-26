// DeliveryStep: the real-life TextInput example.
//
// What it shows: step 2 of 3 of a checkout: the delivery details. Fields sit inside <Field> (a label, a help line and an
// error line), the phone number keeps only digits while typing, the postal code must be five digits and shows an error
// when it is not, and the "continue" button stays disabled until every field is valid.
// When to use this pattern: any form with several single-line fields. <Field> wires each input's id, aria-invalid and
// aria-describedby for you; EmailInput and UrlInput are the same control with the right keyboard, autocomplete and trimming.
//
// Animation: none of its own.
// Accessibility: each input is a native <input> labelled by its Field (<label for>); the error is linked with
// aria-describedby and aria-invalid; `required` marks the field; prefix icons are decoration beside the input. The
// `autocomplete` and `inputmode` hints give the browser the right autofill and a suitable on-screen keyboard.
import { TextInput, EmailInput, Field, Button, Card, toast } from "march/ui"
import { Icon, user, phone, mapPin, arrowRight } from "march/icons"

export function DeliveryStep() {
  // Reactive state: the four field values.
  let $name = ""
  let $mail = ""
  let $phone = ""
  let $zip = ""
  // Derived values (a `const $x` is recomputed when the $ values it reads change): the postal code's error text (only once
  // something is typed), and whether the whole form is ready.
  const $zipError = $zip && !/^\d{5}$/.test($zip) ? "Posta kodu 5 rakamdır" : null
  const $ready = !!$name.trim() && $mail.includes("@") && $phone.length >= 10 && /^\d{5}$/.test($zip)
  // Card's `footer` slot holds the button; disabled={!$ready} keeps it off until every field is valid.
  return <Card title="Teslimat bilgileri" subtitle="Adım 2 / 3"
    footer={<Button variant="primary" iconEnd={arrowRight} disabled={!$ready} on:click={() => toast(`${$name}, siparişin yola çıkmak üzere`)}>Ödemeye geç</Button>}>
    <div sx={{ flex: "col", gap: 3 }}>
      {/* Field gives the input its label (and the required mark). bind:value keeps $name in sync with the input; prefix puts
          an icon inside the field; autocomplete lets the browser fill the name; placeholder is only a hint. */}
      <Field label="Ad soyad" required>
        <TextInput bind:value={$name} autocomplete="name" prefix={<Icon of={user} />} placeholder="Ayşe Kaya" />
      </Field>
      {/* EmailInput is a TextInput with the e-mail keyboard and trimming; `help` is the line under the field. */}
      <Field label="E-posta" required help="Kargo takip bağlantısı bu adrese gelir."><EmailInput bind:value={$mail} /></Field>
      <div sx={{ cols: 2, gap: 3 }}>
        <Field label="Telefon" required>
          {/* type="tel" and inputmode="tel" bring up the phone keypad. transform rewrites what is typed: here it removes
              everything that is not a digit, so letters never get into the field. */}
          <TextInput bind:value={$phone} type="tel" inputmode="tel" autocomplete="tel" prefix={<Icon of={phone} />}
            placeholder="05xxxxxxxxx" transform={(v: string) => v.replace(/\D/g, "")} />
        </Field>
        {/* Field's `error` shows the message under the field and marks the input invalid. inputmode="numeric" brings up the
            number keypad; maxLength={5} stops at five characters. */}
        <Field label="Posta kodu" required error={$zipError}>
          <TextInput bind:value={$zip} inputmode="numeric" autocomplete="postal-code" maxLength={5} prefix={<Icon of={mapPin} />} />
        </Field>
      </div>
    </div>
  </Card>
}
