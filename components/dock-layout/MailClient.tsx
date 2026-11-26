// MailClient: the real-life DockLayout example.
//
// What it shows: an email client. The inbox is on the left, the reading pane and a draft are on the right. Pressing a
// message brings the reading pane to the front (api.open), and while the draft has text its tab shows a "changed" dot.
// The layout is remembered for this session (persist + an in-memory store).
// When to use this pattern: tools with several resizable, rearrangeable panels. Panels never move in the DOM, so an
// editor or an iframe keeps its state while tabs are dragged around.
// Keyboard: arrows move between tabs, Shift+F10 opens a panel's menu, arrows on a splitter resize.
import { DockLayout, Button, Field, Textarea, row, col, tabs, type DockApi } from "march/ui"
import { inbox, mail, edit } from "march/icons"

// Sample messages.
const MAILS = [
  { from: "Ada", subject: "Toplantı saat 3'te", body: "Gündem ekte." },
  { from: "Deniz", subject: "Fatura hazır", body: "Ekim faturası sistemde." },
  { from: "Ece", subject: "Tasarım geri bildirimi", body: "Renkler çok güzel olmuş!" },
]
// An in-memory store for `persist`, so the layout is remembered while the page is open but nothing is written to disk.
const mem = new Map<string, unknown>()

// $open is the index of the message being read; $draft is the draft text; dock holds the api.
export function MailClient() {
  let $open = 0
  let $draft = ""
  let dock: DockApi | undefined
  // api.open(id) brings a panel to the front, even if it was in a collapsed group or behind another tab.
  const read = (i: number) => { $open = i; dock?.open("read") }
  // Panels: the inbox has a badge (a count on its tab) and a min size; the reading panel's title is a getter, so the tab
  // shows the subject of the open message; the draft has `dirty`, so its tab shows the "changed" dot while it has text.
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
    {/* presets: one layout, a column on the left and a split (read above, draft below) on the right; row / col take
            [weight, child] pairs and tabs() puts panels in a tab group. persist + storage keep the layout under a key.
            commands={false} turns off the palette commands the dock would add; api hands over the dock's api. */}
    <DockLayout panels={panels} label="Posta" commands={false} api={(a) => dock = a}
      presets={{ mail: { title: "Posta", tree: () => row([0.35, tabs("inbox")], [0.65, col([0.6, tabs("read")], [0.4, tabs("draft")])]) } }}
      persist="mail-layout" storage={{ get: (k) => mem.get(k), set: (k, v) => { mem.set(k, v) } }} />
  </div>
}
