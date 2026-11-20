import { Loader, Button, Card } from "march/ui"

// bir satış panosu yenilenirken: içerik yerinde kalır, üstüne perde (overlay) iner; veri gelince kalkar
export function DashboardOverlay() {
  let $busy = false
  let $orders = 1284
  const refresh = () => { $busy = true; setTimeout(() => { $orders += Math.floor(Math.random() * 40); $busy = false }, 1200) }
  return <Card title="Satış panosu" sx={{ p: 3 }}>
    <div style={{ position: "relative", "min-height": "6rem" }}>
      <p sx={{ text: ["xl", "bold"] }}>{() => `${$orders.toLocaleString("tr-TR")} sipariş`}</p>
      <p sx={{ color: "muted" }}>Bu çeyrekte ortalama sepet 412 ₺.</p>
      {() => $busy ? <Loader overlay color="brand-orange" text="Veriler yenileniyor…" /> : null}
    </div>
    <Button size="sm" disabled={() => $busy} on:click={refresh}>Yenile</Button>
  </Card>
}
