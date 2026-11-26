// ArticleReader: the real-life ScrollToTop example.
//
// What it shows: a long news article in a box that scrolls by itself. A badge shows how much has been read, and a
// "back to the top of the article" button appears in the header once the reader has scrolled a little.
// When to use this pattern: any scrolling container (an article pane, a chat log, a side panel) where the page's own
// corner button would be the wrong target. `inline` + `target` keep the button next to the content it belongs to.
import { ScrollToTop, Card, Badge } from "march/ui"

// The article text: plain data so a real page could fetch it.
const paragraphs = [
  "Belediye meclisi dün akşam yeni bisiklet yolu planını oyladı.",
  "Plan, şehrin doğu ve batı yakasını 18 kilometrelik kesintisiz bir hatla birleştiriyor.",
  "İlk etap ilkbaharda başlayacak; okul çevreleri önceliğe alındı.",
  "Esnaf temsilcileri park yerlerinin azalacağından kaygılı.",
  "Ulaşım müdürlüğü, kaybedilen her park yerine yakın sokaklarda yenisinin açılacağını söylüyor.",
  "Bisiklet derneği ise kararı on yıllık bir mücadelenin sonucu olarak görüyor.",
  "Projenin toplam bütçesi 240 milyon lira olarak açıklandı.",
  "Çalışmaların iki yıl içinde tamamlanması bekleniyor.",
]

export function ArticleReader() {
  // `let $read` is a March signal: the scroll handler writes it and the badge redraws.
  let $read = 0
  // The scrolling box. It is created first, as an element in a variable, because ScrollToTop needs the element itself
  // as its `target`. A fixed height with overflow: auto is what makes the box scroll on its own. The on:scroll handler
  // turns scrollTop into a percentage (the Math.max(1, …) avoids dividing by zero when nothing can scroll).
  const body = (<div style={{ height: "220px", overflow: "auto" }} on:scroll={(e: Event) => {
    const el = e.currentTarget as HTMLElement
    $read = Math.round((el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight)) * 100)
  }}>
    {paragraphs.map((p) => <p sx={{ mb: 3 }}>{p}</p>)}
  </div>) as HTMLElement
  return <Card title="Şehre 18 km bisiklet yolu" subtitle="Yerel · 4 dk okuma">
    <div sx={{ flex: ["row", "between", "center"], mb: 2 }}>
      <Badge tone="info">{`%${$read} okundu`}</Badge>
      {/* ScrollToTop options used here:
          - inline: draws the button where it is written (in this header) instead of in the page corner.
          - target={body}: the box to watch and to scroll back to the top; without it the button follows whatever
            the user scrolled last.
          - threshold={80}: it appears after 80 px of scrolling (the default is 320).
          - label: the accessible name and tooltip (the default is a translated "Back to top").
          While it is hidden the button is inert, so Tab and screen readers skip it. Smooth scrolling is on by default
          and, like the appear motion, follows reduced motion. */}
      <ScrollToTop inline target={body} threshold={80} label="Yazının başına dön" />
    </div>
    {body}
  </Card>
}
