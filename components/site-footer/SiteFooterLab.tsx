import { SiteFooter } from "march/landing"
import { Toggle, Card } from "march/ui"
import { sparkles, globe, message, mail, chevronUp } from "march/icons"

// SiteFooter'ın bütün özellikleri bir arada: marka (özellikler ya da kendi düğümün), kısa satır, sütunlar, sosyal
// bağlantılar, bülten, telif satırı, yasal bağlantılar, büyük yazı, başa dön düğmesi, onun ikonu ve adı, sınıf
const COLUMNS = [
  { title: "Ürün", links: [{ label: "Özellikler", href: "#ozellikler" }, { label: "Fiyatlar", href: "#fiyatlar" }] },
  { title: "Şirket", links: [{ label: "Hakkımızda", href: "#hakkimizda" }, { label: "Kariyer", href: "#kariyer" }] },
]

// kendi düğümünden bir marka: harf bloğu ve ad
const OwnBrand = () => <strong sx={{ text: "lg", color: "brand-purple" }} class="lab-own-brand">◆ Atölye</strong>

export function SiteFooterLab() {
  let $own = false
  let $copy = true
  let $top = true
  let $mark = true
  let $subs = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Toggle label="Kendi markam" bind:value={$own} />
        <Toggle label="Telif satırı" bind:value={$copy} />
        <Toggle label="Başa dön" bind:value={$top} />
        <Toggle label="Büyük yazı" bind:value={$mark} />
      </div>
    </Card>
    {() => { const own = $own, copy = $copy, top = $top, mark = $mark; return <SiteFooter class="lab-footer"
      brand={own ? <OwnBrand /> as Node : { name: "Atölye", mark: sparkles, sub: "tasarım stüdyosu" }}
      about={() => `Küçük ekipler için tasarım araçları. ${$subs} abone`}
      columns={COLUMNS}
      social={[{ label: "Web", href: "#", icon: globe }, { label: "Topluluk", href: "#", icon: message }, { label: "E-posta", href: "#", icon: mail }]}
      newsletter={{ title: "Bülten", lead: "Ayda bir mektup.", button: "Abone ol", done: "Teşekkürler, görüşürüz!", motion: false,
        labels: { email: "E-posta adresin" }, onSubmit: () => { $subs++ } }}
      copyright={copy ? "© Atölye · İstanbul" : false}
      legal={[{ label: "Gizlilik", href: "#gizlilik" }, { label: "Koşullar", href: "#kosullar" }]}
      wordmark={mark ? "ATÖLYE" : undefined}
      toTop={top} toTopIcon={chevronUp} toTopLabel="Yukarı çık" /> }}
  </div>
}
