// ShopAdmin: the real-life NavMenu example.
//
// The sidebar of an online shop's admin panel: groups with icons, a live badge (the number of orders waiting), a
// button that collapses the menu to an icon rail, and the signed-in person at the bottom. Next to it a small panel
// changes the order count, so you can see the badge update. Use this pattern for any back-office with many pages.
import { NavMenu, Avatar, Button, toast } from "march/ui"
import { dashboard, receipt, packageBox, truck, users, tag, wallet, barChart, settings, shoppingBag } from "march/icons"

// Links stay inside this page (a #fragment of the current path), so clicking never leaves the example.
const at = (id: string) => `${location.pathname}#${id}`

export function ShopAdmin() {
  // Reactive state: the badge on the orders item and the text on the right both read it.
  let $orders = 7
  return <div sx={{ flex: "row", gap: 3 }}>
    {/* - collapsible: shows the rail button on wide screens that shrinks the menu to icons only (on narrow screens
          the menu is a drawer anyway). The choice is remembered in localStorage under `storageKey`.
        - brand / footer: free content for the top and bottom slots; the footer shows who is signed in (Avatar).
        - groupIcons: one icon per group heading; items without their own icon use their group's icon.
        - badge={() => $orders}: a function, so the number is live. Items with `group` fold under that heading;
          items without one (the summary and payouts pages) stay at the top level.
        - keywords: extra words for the filter box (a coupon keyword finds the discounts page). palette={false}: do not register
          the pages with the command palette.
        Accessibility: the <nav> is labelled by `label`, the active link has aria-current="page", group headers are
        buttons with aria-expanded. Motion follows the motion engine (reduced motion, global speed, "Stop all"). */}
    <NavMenu label="Mağaza yönetimi" palette={false} storageKey="ornek.magaza" collapsible
      brand={<span sx={{ flex: ["row", "center"], gap: 1, text: "bold" }}>🛍️ Kumbara Mağaza</span>}
      footer={<span sx={{ flex: ["row", "center"], gap: 2 }}><Avatar name="Elif Arslan" size="sm" /> Elif Arslan</span>}
      groupIcons={{ "Satış": receipt, "Katalog": packageBox, "Müşteriler": users }} items={[
        { id: "home", title: "Özet", href: at("home"), icon: dashboard },
        { id: "orders", title: "Siparişler", href: at("orders"), group: "Satış", badge: () => $orders },
        { id: "shipping", title: "Kargo", href: at("shipping"), group: "Satış", icon: truck },
        { id: "refunds", title: "İadeler", href: at("refunds"), group: "Satış", keywords: "geri ödeme" },
        { id: "products", title: "Ürünler", href: at("products"), group: "Katalog", icon: shoppingBag },
        { id: "discounts", title: "İndirimler", href: at("discounts"), group: "Katalog", icon: tag, keywords: "kupon kampanya" },
        { id: "customers", title: "Müşteri listesi", href: at("customers"), group: "Müşteriler" },
        { id: "payouts", title: "Ödemeler", href: at("payouts"), icon: wallet },
        { id: "stats", title: "İstatistik", href: at("stats"), icon: barChart },
        { id: "settings", title: "Ayarlar", href: at("settings"), icon: settings },
      ]} />
    {/* The side panel: shipping an order lowers the count (the button turns itself off at zero) and the badge in the
        menu follows, because both read the same reactive $orders. */}
    <div sx={{ flex: "col", gap: 2, p: 2 }}>
      <strong>{$orders} sipariş hazırlanmayı bekliyor</strong>
      <Button size="sm" disabled={!$orders} on:click={() => { $orders--; toast("Sipariş kargoya verildi") }}>Birini kargola</Button>
    </div>
  </div>
}
