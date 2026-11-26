// CommentBox: the real-life FormatToolbar example.
//
// What it shows: a comment box with a formatting bar over a plain textarea. The tools wrap the selected text in Markdown
// marks (bold, italic, code, link) or add a list dash at the start of the line.
// When to use this pattern: you have your own editor (here a textarea) and want a standard toolbar over it. FormatToolbar
// only tells you which tool was pressed (`onTool`); applying the format is your code's job.
// Accessibility: pressing a tool does not take focus from the textarea, so the text selection stays; the bar is a
// role="toolbar" with arrow-key navigation and the name given in `label`.
import { FormatToolbar, Card, Button, toast } from "march/ui"
import type { FormatTool } from "march/ui"

// For each wrapping tool, the text put before and after the selection.
const WRAP: Partial<Record<FormatTool, [string, string]>> = { bold: ["**", "**"], italic: ["_", "_"], code: ["`", "`"], link: ["[", "](https://)"] }

export function CommentBox() {
  // $text is the comment; `area` is the textarea element (set through ref below) so we can read the selection.
  let $text = "Harika bir yazı, teşekkürler"
  let area: HTMLTextAreaElement | undefined
  // Applies a tool: read the selection (start a, end b), then either wrap it with the tool's marks or, for the list tool,
  // insert a dash at the start. Finally focus the textarea again.
  const run = (tool: FormatTool) => {
    if (!area) return
    const a = area.selectionStart ?? 0, b = area.selectionEnd ?? 0, v = $text
    const w = WRAP[tool]
    $text = w ? v.slice(0, a) + w[0] + v.slice(a, b) + w[1] + v.slice(b) : v.slice(0, a) + "- " + v.slice(a)
    area.focus()
  }
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      {/* - tools: the tools in order; "|" is a separator. onTool: our run function.
          - hints: shows the keyboard shortcut in each tooltip too. label: the accessible name of the bar. */}
      <FormatToolbar tools={["bold", "italic", "code", "|", "link", "ul"]} onTool={run} hints label="Yorum biçimi" />
      {/* A plain textarea. ref hands us the element; the value is bound to $text through an input handler. */}
      <textarea rows={3} aria-label="Yorum" value={$text} ref={(el: HTMLTextAreaElement) => area = el}
        on:input={(e: Event) => $text = (e.target as HTMLTextAreaElement).value} />
      <div sx={{ flex: ["row", "end"] }}>
        {/* The send button is disabled while the comment is empty (after trimming spaces). */}
        <Button size="sm" disabled={!$text.trim()} on:click={() => { toast("Yorum gönderildi"); $text = "" }}>Gönder</Button>
      </div>
    </div>
  </Card>
}
