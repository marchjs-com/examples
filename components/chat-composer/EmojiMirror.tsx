// EmojiMirror: the creative-minimal ChatComposer example.
//
// A mirror: whatever you write comes back in capitals and reversed. It shows the smallest ChatComposer (just onSend)
// with a recoloured, re-iconed send button. Use the pattern for a quick text input where the only thing you need is
// the sent text.
import { ChatComposer } from "march/ui"

export function EmojiMirror() {
  // The mirrored text, shown above the field (reactive state).
  let $last = "🪞 Bir şey yaz, ayna geri söylesin"
  return <div sx={{ flex: "col", gap: 2 }}>
    <p sx={{ text: ["xl", "center"], color: "brand-purple" }}>{$last}</p>
    {/* placeholder is the hint in the empty field. sendColor sets the colour token of the round send button and
        sendIcon replaces its arrow (an emoji text works as an icon). onSend gets the text when the user presses Enter
        or the button: it is upper-cased for Turkish (toLocaleUpperCase with "tr-TR" maps i to a dotted capital) and the
        characters are reversed with the spread operator, which keeps an emoji in one piece. */}
    <ChatComposer placeholder="Aynaya yaz" sendColor="brand-purple" sendIcon="✨"
      onSend={(text) => $last = [...text.toLocaleUpperCase("tr-TR")].reverse().join("")} />
  </div>
}
