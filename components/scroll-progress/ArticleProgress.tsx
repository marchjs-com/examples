import { ScrollProgress } from "march/landing"
import { Card } from "march/ui"

// bir blog yazısı: başlığın altındaki çubuk yalnız bu yazının ne kadarının okunduğunu ölçer
const PARAGRAPHS = [
  "Kahveyi demlemeden önce suyu 92 dereceye getir; kaynar su çekirdeği yakar.",
  "Öğütme boyu demleme süresini belirler: filtre için orta, espresso için ince.",
  "Oran: 15 gram kahveye 250 mililitre su. Terazi, göz kararından iyidir.",
  "İlk 30 saniye kahveyi az suyla ıslat; gaz çıkınca tadı daha temiz olur.",
]

export function ArticleProgress() {
  let article: Element | null = null
  return <Card>
    <article ref={(el: Element) => { article = el }} sx={{ flex: "col", gap: 3 }}>
      <h2 sx={{ text: "xl" }}>Evde iyi filtre kahve</h2>
      <ScrollProgress target={() => article} position="inline" paint="accent" label="Yazının okunan kısmı" />
      {PARAGRAPHS.map((t) => <p>{t}</p>)}
      <p sx={{ color: "muted", text: "sm" }}>Okuma süresi: 2 dakika</p>
    </article>
  </Card>
}
