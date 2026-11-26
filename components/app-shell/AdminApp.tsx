// AdminApp: the real-life AppShell example.
//
// An admin application frame: a navigation menu in the nav region, a dismissible "new version" banner on top, and the
// selected page in the main area. Use this pattern when you need the usual app skeleton (banner, navigation, content)
// without writing the layout yourself; AppShell also provides the skip link and the landmark regions for you.
import { AppShell, NavMenu, Button } from "march/ui"
import { home, settings, users } from "march/icons"

// The pages: `href` is a hash link, so the menu items are real links (they work with the keyboard and show a URL on
// hover). The click handler below turns them into in-app navigation.
const pages = [{ id: "home", title: "Özet", href: "#home", icon: home }, { id: "users", title: "Kullanıcılar", href: "#users", icon: users }, { id: "settings", title: "Ayarlar", href: "#settings", icon: settings }]

export function AdminApp() {
  // The current page id and whether the banner is still shown.
  let $page = "home"
  let $banner = true
  // AppShell props: features={[]} switches off the optional built-in extras so the frame stays minimal; mainId gives
  // the main region its id, which the built-in skip link ("skip to content") jumps to, so keyboard users reach the
  // page without tabbing through the menu; `top` is the announcement strip above everything (null removes it once the
  // user pressed Tamam); `nav` is the navigation region; the children are the main content.
  return <AppShell features={[]} mainId="admin-main"
    top={$banner ? <div class="sc-shell-banner">Yeni sürüm hazır <Button size="sm" on:click={() => $banner = false}>Tamam</Button></div> : null}
    nav={<div on:click={(e: MouseEvent) => { const a = (e.target as Element).closest("a[href^='#']"); if (a) { e.preventDefault(); $page = a.getAttribute("href")!.slice(1) } }}>
      {/* One delegated click handler on the wrapper catches clicks on any menu link, cancels the browser jump and
          stores the page id taken from the href. palette={false} turns off NavMenu's command-palette search. */}
      <NavMenu items={pages} palette={false} />
    </div>}>
    <h3 sx={{ p: 3, text: "bold" }}>{pages.find((p) => p.id === $page)!.title}</h3>
  </AppShell>
}
