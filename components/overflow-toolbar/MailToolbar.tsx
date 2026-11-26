// MailToolbar: the real-life OverflowToolbar example.
//
// The toolbar of an email reader. The reply button is always visible; when the space gets narrow, snooze and tag
// move into the "More" menu first (lowest priority first), and they come back when there is room. A counter at
// the end never overflows. Use this pattern for any row of actions that must not wrap or squeeze on a narrow screen.
import { OverflowToolbar, Card, toast, confirm } from "march/ui"
import { send, arrowUpRight, inbox, flag, pin, clock, tag, trash } from "march/icons"

export function MailToolbar() {
  // Reactive state: toggle buttons (flagged, pinned) and whether the mail was deleted.
  let $flagged = false
  let $pinned = true
  let $gone = false
  // Ask first (confirm returns a promise: true if the user agrees), then mark it gone and tell the user with a toast.
  const remove = async () => { if (await confirm("E-posta silinsin mi?")) { $gone = true; toast("E-posta çöp kutusuna taşındı") } }
  return <Card title="Haftalık rapor hazır" subtitle="Elif Arslan · 09:41">
    {/* - label (required): the accessible name of the toolbar. size="md": the larger buttons. m:color: the common
          colour token prop.
        - end: content after the items that never overflows (the counter).
        - items: a plain action has id, label, icon and onSelect. `priority` decides who moves to the "More" menu first
          when space runs out: the lowest number goes first (the delete item with 0 goes before the reply item with 10).
        - showLabel: an item with an icon is icon-only (its label is the accessible name and the tooltip) unless
          showLabel is set; here only the reply button shows its text.
        - disabled as a function stays live ($gone). pressed as a function makes the button a toggle (aria-pressed).
        - { separator: true }: a divider; one next to a hidden item disappears, and in the "More" menu it becomes a menu
          separator. danger: draws the item in the danger tone.
        Accessibility: role="toolbar" with one Tab stop; the arrow keys, Home and End move between the buttons (the
        "More" button included). Items that moved to the menu leave the tab order. When there is room again an item
        slides back with a short animation that follows the motion engine (reduced motion, global speed, "Stop all");
        the `motion` prop can choose or replace it (see OverflowToolbarLab). */}
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
