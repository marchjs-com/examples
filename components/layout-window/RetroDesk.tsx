// RetroDesk: the real-life Window example.
//
// What it shows: a tiny desktop with two overlapping windows in the "windows" look (the `chrome` prop). Each window can
// be dragged, resized, docked to half of the desk by dropping it on an edge, filled and closed; the second window
// counts how many windows have been closed.
// When to use this pattern: dashboards with movable panels, embedded app-in-app demos, tool workspaces. The `chrome`
// prop only changes the look of the title bar and buttons ("hadi" is the default, "mac" and "windows" are the others),
// the behaviour is the same.
//
// Animation: place and size changes use Window's transitions, which reduced motion turns off; `animated={false}` makes
// them instant. Keyboard: the title bar is focusable (arrows move, Shift + arrows resize, Enter fills / restores,
// Escape restores).
import { Window } from "march/ui"

export function RetroDesk() {
  // How many windows have been closed: a signal, so the text in the second window follows it.
  let $closed = 0
  // The wrapper is the area both windows live in: position: relative and a fixed height make it the desk.
  return <div style={{ position: "relative", "block-size": "20rem" }}>
    {/* chrome="windows": the Windows-style title bar. onClose runs when the close button is pressed (here it only
        counts; the window itself hides because no `open` prop is controlling it). x / y / width / height place each
        window on the desk. */}
    <Window title="Hesap makinesi" chrome="windows" x={16} y={16} width={220} height={150} onClose={() => $closed++}>
      <p sx={{ p: 2, text: ["lg", "mono"] }}>2 + 2 = 4</p>
    </Window>
    <Window title="Not defteri" chrome="windows" x={180} y={90} width={240} height={150} onClose={() => $closed++}>
      <p sx={{ p: 2 }}>{$closed} pencere kapandı</p>
    </Window>
  </div>
}
