import { ReplyQuote, Button } from "march/ui"
import { trash } from "march/icons"

// ReplyQuote'un özellikleri: name, text, lines, variant, bar, onClose, close (kendi ikonun), closeLabel, trail,
// onClick, class
export function ReplyQuoteLab() {
  let $log = "—"
  return <div sx={{ flex: "col", gap: 2 }}>
    <ReplyQuote class="lab-q" name="Elif" text="Uzun bir mesaj metni" lines={2} variant="soft" bar={false}
      onClose={() => $log = "vazgeçildi"} close={trash} closeLabel="Kaldır" trail={<Button size="sm">Git</Button>} onClick={() => $log = "tıklandı"} />
    <span class="lab-log">{$log}</span>
  </div>
}
