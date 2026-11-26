// SplitterLab: the full-featured Splitter example; it uses every prop at least once.
//
// Props shown here: start, end, initial, value (controlled) with onChange, orientation, min, label, handle (the default one, your own mark
// or false for a fixed divider) and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// SplitterLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Splitter, Button } from "march/ui"

export function SplitterLab() {
  // `let $share` is a March signal holding the share of the first pane of the first Splitter (0 to 1).
  let $share = 0.3
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Each Splitter sits in a wrapper that gives it a height to fill (a style object, because sx has no height token). */}
    <div style={{ "block-size": "8rem" }}>
      {/* Controlled: value={$share} says what the share is, onChange(share) is called when the user drags or uses the keyboard, and the Lab
          writes it back; so the Lab and the user can both change it (see the button below). min={0.2}: neither pane can get smaller than
          20 %. label: the accessible name of the handle, a focusable role="separator" (arrow keys, Home / End and Enter work).
          class="lab-live" lets the tests find this instance. start and end are the two panes in logical order. */}
      <Splitter class="lab-live" value={$share} onChange={(s: number) => $share = s} min={0.2} label="Denetimli pay"
        start={<div sx={{ p: 2 }}>Baş</div>} end={<div sx={{ p: 2 }}>Son</div>} />
    </div>
    <Button size="sm" on:click={() => $share = 0.7}>Payı %70 yap</Button>
    <span class="lab-share">%{Math.round($share * 100)}</span>
    <div style={{ "block-size": "8rem" }}>
      {/* orientation="vertical": the panes are stacked, with the first one on top. initial={0.6}: it starts at 60 % (uncontrolled: the
          Splitter keeps the share itself). handle={<span>...</span>}: your own mark drawn on the line instead of the default grip. */}
      <Splitter class="lab-vert" orientation="vertical" initial={0.6} handle={<span>⋯</span>} label="Dikey pay"
        start={<div sx={{ p: 2 }}>Üst</div>} end={<div sx={{ p: 2 }}>Alt</div>} />
    </div>
    <div style={{ "block-size": "8rem" }}>
      {/* handle={false}: fixed panes with a plain divider and nothing to drag; initial sets the share once. */}
      <Splitter class="lab-fixed" initial={0.4} handle={false} start={<div sx={{ p: 2 }}>Sabit</div>} end={<div sx={{ p: 2 }}>Bölme</div>} />
    </div>
  </div>
}
