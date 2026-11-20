import { MadeWithMarch, Card, Divider, Button } from "march/ui"

// bir sitenin alt bilgisi: bağlantı sütunları, telif satırı ve sağ altta küçük, sessiz bir imza
const columns = [
  { title: "Ürün", links: ["Özellikler", "Fiyatlar", "Sürüm notları"] },
  { title: "Şirket", links: ["Hakkımızda", "Kariyer", "İletişim"] },
  { title: "Destek", links: ["Yardım merkezi", "Durum", "Gizlilik"] },
]

export function SiteFooter() {
  return <Card>
    <footer sx={{ flex: "col", gap: 3 }}>
      <div sx={{ cols: 3, gap: 3 }}>
        {columns.map((c) => <div sx={{ flex: "col", gap: 1 }}>
          <strong sx={{ text: "sm" }}>{c.title}</strong>
          {c.links.map((l) => <Button variant="link" size="sm" href={`#${l}`}>{l}</Button>)}
        </div>)}
      </div>
      <Divider />
      <div sx={{ flex: ["row", "between", "center", "wrap"], gap: 2 }}>
        <span sx={{ text: "xs", color: "muted" }}>© 2026 Kuzey Kahve A.Ş.</span>
        <MadeWithMarch variant="small" />
      </div>
    </footer>
  </Card>
}
