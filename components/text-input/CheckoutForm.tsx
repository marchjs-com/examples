// CheckoutForm: a real-life payment and address form built on masked TextInputs.
//
// What it shows: every formatted field of a checkout, each with the right march/mask preset:
// - phoneTR(): "(555) 123 45 67"; a pasted "+90 …" or "0…" is read; the parsed value is "+905551234567".
// - postalCode(): five digits for Türkiye.
// - cardNumber(): grouped by the card type (4-6-5 for 34 / 37, 4-4-4-4 for most), Luhn checked; the type is the mask
//   state's `name`, shown next to the field.
// - cardExpiry(): "MM/YY", a single 4 becomes 04, a past month is an error. cardCvc(): 3 or 4 digits.
// The payment fields format only: nothing is charged or sent anywhere (use test card numbers such as 4242 4242 4242 4242).
// When to use it: copy a row; each preset brings its keyboard (inputmode) and autofill hint (autocomplete) with it.
//
// Validation: a mask's own check (an invalid card number, an expired card) marks the input invalid and shows its message.
// Inside a Field the Field shows its own error; here the Pay button simply waits until every mask is complete and valid.
// Animation: the mask's built-in animations (fade, fill, shake, check mark); maskMotion={false} turns them off.
// Accessibility: real <input>s with labels from Field; screen readers hear the format hint, errors and completion, not
// every keystroke.
import { TextInput, Field, Button, Card, toast } from "march/ui"
import { Icon, user, mapPin, creditCard, arrowRight } from "march/icons"
import { phoneTR, postalCode, cardNumber, cardExpiry, cardCvc } from "march/mask/presets"

// The masks are built once (a preset call makes a new mask object).
const PHONE = phoneTR(), ZIP = postalCode({ country: "TR" }), CARD = cardNumber(), EXPIRY = cardExpiry(), CVC = cardCvc()

export function CheckoutForm() {
  // Reactive state: the values, and for each masked field whether it is complete and valid.
  let $name = ""
  let $phone = ""
  let $address = ""
  let $zip = ""
  let $card = ""
  let $brand = ""
  let $expiry = ""
  let $cvc = ""
  let $ok = { phone: false, zip: false, card: false, expiry: false, cvc: false }
  // onMaskState gives { complete, error, name }: a field is ready when it is complete and has no error.
  const ready = (key: keyof typeof $ok) => (s: { complete: boolean; error: string | null; name?: string }) => {
    $ok = { ...$ok, [key]: s.complete && !s.error }
    if (key === "card") $brand = s.name ?? ""
  }
  const $canPay = !!$name.trim() && !!$address.trim() && Object.values($ok).every(Boolean)
  return <Card title="Teslimat ve ödeme" subtitle="Adım 2 / 2"
    footer={<Button variant="primary" iconEnd={arrowRight} disabled={!$canPay} on:click={() => toast(`${$name}, siparişin alındı`)}>Siparişi tamamla</Button>}>
    <div sx={{ flex: "col", gap: 3 }}>
      <Field label="Ad soyad" required>
        <TextInput bind:value={$name} autocomplete="name" prefix={<Icon of={user} />} placeholder="Ayşe Kaya" />
      </Field>
      {/* maskValue="parsed": the bound value is the mask's parsed value, here E.164 ("+905551234567"). */}
      <Field label="Telefon" required>
        <TextInput bind:value={$phone} mask={PHONE} maskValue="parsed" prefix="+90" onMaskState={ready("phone")} />
      </Field>
      <div sx={{ cols: 2, gap: 3 }}>
        <Field label="Adres" required>
          <TextInput bind:value={$address} autocomplete="street-address" prefix={<Icon of={mapPin} />} />
        </Field>
        <Field label="Posta kodu" required>
          <TextInput bind:value={$zip} mask={ZIP} onMaskState={ready("zip")} />
        </Field>
      </div>
      {/* The card number's suffix shows the type the dynamic mask picked (amex, visa, troy…). */}
      <Field label="Kart numarası" required>
        <TextInput bind:value={$card} mask={CARD} prefix={<Icon of={creditCard} />} suffix={$brand || " "} onMaskState={ready("card")} />
      </Field>
      <div sx={{ cols: 2, gap: 3 }}>
        {/* maskPlaceholder="eager" shows the whole template ("__/__") while the field has focus. */}
        <Field label="Son kullanma" required>
          <TextInput bind:value={$expiry} mask={EXPIRY} maskPlaceholder="eager" onMaskState={ready("expiry")} />
        </Field>
        <Field label="Güvenlik kodu" required>
          <TextInput bind:value={$cvc} mask={CVC} onMaskState={ready("cvc")} />
        </Field>
      </div>
    </div>
  </Card>
}
