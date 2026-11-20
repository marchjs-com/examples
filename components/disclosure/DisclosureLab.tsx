import { Disclosure, Button } from "march/ui"
import { Icon, settings } from "march/icons"

// Disclosure'un bütün özellikleri: title (metin ya da öğe), open (sabit ya da canlı), onToggle, marker (hazır ok,
// kendi işaretin ya da yok), class ve içerik
export function DisclosureLab() {
  let $open = true
  let $last = "—"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Disclosure class="lab-live" title="Canlı (open bir sinyal)" open={$open} onToggle={(o: boolean) => { $open = o; $last = o ? "açıldı" : "kapandı" }}>
      <p>open, sinyalin değerini izler.</p>
    </Disclosure>
    <Button class="lab-flip" on:click={() => $open = !$open}>{$open ? "Kapat" : "Aç"}</Button>
    <span class="lab-last">Son değişiklik: {$last}</span>
    <Disclosure class="lab-own" title={<b>Kendi işaretim</b>} marker={<Icon of={settings} />}>
      <p>Ok yerine dişli.</p>
    </Disclosure>
    <Disclosure class="lab-plain" title="İşaretsiz" marker={false} open>
      <p>Başlıkta ok yok.</p>
    </Disclosure>
  </div>
}
