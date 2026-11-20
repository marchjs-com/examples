import { NavMenu, Avatar, Button, toast } from "march/ui"
import { dashboard, receipt, packageBox, truck, users, tag, wallet, barChart, settings, shoppingBag } from "march/icons"

// bir e-ticaret yönetim paneli: gruplar ikonlu, rozetler canlı (bekleyen sipariş sayısı), ray düğmesi menüyü ikonlara
// daraltır; altta oturum açan kişi. Bağlantılar bu sayfanın içinde kalır (#)
const at = (id: string) => `${location.pathname}#${id}`

export function ShopAdmin() {
  let $orders = 7
  return <div sx={{ flex: "row", gap: 3 }}>
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
    <div sx={{ flex: "col", gap: 2, p: 2 }}>
      <strong>{$orders} sipariş hazırlanmayı bekliyor</strong>
      <Button size="sm" disabled={!$orders} on:click={() => { $orders--; toast("Sipariş kargoya verildi") }}>Birini kargola</Button>
    </div>
  </div>
}
