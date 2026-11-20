import { Pricing } from "march/landing"
import { toast } from "march/ui"

// bir spor salonunun üyelik sayfası: aylık / yıllık seçimi dışarıda tutulur (bind:period), seçilen plana göre bildirim
export function GymPlans() {
  let $period: string = "monthly"
  const join = (name: string) => () => toast(`${name} üyeliği (${$period === "yearly" ? "yıllık" : "aylık"}) sepete eklendi`)
  return <div sx={{ flex: "col", gap: 3 }}>
    <Pricing bind:period={$period} currency="TRY" saving="2 ay bedava" featureColor="brand-green" plans={[
      { name: "Gündüz", description: "Hafta içi 07.00–16.00", price: { monthly: 900, yearly: 750 }, features: ["Fitness alanı", "Soyunma odası", { label: "Grup dersleri", included: false }], cta: { label: "Gündüz'e katıl", onClick: join("Gündüz") } },
      { name: "Tam", description: "Her gün, her saat", price: { monthly: 1400, yearly: 1150 }, featured: true, badge: "En çok seçilen", features: ["Fitness alanı", "Grup dersleri", "Havuz ve sauna", { label: "Kişisel antrenör", hint: "ayda 1 seans" }], cta: { label: "Tam üyelik al", onClick: join("Tam") } },
      { name: "Kurumsal", description: "10 kişi ve üstü ekipler", price: null, features: ["Ekip panosu", "Faturalı ödeme"], cta: { label: "Bize ulaşın", href: "#iletisim" } },
    ]} labels={{ custom: "Teklif alın" }} />
  </div>
}
