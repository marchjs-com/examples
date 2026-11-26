// SiteFooterLab: the full-featured SiteFooter example; it uses every prop at least once.
//
// Props shown here: brand (an object or your own node), about, columns, social, newsletter, copyright (your own text or
// false), legal, wordmark, toTop, toTopIcon, toTopLabel and class.
// The switches at the top change the footer live. Use it as a reference when you need one specific option: find the prop
// below, copy the line.
// SiteFooterLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { SiteFooter } from "march/landing"
import { Toggle, Card } from "march/ui"
import { sparkles, globe, message, mail, chevronUp } from "march/icons"

// Link columns: a title and { label, href } links. Each column is drawn as a navigation landmark named by its title.
const COLUMNS = [
  { title: "Ürün", links: [{ label: "Özellikler", href: "#ozellikler" }, { label: "Fiyatlar", href: "#fiyatlar" }] },
  { title: "Şirket", links: [{ label: "Hakkımızda", href: "#hakkimizda" }, { label: "Kariyer", href: "#kariyer" }] },
]

// Your own brand node: use it when the { name, mark, sub } object is not enough. class="lab-own-brand" lets the test find it.
const OwnBrand = () => <strong sx={{ text: "lg", color: "brand-purple" }} class="lab-own-brand">◆ Atölye</strong>

export function SiteFooterLab() {
  // Plain `let $name` variables are March signals: writing one redraws whatever reads it. The first four are bound to the
  // switches; $subs counts newsletter sign-ups.
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
    {() => {
      // The switches are read here, so changing one draws the footer again. SiteFooter props, one by one:
      // - class="lab-footer": lets the tests (or your CSS) find the footer.
      // - brand: an object { name, mark (an icon), sub } or, as with the first switch, your own node.
      // - about: the short line under the brand; a function stays live, so it follows the subscriber counter.
      // - columns: the link columns. social: icon links { label, href, icon }; the label is the accessible name.
      // - newsletter: the options of the Newsletter component: title, lead, button text, `done` (the thank-you line),
      //   motion: false (no shake or fold animation), labels.email (the accessible name of the field) and onSubmit
      //   (called with the e-mail address).
      // - copyright: your own text, or false for no bottom line (the default is "(c) year name").
      // - legal: links next to the copyright line.
      // - wordmark: a big decorative word on the last line (aria-hidden); undefined leaves it out.
      // - toTop: the back-to-top button (on by default); toTopIcon: its icon; toTopLabel: its accessible name.
      // The back-to-top scroll is smooth unless the visitor prefers reduced motion.
      const own = $own, copy = $copy, top = $top, mark = $mark; return <SiteFooter class="lab-footer"
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
