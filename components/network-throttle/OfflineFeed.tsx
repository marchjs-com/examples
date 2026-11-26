// OfflineFeed: the real-life NetworkThrottle example.
//
// A feed that loads its data every time it opens. On a slow network a spinner shows; when offline, the last saved copy
// is shown with a warning and a "try again" button. The panel's waterfall shows each request's wait and download time.
// Use this pattern to test how your app behaves on a bad connection: choose a network in the panel and press the button.
import { NetworkThrottle, Button, Alert, Spinner } from "march/ui"

// The last successful result, kept outside the component so it survives a re-render; the first value is a fake copy.
let cache: string[] = ["(önbellek) Dünkü buluşma fotoğrafları", "(önbellek) Elif seni etiketledi"]

export function OfflineFeed() {
  // Reactive state: the rows to show and which phase we are in.
  let $items: string[] = []
  let $state: "idle" | "loading" | "ok" | "offline" = "idle"
  const load = async () => {
    $state = "loading"
    try {
      // While a NetworkThrottle is shown, fetch is wrapped: it waits the latency and delivers the body at the
      // chosen speed; offline makes it throw a TypeError, as a lost connection does. The `?t=` part avoids the cache.
      const r = await fetch(`/export-sizes.json?t=${Date.now()}`)
      const data = await r.json() as Record<string, unknown>
      $items = Object.keys(data).slice(0, 4).map((k) => `Yeni: ${k}`)
      cache = $items
      $state = "ok"
    } catch {
      // Failure (offline): fall back to the saved copy and show the warning.
      $items = cache
      $state = "offline"
    }
  }
  // Load once when the example opens.
  void load()
  return <div sx={{ flex: ["row", "wrap"], gap: 4 }}>
    {/* The panel with its defaults; max={5} keeps the last five requests in the waterfall. */}
    <NetworkThrottle max={5} />
    <div class="m-card" sx={{ flex: "col", gap: 2, p: 4 }}>
      <span sx={{ text: ["lg", "bold"] }}>Akış</span>
      {/* Each of these is a function child: it is re-evaluated when $state changes, so the spinner, the warning and
          the rows appear and disappear by themselves. The Spinner gets an accessible `label`; this example sets no
          motion props of its own. */}
      {() => ($state === "loading" ? <Spinner label="Yükleniyor" /> : null)}
      {() => ($state === "offline" ? <Alert tone="warn" title="Çevrimdışısın">Son kaydedilen akış gösteriliyor.</Alert> : null)}
      {() => $items.map((t) => <span sx={{ text: "sm" }}>{t}</span>)}
      <Button size="sm" on:click={() => void load()}>Yeniden dene</Button>
    </div>
  </div>
}
