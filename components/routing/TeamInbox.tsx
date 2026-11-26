// TeamInbox: the real-life routing example.
//
// What it shows: a team inbox. The frame (a reply draft and the tabs) is built once and stays while the tabs change;
//  opening a message shows it in a side panel (a named outlet, the address becomes ?~aside=/mesaj/2) while the list
// stays.
// When to use this pattern: master-detail screens and apps with a shell that should keep its state.
//
// Accessibility: Links are real links; the badge says in text whether a draft exists.

import { createRouter, Router, Outlet, Link } from "march/router"
import { Card, Button, ListRow, TextInput, Badge } from "march/ui"

// The messages. Their texts are content, so they stay Turkish.
const MAILS = [
  { id: "1", from: "Ece", subject: "Cumartesi koşusu 08:30'da", body: "Moda iskelesinde buluşuyoruz, sonra kahvaltı.", archived: false },
  { id: "2", from: "Mert", subject: "Sunum dosyası", body: "Son hâli ekte; slayt 7'ye bir bakar mısın?", archived: false },
  { id: "3", from: "Kitap Kulübü", subject: "Ayın kitabı", body: "İlk üç bölümü okuyup gelin.", archived: true },
]

// One message: the page that opens in the side panel; its parameter arrives in props.params.
function Mail(props: { params?: Record<string, string> }) {
  const mail = MAILS.find((m) => m.id === props.params?.id)
  return <Card title={mail?.subject ?? "Mesaj bulunamadı"} subtitle={mail?.from}><p>{mail?.body}</p></Card>
}

//  A box (inbox or archive): a function that makes the list page. Each row has a Link with outlet="aside", which opens
// the
// message in the named side outlet instead of replacing the list.
const box = (archived: boolean) => () => <div sx={{ flex: "col", gap: 1 }}>
  {MAILS.filter((m) => m.archived === archived).map((m) => <ListRow title={m.subject} sub={m.from}
    actions={<Link href={`/mesaj/${m.id}`} outlet="aside">Yanda aç</Link>} />)}
</div>

// The frame: tabs and the draft live here; when a tab changes only <Outlet /> changes, so the draft you typed stays.
function Shell() {
  let $draft = ""
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      {/* Buttons with href are links; exact keeps "Inbox" active only on "/". */}
      <Button href="/" exact size="sm">Gelen</Button>
      <Button href="/arsiv" size="sm">Arşiv</Button>
      <Badge tone="info">{$draft ? "Taslak var" : "Taslak yok"}</Badge>
    </div>
    <TextInput bind:value={$draft} placeholder="Yanıt taslağı: sekme değişince kalır" aria-label="Yanıt taslağı" />
    {/* <Outlet /> draws the current tab; the named outlet draws the side panel, with `empty` shown until a message is
        opened. */}
    <div sx={{ flex: "row", gap: 3 }}>
      <div sx={{ flex: "grow" }}><Outlet /></div>
      <div sx={{ flex: "grow" }}><Outlet name="aside" empty={<p sx={{ color: "muted" }}>Bir mesajı yanda açın.</p>} /></div>
    </div>
  </div>
}
// A layout as a loader (an async function returning the component), so it loads lazily.
const shell = async () => ({ default: Shell })

export function TeamInbox() {
  // routes: each tab is a page inside the shell layout; outlets: the route table of the side panel ("aside").
  createRouter({
    routes: { "/": { component: box(false), layouts: [shell] }, "/arsiv": { component: box(true), layouts: [shell] } },
    outlets: { aside: { "/mesaj/:id": { component: Mail } } },
  })
  return <div sx={{ w: "lg" }}><Router /></div>
}
