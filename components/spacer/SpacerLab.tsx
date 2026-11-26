// SpacerLab: the full-featured Spacer example. Spacer has no props, so "full-featured" means its two uses: one Spacer and two.
//
// What it shows: one Spacer pushes everything after it to the logical end of the row (so it mirrors in right-to-left pages);
// two Spacers split the free room between them, which puts the middle item in the centre.
// Use it as a reference for how to place items at the two ends of a row, or at the start, middle and end.
// SpacerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Spacer, Button } from "march/ui"

export function SpacerLab() {
  // Two flex rows (sx flex: ["row", "center"]) with a gap; class="lab-one" / "lab-two" lets the tests find them.
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* One Spacer: the first button stays at the start, the second is pushed to the end. */}
    <div class="lab-one" sx={{ flex: ["row", "center"], gap: 2 }}><Button>Baş</Button><Spacer /><Button>Son</Button></div>
    {/* Two Spacers: the free room is shared between them, so the middle button sits in the middle of the row. Spacer is decorative
        (aria-hidden) and adds no semantics, so the row reads to a screen reader as just its three buttons. */}
    <div class="lab-two" sx={{ flex: ["row", "center"], gap: 2 }}><Button>Sol</Button><Spacer /><Button>Orta</Button><Spacer /><Button>Sağ</Button></div>
  </div>
}
