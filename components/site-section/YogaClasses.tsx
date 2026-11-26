// YogaClasses: the real-life SiteSection example.
//
// What it shows: the class-schedule section of a yoga studio's website: a muted band with a heading group (eyebrow,
// title, lead) and a grid of class cards inside it.
// When to use this pattern: every block of a marketing page. A page is a stack of SiteSections; each gives the block its
// content width, vertical rhythm, tone and heading, so the blocks line up without extra CSS.
import { SiteSection } from "march/landing"
import { Card, Badge } from "march/ui"

// The classes: a name, the time and the level.
const CLASSES = [
  { name: "Sabah akışı", time: "Pzt · Çar · Cum 07:30", level: "Herkes" },
  { name: "Yin yoga", time: "Salı 19:00", level: "Başlangıç" },
  { name: "Güç yogası", time: "Perşembe 18:30", level: "İleri" },
]

// One class card: the name, the time and a Badge for the level.
const ClassCard = (p: { name: string; time: string; level: string }) => <Card>
  <div sx={{ flex: "col", gap: 2 }}>
    <strong sx={{ text: "lg" }}>{p.name}</strong>
    <span sx={{ color: "muted" }}>{p.time}</span>
    <div><Badge tone="primary">{p.level}</Badge></div>
  </div>
</Card>

export function YogaClasses() {
  // SiteSection options used here (the rest keep their defaults: centred heading, content width "default", medium space):
  // - id="dersler": the anchor, so a link such as #dersler scrolls to this section.
  // - tone="muted": a softly tinted background, to set the block apart from the plain ones around it.
  // - eyebrow, title, lead: the heading group. It enters with a Reveal animation by default (reveal={false} turns it off);
  //   it honours reduced motion. The section is a <section> named by its title (aria-labelledby).
  // - m:color="brand-green": a common prop (it works on every component) that sets the colour token of the section and
  //   everything in it.
  // The children are drawn under the heading group; here a grid of cards (grid: "fit" in sx).
  return <SiteSection id="dersler" tone="muted" eyebrow="Ders programı" title="Haftaya nefes al"
    lead="Moda'daki stüdyomuzda her seviyeye uygun dersler. İlk ders ücretsiz." m:color="brand-green">
    <div sx={{ grid: "fit", gap: 4 }}>
      {CLASSES.map((c) => <ClassCard {...c} />)}
    </div>
  </SiteSection>
}
