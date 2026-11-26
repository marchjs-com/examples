// ShippingStep: the real-life RadioGroup example.
//
// What it shows: the delivery and payment step of a checkout. Delivery uses the card look (with time, hint and price),
// the payment method is a row of chips, and the total updates live when either choice changes.
// When to use this pattern: any choice where the options need descriptions; Field gives each group a visible label.
//
// Accessibility: each RadioGroup is a radiogroup of native radios. Keyboard: arrow keys move and select inside a
// group, Tab leaves it.

import { RadioGroup, Field, Card, Button, toast } from "march/ui"
import { truck, zap, store, creditCard, wallet } from "march/icons"

// Delivery options: value, label, hint (a second line), icon and meta (text at the end, here the price).
const delivery = [
  { value: "standard", label: "Standart kargo", hint: "2–4 iş günü", icon: truck, meta: "Ücretsiz" },
  { value: "express", label: "Hızlı teslimat", hint: "Yarın öğlene kadar", icon: zap, meta: "49 ₺" },
  { value: "store", label: "Mağazadan al", hint: "Kadıköy şubesi, bugün 18:00'den sonra", icon: store, meta: "Ücretsiz" },
]
// Payment options; an option without an icon is fine.
const payments = [{ value: "card", label: "Kart", icon: creditCard }, { value: "wallet", label: "Cüzdan", icon: wallet }, { value: "cod", label: "Kapıda ödeme" }]

export function ShippingStep() {
  // The basket total before shipping and fees.
  const basket = 1250
  // The chosen delivery option.
  let $ship = "standard"
  // The chosen payment method.
  let $pay = "card"
  // A computed value: the total is worked out again whenever the delivery or payment choice changes.
  const $total = basket + ($ship === "express" ? 49 : 0) + ($pay === "cod" ? 15 : 0)
  return <Card title="2. Teslimat ve ödeme" subtitle="Sepet: 3 ürün, 1.250 ₺">
    <div sx={{ flex: "col", gap: 4 }}>
      {/* Field: a visible label and a hint for the control; `group` makes the label a group label (not a <label for>),
          which suits a group of radios. The card look suits options with descriptions. */}
      <Field label="Teslimat" group>
        <RadioGroup bind:value={$ship} variant="card" options={delivery} />
      </Field>
      {/* help is the hint under the control; here it depends on $pay, so it appears only while cash on delivery is
          chosen (null shows nothing). chip + inline: a row of chips. */}
      <Field label="Ödeme" group help={$pay === "cod" ? "Kapıda ödemede 15 ₺ hizmet bedeli alınır" : null}>
        <RadioGroup bind:value={$pay} variant="chip" inline options={payments} />
      </Field>
      <div sx={{ flex: ["row", "between", "center"] }}>
        <strong sx={{ text: "lg" }}>Toplam: {$total.toLocaleString("tr-TR")} ₺</strong>
        <Button variant="primary" on:click={() => toast(`Sipariş onaylandı: ${$total} ₺`)}>Siparişi onayla</Button>
      </div>
    </div>
  </Card>
}
