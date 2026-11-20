import { PullToRefresh, Card, ListRow } from "march/ui"
import { message } from "march/icons"

// bir haber akışı: yenileyince en üste yeni haberler eklenir, durum satırı evreyi söyler
const TITLES = ["Şehirde bisiklet yolu uzuyor", "Hafta sonu hava güneşli", "Yeni kütüphane açıldı", "Sahil konseri cumartesi", "Belediye parkı yeniliyor"]
const PHASES: Record<string, string> = { idle: "Güncel", pull: "Çekiliyor…", ready: "Bırakın", refreshing: "Yenileniyor…" }

export function NewsFeed() {
  let $news = TITLES.slice(0, 3).map((t, i) => ({ id: i, title: t }))
  let $phase = "idle"
  const load = () => new Promise((ok) => setTimeout(ok, 900)).then(() => {
    const id = $news.length
    $news = [{ id, title: `${TITLES[id % TITLES.length]} (yeni)` }, ...$news]
  })
  return <Card title="Haberler" subtitle={() => PHASES[$phase]}>
    <div style={{ height: "260px" }}>
      <PullToRefresh onRefresh={load} onPhase={(p: string) => $phase = p} threshold={64}>
        {() => $news.map((n) => <ListRow lead={message} title={n.title} sub={`Haber #${n.id + 1}`} />)}
      </PullToRefresh>
    </div>
  </Card>
}
