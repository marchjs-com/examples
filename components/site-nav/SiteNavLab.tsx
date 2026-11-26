// SiteNavLab: the full-featured SiteNav example; it uses every prop at least once.
//
// Props shown here: brand, links, actions, mode, shrink, hide, threshold, source, sticky, onNavigate, pill, pillColor,
// menu, menuIcon, drawerSide, labels and class.
// The controls at the top change the bar live; the bar lives inside a small scrolling box so you can see shrinking and
// hiding. Use it as a reference when you need one specific option: find the prop below, copy the line.
// SiteNavLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { SiteNav } from "march/landing"
import { Button, Card, Segmented, Toggle } from "march/ui"
import { sparkles, grid } from "march/icons"

// The three looks: "solid" (a full-width bar), "transparent" (see-through at first, glass after a little scrolling) and
// "floating" (a centred glass pill).
const MODES = ["solid", "transparent", "floating"] as const
// The pages: [label, href] pairs; the href is both the link target and the id of a section below.
const PAGES = [["Keşfet", "#lab-kesfet"], ["Fiyatlar", "#lab-fiyat"], ["Blog", "#lab-blog"]] as const

export function SiteNavLab() {
  // Plain `let $name` variables are March signals: writing one redraws whatever reads it. $page is the href of the current
  // link and $joined counts presses of the action button.
  let $mode: (typeof MODES)[number] = "floating"
  let $pill = true
  let $menu = true
  let $hide = false
  let $page = "#lab-kesfet"
  let $joined = 0
  // The scrolling box that the bar follows; the ref below fills it in.
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
    {/* The scrolling box. Its height is a style object because sx has no height token. The bar normally follows the page's
        scroll; here `source` points it at this box instead. */}
    <div ref={(x: Element) => { box = x as HTMLElement }} style={{ height: "260px", overflow: "auto" }}>
      {() => {
        // The options are read here, so changing a control draws the bar again.
        const mode = $mode, hide = $hide, pill = $pill, menu = $menu, joined = $joined
        // SiteNav props, one by one:
        // - mode: solid, transparent or floating (see MODES).
        // - shrink: the bar gets lower once scrolled (on by default). hide: it slides away while scrolling down and back
        //   when scrolling up. threshold={24}: how many px of scroll count as "scrolled" (default 12).
        // - source={() => box}: the element whose scrolling these three follow (default: the page).
        // - sticky: the bar sticks to the top of its scroller (on by default).
        // - brand: { name, mark }. class="lab-nav": lets the tests (or your CSS) find the header.
        // - links: { label, href, active } objects; `active` is a function that marks the current page (aria-current).
        //   onNavigate(href) is called when a link is chosen.
        // - pill: the pill that slides under the hovered link and rests on the current one; pillColor: its colour token.
        // - menu: the menu button shown below 860 px; menuIcon: its icon; drawerSide: the side the Drawer opens from.
        // - labels: your own texts: main (the name of the navigation), openMenu (the name of the menu button) and menu (the
        //   title of the Drawer).
        // - actions: nodes at the end of the bar (also in the drawer); here a button that counts its presses.
        // Motion (shrinking, hiding, the pill) runs on the motion engine and follows reduced motion and global speed.
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
