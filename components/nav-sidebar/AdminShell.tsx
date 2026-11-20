import { NavSidebar, Avatar, Card } from "march/ui"
import { dashboard, shoppingBag, receipt, users, shield, settings, barChart, inbox } from "march/icons"

// bir yönetim panelinin iskeleti: kategoriler, alt sayfalar, canlı sayılı destek kutusu, aranabilir menü, daraltılabilir
// ray ve altta oturum açan kişi; seçilen sayfa sağda açılır
export function AdminShell() {
  let $page = "Pano"
  let $tickets = 5
  const open = (label: string) => () => { $page = label }
  return <div sx={{ flex: "row", gap: 3 }}>
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
    <Card>
      <h2 sx={{ text: "xl" }}>{$page}</h2>
      <p sx={{ color: "muted" }}>Menüden bir sayfa seç; arama kutusu kategorileri de tarar.</p>
    </Card>
  </div>
}
