import { MarkdownEditor, TextInput, Button, Badge, toast } from "march/ui"

// kayıt (issue) açma formu: başlık ve Markdown açıklama; Gönder kaydı listeye ekler, formu temizler
type Issue = { id: number; title: string; words: number }

export function IssueForm() {
  let $title = ""
  let $body = "### Ne oldu?\n\n\n### Beklenen\n\n"
  let $issues: Issue[] = []
  const send = () => {
    if (!$title.trim()) return toast("Başlık gerekli")
    $issues = [...$issues, { id: $issues.length + 1, title: $title.trim(), words: $body.split(/\s+/).filter(Boolean).length }]
    toast(`#${$issues.length} açıldı`)
    $title = ""
    $body = ""
  }
  return <div sx={{ flex: "col", gap: 2 }}>
    <TextInput bind:value={$title} aria-label="Başlık" placeholder="Kısa bir başlık" />
    <MarkdownEditor bind:value={$body} views={["write", "preview"]} rows={7} placeholder="Ayrıntıları yazın…"
      labels={{ write: "Yaz", preview: "Önizle" }} aria-label="Açıklama" />
    <div sx={{ flex: ["row", "center", "between"] }}>
      <span sx={{ text: "sm", color: "muted" }}>{$issues.length ? $issues.map((i) => `#${i.id} ${i.title}`).join(" · ") : "Henüz kayıt yok"}</span>
      <Button disabled={!$title.trim()} on:click={send}>Gönder</Button>
    </div>
    <Badge tone="neutral">{`${$issues.length} açık kayıt`}</Badge>
  </div>
}
