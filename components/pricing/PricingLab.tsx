// PricingLab: the full-featured Pricing example; it uses every prop at least once.
//
// Props shown here: plans (name, description, price, features, cta, featured, badge), period / setPeriod (the
// controlled pair behind bind:period), toggle, currency, saving, featureIcon, featureColor, per, priceEffect,
// reveal, labels and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PricingLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { Pricing } from "march/landing"
import { Card, Segmented, Toggle } from "march/ui"

// The two billing periods Pricing knows.
type BillingPeriod = "monthly" | "yearly"
// The ways a price can change with the period: no effect, rolling digits, or a counting number.
const EFFECTS = ["none", "roll", "count"] as const

export function PricingLab() {
  // The period is kept here and handed to Pricing as an accessor plus a setter (see `period` / `setPeriod`).
  let $period = "monthly" as BillingPeriod
  // The chosen priceEffect.
  let $effect: (typeof EFFECTS)[number] = "none"
  // Whether the monthly / yearly switch is shown.
  let $toggle = true
  // Whether the "per month / billed ..." lines are shown.
  let $per = true
  // Whether features use our own mark function instead of the built-in tick.
  let $ownMark = false
  // How many times the Pro button was pressed (shown in its label).
  let $chosen = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Controls of the Lab: they change the Pricing props live. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Fiyat geçişi" options={EFFECTS.map((e) => ({ value: e, label: e }))} bind:value={$effect} />
        <Toggle label="Dönem düğmesi" bind:value={$toggle} />
        <Toggle label="Ay satırı" bind:value={$per} />
        <Toggle label="Kendi işaretim" bind:value={$ownMark} />
      </div>
    </Card>
    {/* Pricing is drawn inside a function: it re-runs when a switch above changes, so every prop is re-read. */}
    {() => {
      // The signals are read here; the period is not read here, it is passed as a function.
      const toggle = $toggle, effect = $effect, per = $per, ownMark = $ownMark, chosen = $chosen
      // - period / setPeriod: controlled period (the same as bind:period); toggle: show the switch; currency: ISO code.
      // - saving: the badge next to the switch; priceEffect: roll, count or none; per: the per-month lines.
      // - featureIcon: true (built-in), false, or a function (included) => node for your own mark; featureColor: tick
      //   colour.
      // - reveal: entrance of the cards ({ effect, stagger } or false); the motion engine applies reduced motion to it.
      // - labels: every text Pricing writes itself; class: on the root (the tests use it).
      // - plans: a number price (0 here), { monthly, yearly } per month, or null (a custom price drawn with
      //   labels.custom).
      //   A feature is a text or { label, included, hint }; cta has a label and onClick (an action) or href (a link);
      //   `featured` lifts a plan and `badge` labels it.
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
    {/* The period held outside Pricing, to show that it is really controlled. */}
    <p sx={{ color: "muted" }}>{`Dönem: ${$period}`}</p>
  </div>
}
