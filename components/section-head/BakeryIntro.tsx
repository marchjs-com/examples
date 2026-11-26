// BakeryIntro: the real-life SectionHead example.
//
// What it shows: the opening block of an order section on a neighbourhood bakery's site: a small eyebrow that links to
// a news item, the headline, a lead paragraph, two actions (one primary, one secondary) and a reassuring note.
// When to use this pattern: the top of any landing-page section. Every part is optional, so the same component also
// makes a plain title with a lead, or a call to action with only buttons (see HeadlineDice and SectionHeadLab).
import { SectionHead } from "march/landing"
import { arrowRight, mapPin } from "march/icons"

export function BakeryIntro() {
  // SectionHead options used here (everything else keeps its default: an h2 title, medium scale, centred, no entrance):
  // - eyebrow: the small line above the title (text is drawn uppercase in the accent colour; the uppercase is CSS
  //   only). eyebrowHref turns it into a link.
  // - title and lead: the heading (a real heading element, so pick the level with `as` when the page outline needs
  //   it) and the paragraph under it.
  // - actions: a list of buttons given as plain objects { label, href, icon, iconEnd, ... }; the first one is drawn as
  //   the primary button. `icon` puts an icon before the label and `iconEnd` after it.
  // - note: the small text under the actions.
  return <SectionHead eyebrow="Yeni: ekşi mayalı çavdar" eyebrowHref="#cavdar"
    title="Ekmeğin sabah 7'de kapında" lead="Gece yoğrulur, şafakta pişer. Siparişini akşam 10'a kadar ver, sabah sıcak sıcak gelsin."
    actions={[{ label: "Sipariş ver", href: "#siparis", iconEnd: arrowRight }, { label: "Fırını bul", href: "#harita", icon: mapPin }]}
    note="Cihangir, Firuzağa ve Çukurcuma'ya ücretsiz teslimat" />
}
