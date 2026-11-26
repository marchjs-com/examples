// LikeButtonLab: the full-featured LikeButton example; it uses every prop at least once.
//
// Props shown here: liked, onToggle, count, size, burst, colors, label, icon (an element or a function of the state),
// pop, burstOptions, countFormat and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// LikeButtonLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Animation: the pop of the icon and the particle burst run on the motion engine, so the global speed, "Stop all" and
// reduced motion apply. The first button below turns them off (pop={false}, burst={false}) to show those switches;
// the second leaves them on.
import { LikeButton } from "march/ui"
import { star } from "march/icons"

export function LikeButtonLab() {
  // The owner of the state: LikeButton does not keep `liked` or the count itself, it reports the wish in onToggle.
  let $on = false
  let $n = 1999
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* First button, the "controlled" basics:
        - liked + count: what to show. onToggle(next): called with the new liked value; we update both signals
          (an optimistic update: the count goes up or down by one at once).
        - countFormat="compact": 2000 is written as a short form (compact is also the default; "full" writes all digits).
        - label: the accessible name of the button. class: added to the button, next to m-like.
        - pop={false}: no pop of the icon. burst={false}: no particles. burstOptions={{ ring: false }}: shape of the
          burst (here without the ring); it only matters when burst is on. */}
    <LikeButton class="lab-like" liked={$on} count={$n} countFormat="compact" onToggle={(v: boolean) => { $on = v; $n += v ? 1 : -1 }}
      label="Beğen" pop={false} burst={false} burstOptions={{ ring: false }} />
    {/* Second button, the look options:
        - size="sm": a smaller button. colors="single": the particles use one colour instead of the four brand ones.
        - icon as a function: it receives the liked state and returns what to draw, so one glyph can differ between
          states (here a filled star when liked, an empty one when not).
        - There is no `count`, so no number is shown next to the icon. */}
    <LikeButton class="lab-own" liked={true} onToggle={() => {}} size="sm" colors="single" icon={(on: boolean) => <span>{on ? "★" : "☆"}</span>} />
    {/* The raw count, so the test can read it without the compact formatting of the button. */}
    <span class="lab-n">{$n}</span>
  </div>
}
