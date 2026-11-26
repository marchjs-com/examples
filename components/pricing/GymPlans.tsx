// GymPlans: the real-life Pricing example.
//
// What it shows: a gym's membership page with three plans: two priced, one "contact us" (price null). The monthly /
// yearly choice lives outside the component (bind:period), so the add-to-cart message can say which one was
// chosen. When to use this pattern: a real pricing page where choosing a plan does something in your app.
//
// Animation: prices roll when the period changes and the cards enter with Pricing's reveal; both run on the motion
// engine (reduced motion, global speed and "Stop all" apply; `priceEffect="none"` and `reveal={false}` turn them off).
// Accessibility: the period switch is a Segmented radio group (arrow keys); each plan is an article with a heading.

import { Pricing } from "march/landing"
import { toast } from "march/ui"

export function GymPlans() {
  // The chosen billing period ("monthly" or "yearly"); bind:period below keeps it in step with the switch.
  let $period: string = "monthly"
  // Builds the click handler of one plan's button; it reads the period at click time.
  const join = (name: string) => () => toast(`${name} üyeliği (${$period === "yearly" ? "yıllık" : "aylık"}) sepete eklendi`)
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* - saving: badge next to the switch. featureColor: colour token of the tick in front of each feature.
        - plan.price: a number, { monthly, yearly } per month, or null for a custom price (shown with labels.custom).
        - plan.features: a text, or { label, included: false } for a dash ("not included"), or { label, hint }.
        - plan.cta: the button; onClick for an action, href for a link. */}
    <Pricing bind:period={$period} currency="TRY" saving="2 ay bedava" featureColor="brand-green" plans={[
      { name: "Gündüz", description: "Hafta içi 07.00–16.00", price: { monthly: 900, yearly: 750 }, features: ["Fitness alanı", "Soyunma odası", { label: "Grup dersleri", included: false }], cta: { label: "Gündüz'e katıl", onClick: join("Gündüz") } },
      { name: "Tam", description: "Her gün, her saat", price: { monthly: 1400, yearly: 1150 }, featured: true, badge: "En çok seçilen", features: ["Fitness alanı", "Grup dersleri", "Havuz ve sauna", { label: "Kişisel antrenör", hint: "ayda 1 seans" }], cta: { label: "Tam üyelik al", onClick: join("Tam") } },
      { name: "Kurumsal", description: "10 kişi ve üstü ekipler", price: null, features: ["Ekip panosu", "Faturalı ödeme"], cta: { label: "Bize ulaşın", href: "#iletisim" } },
    ]} labels={{ custom: "Teklif alın" }} />
  </div>
}
