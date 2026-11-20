import { SectionHead } from "march/landing"
import { arrowRight, mapPin } from "march/icons"

// bir mahalle fırınının sitesinde sipariş bölümünün açılışı: üst etiket bağlantısı, başlık, açıklama, iki eylem ve not
export function BakeryIntro() {
  return <SectionHead eyebrow="Yeni: ekşi mayalı çavdar" eyebrowHref="#cavdar"
    title="Ekmeğin sabah 7'de kapında" lead="Gece yoğrulur, şafakta pişer. Siparişini akşam 10'a kadar ver, sabah sıcak sıcak gelsin."
    actions={[{ label: "Sipariş ver", href: "#siparis", iconEnd: arrowRight }, { label: "Fırını bul", href: "#harita", icon: mapPin }]}
    note="Cihangir, Firuzağa ve Çukurcuma'ya ücretsiz teslimat" />
}
