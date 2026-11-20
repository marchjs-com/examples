import { Dialog, Button } from "march/ui"
import { arrowLeft } from "march/icons"

// Dialog'un özellikleri: open, onClose, title, size, dismissable, footer, closeButton (kendi ikonun ya da yok),
// closeLabel, motion, modal, label, role, class ve içerik
// startOpen: önizlemede açık başlar; testler kapalı başlatıp Aç ile açar
export function DialogLab(props: { startOpen?: boolean }) {
  let $open = props.startOpen ?? true
  let $closed = 0
  let $note = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <Button on:click={() => $open = true}>Aç</Button>
    <Button variant="secondary" on:click={() => $note = !$note}>Not</Button>
    <span class="lab-closed">{$closed} kez kapandı</span>
    <Dialog open={$open} onClose={() => { $open = false; $closed++ }} title="Ayarlar" size="lg" dismissable
      closeButton={arrowLeft} closeLabel="Geri dön" motion="fade" class="lab-dialog"
      footer={<Button variant="primary" on:click={() => { $open = false; $closed++ }}>Kaydet</Button>}>
      <p>Uzun bir ayar listesi burada kayar.</p>
    </Dialog>
    {/* başlıksız pencere: label erişilebilir adı verir; modal={false} örtüsüz, sayfa kullanılabilir kalır */}
    <Dialog open={$note} onClose={() => $note = false} label="Hızlı not" modal={false} size="sm" class="lab-note">
      <p>Sayfaya dokunmaya devam edebilirsin.</p>
    </Dialog>
  </div>
}
