// NavSidebarLab: the full-featured NavSidebar example; it uses (almost) every prop at least once.
//
// NavSidebar is the app's side menu: categories that fold, a search box, featured and recent items, an icon rail, a
// resizable width and, on narrow screens, a drawer. Props shown here: title, subtitle, items (id, label, group, icon,
// sub, badge, badgeTone, keywords, parent, hidden, can, onSelect), featured, recent, groupOrder, itemOrder,
// groupIcons, defaultOpen, placeholder, hotkey, shortcut, palette, storageKey, collapsible, width, resizable,
// minWidth, maxWidth, collapseBelow, persist, onResize, search, headings, expandAll, groupCounts, groupHeads,
// nestedSubs, itemSize, subOverflow, visibleGroups, sheetSide, menuButton, open, onOpenChange, labels, floating,
// glass, subMenus, pinCurrent, footer, label and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// NavSidebarLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { NavSidebar, Segmented, Button, Badge } from "march/ui"
import { dashboard, shoppingBag, users, shield, settings, barChart, inbox } from "march/icons"

// Options of the Segmented control that picks which section of the menu is listed (see visibleGroups below).
const SECTIONS = [{ value: "all", label: "Hepsi" }, { value: "Satış", label: "Satış" }, { value: "Yönetim", label: "Yönetim" }]

export function NavSidebarLab() {
  // Reactive state: the last chosen page, the unread count (live badge), the chosen section, the glass / open flags
  // and the sidebar width reported by onResize.
  let $page = "-"
  let $unread = 4
  let $section = "all"
  let $glass = false
  let $open = false
  let $width = 260
  // Builds an onSelect handler that records which item was chosen.
  const pick = (id: string) => () => { $page = id }
  // The items. Item fields worth copying:
  // - group: the category the item lives under. sub: a second line (a function makes it live). badge: a number,
  //   text, or a function for a live value; badgeTone colours it. keywords: extra search words.
  // - parent: nests the item under another one ("late" under "invoices").
  // - hidden: the item is never listed. can: a permission check (here always true).
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
    {/* Controls outside the menu: they change state that the menu reads (visible section, glass look, drawer) and
        show what the menu reports back (selected page, width). */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Segmented aria-label="Bölüm" options={SECTIONS} bind:value={$section} />
      <Button size="sm" variant="ghost" on:click={() => $glass = !$glass}>{$glass ? "Düz görünüm" : "Buzlu cam"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $open = true}>Çekmeceyi aç</Button>
      <Badge tone="primary">{`Sayfa: ${$page}`}</Badge>
      <span sx={{ text: "xs", color: "muted" }}>{`${$width} px`}</span>
    </div>
    {/* The menu, prop by prop:
        - title / subtitle / label / class: header texts, the accessible name of the <nav>, a class for CSS or tests.
        - featured: highlighted items above the categories. recent={3}: how many recently opened items are listed.
        - groupOrder / itemOrder: the order of categories (names first, the rest after) and of items ("none" keeps
          the order of `items`). groupIcons: an icon per category name. defaultOpen="all": every category starts open.
        - placeholder / hotkey / shortcut: search box text; hotkey="focus" makes the shortcut focus the search box
          ("mod+j" is Ctrl+J or Cmd+J). palette={false}: the items are not registered with the command palette.
        - storageKey and persist={false}: where UI state would be saved, and "do not save it" for this demo.
        - collapsible: the icon rail button. width / resizable / minWidth / maxWidth / collapseBelow: a drag grip for
          the width within limits; narrower than collapseBelow switches to the rail; onResize reports the new width.
        - search, headings, expandAll, groupCounts, groupHeads, nestedSubs: switches for parts of the menu (search
          box, "Recent" and "Categories" headings, the expand / collapse all button, item counts, category rows,
          sub-lines of nested items). They are all on or off by their own default; written out here to show them.
        - itemSize="md" and subOverflow="ellipsis": row size, and a long sub-line is cut with an ellipsis instead of
          scrolling.
        - visibleGroups: a function returning the categories to list (null = all): one section at a time.
        - sheetSide / menuButton / open / onOpenChange: narrow screens turn the menu into a drawer from that edge;
          `open` and `onOpenChange` control it from outside (the open-drawer button).
        - labels: every built-in text is replaceable; showUnder and hideUnder are functions that get the item's label.
        - floating / glass: functions, so the look can change at run time: a card floating off the screen edge, and a
          frosted-glass surface. subMenus="inline" and pinCurrent={false}: nested pages open in the list, and the
          current branch is not pinned open.
        - footer: free content at the bottom.
        Accessibility: a <nav> landmark with a search region, folding categories with aria-expanded, the drawer
        closes with Escape. Motion (folds, drawer, glass) follows the motion engine: reduced motion, global speed and
        "Stop all". */}
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
