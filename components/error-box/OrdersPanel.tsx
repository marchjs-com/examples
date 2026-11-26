// OrdersPanel: the real-life ErrorBox example.
//
// What it shows: an orders panel. Loading fails with an Error object on the first try; the ErrorBox shows its message and a
// Retry button, and the second try succeeds. While loading a Skeleton stands in for the content.
// When to use this pattern: any panel that loads data: loading, error with a retry, and done are three states of one signal.
// Accessibility: ErrorBox has role="alert", so the failure is announced when it appears.
import { ErrorBox, Card, Skeleton, Button } from "march/ui"

// $state is loading, error or done; $err holds the Error; $attempt counts loads (the first one fails on purpose).
export function OrdersPanel() {
  let $state: "loading" | "error" | "done" = "loading"
  let $err: Error | null = null
  let $attempt = 0
  // Starts a load: after 600 ms the first attempt fails with an Error, later ones succeed (a stand-in for a real request).
  const load = () => {
    $state = "loading"
    $attempt++
    setTimeout(() => {
      if ($attempt < 2) { $err = new Error(`Zaman aşımı: /api/orders (${$attempt}. deneme)`); $state = "error" }
      else $state = "done"
    }, 600)
  }
  load()
  return <Card title="Son siparişler">
    {/* One function child picks the view for the state. ErrorBox: title is the bold line, error is a getter returning the
            Error (its message is shown), retry runs load again. */}
    {() => $state === "loading" ? <Skeleton lines={3} />
      : $state === "error" ? <ErrorBox title="Siparişler yüklenemedi" error={() => $err} retry={load} />
      : <div sx={{ flex: "col", gap: 1 }}>
          <span>#1042 · 3 ürün · 412 ₺</span>
          <span>#1041 · 1 ürün · 89 ₺</span>
          <Button size="sm" variant="ghost" on:click={() => { $attempt = 0; load() }}>Baştan dene</Button>
        </div>}
  </Card>
}
