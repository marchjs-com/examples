// MailSelection: the real-life LiveStatus example.
//
// What it shows: an inbox list with checkboxes. As the visitor ticks messages, a status line under the list says "N
// messages selected" (or that none are selected). A help line above the status explains what the ticks are for, and it is
// linked to the list through aria-describedby.
// When to use this pattern: bulk selection in lists and tables, where the selection count is useful to everyone. The text
// is shown to all (the default), and a screen reader also reads it when it changes, without focus moving.
//
// Accessibility: LiveStatus renders role="status" with a polite live region; it is always on the page and only its text
// changes, which is what lets screen readers announce it. The hint line is a plain paragraph read once, when focus enters
// the list that points at it with aria-describedby. Animation: none.
import { LiveStatus, Checkbox, Card } from "march/ui"

const MAILS = ["Fatura hazır", "Toplantı daveti", "Haftalık bülten", "Şifre değişti"]

export function MailSelection() {
  // The titles of the ticked messages, a signal.
  let $picked: string[] = []
  // Adds or removes a title (a new array each time, so the signal notices the change).
  const flip = (m: string, on: boolean) => { $picked = on ? [...$picked, m] : $picked.filter((x) => x !== m) }
  return <Card title="Gelen kutusu">
    {/* aria-describedby="mail-help": points at the id given to the help line below, so a screen reader reads the hint
        when focus enters this group. */}
    <div aria-describedby="mail-help" sx={{ flex: "col", gap: 1 }}>
      {MAILS.map((m) => <Checkbox label={m} onChange={(on: boolean) => flip(m, on)} />)}
    </div>
    {/* as="p": the element used for the status. help: a hint line placed before the status; helpId: its id, which the
        list above refers to. text: a function, so the sentence is rewritten (and read) whenever the selection changes. */}
    <LiveStatus as="p" help="Toplu işlem için iletileri işaretleyin." helpId="mail-help"
      text={() => ($picked.length ? `${$picked.length} ileti seçildi` : "Seçili ileti yok")} />
  </Card>
}
