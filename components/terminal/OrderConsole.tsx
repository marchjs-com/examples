import { Terminal, Card, ansi } from "march/ui"

// destek ekibinin sipariş konsolu: "siparis ara 1042", "siparis liste --durum kargoda", "iade 1042"
type Order = { no: number; customer: string; total: number; status: string }
const ORDERS: Order[] = [
  { no: 1041, customer: "Ayşe K.", total: 249, status: "teslim" },
  { no: 1042, customer: "Mert D.", total: 1180, status: "kargoda" },
  { no: 1043, customer: "Deniz A.", total: 75, status: "hazırlanıyor" },
]
const tone = (s: string) => s === "teslim" ? ansi.green(s) : s === "kargoda" ? ansi.cyan(s) : ansi.yellow(s)
const row = (o: Order) => [String(o.no), o.customer, `${o.total} ₺`, tone(o.status)]

export function OrderConsole() {
  let $refunds = 0
  return <Card m:theme="night">
    <p sx={{ text: "sm", color: "muted" }}>İade edilen: {$refunds}</p>
    <Terminal prompt="destek › " height="16rem" label="Sipariş konsolu" welcome="[info] siparis liste · siparis ara <no> · iade <no>" commands={{
      siparis: { desc: "Siparişler", sub: {
        liste: { desc: "Listeler", options: { durum: { type: "string", desc: "duruma göre süz" } },
          run: (a, io) => io.table(ORDERS.filter((o) => !a.options["durum"] || o.status === a.options["durum"]).map(row), ["no", "müşteri", "tutar", "durum"]) },
        ara: { desc: "Bir siparişi gösterir", args: [{ name: "no", type: "number", required: true }],
          run: (a, io) => { const o = ORDERS.find((x) => x.no === a.args["no"]); if (o) io.json(o, 1); else io.error(`${a.args["no"]} numaralı sipariş yok`) } },
      } },
      iade: { desc: "İade başlatır", args: [{ name: "no", type: "number", required: true }], run: (a, io) => {
        const o = ORDERS.find((x) => x.no === a.args["no"])
        if (!o) { io.error("sipariş bulunamadı"); return }
        $refunds++
        io.success(`${o.no} için ${o.total} ₺ iade başlatıldı`)
      } },
    }} />
  </Card>
}
