// AdminHome: the real-life LinkCard example.
//
// What it shows: the home page of a community admin panel: one card per section (Members, Events, Tasks, Documents),
// each with an icon tile, a tone, a description and, where it makes sense, a small count at the end. The whole card is
// a link to the page of that section.
// When to use this pattern: dashboards and section index pages, where every entry point is "icon, name, one line, a
// number". The data is a plain array, so adding a section is adding one object.
//
// Accessibility: each card is one <a>; its text (title, description, meta) is the accessible name and the icon tile
// and hover arrow are decorative. Keyboard focus shows the link's own ring and the arrow.
// Animation: the hover lift and the arrow slide are turned off by reduced motion.
import { LinkCard, Grid, SectionLabel } from "march/ui"
import { users, calendar, layers, folder } from "march/icons"

// The sections. `tone` colours the icon tile (primary, success, warn, violet are tile tones). `as const` keeps the
// literal values so the tones type-check. The links go to the component pages of the showcase that show that section.
// The last section has no `meta`, which is fine: it is optional.
const sections = [
  { icon: users, tone: "primary", title: "Üyeler", description: "Ara, davet et, rolleri yönet", meta: "128", href: "/data/table" },
  { icon: calendar, tone: "success", title: "Etkinlikler", description: "Bu haftanın buluşmaları", meta: "12", href: "/data/timeline" },
  { icon: layers, tone: "warn", title: "Görevler", description: "Gönüllülerin panosu", meta: "7 açık", href: "/data/kanban" },
  { icon: folder, tone: "violet", title: "Belgeler", description: "Tüzük, tutanaklar, afişler", href: "/data/tree" },
] as const

export function AdminHome() {
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* SectionLabel: a small heading with a count. Grid cols={2}: the cards sit in two columns. */}
    <SectionLabel count={sections.length}>Yönetim</SectionLabel>
    <Grid cols={2}>
      {/* href makes the whole card the link; icon + tone draw the tile; title, description and meta fill the card.
          `"meta" in s` checks whether this section has a count, because the last one does not. */}
      {sections.map((s) => <LinkCard href={s.href} icon={s.icon} tone={s.tone} title={s.title} description={s.description} meta={"meta" in s ? s.meta : undefined} />)}
    </Grid>
  </div>
}
