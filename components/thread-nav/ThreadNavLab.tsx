import { ThreadNav, Toggle, threadPath, type ThreadNavItem } from "march/ui"

// ThreadNav'ın bütün özellikleri bir arada: items (id, label, desc, count, color, href, children; kategorisiz bir
// bölüm), value, onNavigate (öğe ve yol), fixed, magnify, reach, grow, bend, search, crumbs, closeOnNavigate,
// labels (group, search, close, empty) ve class; anahtarlar özellikleri canlı açıp kapatır

// bir yer: bölüm, kategori ya da sayfa (ThreadNav'ın öğe biçimi)
type Item = ThreadNavItem
const tree: Item[] = [
  { id: "start", label: "Başla", desc: "Kur ve öğren", color: "brand-orange", children: [
    { id: "setup", label: "Kurulum adımları", desc: "Depodan kur, ilk sayfa", count: 2, children: [
      { id: "install", label: "Depodan kur" }, { id: "cli", label: "march CLI", desc: "Geliştir, derle, denetle" },
    ] },
  ] },
  { id: "components", label: "Bileşenler", desc: "Arayüzün yapı taşları", color: "brand-blue", children: [
    { id: "forms", label: "Formlar", desc: "Alanlar ve seçiciler", count: 2, children: [{ id: "field", label: "Alan" }, { id: "select", label: "Seçim" }] },
    { id: "charts", label: "Grafikler", desc: "Çizgi, çubuk, pasta", count: 3, children: [
      { id: "line", label: "Çizgi" }, { id: "bar", label: "Çubuk", desc: "Gruplu ya da yatay" }, { id: "pie", label: "Pasta" },
    ] },
  ] },
  { id: "look", label: "Görünüm", desc: "Tema ve ikon", color: "brand-green", children: [
    { id: "themes", label: "Temalar", count: 1, children: [{ id: "presets", label: "Hazır temalar" }] },
  ] },
  { id: "about", label: "Hakkında", desc: "Sayfasız kategoriler: bağlantılar", color: "brand-purple", children: [
    { id: "notes", label: "Sürüm notları", href: "https://marchjs.com", desc: "Bağlantı: href verilen öğe bir a olur" },
  ] },
  { id: "profile", label: "Profil", desc: "Kategorisiz bölüm: boncuk kendisi gider", color: "brand-pink" },
]

export function ThreadNavLab() {
  let $page = "line"
  let $magnify = true
  let $bend = true
  let $search = true
  let $crumbs = true
  let $close = true
  let $last = ""
  return <div sx={{ flex: "row", gap: 4 }}>
    <div style={{ "block-size": "26rem" }}>
      <ThreadNav items={tree} value={$page} fixed={false} class="lab-thread"
        magnify={$magnify} reach={160} grow={30} bend={$bend} search={$search} crumbs={$crumbs} closeOnNavigate={$close}
        labels={{ group: "Lab gezinme", search: "Lab'da ara", close: "Kapsülü kapat", empty: "Burada bir şey yok" }}
        onNavigate={(it: Item, path: readonly Item[]) => { $page = it.id; $last = path.map((x: Item) => x.label).join(" › ") }} />
    </div>
    <div sx={{ flex: "col", gap: 2 }}>
      <Toggle bind:value={$magnify} label="Büyüteç (magnify)" />
      <Toggle bind:value={$bend} label="İplik eğilsin (bend)" />
      <Toggle bind:value={$search} label="Kapsülde arama (search)" />
      <Toggle bind:value={$crumbs} label="Konum yolu (crumbs)" />
      <Toggle bind:value={$close} label="Seçince kapan (closeOnNavigate)" />
      <span sx={{ text: "lg" }}>{`Sayfa: ${threadPath(tree, $page).at(-1)?.label ?? "—"}`}</span>
      <span sx={{ text: "sm", color: "muted" }}>{`Seçilen: ${$last || "henüz yok"}`}</span>
    </div>
  </div>
}
