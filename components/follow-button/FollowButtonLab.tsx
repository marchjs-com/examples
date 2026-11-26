// FollowButtonLab: the full-featured FollowButton example; it uses every prop at least once.
//
// Props shown here: state, onChange, private, name, size, block, labels, ariaLabel, icon (a function or false), burst,
// morph and class.
// Use it as a reference when you need one option: find the prop below and copy the line.
// FollowButtonLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { FollowButton } from "march/ui"

export function FollowButtonLab() {
  // The current state as text, shown at the bottom so the test (and you) can see it change.
  let $state = "follow"
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* First button: a public account.
        - block: full width (so no width morph).
        - size="md": the larger size ("sm" is smaller).
        - ariaLabel(state, name): your own accessible name; here "Elif: follow".
        - burst={false}: no colour dots on a new follow. morph={false}: no width spring or icon turn. Both are on by default
          and, when on, the motion engine already honours reduced motion and "Stop all".
        - class: added to the button so a test or CSS can find it. */}
    <FollowButton class="lab-follow" state={$state as "follow"} onChange={(s: string) => $state = s} name="Elif" size="md" block
      ariaLabel={(st: string, n: string | undefined) => `${n}: ${st}`} burst={false} morph={false} />
    {/* Second button: a private account. `private` makes following send a request (the state becomes "requested").
        icon={false} removes the +/tick icon (a function icon={(state) => node} would draw your own);
        labels replaces the "follow" text (any subset). */}
    <FollowButton class="lab-private" state="follow" onChange={() => {}} private icon={false} labels={{ follow: "İstek gönder" }} />
    <span class="lab-state">{$state}</span>
  </div>
}
