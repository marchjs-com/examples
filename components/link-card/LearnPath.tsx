import { LinkCard } from "march/ui"

// March'ı öğrenme yolu: her durak bir kart; baş kısmı kocaman bir emoji (lead), sonda okuma süresi (meta)
// bağlantılar vitrinin gerçek sayfalarına gider
const path = [
  { emoji: "🔘", title: "1. Düğme", description: "Beş varyant, yükleniyor durumu", meta: "2 dk", href: "/buttons/button" },
  { emoji: "🎯", title: "2. İkon düğmesi", description: "Erişilebilir ad zorunlu, ipucu bedava", meta: "3 dk", href: "/buttons/icon-button" },
  { emoji: "🃏", title: "3. Kart", description: "Başlık, eylemler, alt bilgi", meta: "4 dk", href: "/data/card" },
]

export function LearnPath() {
  return <div sx={{ flex: "col", gap: 2 }}>
    {path.map((p) => <LinkCard href={p.href} lead={<span sx={{ text: "2xl" }}>{p.emoji}</span>} title={p.title} description={p.description} meta={p.meta} />)}
  </div>
}
