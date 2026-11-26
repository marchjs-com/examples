// LearnPath: the creative-minimal LinkCard example.
//
// What it shows: a learning path where every stop is a card. Instead of the icon tile, each card starts with a large
// emoji (`lead`), and ends with the reading time (`meta`).
// When to use this pattern: tutorials, onboarding checklists, "next steps" lists: any ordered set of links where the
// first thing the eye should find is a picture or a number. `lead` accepts any node (an emoji, an avatar, an image).
//
// Accessibility: each card is a single <a>, named by its title, description and meta together. Animation: the hover
// lift and arrow slide are turned off by reduced motion.
import { LinkCard } from "march/ui"

// The stops of the path. The links go to real pages of the showcase.
const path = [
  { emoji: "🔘", title: "1. Düğme", description: "Beş varyant, yükleniyor durumu", meta: "2 dk", href: "/buttons/button" },
  { emoji: "🎯", title: "2. İkon düğmesi", description: "Erişilebilir ad zorunlu, ipucu bedava", meta: "3 dk", href: "/buttons/icon-button" },
  { emoji: "🃏", title: "3. Kart", description: "Başlık, eylemler, alt bilgi", meta: "4 dk", href: "/data/card" },
]

export function LearnPath() {
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* lead replaces the default icon tile with your own start content (here a big emoji, so it is sized with
        text: "2xl"). meta is the small text at the end. */}
    {path.map((p) => <LinkCard href={p.href} lead={<span sx={{ text: "2xl" }}>{p.emoji}</span>} title={p.title} description={p.description} meta={p.meta} />)}
  </div>
}
