// SidebarPanel: the real-life ResizeHandle example.
//
// What it shows: a sidebar whose width you change by dragging its edge or with the arrow keys; Enter puts it back to
// 240 px. When to use this pattern: resizable panels (a file tree, an inspector). The handle sits on the edge of the
// positioned panel and is a complete separator.
//
// Keyboard and accessibility: role="separator" with aria-valuenow / min / max kept current; arrows step, Shift and
// Page keys take big steps, Home / End go to the limits, Enter resets, Escape during a drag restores the size.

import { ResizeHandle } from "march/ui"

export function SidebarPanel() {
  // The width of the sidebar in px.
  let $w = 240
  return <div sx={{ flex: "row" }}>
    {/* The handle is placed on an edge of its parent, so the parent is positioned (position: relative). */}
    <aside class="m-card" style={{ position: "relative", "inline-size": `${$w}px` }} sx={{ p: 3 }}>
      <strong>Dosyalar</strong>
      <p sx={{ text: "sm", color: "muted" }}>{Math.round($w)} px</p>
      {/* value (a function) and set (applies the new width) make it a complete separator; min / max are the limits;
          reset runs
          on Enter or a double click; label is the accessible name; line="hover": the line shows on hover, focus and
          drag. */}
      <ResizeHandle value={() => $w} set={(w: number) => $w = w} min={160} max={400} reset={() => $w = 240} label="Kenar çubuğu genişliği" line="hover" />
    </aside>
    <main sx={{ p: 3 }}>Düzenleyici</main>
  </div>
}
