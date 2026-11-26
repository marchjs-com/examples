// NewsFeed: the real-life PullToRefresh example.
//
// What it shows: a news feed. Pulling it down loads a new item at the top, and a status line in the card header says
// which phase the pull is in. When to use this pattern: a list that is refreshed by the user, with the phase shown
// outside the area.
//
// Phases (onPhase): idle, pull, ready, refreshing, back to idle. Accessibility: the state is announced in a polite live
// region, the area is aria-busy while refreshing, and a hidden button on focus lets keyboard users refresh.
// Animation: the spinner and the spring back run on the motion engine (reduced motion, global speed apply).

import { PullToRefresh, Card, ListRow } from "march/ui"
import { message } from "march/icons"

// Headlines. They are content, so they stay Turkish.
const TITLES = ["Şehirde bisiklet yolu uzuyor", "Hafta sonu hava güneşli", "Yeni kütüphane açıldı", "Sahil konseri cumartesi", "Belediye parkı yeniliyor"]
// Status text for each phase that onPhase reports.
const PHASES: Record<string, string> = { idle: "Güncel", pull: "Çekiliyor…", ready: "Bırakın", refreshing: "Yenileniyor…" }

export function NewsFeed() {
  // The list: three items at first.
  let $news = TITLES.slice(0, 3).map((t, i) => ({ id: i, title: t }))
  // The current phase, set by onPhase and shown in the card's subtitle.
  let $phase = "idle"
  //  onRefresh: wait 0.9 s (a stand-in for a request), then put one new item at the top. The returned promise keeps the
  // spinner turning.
  const load = () => new Promise((ok) => setTimeout(ok, 900)).then(() => {
    const id = $news.length
    $news = [{ id, title: `${TITLES[id % TITLES.length]} (yeni)` }, ...$news]
  })
  return <Card title="Haberler" subtitle={() => PHASES[$phase]}>
    {/* The scroll area needs a height of its own. */}
    <div style={{ height: "260px" }}>
      {/* - onRefresh: the refresh work; onPhase: reports the phase; threshold={64}: how far (px) the pull must go to
          trigger. */}
      <PullToRefresh onRefresh={load} onPhase={(p: string) => $phase = p} threshold={64}>
        {() => $news.map((n) => <ListRow lead={message} title={n.title} sub={`Haber #${n.id + 1}`} />)}
      </PullToRefresh>
    </div>
  </Card>
}
