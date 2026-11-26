// ToastLab: the full-featured Toast example; it uses every option at least once.
//
// Options shown here: kind, action (label, run, error), timeout (0 keeps it until dismissed), icon (your own icon, an
// emoji or false), color, closable, closeLabel, motion, class; toast.dismiss, toast.clear, toast.list; and ToastHost
// (position, class).
// Use it as a reference when you need one specific option: find the call below, copy the line.
// ToastLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Button, ToastHost, toast } from "march/ui"
import { star } from "march/icons"

export function ToastLab() {
  // The id that toast() returned for the "Bilgi" toast; toast.dismiss(id) removes that one toast.
  let $last = 0
  return <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
    {/* ToastHost is optional (one is mounted on first use). Place it yourself to choose where the stack is drawn:
        `position` is one of bottom-end (default), bottom-start, bottom-center, top-end, top-start, top-center, and
        start / end follow the writing direction. `class` goes on the host so CSS or a test can find it. */}
    <ToastHost position="top-center" class="lab-host" />
    {/* timeout: 0 keeps the toast until it is dismissed. closeLabel is the accessible name of the close button. */}
    <Button on:click={() => $last = toast("Bilgi", { kind: "info", timeout: 0, closeLabel: "Bilgiyi kapat" })}>Bilgi</Button>
    {/* icon replaces the kind's icon, color colours it (a theme token) and `class` goes on the toast itself. */}
    <Button on:click={() => toast("Kaydedildi", { kind: "success", icon: star, color: "brand-gold", class: "lab-ok" })}>Başarı</Button>
    {/* icon can be a short text or an emoji. motion: "none" shows it without entrance motion; closable: false hides the
        close button (the toast leaves by its timeout). */}
    <Button on:click={() => toast("Dikkat", { kind: "warn", icon: "⚠️", motion: "none", closable: false })}>Uyarı</Button>
    {/* icon: false shows no icon. A toast action runs when pressed; if `run` fails (here it throws on purpose), the
        toast layer shows an error toast with the thrown message, or with action.error as the fallback text. */}
    <Button on:click={() => toast("Bağlantı koptu", { kind: "danger", icon: false, action: { label: "Yeniden dene", run: () => { throw new Error("Yine olmadı") }, error: "Olmadı" } })}>Hata</Button>
    {/* toast.dismiss(id) removes one toast, toast.clear() removes all of them. */}
    <Button on:click={() => toast.dismiss($last)}>Bilgiyi kaldır</Button>
    <Button on:click={() => toast.clear()}>Hepsini temizle</Button>
    {/* toast.list() is reactive: the count updates as toasts come and go. */}
    <span class="lab-count">{toast.list().length} bildirim</span>
  </div>
}
