// NightOwls: the creative-minimal TypingIndicator example.
//
// What it shows: a one-line typing hint on a dark card, with purple dots that fade in turn instead of lifting.
// When to use this pattern: a quiet inline hint (a status line, a sidebar, a dark theme) rather than a chat bubble.
// Three options do the work: variant, motion and m:color.
import { TypingIndicator, Card } from "march/ui"

export function NightOwls() {
  // m:theme="night" is a common prop (it works on every component): the card and everything inside use the dark theme.
  // On the indicator: variant="inline" draws the dots and the sentence in one line instead of a bubble; motion="fade"
  // makes the dots light up in turn instead of lifting ("none" keeps them still); m:color is a common prop that sets
  // the colour token of the dots. The motion engine applies reduced motion and the global speed on its own.
  return <Card m:theme="night">
    <TypingIndicator names={["Baykuş"]} variant="inline" motion="fade" m:color="brand-purple" />
  </Card>
}
