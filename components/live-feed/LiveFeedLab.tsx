import { LiveFeed } from "march/landing"
import { Segmented, Toggle, Button, Card } from "march/ui"

// LiveFeed'in bütün özellikleri bir arada: denetimli liste (items) ve çekilen öğeler (next), aralık, ilk gecikme,
// en çok öğe, satır / duvar, erişilebilir ad, duyuru (live), durdur düğmesi ve iki metni, atan nokta, üstüne gelince
// durma, kendi satır çizimin, geliş ve gidiş hareketi, parıltı, kayma ve sınıf
type Ev = { id: number; avatar: string; title: string; body: string; meta: string }

export function LiveFeedLab() {
  let $events: Ev[] = [{ id: 2, avatar: "B", title: "Burak koşuya katıldı", body: "Kadıköy", meta: "1 dk" }, { id: 1, avatar: "A", title: "Aslı kulüp kurdu", body: "Beşiktaş", meta: "3 dk" }]
  let $n = 3
  let $variant: "list" | "wall" = "list"
  let $auto = false
  let $own = false
  const add = () => { $events = [{ id: $n, avatar: "Y", title: `Yeni olay ${$n}`, body: "Çankaya", meta: "şimdi" }, ...$events]; $n++ }
  let k = 0
  const source = () => ({ id: 1000 + k, avatar: "O", title: `Otomatik olay ${++k}`, body: "Nilüfer", meta: "şimdi" })
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görünüm" options={[{ value: "list", label: "satırlar" }, { value: "wall", label: "duvar" }]} bind:value={$variant} />
        <Toggle label="Kendi çizimim" bind:value={$own} />
        <Toggle label="Otomatik akış" bind:value={$auto} />
        <Button on:click={add}>Olay ekle</Button>
      </div>
    </Card>
    {() => { const variant = $variant, auto = $auto, own = $own; return <LiveFeed class="lab-lf" variant={variant} items={() => $events} next={auto ? source : undefined}
      every={2000} first={500} max={5} label="Kulüp akışı" live="polite"
      pausable pauseLabel="Canlı · durdur" resumeLabel="Durdu · sürdür" pulse pauseOnHover
      renderItem={own ? (it: Ev) => <span class="lab-own"><b>{it.title}</b> · <small>{it.body}</small></span> : undefined}
      enter="pop" leave="shrink" glow move /> }}
  </div>
}
