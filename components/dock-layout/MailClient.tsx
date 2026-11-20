import { DockLayout, Button, Field, Textarea, row, col, tabs, type DockApi } from "march/ui"
import { inbox, mail, edit } from "march/icons"

// gerçek hayattan: bir e-posta istemcisi. Solda gelen kutusu, sağda okuma bölmesi ve taslak; bir postaya basınca okuma
// bölmesi öne gelir, taslakta yazı varken sekmede "değişti" noktası görünür. Yerleşim bu oturumda hatırlanır.
const MAILS = [
  { from: "Ada", subject: "Toplantı saat 3'te", body: "Gündem ekte." },
  { from: "Deniz", subject: "Fatura hazır", body: "Ekim faturası sistemde." },
  { from: "Ece", subject: "Tasarım geri bildirimi", body: "Renkler çok güzel olmuş!" },
]
const mem = new Map<string, unknown>()

export function MailClient() {
  let $open = 0
  let $draft = ""
  let dock: DockApi | undefined
  const read = (i: number) => { $open = i; dock?.open("read") }
  const panels = [
    { id: "inbox", title: "Gelen kutusu", icon: inbox, min: [160, 120] as [number, number], badge: MAILS.length, content: () => <div sx={{ p: 2, flex: "col", gap: 1 }}>
      {MAILS.map((m, i) => <Button size="sm" variant="ghost" on:click={() => read(i)}>{m.from}: {m.subject}</Button>)}
    </div> },
    { id: "read", title: () => MAILS[$open]!.subject, icon: mail, content: () => <div sx={{ p: 3, flex: "col", gap: 1 }}>
      <span sx={{ text: "bold" }}>{() => MAILS[$open]!.from}</span>
      <span>{() => MAILS[$open]!.body}</span>
    </div> },
    { id: "draft", title: "Yeni posta", icon: edit, dirty: () => $draft.length > 0, content: () => <div sx={{ p: 2 }}><Field label="İleti"><Textarea bind:value={$draft} rows={3} /></Field></div> },
  ]
  return <div style={{ height: "20rem" }}>
    <DockLayout panels={panels} label="Posta" commands={false} api={(a) => dock = a}
      presets={{ mail: { title: "Posta", tree: () => row([0.35, tabs("inbox")], [0.65, col([0.6, tabs("read")], [0.4, tabs("draft")])]) } }}
      persist="mail-layout" storage={{ get: (k) => mem.get(k), set: (k, v) => { mem.set(k, v) } }} />
  </div>
}
