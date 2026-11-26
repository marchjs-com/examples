// StretchyNote: the creative-minimal ResizeHandle example.
//
// What it shows: a note that widens from its right edge, and the text grows with the width. When to use this pattern:
// the smallest resizable thing: one handle, one number, and anything you like computed from that number.
//
// Keyboard and accessibility: a complete separator with arrow-key steps and Enter to reset; m:color tints the line.
// The handle is placed on the edge of its positioned parent.

import { ResizeHandle } from "march/ui"

export function StretchyNote() {
  // The width of the note in px; the text size below is computed from it.
  let $w = 220
  return <div class="m-card" style={{ position: "relative", "inline-size": `${$w}px` }} sx={{ p: 3 }}>
    <p style={{ "font-size": `${Math.round($w / 14)}px` }}>Merhaba!</p>
    {/* value / set: the full separator; min / max: the limits; reset: Enter or a double click; m:color: the colour
        token of the line. */}
    <ResizeHandle value={() => $w} set={(w: number) => $w = w} min={160} max={420} reset={() => $w = 220} label="Not genişliği" m:color="brand-orange" />
  </div>
}
