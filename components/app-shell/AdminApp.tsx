import { AppShell, NavMenu, Button } from "march/ui"
import { home, settings, users } from "march/icons"

// yönetim uygulaması: gezinme menüsü, üstte güncelleme duyurusu (kapatılabilir), seçilen sayfa ana alanda
const pages = [{ id: "home", title: "Özet", href: "#home", icon: home }, { id: "users", title: "Kullanıcılar", href: "#users", icon: users }, { id: "settings", title: "Ayarlar", href: "#settings", icon: settings }]

export function AdminApp() {
  let $page = "home"
  let $banner = true
  return <AppShell features={[]} mainId="admin-main"
    top={$banner ? <div class="sc-shell-banner">Yeni sürüm hazır <Button size="sm" on:click={() => $banner = false}>Tamam</Button></div> : null}
    nav={<div on:click={(e: MouseEvent) => { const a = (e.target as Element).closest("a[href^='#']"); if (a) { e.preventDefault(); $page = a.getAttribute("href")!.slice(1) } }}>
      <NavMenu items={pages} palette={false} />
    </div>}>
    <h3 sx={{ p: 3, text: "bold" }}>{pages.find((p) => p.id === $page)!.title}</h3>
  </AppShell>
}
