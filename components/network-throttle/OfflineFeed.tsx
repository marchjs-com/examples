import { NetworkThrottle, Button, Alert, Spinner } from "march/ui"

// gerçek hayattan: akış her açılışta veriyi yükler; yavaş ağda yükleniyor görünür, çevrimdışıyken son kopya gösterilir
// ve "yeniden dene" sunulur. Paneldeki şelalede her isteğin bekleme ve indirme süresi görünür.
let cache: string[] = ["(önbellek) Dünkü buluşma fotoğrafları", "(önbellek) Elif seni etiketledi"]

export function OfflineFeed() {
  let $items: string[] = []
  let $state: "idle" | "loading" | "ok" | "offline" = "idle"
  const load = async () => {
    $state = "loading"
    try {
      const r = await fetch(`/export-sizes.json?t=${Date.now()}`)
      const data = await r.json() as Record<string, unknown>
      $items = Object.keys(data).slice(0, 4).map((k) => `Yeni: ${k}`)
      cache = $items
      $state = "ok"
    } catch {
      $items = cache
      $state = "offline"
    }
  }
  void load()
  return <div sx={{ flex: ["row", "wrap"], gap: 4 }}>
    <NetworkThrottle max={5} />
    <div class="m-card" sx={{ flex: "col", gap: 2, p: 4 }}>
      <span sx={{ text: ["lg", "bold"] }}>Akış</span>
      {() => ($state === "loading" ? <Spinner label="Yükleniyor" /> : null)}
      {() => ($state === "offline" ? <Alert tone="warn" title="Çevrimdışısın">Son kaydedilen akış gösteriliyor.</Alert> : null)}
      {() => $items.map((t) => <span sx={{ text: "sm" }}>{t}</span>)}
      <Button size="sm" on:click={() => void load()}>Yeniden dene</Button>
    </div>
  </div>
}
