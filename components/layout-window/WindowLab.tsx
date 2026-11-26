// WindowLab: the full-featured Window example; it uses every prop at least once.
//
// Props shown here: title, icon, chrome, x / y / width / height, minWidth / minHeight, state and onStateChange, open and
// onClose, minimizable / maximizable / closable, movable, resizable, snap, labels, icons, color, stripe, animated,
// persist and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// WindowLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Animation: `animated={false}` below makes place and size change at once. With it left on, the transitions follow
// reduced motion (they are turned off for visitors who ask for that).
import { Window, Button } from "march/ui"
import { fileText } from "march/icons"

export function WindowLab() {
  // Signals: the window state ("normal", "minimized", "maximized" or a docked side), whether it is open, and how many
  // times it was closed.
  let $state = "normal"
  let $open = true
  let $closes = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      {/* The reopen button is disabled while the window is open. */}
      <Button size="sm" disabled={$open} on:click={() => $open = true}>Raporu aç</Button>
      <span class="lab-closes">Kapatma: {$closes}</span>
    </div>
    {/* open: the window is shown while it is true; onClose: called when the close button is pressed (here it sets
        open to false). When `open` is false the window stays in the DOM but is hidden.
        persist: place, size and state are kept in localStorage under a key built from "lab-rapor", so they come back
        after a page reload. */}
    <div style={{ position: "relative", "block-size": "20rem" }}>
      {/* The first window, prop by prop:
          - class: added to the frame, so tests and your CSS can find it.
          - title, icon: the title text and the icon node in the title bar.
          - chrome="hadi": the look of the frame ("hadi", "mac" or "windows").
          - x, y, width, height: the starting place and size (px). minWidth / minHeight: the smallest size.
          - state + onStateChange: control the window state from outside and learn when the visitor changes it by
            maximizing, minimizing or docking. (The cast only satisfies the type of `state`.)
          - snap: dropping the window on an edge of the area docks it to half of it. resizable, movable: on by
            default, written out here for clarity.
          - color: colour token for the frame's accent. stripe={false}: remove the brand stripe of the "hadi" look.
          - animated={false}: place and size change at once.
          - labels: the accessible names of the buttons (here only close is changed; the others keep their defaults).
          - icons: your own button icons (an icon, text or node each); here the close button is a plain cross. */}
      <Window class="lab-win" title="Rapor" icon={fileText} chrome="hadi" x={10} y={10} width={300} height={180} minWidth={200} minHeight={120}
        state={$state as "normal"} onStateChange={(s: string) => $state = s} snap resizable movable color="brand-purple" stripe={false} animated={false}
        open={$open} onClose={() => { $open = false; $closes++ }} persist="lab-rapor"
        labels={{ close: "Raporu kapat" }} icons={{ close: "✕" }}>
        <p sx={{ p: 2 }} class="lab-state">Durum: {$state}</p>
      </Window>
      {/* The second window is locked down: it cannot be moved, resized, closed, maximized or minimized, and it has no
          content. With every button off, its title bar shows no buttons at all (the test checks this). */}
      <Window class="lab-fixed" title="Sabit" chrome="mac" x={200} y={120} width={200} height={120} movable={false} resizable={false} closable={false} maximizable={false} minimizable={false} />
    </div>
  </div>
}
