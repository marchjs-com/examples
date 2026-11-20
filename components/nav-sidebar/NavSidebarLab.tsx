import { NavSidebar, Segmented, Button, Badge } from "march/ui"
import { dashboard, shoppingBag, users, shield, settings, barChart, inbox } from "march/icons"

// NavSidebar'ın bütün özellikleri: başlık ve alt satır, öne çıkanlar, son bakılanlar, kategori ve öğe sırası, kategori
// ikonları, ilk açılış, arama (yer tutucu, kısayol), daraltılabilir ray, genişlik tutamağı (en az / en çok, daraltma
// eşiği, onResize), bölüm süzme (visibleGroups), satır boyu, taşan açıklama, dar ekran çekmecesi (open / onOpenChange),
// kendi metinler, yüzen buzlu cam görünüm, alt sayfalar ve sınıf
const SECTIONS = [{ value: "all", label: "Hepsi" }, { value: "Satış", label: "Satış" }, { value: "Yönetim", label: "Yönetim" }]

export function NavSidebarLab() {
  let $page = "-"
  let $unread = 4
  let $section = "all"
  let $glass = false
  let $open = false
  let $width = 260
  const pick = (id: string) => () => { $page = id }
  const items = [
    { id: "orders", label: "Siparişler", group: "Satış", icon: shoppingBag, sub: () => `${$unread} yeni sipariş bekliyor`, badge: () => $unread,
      badgeTone: "danger" as const, keywords: "sipariş order", onSelect: () => { $page = "orders"; $unread = 0 } },
    { id: "invoices", label: "Faturalar", group: "Satış", sub: "Kesilen, bekleyen ve gecikmiş faturalar", onSelect: pick("invoices") },
    { id: "late", label: "Gecikenler", group: "Satış", parent: "invoices", sub: "30 günü geçen", badge: 2, onSelect: pick("late") },
    { id: "users", label: "Kullanıcılar", group: "Yönetim", icon: users, onSelect: pick("users") },
    { id: "roles", label: "Roller", group: "Yönetim", icon: shield, badge: "yeni", badgeTone: "primary" as const, onSelect: pick("roles") },
    { id: "secret", label: "Gizli sayfa", group: "Yönetim", hidden: true },
    { id: "reports", label: "Raporlar", group: "Analiz", icon: barChart, can: () => true, onSelect: pick("reports") },
  ]
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Segmented aria-label="Bölüm" options={SECTIONS} bind:value={$section} />
      <Button size="sm" variant="ghost" on:click={() => $glass = !$glass}>{$glass ? "Düz görünüm" : "Buzlu cam"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $open = true}>Çekmeceyi aç</Button>
      <Badge tone="primary">{`Sayfa: ${$page}`}</Badge>
      <span sx={{ text: "xs", color: "muted" }}>{`${$width} px`}</span>
    </div>
    <NavSidebar items={items} title="HADİ Yönetim" subtitle="Mağaza paneli" class="lab-sb" label="Laboratuvar menüsü"
      featured={[{ id: "inbox", label: "Destek kutusu", icon: inbox, badge: () => $unread, onSelect: pick("inbox") }]}
      recent={3} groupOrder={["Yönetim", "Satış"]} itemOrder="none" groupIcons={{ Satış: dashboard, Yönetim: settings, Analiz: barChart }}
      defaultOpen="all" placeholder="Menüde ara…" hotkey="focus" shortcut="mod+j" palette={false} storageKey="lab.sidebar"
      collapsible width={$width} resizable minWidth={200} maxWidth={420} collapseBelow={160} persist={false}
      onResize={(w) => $width = Math.round(w)}
      search headings expandAll groupCounts groupHeads nestedSubs itemSize="md" subOverflow="ellipsis"
      visibleGroups={() => ($section === "all" ? null : [$section])}
      sheetSide="start" menuButton open={() => $open} onOpenChange={(o) => $open = o}
      labels={{ search: "Menüde ara", clearSearch: "Aramayı temizle", noMatches: "Bulunamadı", results: "Sonuçlar", recent: "Son bakılanlar",
        categories: "Bölümler", expandAll: "Hepsini aç", collapseAll: "Hepsini kapat", menu: "Menü", expandSidebar: "Menüyü genişlet",
        collapseSidebar: "Menüyü daralt", resize: "Genişliği değiştir", showUnder: (l) => `${l} altını göster`, hideUnder: (l) => `${l} altını gizle` }}
      floating={() => $glass} glass={() => $glass} subMenus="inline" pinCurrent={false}
      footer={<span sx={{ text: "xs", color: "muted" }}>Sürüm 0.2.0</span>} />
  </div>
}
