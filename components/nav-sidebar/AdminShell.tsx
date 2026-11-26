// AdminShell: the real-life NavSidebar example.
//
// The skeleton of an admin panel: categories with sub-pages, a support inbox with a live count, a searchable menu, a
// collapsible icon rail and the signed-in person at the bottom. The page you pick is shown on the right. Use this
// pattern when the menu itself is the navigation of an app and you handle selection in code (onSelect) instead of
// with router links.
import { NavSidebar, Avatar, Card } from "march/ui"
import { dashboard, shoppingBag, receipt, users, shield, settings, barChart, inbox } from "march/icons"

export function AdminShell() {
  // Reactive state: the page shown on the right and the number of open support tickets (the badge).
  let $page = "Pano"
  let $tickets = 5
  // Builds an onSelect handler for one item: it sets the page title shown in the card.
  const open = (label: string) => () => { $page = label }
  return <div sx={{ flex: "row", gap: 3 }}>
    {/* - title / subtitle / footer: header and footer slots (footer here: an Avatar and the name).
        - storageKey: where open categories, recent pages and the width are saved for this menu.
        - hotkey={false} and palette={false}: this demo does not take the Ctrl+K shortcut and does not register its
          pages with the command palette, so it cannot clash with a page that already has them.
        - collapsible: the button that shrinks the menu to an icon rail (state is remembered).
        - groupIcons: an icon next to a category name. placeholder: the search box text. The search is typo-tolerant
          and also matches `keywords` (typing "grafik" finds Raporlar).
        - featured: highlighted items above the categories; badge is a function so the count is live, badgeTone
          colours it ("danger" = red), and onSelect clears the count when the inbox is opened.
        - items: `group` makes the categories, `sub` is a second line under the label, `parent` nests an item under
          another one (Gecikenler is shown inside Faturalar), `onSelect` runs when the item is chosen (instead of
          navigating to an href). The menu is a <nav> landmark; category buttons use aria-expanded and the current
          item is marked for screen readers. Motion (folds, drawer) follows the motion engine: reduced motion,
          global speed and "Stop all". */}
    <NavSidebar title="Dükkan" subtitle="Yönetim" storageKey="admin.shell" hotkey={false} palette={false} collapsible
      groupIcons={{ Satış: shoppingBag, Yönetim: shield }} placeholder="Sayfa ara…"
      featured={[{ id: "support", label: "Destek kutusu", icon: inbox, badge: () => $tickets, badgeTone: "danger",
        onSelect: () => { $tickets = 0; $page = "Destek kutusu" } }]}
      items={[
        { id: "home", label: "Pano", icon: dashboard, group: "Genel", onSelect: open("Pano") },
        { id: "orders", label: "Siparişler", group: "Satış", sub: "Bugün 18 yeni", onSelect: open("Siparişler") },
        { id: "invoices", label: "Faturalar", icon: receipt, group: "Satış", onSelect: open("Faturalar") },
        { id: "late", label: "Gecikenler", group: "Satış", parent: "invoices", onSelect: open("Geciken faturalar") },
        { id: "team", label: "Ekip", icon: users, group: "Yönetim", sub: "7 kişi, 2 davet", onSelect: open("Ekip") },
        { id: "settings", label: "Ayarlar", icon: settings, group: "Yönetim", onSelect: open("Ayarlar") },
        { id: "reports", label: "Raporlar", icon: barChart, group: "Analiz", keywords: "grafik satış", onSelect: open("Raporlar") },
      ]}
      footer={<div sx={{ flex: ["row", "center"], gap: 2 }}><Avatar name="Elif Arslan" size="sm" /><span sx={{ text: "sm" }}>Elif Arslan</span></div>} />
    {/* The content area: it just shows the page chosen in the menu. */}
    <Card>
      <h2 sx={{ text: "xl" }}>{$page}</h2>
      <p sx={{ color: "muted" }}>Menüden bir sayfa seç; arama kutusu kategorileri de tarar.</p>
    </Card>
  </div>
}
