// TypingIndicatorLab: the full-featured TypingIndicator example; it uses every prop at least once.
//
// Props shown here: names, variant, text, label (your own sentence), dots (false, or your own node), motion, class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// TypingIndicatorLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { TypingIndicator } from "march/ui"

export function TypingIndicatorLab() {
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* variant="bubble": the dots in a chat bubble. label(names) returns your own sentence instead of the built-in one.
        motion="none": the dots stay still (the default "lift" raises them in turn, "fade" lights them in turn).
        class goes on the root so CSS or a test can find this instance. */}
    <TypingIndicator class="lab-own" names={["Elif", "Can"]} variant="bubble" label={(n: readonly string[]) => `${n.join(" ve ")} karalıyor`} motion="none" />
    {/* variant="inline": a single line. dots={false} draws the text only (a node would draw your own dots). */}
    <TypingIndicator class="lab-nodots" names={["Deniz"]} variant="inline" dots={false} />
    {/* text={false}: only the dots are drawn, but the sentence is still announced to screen readers. */}
    <TypingIndicator class="lab-quiet" names={["Ada"]} text={false} />
  </div>
}
