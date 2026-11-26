// ChatFooter: the real-life TypingIndicator example.
//
// What it shows: the strip under a chat. People start and stop typing (two buttons simulate that) and the indicator
// names them; when nobody is typing it hides itself.
// When to use this pattern: the line under the last message of a chat or comment thread. In a real app `names` comes
// from your realtime connection (who is typing now) and you only pass the list.
import { TypingIndicator, Button } from "march/ui"

const all = ["Elif", "Can", "Deniz"]

export function ChatFooter() {
  // $n is how many of the names are "typing" (a signal: the indicator updates when it changes).
  let $n = 1
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* names: who is typing. With one name it reads "<name> is typing...", with two "A and B are typing...", with more
        a count; an empty list hides the whole indicator. The default variant is "bubble": the three dots sit in a
        chat bubble. The dots lift in turn on the motion engine (a still version is used with reduced motion).
        It is a polite status region (role="status"), so a screen reader announces the sentence once without
        interrupting; the sentence is announced even when it is not drawn. */}
    <TypingIndicator names={all.slice(0, $n)} />
    {/* These two buttons only simulate the realtime events; Math.max / Math.min keep $n between 0 and the number of
        names. */}
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" on:click={() => $n = Math.max(0, $n - 1)}>Biri sustu</Button>
      <Button size="sm" on:click={() => $n = Math.min(all.length, $n + 1)}>Biri yazıyor</Button>
    </div>
  </div>
}
