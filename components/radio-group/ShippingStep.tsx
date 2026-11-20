import { RadioGroup, Field, Card, Button, toast } from "march/ui"
import { truck, zap, store, creditCard, wallet } from "march/icons"

// ödeme adımında teslimat ve ödeme seçimi: teslimat kart görünümünde (süre ve ücret), ödeme yöntemi çip; toplam canlı
const delivery = [
  { value: "standard", label: "Standart kargo", hint: "2–4 iş günü", icon: truck, meta: "Ücretsiz" },
  { value: "express", label: "Hızlı teslimat", hint: "Yarın öğlene kadar", icon: zap, meta: "49 ₺" },
  { value: "store", label: "Mağazadan al", hint: "Kadıköy şubesi, bugün 18:00'den sonra", icon: store, meta: "Ücretsiz" },
]
const payments = [{ value: "card", label: "Kart", icon: creditCard }, { value: "wallet", label: "Cüzdan", icon: wallet }, { value: "cod", label: "Kapıda ödeme" }]

export function ShippingStep() {
  const basket = 1250
  let $ship = "standard"
  let $pay = "card"
  const $total = basket + ($ship === "express" ? 49 : 0) + ($pay === "cod" ? 15 : 0)
  return <Card title="2. Teslimat ve ödeme" subtitle="Sepet: 3 ürün, 1.250 ₺">
    <div sx={{ flex: "col", gap: 4 }}>
      <Field label="Teslimat" group>
        <RadioGroup bind:value={$ship} variant="card" options={delivery} />
      </Field>
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
