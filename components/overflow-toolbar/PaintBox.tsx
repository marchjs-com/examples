// PaintBox: the creative-minimal OverflowToolbar example.
//
// A box of paints: each pen is an emoji button, and you can make the box narrower; the pens with the lowest priority hide
// in the "More" menu first. Pick a pen and its name is shown below. Use this pattern to see how a toolbar adapts to
// the room it gets: the width here is controlled by the Segmented control instead of by resizing the window.
import { OverflowToolbar, Segmented } from "march/ui"

// Each pen is an item. `icon` can be an emoji string. The priority decides the order in which pens move to the menu
// when space runs out: purple (1) first, red (6) last.
const PENS = [
  { id: "red", label: "Kırmızı", icon: "🔴", priority: 6 },
  { id: "orange", label: "Turuncu", icon: "🟠", priority: 2 },
  { id: "yellow", label: "Sarı", icon: "🟡", priority: 4 },
  { id: "green", label: "Yeşil", icon: "🟢", priority: 5 },
  { id: "blue", label: "Mavi", icon: "🔵", priority: 3 },
  { id: "purple", label: "Mor", icon: "🟣", priority: 1 },
]

export function PaintBox() {
  // The chosen pen, and how many of three grid columns the toolbar may use.
  let $pen = "red"
  let $span = 3
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Segmented picks the width: 1, 2 or 3 columns. Its value is a number here, so onChange converts it back. */}
    <Segmented aria-label="Kutu genişliği" value={$span} onChange={(v: unknown) => $span = Number(v)}
      options={[{ value: 1, label: "dar" }, { value: 2, label: "orta" }, { value: 3, label: "geniş" }]} />
    <div sx={{ cols: 3 }}>
      <div sx={{ span: $span }}>
        {/* `pressed` as a function marks the chosen pen (aria-pressed) and onSelect chooses it. Pens that moved to the
            "More" menu can still be chosen there. label names the toolbar for screen readers; the arrow keys move between
            the buttons. The pens slide back with the default animation, which follows the motion engine (reduced motion,
            global speed, "Stop all"). */}
        <OverflowToolbar label="Boya kutusu" size="md" items={PENS.map((p) => ({ ...p, pressed: () => $pen === p.id, onSelect: () => $pen = p.id }))} />
      </div>
    </div>
    <span sx={{ text: "sm", color: "muted" }}>Elindeki kalem: {PENS.find((p) => p.id === $pen)?.label}</span>
  </div>
}
