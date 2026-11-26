// FlipQuote: the creative-minimal Card example.
//
// A quote of the day: the button in the header moves to the next quote, and the footer says which one it is. It shows
// a Card whose header and footer are live: `subtitle` and the footer are functions that re-read reactive state. Use
// the pattern for a small widget with one piece of changing content.
import { Card, IconButton } from "march/ui"
import { refresh } from "march/icons"

// The quotes: the text and who said it.
const QUOTES = [
  { text: "Basit olan, karmaşığın en zor hâlidir.", who: "Leonardo da Vinci" },
  { text: "Önce çalıştır, sonra doğru yap, sonra hızlandır.", who: "Kent Beck" },
  { text: "Sabır acıdır, meyvesi tatlıdır.", who: "Atasözü" },
]

export function FlipQuote() {
  // The counter of presses; q() maps it to a quote with a modulo, so the list loops forever.
  let $i = 0
  const q = () => QUOTES[$i % QUOTES.length]
  // subtitle is a function, so it shows the current author. `actions` takes a single node here (an array also works).
  // The IconButton has no visible text, so `label` is its accessible name. The footer and the body use function
  // children, which keeps the position text and the quote live.
  return <Card title="Günün sözü" subtitle={() => q().who}
    actions={<IconButton icon={refresh} label="Sıradaki söz" on:click={() => $i++} />}
    footer={<span sx={{ text: "xs", color: "muted" }}>{() => `${($i % QUOTES.length) + 1} / ${QUOTES.length}`}</span>}>
    <p sx={{ text: "lg" }}>{() => `“${q().text}”`}</p>
  </Card>
}
