import { SiteNav } from "march/landing"
import { Button, Card, Segmented, Toggle } from "march/ui"
import { sparkles, grid } from "march/icons"

// SiteNav'ın bütün özellikleri bir arada: marka, bağlantılar, eylemler, görünüm (mode), küçülme (shrink), gizlenme (hide),
// eşik (threshold), izlenen kutu (source), yapışkanlık (sticky), seçilince (onNavigate), hap (pill) ve rengi (pillColor),
// menü düğmesi (menu) ve ikonu (menuIcon), çekmece tarafı (drawerSide), kendi metinler (labels) ve sınıf (class)
const MODES = ["solid", "transparent", "floating"] as const
const PAGES = [["Keşfet", "#lab-kesfet"], ["Fiyatlar", "#lab-fiyat"], ["Blog", "#lab-blog"]] as const

export function SiteNavLab() {
  let $mode: (typeof MODES)[number] = "floating"
  let $pill = true
  let $menu = true
  let $hide = false
  let $page = "#lab-kesfet"
  let $joined = 0
  let box: HTMLElement | undefined
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görünüm" options={MODES.map((m) => ({ value: m, label: m }))} bind:value={$mode} />
        <Toggle label="Hap" bind:value={$pill} />
        <Toggle label="Menü düğmesi" bind:value={$menu} />
        <Toggle label="Aşağı inerken gizlen" bind:value={$hide} />
      </div>
    </Card>
    <div ref={(x: Element) => { box = x as HTMLElement }} style={{ height: "260px", overflow: "auto" }}>
      {() => {
        // bu satırda okunan durumlar değişince çubuk yeniden çizilir
        const mode = $mode, hide = $hide, pill = $pill, menu = $menu, joined = $joined
        return <SiteNav mode={mode} shrink hide={hide} threshold={24} source={() => box} sticky
        brand={{ name: "Lab", mark: sparkles }} class="lab-nav"
        links={PAGES.map(([label, href]) => ({ label, href, active: () => $page === href }))}
        onNavigate={(href: string) => $page = href}
        pill={pill} pillColor="brand-purple" menu={menu} menuIcon={grid} drawerSide="left"
        labels={{ main: "Site", openMenu: "Menüyü göster", menu: "Sayfalar" }}
        actions={<Button size="sm" on:click={() => $joined++}>{`Katıl (${joined})`}</Button>} />
      }}
      {PAGES.map(([label, href]) => <section id={href.slice(1)} style={{ minHeight: "200px" }} sx={{ p: 4 }}>
        <h3>{label}</h3>
        <p sx={{ color: "muted" }}>Kutuyu kaydır: çubuk küçülür; gizlenme açıksa aşağı inerken kaybolur.</p>
      </section>)}
    </div>
    <p sx={{ color: "muted" }}>{`Seçili sayfa: ${$page}`}</p>
  </div>
}
