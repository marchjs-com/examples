// ShortNote: the creative-minimal RichTextEditor example.
//
// What it shows: a short note with a 280 character limit: a plain toolbar, and a counter that tells how many characters
// are left; past the limit the card turns to the danger colour. When to use this pattern: a post box or a comment box
// with a limit.
//
// Accessibility: the editor is a textbox with a toolbar; the limit is told by text, not only by colour.

import { RichTextEditor, Card } from "march/ui"

// The most characters the note may have.
const LIMIT = 280

export function ShortNote() {
  // The note as Markdown text.
  let $md = "Bugün **sahilde** koştum, deniz *çarşaf* gibiydi :)"
  // A computed value: the characters left, worked out again whenever the text changes (negative past the limit).
  const $left = LIMIT - $md.length
  // m:color turns the whole card to the danger colour when the limit is exceeded.
  return <Card m:color={$left < 0 ? "danger" : "brand-blue"}>
    <div sx={{ flex: "col", gap: 2 }}>
      {/* A heading that changes with the state. */}
      <span sx={{ text: "lg", color: $left < 0 ? "danger" : "brand-blue" }}>{$left < 0 ? "Biraz kısalt" : "Ne düşünüyorsun?"}</span>
      {/* toolbar: a short list of tools ("|" is a separator); hint={false}: no "type @ or :" hint; labels.count: our
          own counter text. */}
      <RichTextEditor bind:value={$md} rows={3} toolbar={["bold", "italic", "strike", "|", "emoji"]} hint={false}
        placeholder="Kısa bir şey yaz…" labels={{ count: () => `${$left} karakter kaldı` }} />
    </div>
  </Card>
}
