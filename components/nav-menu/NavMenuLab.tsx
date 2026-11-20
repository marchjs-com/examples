import { NavMenu, Button } from "march/ui"
import { inbox, barChart, users, wallet, settings, plus, sparkles, heart, panelLeft, menu } from "march/icons"

// NavMenu'nün bütün özellikleri: items (id, title, href, icon, group, badge, keywords, can, hidden), storageKey,
// maxPinned, maxRecent, sort, brand, footer, label, filter, palette, collapsible, groupsCollapsed, groupIcons, pins,
// icons (menu, pin, pinned, chevron, search, rail), labels (hepsi), class; ortak özelliklerden m:color.
// Bağlantılar bu sayfanın içinde kalır (#)
const at = (id: string) => `${location.pathname}#${id}`

export function NavMenuLab() {
  let $admin = false
  let $beta = true
  let $unread = 5
  return <div sx={{ flex: "row", gap: 3 }}>
    <NavMenu class="lab-nav" m:color="brand-purple" label="Lab menüsü" storageKey="lab.navmenu" palette={false}
      maxPinned={3} maxRecent={0} sort="none" filter collapsible groupsCollapsed pins
      brand={<strong>Lab Panel</strong>} footer={<span sx={{ text: "sm", color: "muted" }}>Elif · yönetici</span>}
      groupIcons={{ "Yönetim": users, "Finans": wallet }}
      icons={{ menu, pin: heart, pinned: "❤️", chevron: plus, search: false, rail: panelLeft }}
      labels={{
        filter: "Sayfalarda ara", filterPlaceholder: "Sayfa bul…", noMatches: "Hiçbir şey yok", pinned: "Gözdeler", recent: "Son bakılanlar",
        menu: "Menüyü aç", expandSidebar: "Menüyü genişlet", collapseSidebar: "Menüyü daralt",
        pin: (title: string) => `${title} gözdelere`, unpin: (title: string) => `${title} gözdelerden çıksın`,
      }}
      items={[
        { id: "inbox", title: "Gelen kutusu", href: at("inbox"), icon: inbox, badge: () => $unread, keywords: "posta e-posta" },
        { id: "reports", title: "Raporlar", href: at("reports"), icon: barChart },
        { id: "members", title: "Üyeler", href: at("members"), group: "Yönetim" },
        { id: "roles", title: "Roller", href: at("roles"), group: "Yönetim" },
        { id: "admin", title: "Yönetici ayarları", href: at("admin"), group: "Yönetim", can: () => $admin },
        { id: "payments", title: "Ödemeler", href: at("payments"), group: "Finans" },
        { id: "beta", title: "Yeni panel (beta)", href: at("beta"), icon: sparkles, hidden: () => !$beta },
        { id: "settings", title: "Ayarlar", href: at("settings"), icon: settings },
      ]} />
    <div sx={{ flex: "col", gap: 2 }}>
      <Button size="sm" on:click={() => $admin = !$admin}>{$admin ? "Yöneticilikten çık" : "Yönetici ol"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $beta = !$beta}>{$beta ? "Betayı gizle" : "Betayı göster"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $unread = 0}>Hepsini okundu say</Button>
    </div>
  </div>
}
