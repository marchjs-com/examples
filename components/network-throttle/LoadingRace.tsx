// LoadingRace: the creative-minimal NetworkThrottle example.
//
// A loading race: pick a network speed, press the button, and watch a progress bar count the bytes of a photo as they
// arrive, then read how long it took. It uses the panel in its smallest form (only the network chips), so you can feel
// what a slow connection does to your own fetch code. Use it to test loading states of a page.
import { NetworkThrottle, Button, Progress } from "march/ui"

export function LoadingRace() {
  // Reactive state: bytes received, total size (starts at 1 to avoid dividing by zero) and the status text.
  let $got = 0
  let $total = 1
  let $note = "Bir ağ seç, sonra indir"
  const load = async () => {
    const t0 = performance.now()
    $got = 0; $note = "bağlanıyor…"
    try {
      // While a NetworkThrottle is shown, the page's fetch is wrapped: the request waits the network's latency and the
      // response body arrives in small pieces at the chosen bandwidth. The `?t=` part defeats the browser cache so
      // every press really downloads again.
      const r = await fetch(`/media/dusk.jpg?t=${Date.now()}`)
      // Total size from the content-length header; the number after || is a fixed fallback in bytes for when the
      // header is missing.
      $total = Number(r.headers.get("content-length")) || 21531
      // Read the body as a stream, so the bar moves while data arrives instead of jumping at the end.
      const reader = r.body!.getReader()
      for (;;) { const { done, value } = await reader.read(); if (done) break; $got += value.byteLength; $note = `${Math.round($got / 1000)} kB` }
      $note = `${Math.round(performance.now() - t0)} ms`
    } catch { $note = "ağ yok: indirilemedi" }
  }
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* custom={false} hides the bandwidth sliders and requests={false} hides the waterfall, leaving the ready-made
        networks. Choosing "offline" makes fetch fail, which the catch above turns into the last message. */}
    <NetworkThrottle custom={false} requests={false} />
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button size="sm" variant="primary" on:click={() => void load()}>Fotoğrafı indir</Button>
      <span sx={{ text: "sm", color: "muted" }}>{() => $note}</span>
    </div>
    {/* Progress takes a function, so the bar follows the bytes as they arrive; Math.min keeps it at 100 even if
        the header and the real size differ. `label` is its accessible name. */}
    <Progress value={() => Math.min(100, ($got / $total) * 100)} label="İndirilen" />
  </div>
}
