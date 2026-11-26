// PlanCard: the real-life Card example.
//
// A subscription card: a status badge and an "add seats" button in the header, the plan's details in the body, and the
// renewal date with an invoice button in the footer. Adding seats changes the numbers. Use this pattern for account,
// billing and summary cards: Card gives the frame and the three regions, and you fill each one.
import { Card, Button, Badge, KeyValue, toast } from "march/ui"
import { edit, download } from "march/icons"

export function PlanCard() {
  // The number of seats (reactive state): the body's numbers are computed from it.
  let $seats = 48
  // as="article" makes the root an article. title and subtitle are the header text. `actions` is a list of nodes: a
  // success Badge and a small Button; the button adds five seats and confirms with a toast (a short, polite status
  // message). `footer` can be any node: here a row with a text and a ghost Button.
  return <Card as="article" title="Kurumsal plan" subtitle="HADİ A.Ş."
    actions={[<Badge tone="success">Aktif</Badge>, <Button size="sm" icon={edit} on:click={() => { $seats += 5; toast("5 koltuk eklendi") }}>Koltuk ekle</Button>]}
    footer={<div sx={{ flex: ["row", "center"], gap: 2 }}>
      <span sx={{ color: "muted" }}>Yenileme: 1 Aralık</span>
      <Button size="sm" variant="ghost" icon={download}>Fatura</Button>
    </div>}>
    {/* The body: KeyValue lists label / value pairs in two columns. A value given as a function stays live, so the
        seat count and the monthly price follow $seats (the price is formatted for the Turkish locale). */}
    <KeyValue columns={2} items={[
      { label: "Koltuk", value: () => String($seats) },
      { label: "Aylık", value: () => `${($seats * 120).toLocaleString("tr-TR")} ₺` },
      { label: "Depolama", value: "1 TB" },
      { label: "Destek", value: "7/24" },
    ]} />
  </Card>
}
