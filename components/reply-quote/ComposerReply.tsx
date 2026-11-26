// ComposerReply: the real-life ReplyQuote example.
//
// What it shows: the "replying to" preview above a message field, with a cancel button. Cancelling removes the preview;
// a small button brings it back. When to use this pattern: any composer that answers a specific message.
//
// Accessibility: the name and the quoted text are plain text read in order; the cancel button is a separate button with
// its own accessible name (`closeLabel`). The cut text stays whole for screen readers.

import { ReplyQuote, TextInput, Button } from "march/ui"

export function ComposerReply() {
  // Whether a reply is being written; the cancel button sets it to false.
  let $reply = true
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* - name: the first line (who is quoted, or your own line); text: the quoted text; lines={1}: keep one line of it
          (the default is 2, 0 shows everything).
        - onClose: giving it shows the cancel button and runs on it; closeLabel: that button's accessible name. */}
    {() => ($reply ? <ReplyQuote name="Deniz Kaya'ya yanıt" text="Cumartesi sabahı sahil koşusu için buluşma yerini değiştirdik." lines={1}
      onClose={() => $reply = false} closeLabel="Yanıttan vazgeç" /> : <Button size="sm" on:click={() => $reply = true}>Yanıtla</Button>)}
    {/* The message field. aria-label names it because it has no visible label. */}
    <TextInput aria-label="Mesaj" placeholder="Mesaj yaz…" />
  </div>
}
