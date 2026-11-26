// ReleaseNotes: the real-life RichTextEditor example.
//
// What it shows: a screen for writing release notes. The value is Markdown, you can mention a teammate with @, and the
// Publish button sends the note and clears the draft. When to use this pattern: forms where users write formatted text
// that you store or send as Markdown.
//
//  Keyboard and accessibility: the writing area is a textbox with a toolbar (one tab stop, arrow keys move between
// tools);
//  suggestions are a listbox driven from the text. Markdown shortcuts (## at the start of a line, - for a list) work
// while typing.

import { RichTextEditor, Button, Badge, toast } from "march/ui"
import { send } from "march/icons"

// People who can be mentioned with @: id, label and an optional hint. A mention is stored as [@Label](mention:id).
const TEAM = [
  { id: "u1", label: "Deniz Kaya", hint: "Tasarım" },
  { id: "u2", label: "Ece Demir", hint: "Ürün" },
  { id: "u3", label: "Mert Aydın", hint: "Mühendislik" },
]

export function ReleaseNotes() {
  // The note as a Markdown string; bind:value keeps it in step with the editor.
  let $md = "## Sürüm 2.4\n\n- Karanlık tema\n- Daha hızlı arama\n\nSorular için [@Ece Demir](mention:u2)."
  // How many notes were published.
  let $sent = 0
  // Do nothing with an empty note; otherwise count it, confirm with a toast and clear the draft.
  const publish = () => {
    if (!$md.trim()) return toast("Önce bir şeyler yazın")
    $sent++
    toast(`Sürüm notu yayınlandı (${$md.length} karakter)`)
    $md = ""
  }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <span sx={{ text: "bold" }}>Sürüm notu</span>
      {/* The count of published notes updates whenever $sent changes. */}
      <Badge tone="neutral">{`${$sent} yayın`}</Badge>
    </div>
    {/* bind:value: the Markdown text; mentions: the list for @; rows: the minimum height in lines; placeholder: the
        hint
        while empty; aria-label: the accessible name. */}
    <RichTextEditor bind:value={$md} mentions={TEAM} rows={6} placeholder="Bu sürümde neler var?" aria-label="Sürüm notu" />
    <div sx={{ flex: ["row", "end"] }}>
      {/* Disabled while the note is empty. */}
      <Button icon={send} disabled={!$md.trim()} on:click={publish}>Yayınla</Button>
    </div>
  </div>
}
