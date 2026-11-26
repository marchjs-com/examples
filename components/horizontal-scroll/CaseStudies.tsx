// CaseStudies: the real-life HorizontalScroll example.
//
// What it shows: an agency's case studies. While the page scrolls down, the cards move sideways, and a progress line under
// them shows how far you are.
// When to use this pattern: a short story told in a row of cards on a landing page. The section is pinned: the vertical
// scroll distance equals the track's overflow, so the last card arrives exactly as the section ends.
// Motion and touch: on touch screens and with reduced motion the section becomes a native sideways scroller with snap
// points instead, so nothing is lost. Keyboard users reach every card with Tab (the page scrolls to it).
import { HorizontalScroll } from "march/landing"
import { Card, Badge } from "march/ui"

// The case studies: a tag, a title and a short result each.
const CASES = [
  { tag: "Marka", title: "Kadıköy Fırını", text: "Yeni logo, ambalaj ve vitrin. Satışlar ilk ayda %18 arttı." },
  { tag: "Uygulama", title: "Bisiklet Paylaş", text: "Kiralama süresi 90 saniyeden 20 saniyeye indi." },
  { tag: "Web", title: "Ege Zeytinyağı", text: "Yeni mağaza: mobilde sepet terk oranı yarıya düştü." },
  { tag: "Kampanya", title: "Kitap Haftası", text: "Üç günde 40 bin ziyaret, 6 bin yeni üye." },
]

// One panel: a Card with a Badge for the tag, the title and the text. Panels can be any element.
const CaseCard = (p: { tag: string; title: string; text: string }) => <Card>
  <div sx={{ flex: "col", gap: 2 }}>
    <Badge>{p.tag}</Badge>
    <h3 sx={{ text: "xl" }}>{p.title}</h3>
    <p sx={{ color: "muted" }}>{p.text}</p>
  </div>
</Card>

export function CaseStudies() {
  // - label: names the region for screen readers.
  // - panel="22rem": the width of every child (the default is min(80vw, 32rem)).
  // - progress and pinned keep their defaults (both on). Children are the panels.
  return <HorizontalScroll label="Vaka çalışmaları" panel="22rem">
    {CASES.map((c) => <CaseCard {...c} />)}
  </HorizontalScroll>
}
