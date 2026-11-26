// PlanetGuide: the creative-minimal NavMenu example.
//
// A guide to the planets: every planet is a page with an emoji as its icon, in two groups. The filter box finds a
// planet by a hidden clue as well as by its name: type a clue word and the planet appears. Use this pattern when a menu
// is searchable by more than the visible title (synonyms, tags, nicknames) and the icons can be any short text.
import { NavMenu } from "march/ui"

// Links stay inside this page (a #fragment of the current path), so clicking never leaves the example.
const at = (id: string) => `${location.pathname}#${id}`

export function PlanetGuide() {
  // - brand: a free node in the top slot. label: the accessible name of the <nav> landmark.
  // - palette={false}: do not register these pages with the command palette (on by default).
  // - storageKey: where pins, recent pages and open groups are saved in localStorage; a distinct key keeps this menu's
  //   state apart from other menus on the site.
  // - labels.filterPlaceholder: replaces just one text; the other texts keep their translated defaults.
  // - items: `group` builds the collapsible headings; `icon` accepts a short string such as an emoji (not only an
  //   icon definition); `keywords` are extra words the filter box matches, so a clue word finds a planet although it is
  //   not in the title; `badge` shows a small count (here a fixed number).
  // The active item follows the router path and gets aria-current="page"; the group headers are buttons with
  // aria-expanded, so the whole menu works with the keyboard and a screen reader.
  return <NavMenu brand={<strong>🪐 Güneş sistemi</strong>} label="Gezegen rehberi" palette={false} storageKey="ornek.gezegenler"
    labels={{ filterPlaceholder: "Gezegen ara… (kızıl, halka)" }} items={[
      { id: "mercury", title: "Merkür", href: at("mercury"), icon: "☿️", group: "İç gezegenler", keywords: "en küçük sıcak" },
      { id: "venus", title: "Venüs", href: at("venus"), icon: "♀️", group: "İç gezegenler", keywords: "çoban yıldızı parlak" },
      { id: "earth", title: "Dünya", href: at("earth"), icon: "🌍", group: "İç gezegenler", keywords: "ev mavi" },
      { id: "mars", title: "Mars", href: at("mars"), icon: "🔴", group: "İç gezegenler", keywords: "kızıl gezegen" },
      { id: "jupiter", title: "Jüpiter", href: at("jupiter"), icon: "🟠", group: "Dış gezegenler", keywords: "dev fırtına", badge: 95 },
      { id: "saturn", title: "Satürn", href: at("saturn"), icon: "🪐", group: "Dış gezegenler", keywords: "halka" },
      { id: "uranus", title: "Uranüs", href: at("uranus"), icon: "🧊", group: "Dış gezegenler", keywords: "buz yan yatmış" },
      { id: "neptune", title: "Neptün", href: at("neptune"), icon: "🔵", group: "Dış gezegenler", keywords: "rüzgar uzak" },
    ]} />
}
