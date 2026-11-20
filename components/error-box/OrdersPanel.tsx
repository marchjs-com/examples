import { ErrorBox, Card, Skeleton, Button } from "march/ui"

// sipariş paneli: yükleme bir hata nesnesiyle düşer; yeniden dene isteği tekrarlar, ikinci deneme başarılı olur
export function OrdersPanel() {
  let $state: "loading" | "error" | "done" = "loading"
  let $err: Error | null = null
  let $attempt = 0
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
    {() => $state === "loading" ? <Skeleton lines={3} />
      : $state === "error" ? <ErrorBox title="Siparişler yüklenemedi" error={() => $err} retry={load} />
      : <div sx={{ flex: "col", gap: 1 }}>
          <span>#1042 · 3 ürün · 412 ₺</span>
          <span>#1041 · 1 ürün · 89 ₺</span>
          <Button size="sm" variant="ghost" on:click={() => { $attempt = 0; load() }}>Baştan dene</Button>
        </div>}
  </Card>
}
