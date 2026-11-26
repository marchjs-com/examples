// DialogLab: the full-featured Dialog example; it uses every prop at least once.
//
// Props shown here: open, onClose, title, size, dismissable, footer, closeButton (your own icon, or none), closeLabel,
// motion, modal, label, role and class, and the content.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// DialogLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Dialog, Button } from "march/ui"
import { arrowLeft } from "march/icons"

// startOpen: in the preview the dialog starts open; the tests start it closed and open it with the button.
export function DialogLab(props: { startOpen?: boolean }) {
  // $open drives the main dialog, $closed counts onClose calls, $note drives the second (modeless) dialog.
  let $open = props.startOpen ?? true
  let $closed = 0
  let $note = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <Button on:click={() => $open = true}>Aç</Button>
    <Button variant="secondary" on:click={() => $note = !$note}>Not</Button>
    <span class="lab-closed">{$closed} kez kapandı</span>
    {/* The main dialog:
            - open: shown while true (a signal or accessor); onClose: called on Escape, a click on the scrim or the close
              button (when dismissable), and we set $open to false there (the owner of `open` decides).
            - title: the heading, which also names the dialog; size: sm, md, lg or full.
            - dismissable: false would make only your own buttons close it.
            - closeButton: true (default), false (no button; Escape and the scrim still close), or your own icon, here an
              arrow; closeLabel: its accessible name.
            - motion: how the panel enters (scale, fade, rise, none); with none the scrim appears at once too. The motion
              engine applies, so reduced motion and "Stop all" are respected.
            - footer: the bottom bar for buttons; class: a class on the dialog.
            Keyboard: focus moves into the dialog, Tab stays inside, Escape closes it and focus returns to the opener. */}
    <Dialog open={$open} onClose={() => { $open = false; $closed++ }} title="Ayarlar" size="lg" dismissable
      closeButton={arrowLeft} closeLabel="Geri dön" motion="fade" class="lab-dialog"
      footer={<Button variant="primary" on:click={() => { $open = false; $closed++ }}>Kaydet</Button>}>
      <p>Uzun bir ayar listesi burada kayar.</p>
    </Dialog>
    {/* A second dialog with no title: label gives it an accessible name, and modal={false} draws no scrim and no
            aria-modal, so the page stays usable while it is open (good for notes, small tool windows). */}
    <Dialog open={$note} onClose={() => $note = false} label="Hızlı not" modal={false} size="sm" class="lab-note">
      <p>Sayfaya dokunmaya devam edebilirsin.</p>
    </Dialog>
  </div>
}
