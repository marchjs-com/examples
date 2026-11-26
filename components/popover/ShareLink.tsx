// ShareLink: the real-life Popover example.
//
// What it shows: a "Share" button that opens a panel with the link in a read-only field, a Copy button and a note in
// the footer. When to use this pattern: a small form or a few actions tied to one button (share, filters, a
// link editor) where the rest of the page should stay reachable (the panel is not modal).
//
// Accessibility: Popover wires aria-haspopup / aria-expanded / aria-controls to the trigger, names the panel by its
// title, closes on Escape or a press outside and returns focus to the trigger. Animation: the entrance runs on the
// motion engine (reduced motion and global speed apply); `motion="none"` turns it off.

import { Popover, Button, TextInput, toast } from "march/ui"
import { link } from "march/icons"

// The link to share; in a real page it comes from the current item.
export function ShareLink() {
  const url = "https://marchjs.com/p/42"
  // - trigger: a Button with an icon opens the panel.
  // - title + closable: header with a close button; width="md": a medium panel so the link fits.
  // - footer: a small muted note under the content, outside the padded body area.
  return <Popover trigger={<Button icon={link}>Paylaş</Button>} title="Bağlantıyı paylaş" width="md" closable
    footer={<span sx={{ text: "xs", color: "muted" }}>Bağlantısı olan herkes görebilir</span>}>
    {/* The read-only TextInput keeps the link selectable; aria-label names it, as it has no visible label.
        Copy shows a toast and calls `close` so the panel does not stay in the way. */}
    {(close: () => void) => <div sx={{ flex: "row", gap: 2 }}>
      <TextInput aria-label="Bağlantı" value={url} readonly />
      <Button variant="primary" on:click={() => { toast("Kopyalandı"); close() }}>Kopyala</Button>
    </div>}
  </Popover>
}
