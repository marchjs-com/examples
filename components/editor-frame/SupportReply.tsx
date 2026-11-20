import { EditorFrame, Badge, Button, toast } from "march/ui"

// destek yanıtı: üstte talep ve öncelik, ortada yanıt, altta sayaç ve Gönder; gönderilince çerçeve salt okunur olur
const MAX = 500

export function SupportReply() {
  let $text = "Merhaba Ayşe Hanım, siparişiniz yarın kargoya veriliyor."
  let $sent = false
  const send = () => { $sent = true; toast("Yanıt müşteriye gönderildi") }
  return <EditorFrame readonly={$sent}
    head={<span sx={{ text: "bold" }}>Talep #4821 · Kargo gecikmesi</span>}
    actions={<Badge tone={$sent ? "success" : "warn"}>{$sent ? "Yanıtlandı" : "Bekliyor"}</Badge>}
    foot={<span sx={{ color: $text.length > MAX ? "danger" : "muted" }}>{`${$text.length} / ${MAX}`}</span>}
    footProps={{ actions: <Button size="sm" disabled={$sent || !$text.trim() || $text.length > MAX} on:click={send}>Gönder</Button> }}>
    <textarea class="m-editor-area" rows={4} aria-label="Yanıt" readonly={$sent} value={$text}
      on:input={(e: Event) => $text = (e.target as HTMLTextAreaElement).value} />
  </EditorFrame>
}
