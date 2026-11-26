// MailClient: the real-life Splitter example.
//
// What it shows: the layout of a mail app. The inbox list is on the left, the open message on the right, and the user can drag the handle to
// give the list more or less room.
// When to use this pattern: master-detail screens (a list and its details, a file tree and an editor). The Splitter keeps both panes
// useful: `min` stops either one from being dragged away completely.
import { Splitter, ListRow } from "march/ui"
import { mail } from "march/icons"

// The messages: sender, subject and text.
const inbox = [
  { from: "Elif", subject: "Toplantı notları", body: "Yarınki toplantının notlarını ekte bulabilirsin." },
  { from: "Can", subject: "Tasarım taslağı", body: "Yeni ana sayfa taslağına bakar mısın?" },
  { from: "Deniz", subject: "Fatura", body: "Kasım faturası hazır." },
]

export function MailClient() {
  // `let $open` is a March signal holding the index of the open message; clicking a row writes it and the right pane redraws.
  let $open = 0
  // The outer div sets the height of the Splitter's area (a style object, because sx has no height token) and carries the m-card class.
  return <div style={{ "block-size": "14rem" }} class="m-card">
    {/* Splitter options used here:
        - initial={0.4}: the list starts at 40 % of the width. min={0.25}: neither pane can get smaller than 25 %.
        - label: the accessible name of the handle, a focusable role="separator": arrow keys move it, Home and End go to the limits and
          Enter goes back to the initial share. Dragging with the mouse or a finger works too.
        - start: the list pane (one ListRow per message; clicking opens it). end: the detail pane, which reads the open message. The
          panes are in logical order, so in right-to-left text the list is on the right. */}
    <Splitter initial={0.4} min={0.25} label="Gelen kutusu genişliği"
      start={<div>{inbox.map((m, i) => <ListRow icon={mail} title={m.from} subtitle={m.subject} on:click={() => $open = i} />)}</div>}
      end={<div sx={{ p: 4 }}><h4 sx={{ text: "bold" }}>{inbox[$open]!.subject}</h4><p>{inbox[$open]!.body}</p></div>} />
  </div>
}
