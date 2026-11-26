// Dashboard: the real-life Layout example.
//
// What it shows: the frame of an admin panel: a header, a navigation column, a main area and an optional side panel.
// Two buttons switch the navigation and the side panel on and off, so you can see how the frame adapts to which
// regions exist.
// When to use this pattern: the shell shared by the screens of an app. Layout owns the frame (landmarks, skip link,
// sticky header and sidebar, the sidebar becoming a drawer on narrow screens), so each page only fills regions.
//
// Accessibility: the regions are real landmarks (header, nav, main, aside, footer) and Layout adds a "skip to content"
// link. Animation: none here; Layout's page-wide behaviours are plug-in `features`, and this example turns them off.
import { Layout, Button } from "march/ui"

export function Dashboard() {
  // Signals: whether the navigation and the side panel are filled.
  let $nav = true
  let $aside = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" on:click={() => $nav = !$nav}>{$nav ? "Gezinmeyi gizle" : "Gezinmeyi göster"}</Button>
      <Button size="sm" on:click={() => $aside = !$aside}>{$aside ? "Yan alanı kapat" : "Yan alanı aç"}</Button>
    </div>
    {/* The Layout sits in a live region, so it is drawn again when $nav or $aside changes.
        - features={[]}: a list replaces the default features (scroll-to-top, focus after route changes), so none run
          in this small demo.
        - framed: always draw the frame; normally any region turns it on, `framed` makes it certain.
        - header / nav / aside: region content. Passing undefined leaves a region out, which is how the buttons remove
          the navigation and the side panel.
        - The children are the main content. The sc-ld-box classes only give the demo regions a visible box. */}
    {() => <Layout features={[]} framed
      header={<div class="sc-ld-box">Panel</div>}
      nav={$nav ? <div class="sc-ld-box">Özet · Raporlar · Ayarlar</div> : undefined}
      aside={$aside ? <div class="sc-ld-box">Bildirimler</div> : undefined}>
      <div class="sc-ld-box sc-ld-main">Bu ayın satışları: 1.240</div>
    </Layout>}
  </div>
}
