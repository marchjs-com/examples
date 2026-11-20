import { FormatToolbar, Card, Button, toast } from "march/ui"
import type { FormatTool } from "march/ui"

// yorum kutusu: araçlar seçili metni Markdown işaretleriyle sarar (kalın **, eğik _, kod `, bağlantı), liste satır başı ekler
const WRAP: Partial<Record<FormatTool, [string, string]>> = { bold: ["**", "**"], italic: ["_", "_"], code: ["`", "`"], link: ["[", "](https://)"] }

export function CommentBox() {
  let $text = "Harika bir yazı, teşekkürler"
  let area: HTMLTextAreaElement | undefined
  const run = (tool: FormatTool) => {
    if (!area) return
    const a = area.selectionStart ?? 0, b = area.selectionEnd ?? 0, v = $text
    const w = WRAP[tool]
    $text = w ? v.slice(0, a) + w[0] + v.slice(a, b) + w[1] + v.slice(b) : v.slice(0, a) + "- " + v.slice(a)
    area.focus()
  }
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      <FormatToolbar tools={["bold", "italic", "code", "|", "link", "ul"]} onTool={run} hints label="Yorum biçimi" />
      <textarea rows={3} aria-label="Yorum" value={$text} ref={(el: HTMLTextAreaElement) => area = el}
        on:input={(e: Event) => $text = (e.target as HTMLTextAreaElement).value} />
      <div sx={{ flex: ["row", "end"] }}>
        <Button size="sm" disabled={!$text.trim()} on:click={() => { toast("Yorum gönderildi"); $text = "" }}>Gönder</Button>
      </div>
    </div>
  </Card>
}
