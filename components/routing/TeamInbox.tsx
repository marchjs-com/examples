import { createRouter, Router, Outlet, Link } from "march/router"
import { Card, Button, ListRow, TextInput, Badge } from "march/ui"

// ekip gelen kutusu: çerçeve (yanıt taslağı) bir kez kurulur, sekmeler altında değişir; bir mesaj yan panelde açılır
// (adlı outlet: adres ?~aside=/mesaj/2 olur), liste yerinde kalır
const MAILS = [
  { id: "1", from: "Ece", subject: "Cumartesi koşusu 08:30'da", body: "Moda iskelesinde buluşuyoruz, sonra kahvaltı.", archived: false },
  { id: "2", from: "Mert", subject: "Sunum dosyası", body: "Son hâli ekte; slayt 7'ye bir bakar mısın?", archived: false },
  { id: "3", from: "Kitap Kulübü", subject: "Ayın kitabı", body: "İlk üç bölümü okuyup gelin.", archived: true },
]

// bir mesaj: yan panelde açılan sayfa (parametresini props.params ile alır)
function Mail(props: { params?: Record<string, string> }) {
  const mail = MAILS.find((m) => m.id === props.params?.id)
  return <Card title={mail?.subject ?? "Mesaj bulunamadı"} subtitle={mail?.from}><p>{mail?.body}</p></Card>
}

// bir kutu: arşivli ya da değil
const box = (archived: boolean) => () => <div sx={{ flex: "col", gap: 1 }}>
  {MAILS.filter((m) => m.archived === archived).map((m) => <ListRow title={m.subject} sub={m.from}
    actions={<Link href={`/mesaj/${m.id}`} outlet="aside">Yanda aç</Link>} />)}
</div>

// çerçeve: sekmeler ve taslak burada; sekme değişince yalnız <Outlet /> değişir, yazdığın taslak kalır
function Shell() {
  let $draft = ""
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button href="/" exact size="sm">Gelen</Button>
      <Button href="/arsiv" size="sm">Arşiv</Button>
      <Badge tone="info">{$draft ? "Taslak var" : "Taslak yok"}</Badge>
    </div>
    <TextInput bind:value={$draft} placeholder="Yanıt taslağı: sekme değişince kalır" aria-label="Yanıt taslağı" />
    <div sx={{ flex: "row", gap: 3 }}>
      <div sx={{ flex: "grow" }}><Outlet /></div>
      <div sx={{ flex: "grow" }}><Outlet name="aside" empty={<p sx={{ color: "muted" }}>Bir mesajı yanda açın.</p>} /></div>
    </div>
  </div>
}
const shell = async () => ({ default: Shell })

export function TeamInbox() {
  createRouter({
    routes: { "/": { component: box(false), layouts: [shell] }, "/arsiv": { component: box(true), layouts: [shell] } },
    outlets: { aside: { "/mesaj/:id": { component: Mail } } },
  })
  return <div sx={{ w: "lg" }}><Router /></div>
}
