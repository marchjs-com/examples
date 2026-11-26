// PopoverLab: the full-featured Popover example; it uses every prop at least once.
//
// Props shown here: trigger, open / setOpen (controlled), defaultOpen, onOpenChange, placement, title, closable,
// closeLabel, label, role, motion, width, flush, footer, closeOnOutside, closeOnEscape, autoFocus, color, class,
// panelClass, anchor, id, panelProps and the function child (close).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PopoverLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { Popover, Button } from "march/ui"

export function PopoverLab() {
  // Controlled state of the first Popover: you own `open`, Popover asks you to change it through `setOpen`.
  let $open = false
  // The reason of the last open / close (trigger, outside, escape, close, api), shown as text so you can see it.
  let $why = "—"
  // The last key pressed inside the second panel (from panelProps.onKeydown).
  let $key = "—"
  // The chosen city of the second Popover; the field next to it shows it.
  let $city = "İzmir"
  // The field element the second panel is placed by (anchor).
  let field: HTMLElement | undefined
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The first Popover, controlled and fully configured:
        - open / setOpen: your signal owns the state (without them Popover keeps its own).
        - onOpenChange(open, why): called on every change; `why` tells what caused it.
        - placement="bottom": centred below the trigger (it flips at the screen edge). title + closable: header with a
          close button; closeLabel is that button's accessible name, `label` names the panel for screen readers.
        - motion="fade": the entrance (scale, fade, rise or none); the motion engine already applies reduced motion.
        - width="sm": a fixed panel width; footer: content under the main area.
        - closeOnOutside={false}: a press outside does NOT close it; closeOnEscape keeps Escape working.
        - autoFocus={false}: focus is not moved into the panel when it opens (default true focuses the first control).
        - color: the colour token used inside the panel; class goes on the wrapper around the trigger, panelClass on the
          floating panel itself. */}
    <Popover class="lab-pop" panelClass="lab-panel" trigger={<Button>Ayrıntı</Button>} open={$open} setOpen={(v: boolean) => $open = v}
      onOpenChange={(o: boolean, why: string) => $why = `${o ? "açıldı" : "kapandı"} (${why})`} placement="bottom" title="Ayrıntı" closable
      closeLabel="Paneli kapat" label="Ayrıntı paneli" motion="fade" width="sm" footer={<span>Alt bilgi</span>} closeOnOutside={false}
      closeOnEscape autoFocus={false} color="brand-purple">
      {/* The function child receives `close`. */}
      {(close: () => void) => <Button size="sm" on:click={() => close()}>Tamam</Button>}
    </Popover>
    {/* The reason text written by onOpenChange. */}
    <span class="lab-why">{$why}</span>
    {/* The second Popover keeps its own state:
        - defaultOpen={false}: starts closed (the state is Popover's own, not a signal of yours).
        - anchor: the panel is placed by the field, not by the button; the function returns the element.
        - role="dialog" + label: the panel's ARIA role and accessible name (there is no title here).
        - flush: no inner padding, so the list of cities fills the panel; id: a fixed id for the panel;
        - panelProps: extra attributes and listeners on the panel element (here a data attribute and a keydown handler). */}
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <span class="lab-field" ref={(el: HTMLElement) => field = el}>Şehir: {$city}</span>
      <Popover trigger={<Button size="sm">Değiştir</Button>} defaultOpen={false} anchor={() => field} role="dialog" label="Şehirler"
        flush id="lab-cities" panelProps={{ "data-lab": "şehir", onKeydown: (e: KeyboardEvent) => $key = e.key }}>
        {(close: () => void) => <div sx={{ flex: "col", p: 1 }}>
          {/* aria-pressed marks the current city for assistive technology; clicking sets it and closes the panel. */}
          {["Ankara", "İstanbul", "İzmir", "Antalya"].map((c) => <Button variant="ghost" size="sm" class="lab-city" aria-pressed={c === $city}
            on:click={() => { $city = c; close() }}>{c}</Button>)}
        </div>}
      </Popover>
      <span class="lab-key">{$key}</span>
    </div>
  </div>
}
