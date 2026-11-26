// OverlayScopeLab: the full-featured OverlayScope example; it uses every prop and option at least once.
//
// OverlayScope is a box that layers opened inside it open in: a drawer, dialog, menu or toast opened from inside the box
// stays in the box instead of covering the whole page. Its only prop is `class` (a fixed value or a function, so it can
// change live); the layers (openDrawer, openDialog, Portal) take `target`: "nearest" (the default, the scope), "page"
// (the whole page anyway) or a scope element.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// OverlayScopeLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { OverlayScope, Button, openDrawer, openDialog } from "march/ui"

export function OverlayScopeLab() {
  // Reactive state: whether the second class is on.
  let $dark = false
  // - class as a function: re-evaluated when $dark changes, so the box's class list updates live.
  // - The three buttons below are the box's content. They are inside the scope, so what they open is looked up from
  //   them: openDrawer finds the nearest scope and the drawer opens inside the box (it covers the box, not the page, and
  //   while a modal layer is open only the inside of the box is inert).
  // - target: "page" on the dialog opts out: it covers the whole page anyway.
  return <OverlayScope class={() => ($dark ? "lab-scope lab-dark" : "lab-scope")}>
    <Button size="sm" on:click={() => $dark = !$dark}>Sınıfı değiştir</Button>
    <Button size="sm" on:click={() => openDrawer(() => <p>Kutudaki çekmece</p>, { title: "Çekmece" })}>Kutuda aç</Button>
    <Button size="sm" on:click={() => openDialog(() => <p>Bütün sayfa</p>, { title: "Sayfa", target: "page" })}>Sayfada aç</Button>
  </OverlayScope>
}
