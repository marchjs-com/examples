import { SiteFooter } from "march/landing"
import { toast } from "march/ui"
import { coffee, mapPin, mail, globe, message } from "march/icons"

// bir kahve dükkânının sitesinin alt bilgisi: sütunlar, sosyal bağlantılar, bülten ve yasal bağlantılar
const COLUMNS = [
  { title: "Dükkân", links: [{ label: "Menü", href: "#menu" }, { label: "Çekirdekler", href: "#cekirdek" }, { label: "Hediye kartı", href: "#hediye" }] },
  { title: "Ziyaret", links: [{ label: "Kadıköy şubesi", href: "#kadikoy" }, { label: "Beşiktaş şubesi", href: "#besiktas" }, { label: "Çalışma saatleri", href: "#saatler" }] },
  { title: "Biz", links: [{ label: "Hikâyemiz", href: "#hikaye" }, { label: "Kariyer", href: "#kariyer" }, { label: "İletişim", href: "#iletisim" }] },
]

export function CoffeeFooter() {
  return <SiteFooter brand={{ name: "Kahve Durağı", mark: coffee, sub: "2016'dan beri" }}
    about="Her sabah taze kavrulmuş çekirdek. Kadıköy ve Beşiktaş'ta, haftanın her günü."
    columns={COLUMNS}
    social={[{ label: "Harita", href: "#harita", icon: mapPin }, { label: "Web", href: "#", icon: globe }, { label: "Topluluk", href: "#", icon: message }, { label: "E-posta", href: "#", icon: mail }]}
    newsletter={{ title: "Haftanın çekirdeği", lead: "Her cuma bir yeni çekirdek, bir de indirim.", button: "Katıl", placeholder: "sen@ornek.com",
      onSubmit: () => { toast("Bültene katıldın") } }}
    copyright="© Kahve Durağı · Tüm hakları saklıdır"
    legal={[{ label: "Gizlilik", href: "#gizlilik" }, { label: "Çerezler", href: "#cerez" }, { label: "Mesafeli satış", href: "#satis" }]} />
}
