// ShopAdmin: the real-life ThreadNav example.
//
// What it shows: the admin panel of a shop. The sections (sales, catalogue, customers) are beads on the thread, the
// categories in the capsule carry counts, and the pages hang from a category on a second thread. While the capsule is
// closed, a small capsule shows the path to where you are (section › category › page). On the right, a card shows the chosen
// page, its path, a count of waiting items and a button that is disabled when nothing waits.
// When to use this pattern: the navigation of an app with many pages that you want to keep out of the way. ThreadNav only
// reports where the user went (`onNavigate`); you keep the current page in your state and draw the content yourself.
// threadPath(items, id) gives the path to an item, which is handy for a breadcrumb line. A section without children
// (the last section, customers) is a bead that goes to the page itself.
//
// Animation: the beads magnify like a dock near the pointer, the thread bends toward it, and the drop flows between places,
// all on March's motion engine, so the global speed, "Stop all" and the visitor's reduced-motion preference apply (under
// reduced motion the thread stays straight and the drop does not stretch). `magnify={false}` and `bend={false}` switch the
// first two off for one ThreadNav (see ThreadNavLab).
// Accessibility: the rail is a nav (named by `labels.group`) with one tab stop (the bead of where you are). Up and Down move
// between beads; Right, Enter or Space opens the capsule; in the capsule Up and Down move through the rows, Right opens a
// category, Left goes back, Escape closes and returns to the bead. Where you are has aria-current; a bead with a capsule has
// aria-expanded.
import { ThreadNav, Card, Badge, Button, threadPath, toast, type ThreadNavItem } from "march/ui"

// A place: a section, a category or a page (the item shape of ThreadNav).
type Item = ThreadNavItem
// The tree: `desc` is the line shown under the capsule while a row is pointed at; `count` is the number beside a category;
// `color` (a colour token) tints a section's drop and capsule; children make the next level.
const sections: Item[] = [
  { id: "sales", label: "Satış", desc: "Siparişler ve iadeler", color: "brand-orange", children: [
    { id: "orders", label: "Siparişler", desc: "Bugün gelenler, kargodakiler", count: 3, children: [
      { id: "new", label: "Yeni", desc: "Onay bekleyen siparişler" },
      { id: "shipping", label: "Kargoda", desc: "Yolda olan paketler" },
      { id: "delivered", label: "Teslim edildi", desc: "Son 30 gün" },
    ] },
    { id: "returns", label: "İadeler", desc: "Bekleyen ve onaylanan", count: 2, children: [
      { id: "pending", label: "Bekleyen iadeler" },
      { id: "approved", label: "Onaylanan iadeler" },
    ] },
  ] },
  { id: "catalog", label: "Katalog", desc: "Ürünler ve stok", color: "brand-blue", children: [
    { id: "products", label: "Ürünler", count: 2, children: [{ id: "all", label: "Tüm ürünler" }, { id: "drafts", label: "Taslaklar" }] },
    { id: "stock", label: "Stok", count: 2, children: [{ id: "low", label: "Azalan stok" }, { id: "out", label: "Tükenenler" }] },
  ] },
  { id: "customers", label: "Müşteriler", desc: "Kategorisiz: boncuk sayfanın kendisi", color: "brand-green" },
]

// The number of waiting items per page (in a real app this would come from a query()).
const waiting: Record<string, number> = { new: 12, shipping: 31, pending: 4, low: 7, out: 2 }

export function ShopAdmin() {
  // Reactive state: the id of the chosen page. `path` is the chain of items from the section down to it, and `here` is the
  // page itself.
  let $page = "new"
  const path = () => threadPath(sections, $page)
  const here = () => path().at(-1)
  return <div sx={{ flex: "row", gap: 3 }}>
    {/* ThreadNav fills its place: the box around it gives the capsule's height. items: the tree. value: the id of where you
        are. onNavigate receives the chosen item. labels: our own texts (the nav's accessible name, the search field, the close
        button and the "nothing found" line). */}
    <div style={{ "block-size": "24rem" }}>
      <ThreadNav items={sections} value={$page} onNavigate={(it: Item) => $page = it.id}
        labels={{ group: "Yönetim", search: "Panelde ara", close: "Kapat", empty: "Böyle bir sayfa yok" }} />
    </div>
    {/* The content of the chosen page: its title, its path as the subtitle, and the waiting count. */}
    <div sx={{ flex: "grow" }}>
      <Card title={here()?.label} subtitle={path().map((x: Item) => x.label).join(" › ")}>
        <div sx={{ flex: "col", gap: 2 }}>
          <span sx={{ color: "muted" }}>{here()?.desc ?? "Bu sayfada bekleyen bir açıklama yok."}</span>
          <div sx={{ flex: "row", gap: 2 }}>
            <Badge count={waiting[$page] ?? 0} />
            <span>{waiting[$page] ? "iş bekliyor" : "her şey yolunda"}</span>
          </div>
          <Button size="sm" variant="primary" disabled={!waiting[$page]} on:click={() => toast(`${here()?.label}: hepsi işlendi`)}>Hepsini işle</Button>
        </div>
      </Card>
    </div>
  </div>
}
