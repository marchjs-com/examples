import { Popover, Button } from "march/ui"

// Popover'ın özellikleri: trigger, open / setOpen (denetimli), defaultOpen, onOpenChange, placement, title, closable,
// closeLabel, label, role, motion, width, flush, footer, closeOnOutside, closeOnEscape, autoFocus, color, class,
// panelClass, anchor, id, panelProps ve işlev çocuk (close)
export function PopoverLab() {
  let $open = false
  let $why = "—"
  let $key = "—"
  let $city = "İzmir"
  let field: HTMLElement | undefined
  return <div sx={{ flex: "col", gap: 2 }}>
    <Popover class="lab-pop" panelClass="lab-panel" trigger={<Button>Ayrıntı</Button>} open={$open} setOpen={(v: boolean) => $open = v}
      onOpenChange={(o: boolean, why: string) => $why = `${o ? "açıldı" : "kapandı"} (${why})`} placement="bottom" title="Ayrıntı" closable
      closeLabel="Paneli kapat" label="Ayrıntı paneli" motion="fade" width="sm" footer={<span>Alt bilgi</span>} closeOnOutside={false}
      closeOnEscape autoFocus={false} color="brand-purple">
      {(close: () => void) => <Button size="sm" on:click={() => close()}>Tamam</Button>}
    </Popover>
    <span class="lab-why">{$why}</span>
    {/* kendi durumunu tutan ikinci panel: defaultOpen başta kapalı; anchor paneli düğmeye değil alana göre koyar;
        flush iç boşluğu kaldırır; id sabit; panelProps panele dinleyici ve öznitelik ekler */}
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <span class="lab-field" ref={(el: HTMLElement) => field = el}>Şehir: {$city}</span>
      <Popover trigger={<Button size="sm">Değiştir</Button>} defaultOpen={false} anchor={() => field} role="dialog" label="Şehirler"
        flush id="lab-cities" panelProps={{ "data-lab": "şehir", onKeydown: (e: KeyboardEvent) => $key = e.key }}>
        {(close: () => void) => <div sx={{ flex: "col", p: 1 }}>
          {["Ankara", "İstanbul", "İzmir", "Antalya"].map((c) => <Button variant="ghost" size="sm" class="lab-city" aria-pressed={c === $city}
            on:click={() => { $city = c; close() }}>{c}</Button>)}
        </div>}
      </Popover>
      <span class="lab-key">{$key}</span>
    </div>
  </div>
}
