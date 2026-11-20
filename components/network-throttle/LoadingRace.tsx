import { NetworkThrottle, Button, Progress } from "march/ui"

// yükleme yarışı: ağı seç, fotoğrafı indir; çubuk gelen baytları sayar (gövde akış olarak okunur), süre yazılır
export function LoadingRace() {
  let $got = 0
  let $total = 1
  let $note = "Bir ağ seç, sonra indir"
  const load = async () => {
    const t0 = performance.now()
    $got = 0; $note = "bağlanıyor…"
    try {
      const r = await fetch(`/media/dusk.jpg?t=${Date.now()}`)
      $total = Number(r.headers.get("content-length")) || 21531
      const reader = r.body!.getReader()
      for (;;) { const { done, value } = await reader.read(); if (done) break; $got += value.byteLength; $note = `${Math.round($got / 1000)} kB` }
      $note = `${Math.round(performance.now() - t0)} ms`
    } catch { $note = "ağ yok: indirilemedi" }
  }
  return <div sx={{ flex: "col", gap: 3 }}>
    <NetworkThrottle custom={false} requests={false} />
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button size="sm" variant="primary" on:click={() => void load()}>Fotoğrafı indir</Button>
      <span sx={{ text: "sm", color: "muted" }}>{() => $note}</span>
    </div>
    <Progress value={() => Math.min(100, ($got / $total) * 100)} label="İndirilen" />
  </div>
}
