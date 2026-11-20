import { HorizontalScroll } from "march/landing"
import { Card, Badge } from "march/ui"

// bir ajansın vaka çalışmaları: sayfa aşağı kayarken işler yana akar, altta ilerleme çizgisi
const CASES = [
  { tag: "Marka", title: "Kadıköy Fırını", text: "Yeni logo, ambalaj ve vitrin. Satışlar ilk ayda %18 arttı." },
  { tag: "Uygulama", title: "Bisiklet Paylaş", text: "Kiralama süresi 90 saniyeden 20 saniyeye indi." },
  { tag: "Web", title: "Ege Zeytinyağı", text: "Yeni mağaza: mobilde sepet terk oranı yarıya düştü." },
  { tag: "Kampanya", title: "Kitap Haftası", text: "Üç günde 40 bin ziyaret, 6 bin yeni üye." },
]

const CaseCard = (p: { tag: string; title: string; text: string }) => <Card>
  <div sx={{ flex: "col", gap: 2 }}>
    <Badge>{p.tag}</Badge>
    <h3 sx={{ text: "xl" }}>{p.title}</h3>
    <p sx={{ color: "muted" }}>{p.text}</p>
  </div>
</Card>

export function CaseStudies() {
  return <HorizontalScroll label="Vaka çalışmaları" panel="22rem">
    {CASES.map((c) => <CaseCard {...c} />)}
  </HorizontalScroll>
}
