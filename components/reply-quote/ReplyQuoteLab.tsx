// ReplyQuoteLab: the full-featured ReplyQuote example; it uses every prop at least once.
//
// Props shown here: name, text, lines, variant, bar, onClose, close (your own icon), closeLabel, trail, onClick, class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ReplyQuoteLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { ReplyQuote, Button } from "march/ui"
import { trash } from "march/icons"

export function ReplyQuoteLab() {
  // The last event as text, so you can see the callbacks fire.
  let $log = "—"
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* - name and text: the first line and the quoted text; lines={2}: keep two lines of the text (0 shows all).
        - variant="soft" (the default) or "inverse" (for use inside a coloured bubble); bar={false}: no bar at the
          start.
        - onClose: shows the cancel button; close: your own icon for it; closeLabel: its accessible name.
        - trail: a node after the text (a thumbnail, a control); onClick: makes the quote a button (jump to the
          message);
          class: on the box (the tests use it). */}
    <ReplyQuote class="lab-q" name="Elif" text="Uzun bir mesaj metni" lines={2} variant="soft" bar={false}
      onClose={() => $log = "vazgeçildi"} close={trash} closeLabel="Kaldır" trail={<Button size="sm">Git</Button>} onClick={() => $log = "tıklandı"} />
    {/* The last event. */}
    <span class="lab-log">{$log}</span>
  </div>
}
