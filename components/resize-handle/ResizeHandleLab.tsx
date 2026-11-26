// ResizeHandleLab: the full-featured ResizeHandle example; it uses every prop at least once.
//
// Props shown here: value + set (a complete separator), min, max, step, reset, edge, label, line, grip, disabled and
// onStep (the corner and the bare-grip mode), class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ResizeHandleLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { ResizeHandle } from "march/ui"

export function ResizeHandleLab() {
  // The width of the first box, in px.
  let $w = 200
  // How many arrow-key steps the corner handle reported.
  let $steps = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The handle sits on an edge of its parent, so the parent is positioned (position: relative). */}
    <div class="m-card" style={{ position: "relative", "inline-size": `${$w}px`, "block-size": "80px" }}>
      {/* The full separator: value (the current size, as a function) + set (apply a new size, already clamped) make it
          draggable and keyboard operable; min / max limit it, step is the keyboard step, reset runs on Enter or a
          double click,
          label is its accessible name, grip draws a visible grip in the middle. Escape during a drag restores the size. */}
      <ResizeHandle class="lab-full" value={() => $w} set={(w: number) => $w = w} min={150} max={300} step={10} reset={() => $w = 200} label="Genişlik" grip />
    </div>
    {/* The width the handle controls. */}
    <span class="lab-w">{$w} px</span>
    <div class="m-card" style={{ position: "relative", "inline-size": "200px", "block-size": "80px" }}>
      {/* Without value / set it is a bare handle for an owner that runs its own gesture. edge puts it on a corner;
          onStep makes it focusable, and each arrow key calls onStep(dx, dy); line="always" keeps the line visible. */}
      <ResizeHandle class="lab-corner" edge="bottom-end" label="Köşe" onStep={() => $steps++} line="always" />
      {/* disabled: no pointer, no focus; grip={false}: no grip drawn. */}
      <ResizeHandle class="lab-off" edge="bottom" label="Kapalı" disabled grip={false} />
    </div>
    <span class="lab-steps">{$steps} adım</span>
  </div>
}
