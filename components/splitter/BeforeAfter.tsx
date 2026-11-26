// BeforeAfter: the creative-minimal Splitter example.
//
// What it shows: two coloured areas ("before" and "after") with a draggable handle between them, and a line under them that
// prints the share of the first area as a percentage while you drag.
// When to use this pattern: two panes of content that the user wants to size, such as a comparison, a list and a preview, or a code
// and a result. onChange hands you the share (a number from 0 to 1), so other parts of the page can follow it.
import { Splitter, Card } from "march/ui"

export function BeforeAfter() {
  // `let $share` is a March signal holding the share of the first pane (0 to 1); onChange writes it and the line below redraws.
  let $share = 0.5
  // m:theme="night" (a common prop that works on every element and component) draws the card in the dark theme.
  return <Card m:theme="night">
    {/* The wrapper sets the height of the Splitter's area (the style object is used because sx has no height token). */}
    <div style={{ "block-size": "14rem" }}>
      {/* Splitter options used here:
          - initial={0.5}: the first pane starts at half the width. min={0.1}: neither pane can get smaller than 10 %.
          - label: the accessible name of the handle. The handle is a focusable role="separator" with aria-valuenow, so it works
            from the keyboard too: arrow keys move it (mirrored in right-to-left), Home and End go to the limits and Enter goes back
            to the initial share.
          - m:color="brand-orange": a common prop that sets the colour token of the component (the handle's accent).
          - onChange(share): called with the new share while dragging or using the keyboard.
          - start and end: the two panes, in logical order (in right-to-left text start is on the right). */}
      <Splitter initial={0.5} min={0.1} label="Karşılaştırma" m:color="brand-orange" onChange={(s: number) => $share = s}
        start={<div sx={{ p: 4, flex: "center", text: ["lg", "bold"], color: "brand-blue" }}>Önce</div>}
        end={<div sx={{ p: 4, flex: "center", text: ["lg", "bold"], color: "brand-orange" }}>Sonra</div>} />
    </div>
    <span sx={{ text: "sm", color: "muted" }}>Önce: %{Math.round($share * 100)}</span>
  </Card>
}
