import { ThreadNav, Card, Badge, Button, threadPath, toast, type ThreadNavItem } from "march/ui"

// bir mağazanın yönetim paneli: bölümler iplikte, kategoriler kapsülde (sayılarıyla), sayfalar alt iplikte;
// kapalıyken kapsül konum yolunu gösterir, sağda seçilen sayfanın içeriği

// bir yer: bölüm, kategori ya da sayfa (ThreadNav'ın öğe biçimi)
type Item = ThreadNavItem
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

// her sayfanın bekleyen iş sayısı (gerçekte bir query() olurdu)
const waiting: Record<string, number> = { new: 12, shipping: 31, pending: 4, low: 7, out: 2 }

export function ShopAdmin() {
  let $page = "new"
  const path = () => threadPath(sections, $page)
  const here = () => path().at(-1)
  return <div sx={{ flex: "row", gap: 3 }}>
    <div style={{ "block-size": "24rem" }}>
      <ThreadNav items={sections} value={$page} onNavigate={(it: Item) => $page = it.id}
        labels={{ group: "Yönetim", search: "Panelde ara", close: "Kapat", empty: "Böyle bir sayfa yok" }} />
    </div>
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
