// ThreadNavLab: the full-featured ThreadNav example.
//
// What it shows: every ThreadNav option: items (id, label, desc, count, color, href, children, and a section with no
// categories), value, onNavigate (it receives the item and the path), fixed, magnify, reach, grow, bend, search, crumbs,
// closeOnNavigate, labels (group, search, close, empty) and class. Five toggles next to it switch the options on and off live.
// Use it as a catalogue: copy the prop you need.
//
// Animation: the beads magnify like a dock near the pointer (`magnify`, with `reach` and `grow` for how far and how much),
// the thread bends toward the pointer (`bend`), and the drop flows between places, all on March's motion engine, so the global
// speed, "Stop all" and the visitor's reduced-motion preference apply (under reduced motion the thread stays straight and the
// drop does not stretch). The toggles here turn magnify and bend off.
// Accessibility: the rail is a nav (named by `labels.group`) with one tab stop (the bead of where you are). Up and Down move
// between beads; Right, Enter or Space opens the capsule; in the capsule Up and Down move through the rows, Right opens a
// category, Left goes back, Escape closes and returns to the bead. Where you are has aria-current; a bead with a capsule has
// aria-expanded.
import { ThreadNav, Toggle, threadPath, type ThreadNavItem } from "march/ui"

// A place: a section, a category or a page (the item shape of ThreadNav).
type Item = ThreadNavItem
// The tree. "about" has a category with an `href` (an item with href is a link); "profile" has no children, so its bead goes
// to the page itself.
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
  // Reactive state: the id of where you are, the five option switches, and the path of the last chosen page as text.
  let $page = "line"
  let $magnify = true
  let $bend = true
  let $search = true
  let $crumbs = true
  let $close = true
  let $last = ""
  return <div sx={{ flex: "row", gap: 4 }}>
    {/* ThreadNav fills its place: the box around it gives the capsule's height. items: the tree. value: the id of where you
        are. fixed={false}: it fills this box instead of sitting at the screen's start edge. magnify, reach and grow: the dock
        magnifier on or off, how far it reaches (px) and the room a fully magnified bead takes (px). bend: the thread bends toward
        the pointer. search: the search field in the capsule. crumbs: while the capsule is closed, a small capsule shows the
        path to where you are. closeOnNavigate: close the capsule once a place is chosen. labels: our own texts. onNavigate
        receives the chosen item and the path of items down to it. */}
    <div style={{ "block-size": "26rem" }}>
      <ThreadNav items={tree} value={$page} fixed={false} class="lab-thread"
        magnify={$magnify} reach={160} grow={30} bend={$bend} search={$search} crumbs={$crumbs} closeOnNavigate={$close}
        labels={{ group: "Lab gezinme", search: "Lab'da ara", close: "Kapsülü kapat", empty: "Burada bir şey yok" }}
        onNavigate={(it: Item, path: readonly Item[]) => { $page = it.id; $last = path.map((x: Item) => x.label).join(" › ") }} />
    </div>
    {/* The switches (Toggle with bind:value) and two lines that show what ThreadNav reported. */}
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
