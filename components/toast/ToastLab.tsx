import { Button, ToastHost, toast } from "march/ui"
import { star } from "march/icons"

// toast()'un bütün seçenekleri: kind, action (label, run, error), timeout (0: kalıcı), icon (kendi ikonun, emoji ya da
// false), color, closable, closeLabel, motion, class; toast.dismiss, toast.clear, toast.list; ToastHost (position, class)
export function ToastLab() {
  let $last = 0
  return <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
    <ToastHost position="top-center" class="lab-host" />
    <Button on:click={() => $last = toast("Bilgi", { kind: "info", timeout: 0, closeLabel: "Bilgiyi kapat" })}>Bilgi</Button>
    <Button on:click={() => toast("Kaydedildi", { kind: "success", icon: star, color: "brand-gold", class: "lab-ok" })}>Başarı</Button>
    <Button on:click={() => toast("Dikkat", { kind: "warn", icon: "⚠️", motion: "none", closable: false })}>Uyarı</Button>
    <Button on:click={() => toast("Bağlantı koptu", { kind: "danger", icon: false, action: { label: "Yeniden dene", run: () => { throw new Error("Yine olmadı") }, error: "Olmadı" } })}>Hata</Button>
    <Button on:click={() => toast.dismiss($last)}>Bilgiyi kaldır</Button>
    <Button on:click={() => toast.clear()}>Hepsini temizle</Button>
    <span class="lab-count">{toast.list().length} bildirim</span>
  </div>
}
