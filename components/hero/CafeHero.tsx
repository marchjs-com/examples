// CafeHero: the real-life Hero example.
//
// What it shows: the opening screen of a coffee shop. Copy and actions on the left, a menu card on the right (the `split`
// look), a pill that links to the map and a short note under the buttons.
// When to use this pattern: a landing page with one product and two actions. The first action is the primary button; each
// action is an object with a label and either `onClick` or `href`.
// Accessibility: the title is an h2 (`level={2}`) because the page has its own h1; the menu card is a list with a name.
import { Hero } from "march/landing"
import { arrowRight, mapPin } from "march/icons"
import { toast } from "march/ui"

// The media on the right: a list with an accessible name. Hero's `media` takes either an image object or any node, so a
// small piece of UI like this works too.
const MenuCard = () => <div sx={{ flex: "col", gap: 2, p: 4, radius: 3 }} class="cafe-menu" role="list" aria-label="Bugünün menüsü">
  {[["Filtre kahve", "65 ₺"], ["Flat white", "85 ₺"], ["Tarçınlı çörek", "70 ₺"]].map(([name, price]) =>
    <div role="listitem" sx={{ flex: ["row", "between"], gap: 4 }}><span>{name}</span><strong>{price}</strong></div>)}
</div>

export function CafeHero() {
  // - variant="split": copy at the start, media at the end. size="md": medium minimum height. level={2}: the title is an h2.
  // - eyebrow + eyebrowHref: the pill above the title; with an href it becomes a link.
  // - title + highlight: `highlight` is the part of the title drawn in the brand gradient.
  // - lead: the paragraph under the title.
  // - actions: the first is the primary button. iconEnd puts an icon after the label, icon before it. onClick runs code,
  //   href makes a link.
  // - note: small text under the actions. media: here our own node.
  return <Hero variant="split" size="md" level={2} eyebrow="Kadıköy · 08.00–22.00" eyebrowHref="#harita"
    title="Sabah kahven hazır" highlight="hazır"
    lead="Taze kavrulmuş çekirdek, ev yapımı çörek. Sıraya girme: yoldayken sipariş ver, gelince al."
    actions={[{ label: "Sipariş ver", iconEnd: arrowRight, onClick: () => toast("Siparişin alındı") }, { label: "Yol tarifi", icon: mapPin, href: "#harita" }]}
    note="İlk kahve bizden" media={<MenuCard /> as Node} />
}
