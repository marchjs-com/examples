import { OverflowToolbar, Card, toast, confirm } from "march/ui"
import { send, arrowUpRight, inbox, flag, pin, clock, tag, trash } from "march/icons"

// bir e-posta okuyucusunun araç çubuğu: Yanıtla hep görünür, yer daralınca Ertele ve Etiketle önce "Daha fazla"ya gider;
// sonda hiç taşmayan sayaç (end)
export function MailToolbar() {
  let $flagged = false
  let $pinned = true
  let $gone = false
  const remove = async () => { if (await confirm("E-posta silinsin mi?")) { $gone = true; toast("E-posta çöp kutusuna taşındı") } }
  return <Card title="Haftalık rapor hazır" subtitle="Elif Arslan · 09:41">
    <OverflowToolbar label="E-posta işlemleri" size="md" m:color="brand-blue" end={<span sx={{ text: "sm", color: "muted" }}>3 / 48</span>} items={[
      { id: "reply", label: "Yanıtla", icon: send, showLabel: true, priority: 10, disabled: () => $gone, onSelect: () => toast("Yanıt penceresi açıldı") },
      { id: "forward", label: "İlet", icon: arrowUpRight, priority: 8, disabled: () => $gone, onSelect: () => toast("İletiliyor") },
      { id: "s1", separator: true },
      { id: "archive", label: "Arşivle", icon: inbox, priority: 7, onSelect: () => toast("Arşivlendi") },
      { id: "flag", label: "Bayrakla", icon: flag, priority: 6, pressed: () => $flagged, onSelect: () => $flagged = !$flagged },
      { id: "pin", label: "Sabitle", icon: pin, priority: 5, pressed: () => $pinned, onSelect: () => $pinned = !$pinned },
      { id: "snooze", label: "Ertele", icon: clock, priority: 2, onSelect: () => toast("Yarın 09:00'da yeniden gelecek") },
      { id: "tag", label: "Etiketle", icon: tag, priority: 1, onSelect: () => toast("Etiket: İş") },
      { id: "s2", separator: true },
      { id: "delete", label: "Sil", icon: trash, danger: true, priority: 0, disabled: () => $gone, onSelect: remove },
    ]} />
  </Card>
}
