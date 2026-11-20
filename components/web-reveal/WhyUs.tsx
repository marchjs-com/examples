import { Reveal } from "march/landing"
import { Card } from "march/ui"
import { truck, shieldCheck, refresh, Icon } from "march/icons"

// bir e-ticaret sitesinin "neden biz" bölümü: başlık önce, kartlar ardından aşağıdan birer birer gelir
const REASONS = [
  { icon: truck, title: "Ertesi gün kargo", text: "Saat 16.00'ya kadar verilen siparişler aynı gün yola çıkar." },
  { icon: shieldCheck, title: "Güvenli ödeme", text: "Kart bilgilerin bizde saklanmaz; 3D Secure ile öde." },
  { icon: refresh, title: "30 gün iade", text: "Beğenmezsen kargo ücreti ödemeden geri gönder." },
]

export function WhyUs() {
  return <section sx={{ flex: "col", gap: 4 }}>
    <Reveal effect="fade" self as="h2" sx={{ text: "xl" }}>Neden bizden alışveriş?</Reveal>
    <Reveal effect="up" stagger={120} delay={150} sx={{ grid: "fit", gap: 3 }}>
      {REASONS.map((r) => <Card>
        <div sx={{ flex: "col", gap: 2 }}>
          <Icon of={r.icon} />
          <strong>{r.title}</strong>
          <span sx={{ color: "muted" }}>{r.text}</span>
        </div>
      </Card>)}
    </Reveal>
  </section>
}
