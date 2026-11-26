// IssueForm: the real-life MarkdownEditor example.
//
// What it shows: a form for opening an issue: a title field and a Markdown description with a write / preview switch.
// Submitting adds the issue to a list under the form, shows a toast and clears the form. The Submit button stays disabled
// until there is a title.
// When to use this pattern: bug trackers, comment boxes, CMS fields: anywhere people write formatted text but should see
// what it will look like. The description starts with a template, so the writer is guided.
//
// Accessibility: the title field and the description both have an aria-label; the editor's views are a tablist and the
// source is a labelled textarea. Animation: none of its own.
import { MarkdownEditor, TextInput, Button, Badge, toast } from "march/ui"

// What we keep of a submitted issue: an id, its title and the number of words of its description.
type Issue = { id: number; title: string; words: number }

export function IssueForm() {
  // Signals: the title, the Markdown body (it starts with a small template) and the list of submitted issues.
  let $title = ""
  let $body = "### Ne oldu?\n\n\n### Beklenen\n\n"
  let $issues: Issue[] = []
  // Submit: refuse an empty title (with a toast), otherwise add an issue with the next id and its word count, then clear
  // the fields. The array is replaced, not changed, so the signal notices.
  const send = () => {
    if (!$title.trim()) return toast("Başlık gerekli")
    $issues = [...$issues, { id: $issues.length + 1, title: $title.trim(), words: $body.split(/\s+/).filter(Boolean).length }]
    toast(`#${$issues.length} açıldı`)
    $title = ""
    $body = ""
  }
  return <div sx={{ flex: "col", gap: 2 }}>
    <TextInput bind:value={$title} aria-label="Başlık" placeholder="Kısa bir başlık" />
    {/* bind:value keeps $body in sync (clearing it after submit empties the editor too). views offers the two tabs the
        form needs; rows is the height of the source box; placeholder is the hint in the empty box; labels renames the
        tabs; aria-label names the field for screen readers. */}
    <MarkdownEditor bind:value={$body} views={["write", "preview"]} rows={7} placeholder="Ayrıntıları yazın…"
      labels={{ write: "Yaz", preview: "Önizle" }} aria-label="Açıklama" />
    <div sx={{ flex: ["row", "center", "between"] }}>
      <span sx={{ text: "sm", color: "muted" }}>{$issues.length ? $issues.map((i) => `#${i.id} ${i.title}`).join(" · ") : "Henüz kayıt yok"}</span>
      {/* disabled is a boolean that reads the title, so the button unlocks as soon as a title is typed. */}
      <Button disabled={!$title.trim()} on:click={send}>Gönder</Button>
    </div>
    <Badge tone="neutral">{`${$issues.length} açık kayıt`}</Badge>
  </div>
}
