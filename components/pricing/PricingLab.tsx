import { Pricing } from "march/landing"
import { Card, Segmented, Toggle } from "march/ui"

// Pricing'in bütün özellikleri bir arada: planlar (name, description, price, features, cta, featured, badge), dönem
// (period + setPeriod = bind:period), düğme (toggle), para birimi (currency), kazanç etiketi (saving), özellik işareti
// (featureIcon) ve rengi (featureColor), ay satırı (per), fiyat geçişi (priceEffect), giriş (reveal), kendi metinler
// (labels) ve sınıf (class)
type BillingPeriod = "monthly" | "yearly"
const EFFECTS = ["none", "roll", "count"] as const

export function PricingLab() {
  let $period = "monthly" as BillingPeriod
  let $effect: (typeof EFFECTS)[number] = "none"
  let $toggle = true
  let $per = true
  let $ownMark = false
  let $chosen = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Fiyat geçişi" options={EFFECTS.map((e) => ({ value: e, label: e }))} bind:value={$effect} />
        <Toggle label="Dönem düğmesi" bind:value={$toggle} />
        <Toggle label="Ay satırı" bind:value={$per} />
        <Toggle label="Kendi işaretim" bind:value={$ownMark} />
      </div>
    </Card>
    {() => {
      // bu satırda okunan durumlar değişince fiyatlar yeniden çizilir; dönem bir işlev (period), kendisi güncellenir
      const toggle = $toggle, effect = $effect, per = $per, ownMark = $ownMark, chosen = $chosen
      return <Pricing class="lab-pricing" period={() => $period} setPeriod={(p: BillingPeriod) => $period = p} toggle={toggle}
      currency="EUR" saving="3 ay bedava" priceEffect={effect} per={per} featureColor="brand-purple"
      featureIcon={ownMark ? (on: boolean) => (on ? "✓" : "✗") : true}
      reveal={{ effect: "scale", stagger: 60 }}
      labels={{ monthly: "Aylık", yearly: "Yıllık", perMonth: "/ ay", billedMonthly: "aylık ödenir", billedYearly: "yıllık ödenir", custom: "Bize sorun", billingPeriod: "Ödeme dönemi", notIncluded: "dahil değil" }}
      plans={[
        { name: "Başlangıç", description: "Tek kişi için", price: 0, features: ["1 proje", { label: "Ekip", included: false }], cta: { label: "Ücretsiz başla" } },
        { name: "Pro", description: "Büyüyen ekipler", price: { monthly: 30, yearly: 24 }, featured: true, badge: "Önerilen", features: ["Sınırsız proje", { label: "Öncelikli destek", hint: "24 saat içinde" }], cta: { label: `Pro'yu seç (${chosen})`, onClick: () => $chosen++ } },
        { name: "Kurum", price: null, features: ["Özel sözleşme"], cta: { label: "Görüşelim", href: "#kurum" } },
      ]} />
    }}
    <p sx={{ color: "muted" }}>{`Dönem: ${$period}`}</p>
  </div>
}
