// OrderConsole: the real-life Terminal example.
//
// What it shows: an order console for a support team. "siparis liste" prints a table of orders (optionally filtered with
// --durum), "siparis ara <no>" shows one order as JSON, and "iade <no>" starts a refund and counts it above the terminal.
// When to use this pattern: an admin panel where operators prefer typing to clicking. Commands can have sub-commands (`sub`),
// typed arguments (`args`, with `required`), options (`options`, written --name value) and output helpers (`io.table`,
// `io.json`, `io.success`, `io.error`). The terminal also gives help, history and Tab completion for them.
//
// Animation: the cursor blink runs on March's motion engine (global speed, "Stop all" and the reduced-motion preference
// apply); `blink={false}` keeps it lit.
// Accessibility: the output is a role="log" live region, the input is labelled and everything works from the keyboard.
// `label` names the output log for screen readers. The terminal is always left-to-right, as command lines are.
import { Terminal, Card, ansi } from "march/ui"

// The data: a few orders, a helper that colours the status with ANSI codes, and a helper that turns an order into a table row.
type Order = { no: number; customer: string; total: number; status: string }
const ORDERS: Order[] = [
  { no: 1041, customer: "Ayşe K.", total: 249, status: "teslim" },
  { no: 1042, customer: "Mert D.", total: 1180, status: "kargoda" },
  { no: 1043, customer: "Deniz A.", total: 75, status: "hazırlanıyor" },
]
const tone = (s: string) => s === "teslim" ? ansi.green(s) : s === "kargoda" ? ansi.cyan(s) : ansi.yellow(s)
const row = (o: Order) => [String(o.no), o.customer, `${o.total} ₺`, tone(o.status)]

export function OrderConsole() {
  // Reactive state: how many refunds were started (shown above the terminal, updated by a command).
  let $refunds = 0
  // m:theme="night" draws the card in the dark theme, where a terminal looks at home.
  return <Card m:theme="night">
    <p sx={{ text: "sm", color: "muted" }}>İade edilen: {$refunds}</p>
    {/* prompt: the text before the cursor. height: any CSS length. label: the accessible name of the output. welcome: the
        first line ("[info]" marks it as information). commands: the command table, explained inline. */}
    <Terminal prompt="destek › " height="16rem" label="Sipariş konsolu" welcome="[info] siparis liste · siparis ara <no> · iade <no>" commands={{
      // A command with sub-commands: "siparis" has no run of its own, its `sub` holds "liste" and "ara".
      siparis: { desc: "Siparişler", sub: {
        // options: a --durum value of type string; a.options holds what was typed. io.table takes the rows and the
        // column headings; here the rows are filtered by the option first.
        liste: { desc: "Listeler", options: { durum: { type: "string", desc: "duruma göre süz" } },
          run: (a, io) => io.table(ORDERS.filter((o) => !a.options["durum"] || o.status === a.options["durum"]).map(row), ["no", "müşteri", "tutar", "durum"]) },
        // args: a required number. io.json prints an object as an expandable tree; io.error prints a red error line.
        ara: { desc: "Bir siparişi gösterir", args: [{ name: "no", type: "number", required: true }],
          run: (a, io) => { const o = ORDERS.find((x) => x.no === a.args["no"]); if (o) io.json(o, 1); else io.error(`${a.args["no"]} numaralı sipariş yok`) } },
      } },
      // A top-level command that changes the page's state ($refunds), then confirms with io.success.
      iade: { desc: "İade başlatır", args: [{ name: "no", type: "number", required: true }], run: (a, io) => {
        const o = ORDERS.find((x) => x.no === a.args["no"])
        if (!o) { io.error("sipariş bulunamadı"); return }
        $refunds++
        io.success(`${o.no} için ${o.total} ₺ iade başlatıldı`)
      } },
    }} />
  </Card>
}
