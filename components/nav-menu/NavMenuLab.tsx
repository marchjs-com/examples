// NavMenuLab: the full-featured NavMenu example; it uses every prop at least once.
//
// NavMenu is the sidebar navigation of a big app: grouped items, pinning, a filter box, an icon rail and (on narrow
// screens) a drawer. Props shown here: items (id, title, href, icon, group, badge, keywords, can, hidden), storageKey,
// maxPinned, maxRecent, sort, brand, footer, label, filter, palette, collapsible, groupsCollapsed, groupIcons, pins,
// icons (menu, pin, pinned, chevron, search, rail), labels (every text), class, and the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// NavMenuLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { NavMenu, Button } from "march/ui"
import { inbox, barChart, users, wallet, settings, plus, sparkles, heart, panelLeft, menu } from "march/icons"

// Links stay inside this page (a #fragment of the current path), so clicking an item never leaves the Lab.
const at = (id: string) => `${location.pathname}#${id}`

export function NavMenuLab() {
  // Reactive state that the buttons on the right change, to show how `can`, `hidden` and `badge` follow state.
  let $admin = false
  let $beta = true
  let $unread = 5
  return <div sx={{ flex: "row", gap: 3 }}>
    {/* One NavMenu with (almost) every prop:
        - class="lab-nav" and m:color="brand-purple": a class for CSS or tests, and the common colour token prop.
        - label: the accessible name of the <nav> landmark.
        - storageKey: where pins, recent pages and open groups are kept in localStorage (the test clears this key so
          every test starts clean).
        - palette={false}: do not register the pages with the command palette (it is on by default).
        - maxPinned={3} / maxRecent={0}: at most three pinned items; maxRecent={0} drops the "Recent" block.
        - sort="none": keep the order of `items` instead of sorting by title inside a group.
        - filter: the search box above the list (on by default; written out here to show the prop).
        - collapsible: adds the icon rail button on wide screens. groupsCollapsed: groups start closed (the group of
          the active page opens). pins: the pin button on every item and the "Pinned" block.
        - brand / footer: free content for the top and bottom slots.
        - groupIcons: an icon per group heading, keyed by the group's name.
        - icons: your own mark for each built-in part: here a heart for pin, a text emoji for pinned, a plus as the
          group arrow, search: false drops the search mark, plus the rail and menu icons.
        - labels: every built-in text can be replaced; pin and unpin are functions that get the item's title, so the
          accessible name of the pin button can say what it pins (the test looks the button up by that name).
        Motion (group opening, the drawer) follows the motion engine: reduced motion, global speed and "Stop all". */}
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
        // badge as a function: a live count that updates when $unread changes (a plain number would stay fixed).
        // keywords: extra words the filter box also matches, so "posta" finds this item although the title lacks it.
        { id: "inbox", title: "Gelen kutusu", href: at("inbox"), icon: inbox, badge: () => $unread, keywords: "posta e-posta" },
        { id: "reports", title: "Raporlar", href: at("reports"), icon: barChart },
        // `group` puts items under one collapsible heading (the heading's icon comes from groupIcons).
        { id: "members", title: "Üyeler", href: at("members"), group: "Yönetim" },
        { id: "roles", title: "Roller", href: at("roles"), group: "Yönetim" },
        // can: a permission check; while it returns false the item is left out of the menu (not just disabled).
        { id: "admin", title: "Yönetici ayarları", href: at("admin"), group: "Yönetim", can: () => $admin },
        { id: "payments", title: "Ödemeler", href: at("payments"), group: "Finans" },
        // hidden: like `can` but meant for feature flags; the item disappears while it returns true.
        { id: "beta", title: "Yeni panel (beta)", href: at("beta"), icon: sparkles, hidden: () => !$beta },
        { id: "settings", title: "Ayarlar", href: at("settings"), icon: settings },
      ]} />
    {/* These buttons change the state that the menu reads, so you can watch can / hidden / badge react. */}
    <div sx={{ flex: "col", gap: 2 }}>
      <Button size="sm" on:click={() => $admin = !$admin}>{$admin ? "Yöneticilikten çık" : "Yönetici ol"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $beta = !$beta}>{$beta ? "Betayı gizle" : "Betayı göster"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $unread = 0}>Hepsini okundu say</Button>
    </div>
  </div>
}
