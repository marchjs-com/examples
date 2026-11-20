import { Hero } from "march/landing"
import { arrowRight, mapPin } from "march/icons"
import { toast } from "march/ui"

// bir kahvecinin açılış ekranı: solda metin ve eylemler, sağda menü kartı (split görünüm)
const MenuCard = () => <div sx={{ flex: "col", gap: 2, p: 4, radius: 3 }} class="cafe-menu" role="list" aria-label="Bugünün menüsü">
  {[["Filtre kahve", "65 ₺"], ["Flat white", "85 ₺"], ["Tarçınlı çörek", "70 ₺"]].map(([name, price]) =>
    <div role="listitem" sx={{ flex: ["row", "between"], gap: 4 }}><span>{name}</span><strong>{price}</strong></div>)}
</div>

export function CafeHero() {
  return <Hero variant="split" size="md" level={2} eyebrow="Kadıköy · 08.00–22.00" eyebrowHref="#harita"
    title="Sabah kahven hazır" highlight="hazır"
    lead="Taze kavrulmuş çekirdek, ev yapımı çörek. Sıraya girme: yoldayken sipariş ver, gelince al."
    actions={[{ label: "Sipariş ver", iconEnd: arrowRight, onClick: () => toast("Siparişin alındı") }, { label: "Yol tarifi", icon: mapPin, href: "#harita" }]}
    note="İlk kahve bizden" media={<MenuCard /> as Node} />
}
