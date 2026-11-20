import { ScrollToTop, Card, Badge } from "march/ui"

// bir haber uygulamasında uzun yazı: okuma yüzdesi başlıkta, aşağı inince "yazının başına dön" düğmesi belirir
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
  let $read = 0
  const body = (<div style={{ height: "220px", overflow: "auto" }} on:scroll={(e: Event) => {
    const el = e.currentTarget as HTMLElement
    $read = Math.round((el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight)) * 100)
  }}>
    {paragraphs.map((p) => <p sx={{ mb: 3 }}>{p}</p>)}
  </div>) as HTMLElement
  return <Card title="Şehre 18 km bisiklet yolu" subtitle="Yerel · 4 dk okuma">
    <div sx={{ flex: ["row", "between", "center"], mb: 2 }}>
      <Badge tone="info">{`%${$read} okundu`}</Badge>
      <ScrollToTop inline target={body} threshold={80} label="Yazının başına dön" />
    </div>
    {body}
  </Card>
}
