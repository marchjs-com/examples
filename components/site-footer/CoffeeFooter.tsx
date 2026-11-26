// CoffeeFooter: the real-life SiteFooter example.
//
// What it shows: the footer of a coffee shop's website: brand and a short line about the shop, three link columns, icon
// links to social places, a newsletter sign-up, a copyright line and legal links. The "back to top" button is on by
// default and sits in the bottom row.
// When to use this pattern: the end of any marketing site. Everything is data (objects and arrays), so the same
// component works for a different site by changing the data only.
import { SiteFooter } from "march/landing"
import { toast } from "march/ui"
import { coffee, mapPin, mail, globe, message } from "march/icons"

// The link columns: each has a title and a list of { label, href } links. The footer draws every column as its own
// navigation landmark named by its title; on tablets the columns fold to two per row and on phones they stack.
const COLUMNS = [
  { title: "Dükkân", links: [{ label: "Menü", href: "#menu" }, { label: "Çekirdekler", href: "#cekirdek" }, { label: "Hediye kartı", href: "#hediye" }] },
  { title: "Ziyaret", links: [{ label: "Kadıköy şubesi", href: "#kadikoy" }, { label: "Beşiktaş şubesi", href: "#besiktas" }, { label: "Çalışma saatleri", href: "#saatler" }] },
  { title: "Biz", links: [{ label: "Hikâyemiz", href: "#hikaye" }, { label: "Kariyer", href: "#kariyer" }, { label: "İletişim", href: "#iletisim" }] },
]

export function CoffeeFooter() {
  // SiteFooter options used here:
  // - brand: { name, mark, sub }: the name, an icon as the mark and a small line under the name.
  // - about: the short line under the brand. columns: the link columns above.
  // - social: icon-only links { label, href, icon }; the label is the accessible name, since there is no visible text.
  // - newsletter: the options of the Newsletter component (title, lead, button text, placeholder, onSubmit). onSubmit
  //   receives the e-mail address; here it only shows a toast. A real page would send it to the server, and throwing an
  //   error there makes the field show it.
  // - copyright: your own bottom line (the default is "(c) year name"; copyright={false} shows none).
  // - legal: the links next to the copyright line.
  // Left at their defaults: no big wordmark, and the back-to-top button (toTop) with its translated name.
  return <SiteFooter brand={{ name: "Kahve Durağı", mark: coffee, sub: "2016'dan beri" }}
    about="Her sabah taze kavrulmuş çekirdek. Kadıköy ve Beşiktaş'ta, haftanın her günü."
    columns={COLUMNS}
    social={[{ label: "Harita", href: "#harita", icon: mapPin }, { label: "Web", href: "#", icon: globe }, { label: "Topluluk", href: "#", icon: message }, { label: "E-posta", href: "#", icon: mail }]}
    newsletter={{ title: "Haftanın çekirdeği", lead: "Her cuma bir yeni çekirdek, bir de indirim.", button: "Katıl", placeholder: "sen@ornek.com",
      onSubmit: () => { toast("Bültene katıldın") } }}
    copyright="© Kahve Durağı · Tüm hakları saklıdır"
    legal={[{ label: "Gizlilik", href: "#gizlilik" }, { label: "Çerezler", href: "#cerez" }, { label: "Mesafeli satış", href: "#satis" }]} />
}
