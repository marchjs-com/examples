// CoworkFeatures: the real-life FeatureGrid example.
//
// What it shows: the "what is included" section of a coworking space. Six cards in three columns with a pointer light that follows
// the mouse, and one card that links to a page.
// When to use this pattern: a landing-page section that lists what a product or place offers.
// Animation: the cards enter one after another and the light follows the pointer; reveal="none" and spotlight={false} turn them
// off, and the entrance is skipped with reduced motion.
// Accessibility: each item is an article with an h3; an item with `href` makes its title the link (one tab stop).
import { FeatureGrid } from "march/landing"
import { coffee, monitor, lock, calendar, users, phone } from "march/icons"

export function CoworkFeatures() {
  // variant="cards": a Card with an icon tile per item; cols={3}: three columns (on phones the cards stack); the pointer light
  // (spotlight) is on by default for cards. Each item is { icon, title, body, href? }: the last one has an href, so its title is a link.
  return <FeatureGrid variant="cards" cols={3} items={[
    { icon: monitor, title: "Hazır masa", body: "Ekran, sandalye ve hızlı internet: çantanı bırak, başla." },
    { icon: coffee, title: "Sınırsız kahve", body: "Yerel kavurucudan taze çekirdek, bütün gün." },
    { icon: calendar, title: "Toplantı odası", body: "Uygulamadan saatlik ayır, kapıda kodla gir." },
    { icon: lock, title: "Kilitli dolap", body: "Dizüstün ve eşyaların gece de güvende." },
    { icon: users, title: "Topluluk akşamları", body: "Her perşembe sunum, tanışma ve pizza." },
    { icon: phone, title: "Telefon kabini", body: "Görüntülü görüşmeler için sessiz kabinler.", href: "#kabinler" },
  ]} />
}
