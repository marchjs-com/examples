// RoutingLab: the full-featured routing example; it uses every part of march/router at least once.
//
// Shown here: routes (a parameterised path, a component, layouts), redirects, guard, outlets (a named outlet), Router
//  (notFound), Outlet (next level, named, modal), Link (outlet, modal), Button href (exact), back, path, query and
// setQuery.
// In the preview the router keeps its own address (memoryHistory), so the address of the page itself does not change.
// Use it as a reference when you need one specific option: find it below, copy the line.
// RoutingLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { createRouter, Router, Outlet, Link, back, path, query, setQuery } from "march/router"
import { Button, Card, ListRow, TextInput, Toggle, Dialog } from "march/ui"

// The cities. Their texts are content, so they stay Turkish.
const CITIES = [
  { id: "izmir", name: "İzmir", note: "Kordon'da gün batımı" },
  { id: "mardin", name: "Mardin", note: "Taş evler, dar sokaklar" },
  { id: "rize", name: "Rize", note: "Yeşilin her tonu" },
]

// One city: it can open as a page, in the side panel or in a window; the route parameter arrives in props.params.
function City(props: { params?: Record<string, string> }) {
  const city = CITIES.find((c) => c.id === props.params?.id)
  return <Card title={city?.name ?? "Bilinmeyen şehir"} class="lab-city"><p>{city?.note}</p></Card>
}

// The list of cities. ?sirala=za is part of the address (setQuery changes it); every city can be opened in three ways.
function Cities() {
  const za = () => query().sirala === "za"
  return <div sx={{ flex: "col", gap: 1 }}>
    <Button size="sm" variant="ghost" class="lab-sort" on:click={() => setQuery({ sirala: za() ? null : "za" })}>{za() ? "A → Z sırala" : "Z → A sırala"}</Button>
    {/* Each row has three Links to the same address: a plain Link opens the page; outlet="aside" opens it in the named
        side outlet (the list stays); modal opens it in a window (the modal outlet). */}
    {() => [...CITIES].sort((a, b) => (za() ? -1 : 1) * a.name.localeCompare(b.name, "tr")).map((c) => <ListRow title={c.name} sub={c.note}
      actions={<div sx={{ flex: "row", gap: 2 }}>
        <Link href={`/sehir/${c.id}`}>Aç</Link>
        <Link href={`/sehir/${c.id}`} outlet="aside">Yanda</Link>
        <Link href={`/sehir/${c.id}`} modal>Pencerede</Link>
      </div>} />)}
  </div>
}
// Two simple pages.
const About = () => <p class="lab-about">Bu çerçeve bir kez kurulur; sekmeler altında değişir.</p>
const Admin = () => <p class="lab-admin">Yönetim paneli: yalnız yöneticiler.</p>

// The frame (layout): navigation, the address, a note field and three outlets (next level, side panel, window).
function Frame() {
  let $note = ""
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center", "wrap"], gap: 2 }}>
      {/* Button with href is a link; exact makes it active only on exactly this address (otherwise "/" would match
          every page). */}
      <Button href="/" exact size="sm">Şehirler</Button>
      <Button href="/hakkinda" size="sm">Hakkında</Button>
      <Button href="/yonetim" size="sm">Yönetim</Button>
      <Button href="/eski" size="sm" variant="ghost">Eski adres</Button>
      <Button href="/kayip" size="sm" variant="ghost">Kayıp sayfa</Button>
      <Button size="sm" variant="ghost" on:click={() => back()}>← Geri</Button>
    </div>
    {/* path() and query() are signals of the current address. */}
    <code class="lab-path">{path() + (query().sirala ? `?sirala=${query().sirala}` : "")}</code>
    {/* The layout is mounted once and kept while the pages below change, so what you type here survives navigation. */}
    <TextInput bind:value={$note} placeholder="Not: sayfa değişince kalır" aria-label="Not" class="lab-note" />
    {/* <Outlet /> draws the next level (the page); a named Outlet draws a separate route table; `empty` is shown while
        it has no page. */}
    <div sx={{ flex: "row", gap: 3 }}>
      <div sx={{ flex: "grow" }}><Outlet /></div>
      <div sx={{ flex: "grow" }}><Outlet name="aside" empty={<p sx={{ color: "muted" }} class="lab-aside-empty">Yan panel boş</p>} /></div>
    </div>
    {/* The modal outlet: its function child gets the page and a close function and draws a Dialog around it; back
        closes it. */}
    <Outlet name="modal">{(page: () => unknown, close: () => void) => <Dialog open onClose={close} title="Şehir" closeLabel="Pencereyi kapat">{page()}</Dialog>}</Outlet>
  </div>
}
// A layout is given as a loader (an async function that returns the component), so it loads lazily.
const frame = async () => ({ default: Frame })

export function RoutingLab() {
  // Whether the visitor is an admin; the guard below reads it.
  let $admin = false
  // The router: routes with their layouts, redirects, a guard and a route table for the named outlet.
  createRouter({
    routes: {
      "/": { component: Cities, layouts: [frame] },
      "/hakkinda": { component: About, layouts: [frame] },
      "/yonetim": { component: Admin, layouts: [frame] },
      "/sehir/:id": { component: City, layouts: [frame] },
    },
    //  redirects: an old address goes to the new one. guard(to): return true to allow the navigation or an address to
    // send
    //  the visitor there instead (here the admin page is only for admins). outlets: the routes of the named outlet
    // "aside".
    redirects: { "/eski": "/hakkinda" },
    guard: (to) => (to.path === "/yonetim" && !$admin ? "/" : true),
    outlets: { aside: { "/sehir/:id": { component: City } } },
  })
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Switches the admin state the guard reads. */}
    <Toggle label="Yönetici girişi (guard)" bind:value={$admin} />
    {/* notFound: what to draw when no route matches the address. */}
    <Router notFound={<p class="lab-404">Böyle bir sayfa yok.</p>} />
  </div>
}
