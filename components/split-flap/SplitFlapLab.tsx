import { SplitFlap, Button } from "march/ui"

// SplitFlapLab: the full-featured SplitFlap example: every prop in one place.
// SplitFlap is a split-flap board: each cell is a reel of flaps that turns forward, one flap at a time, to the new
// character, the cells starting one after another; the leaf folds over the hinge on the motion engine. Use it for
// departure boards, scoreboards and any short text that should feel mechanical.
//
// Props shown below: value, length, align, chars, flapTime, stagger, size, color, label, live, motion, frame,
// onSettle, class.
export function SplitFlapLab() {
  // The board's text, how many times it settled (onSettle), and the text it settled on last.
  let $text = "KAPI A4"
  let $settles = 0
  let $last = ""
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* 1. A board with every motion option.
        - value / length / align: the text, the number of cells (14) and where a shorter text sits.
        - flapTime: ms per flap; stagger: ms between neighbouring cells as they start. Both replace the default motion.
        - onSettle(text): called once every cell has stopped; here it counts and keeps the text.
        - live="polite": screen readers hear the new text once the board has settled.
        - color: a theme token for the characters; size="lg" big cards; class: a hook for the test. */}
    <SplitFlap class="lab-board" value={$text} length={14} align="start" flapTime={40} stagger={25} size="lg" color="warning"
      live="polite" label="Duyuru" onSettle={(t: string) => { $settles++; $last = t }} />
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-gate" size="sm" on:click={() => { $text = "KAPI A5" }}>Kapı değişti</Button>
      <Button class="lab-board-now" size="sm" variant="ghost" on:click={() => { $text = "BİNİŞ BAŞLADI" }}>Biniş</Button>
    </div>
    {/* What onSettle reported: lab-settles counts, lab-last shows the settled text. */}
    <span sx={{ text: "sm", color: "muted" }}>Yerine oturdu: <span class="lab-settles">{$settles}</span> · <span class="lab-last">{$last}</span></span>
    {/* 2. Your own reel: chars lists the flaps in turning order, the blank first. A reel with lower case keeps the
        case; a character not on the reel shows as it is without flapping. size={30}: the card height in px;
        frame={false}: bare cells without the board around them. */}
    <SplitFlap class="lab-own" value="abc" chars=" abcdefghij" length={4} align="end" size={30} frame={false} label="Kod" />
    {/* 3. motion={false}: the text changes at once (as with the OS reduced-motion setting); no flaps, no stagger. */}
    <SplitFlap class="lab-still" value={$text} length={14} motion={false} size="sm" label="Sessiz duyuru" />
  </div>
}
