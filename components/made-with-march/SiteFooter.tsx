// SiteFooter: the real-life MadeWithMarch example.
//
// What it shows: the footer of a website: three columns of links, a divider, a copyright line, and in the bottom corner
// a small, quiet "made with March" credit.
// When to use this pattern: the credit is an optional request, not a requirement (the licence stays MIT). The "small"
// variant is the compact, muted line made for footers like this one.
//
// Accessibility: the credit's link opens in a new tab, and its heart is role="img" with an accessible name. The footer
// is a real <footer> element, so it is a landmark. Animation: none.
import { MadeWithMarch, Card, Divider, Button } from "march/ui"

// The link columns of the footer: a title and the names of the links.
const columns = [
  { title: "Ürün", links: ["Özellikler", "Fiyatlar", "Sürüm notları"] },
  { title: "Şirket", links: ["Hakkımızda", "Kariyer", "İletişim"] },
  { title: "Destek", links: ["Yardım merkezi", "Durum", "Gizlilik"] },
]

export function SiteFooter() {
  return <Card>
    <footer sx={{ flex: "col", gap: 3 }}>
      {/* The columns: cols: 3 is a three-column grid. Each link is a Button in the "link" variant; passing href makes it
          a link. */}
      <div sx={{ cols: 3, gap: 3 }}>
        {columns.map((c) => <div sx={{ flex: "col", gap: 1 }}>
          <strong sx={{ text: "sm" }}>{c.title}</strong>
          {c.links.map((l) => <Button variant="link" size="sm" href={`#${l}`}>{l}</Button>)}
        </div>)}
      </div>
      <Divider />
      {/* The bottom row: the copyright text at the start and the credit at the end ("between" pushes them apart; "wrap"
          lets them stack on a narrow screen). variant="small" is the compact muted credit. */}
      <div sx={{ flex: ["row", "between", "center", "wrap"], gap: 2 }}>
        <span sx={{ text: "xs", color: "muted" }}>© 2026 Kuzey Kahve A.Ş.</span>
        <MadeWithMarch variant="small" />
      </div>
    </footer>
  </Card>
}
