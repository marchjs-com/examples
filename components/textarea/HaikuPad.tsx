// HaikuPad: the creative-minimal Textarea example.
//
// What it shows: a haiku notebook. You write three lines; the field grows with the lines, a badge counts how many lines
// you wrote and turns green at three, and a sentence below tells you what is still missing (or when there are too many).
// When to use this pattern: free text that has a simple shape you can check as the user types. The text is one string
// bound with bind:value, and everything else (the count, the badge, the message) is derived from it.
//
// Animation: none of its own. (By default the Textarea grows as you type, `autosize={false}` keeps the height fixed.)
// Accessibility: a native <textarea>; there is no <Field> here, so the accessible name comes from `aria-label`. Growing
// never moves the focus or the caret. The state is told in words (the badge text and the sentence), not by colour alone.
import { Textarea, Card, Badge } from "march/ui"

export function HaikuPad() {
  // Reactive state: the poem, and a derived value (a `const $x` is recomputed when $poem changes): the number of
  // non-empty lines.
  let $poem = "Sessiz bir gölde\nkurbağa suya atlar"
  const $lines = $poem.split("\n").filter((l) => l.trim()).length
  // m:theme="night" draws the card in the dark theme. The Card's `actions` slot holds the badge, whose tone shows the state.
  return <Card m:theme="night" title="Haiku defteri" actions={<Badge tone={$lines === 3 ? "success" : "warn"}>{$lines} / 3 dize</Badge>}>
    {/* bind:value keeps $poem in sync with the text. rows={3}: the starting height (three lines); the field then grows with
        the content. placeholder is only a hint. spellcheck={false} turns the browser's spell check off. */}
    <Textarea bind:value={$poem} rows={3} aria-label="Haiku" placeholder="Beş, yedi, beş hece…" spellcheck={false} />
    <span sx={{ text: "sm", color: $lines === 3 ? "brand-green" : "muted" }}>
      {$lines === 3 ? "Tamam: bir haiku oldu." : $lines > 3 ? "Fazla dize var, sadeleştir." : "Bir dize daha…"}
    </span>
  </Card>
}
