import { createRouter, Router, Outlet, Link, back, path, query, setQuery } from "march/router"
import { Button, Card, ListRow, TextInput, Toggle, Dialog } from "march/ui"

// Yönlendiricinin bütün özellikleri bir arada: routes (parametreli yol, bileşen, layouts), redirects, guard, outlets
// (adlı outlet), Router (notFound), Outlet (sıradaki düzey, adlı, modal), Link (outlet, modal), Button href (exact),
// back, path, query ve setQuery. Önizlemede yönlendirici kendi adresini tutar (memoryHistory): sayfanın adresi değişmez
const CITIES = [
  { id: "izmir", name: "İzmir", note: "Kordon'da gün batımı" },
  { id: "mardin", name: "Mardin", note: "Taş evler, dar sokaklar" },
  { id: "rize", name: "Rize", note: "Yeşilin her tonu" },
]

// bir şehir: sayfa, yan panel ya da pencere olarak açılır; parametresi props.params'ta
function City(props: { params?: Record<string, string> }) {
  const city = CITIES.find((c) => c.id === props.params?.id)
  return <Card title={city?.name ?? "Bilinmeyen şehir"} class="lab-city"><p>{city?.note}</p></Card>
}

// şehirler: ?sirala=za adresin parçası (setQuery), her şehir üç yoldan açılır
function Cities() {
  const za = () => query().sirala === "za"
  return <div sx={{ flex: "col", gap: 1 }}>
    <Button size="sm" variant="ghost" class="lab-sort" on:click={() => setQuery({ sirala: za() ? null : "za" })}>{za() ? "A → Z sırala" : "Z → A sırala"}</Button>
    {() => [...CITIES].sort((a, b) => (za() ? -1 : 1) * a.name.localeCompare(b.name, "tr")).map((c) => <ListRow title={c.name} sub={c.note}
      actions={<div sx={{ flex: "row", gap: 2 }}>
        <Link href={`/sehir/${c.id}`}>Aç</Link>
        <Link href={`/sehir/${c.id}`} outlet="aside">Yanda</Link>
        <Link href={`/sehir/${c.id}`} modal>Pencerede</Link>
      </div>} />)}
  </div>
}
const About = () => <p class="lab-about">Bu çerçeve bir kez kurulur; sekmeler altında değişir.</p>
const Admin = () => <p class="lab-admin">Yönetim paneli: yalnız yöneticiler.</p>

// yerleşim: gezinme, adres, not ve üç outlet (sıradaki düzey, yan panel, pencere)
function Frame() {
  let $note = ""
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center", "wrap"], gap: 2 }}>
      <Button href="/" exact size="sm">Şehirler</Button>
      <Button href="/hakkinda" size="sm">Hakkında</Button>
      <Button href="/yonetim" size="sm">Yönetim</Button>
      <Button href="/eski" size="sm" variant="ghost">Eski adres</Button>
      <Button href="/kayip" size="sm" variant="ghost">Kayıp sayfa</Button>
      <Button size="sm" variant="ghost" on:click={() => back()}>← Geri</Button>
    </div>
    <code class="lab-path">{path() + (query().sirala ? `?sirala=${query().sirala}` : "")}</code>
    <TextInput bind:value={$note} placeholder="Not: sayfa değişince kalır" aria-label="Not" class="lab-note" />
    <div sx={{ flex: "row", gap: 3 }}>
      <div sx={{ flex: "grow" }}><Outlet /></div>
      <div sx={{ flex: "grow" }}><Outlet name="aside" empty={<p sx={{ color: "muted" }} class="lab-aside-empty">Yan panel boş</p>} /></div>
    </div>
    <Outlet name="modal">{(page: () => unknown, close: () => void) => <Dialog open onClose={close} title="Şehir" closeLabel="Pencereyi kapat">{page()}</Dialog>}</Outlet>
  </div>
}
const frame = async () => ({ default: Frame })

export function RoutingLab() {
  let $admin = false
  createRouter({
    routes: {
      "/": { component: Cities, layouts: [frame] },
      "/hakkinda": { component: About, layouts: [frame] },
      "/yonetim": { component: Admin, layouts: [frame] },
      "/sehir/:id": { component: City, layouts: [frame] },
    },
    // eski bir adres yenisine gider; yönetim yalnız yöneticiye açılır (değilse şehirlere döner)
    redirects: { "/eski": "/hakkinda" },
    guard: (to) => (to.path === "/yonetim" && !$admin ? "/" : true),
    outlets: { aside: { "/sehir/:id": { component: City } } },
  })
  return <div sx={{ flex: "col", gap: 3 }}>
    <Toggle label="Yönetici girişi (guard)" bind:value={$admin} />
    <Router notFound={<p class="lab-404">Böyle bir sayfa yok.</p>} />
  </div>
}
