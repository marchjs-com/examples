import { LinkCard, Grid, SectionLabel } from "march/ui"
import { users, calendar, layers, folder } from "march/icons"

// bir topluluk yönetim panelinin ana sayfası: her bölüm bir kart (ikon karosu, ton, açıklama, sondaki sayı)
// bağlantılar vitrinde o bölümü gösteren bileşen sayfalarına gider
const sections = [
  { icon: users, tone: "primary", title: "Üyeler", description: "Ara, davet et, rolleri yönet", meta: "128", href: "/data/table" },
  { icon: calendar, tone: "success", title: "Etkinlikler", description: "Bu haftanın buluşmaları", meta: "12", href: "/data/timeline" },
  { icon: layers, tone: "warn", title: "Görevler", description: "Gönüllülerin panosu", meta: "7 açık", href: "/data/kanban" },
  { icon: folder, tone: "violet", title: "Belgeler", description: "Tüzük, tutanaklar, afişler", href: "/data/tree" },
] as const

export function AdminHome() {
  return <div sx={{ flex: "col", gap: 2 }}>
    <SectionLabel count={sections.length}>Yönetim</SectionLabel>
    <Grid cols={2}>
      {sections.map((s) => <LinkCard href={s.href} icon={s.icon} tone={s.tone} title={s.title} description={s.description} meta={"meta" in s ? s.meta : undefined} />)}
    </Grid>
  </div>
}
