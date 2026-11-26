// DisclosureLab: the full-featured Disclosure example; it uses every prop at least once.
//
// Props shown here: title (text or a node), open (fixed or live), onToggle, marker (the default arrow, your own mark,
// or none), class, and the content.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// DisclosureLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Disclosure, Button } from "march/ui"
import { Icon, settings } from "march/icons"

// $open is the live state of the first Disclosure; $last shows what onToggle reported.
export function DisclosureLab() {
  let $open = true
  let $last = "—"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Live: open is a signal, so a button can open and close it from outside, and onToggle reports every change the user
            makes (click, Enter or Space on the summary). Disclosure is the native <details> / <summary>, so keyboard and
            screen reader support come with it. */}
    <Disclosure class="lab-live" title="Canlı (open bir sinyal)" open={$open} onToggle={(o: boolean) => { $open = o; $last = o ? "açıldı" : "kapandı" }}>
      <p>open, sinyalin değerini izler.</p>
    </Disclosure>
    <Button class="lab-flip" on:click={() => $open = !$open}>{$open ? "Kapat" : "Aç"}</Button>
    <span class="lab-last">Son değişiklik: {$last}</span>
    {/* title can be a node (here bold text). marker: your own mark, an icon, in place of the turning arrow. */}
    <Disclosure class="lab-own" title={<b>Kendi işaretim</b>} marker={<Icon of={settings} />}>
      <p>Ok yerine dişli.</p>
    </Disclosure>
    {/* marker={false}: no arrow before the title. open (without a value) means open at the start. */}
    <Disclosure class="lab-plain" title="İşaretsiz" marker={false} open>
      <p>Başlıkta ok yok.</p>
    </Disclosure>
  </div>
}
