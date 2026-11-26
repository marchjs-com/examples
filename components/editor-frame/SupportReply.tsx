// SupportReply: the real-life EditorFrame example.
//
// What it shows: a reply to a support ticket. The head bar has the ticket and its status, the middle is the reply, and the
// foot bar has a character counter and the Send button. After sending, the frame and the text field become read-only.
// When to use this pattern: forms with a long text where the frame should hold the status and the actions around it.
// Accessibility: the frame is a plain container; the textarea has the aria-label and its own readonly attribute.
import { EditorFrame, Badge, Button, toast } from "march/ui"

// The reply limit; the counter turns red above it and Send is disabled.
const MAX = 500

// $text is the reply, $sent says it was sent; send() marks it and shows a toast.
export function SupportReply() {
  let $text = "Merhaba Ayşe Hanım, siparişiniz yarın kargoya veriliyor."
  let $sent = false
  const send = () => { $sent = true; toast("Yanıt müşteriye gönderildi") }
  // readonly={$sent} marks the frame is-readonly; the textarea is made readonly separately, because the frame only marks.
  // head / actions: the ticket title and a status Badge. foot: the counter; footProps.actions puts the Send button at
  // the end of the foot bar (it is disabled when the text is empty or too long).
  return <EditorFrame readonly={$sent}
    head={<span sx={{ text: "bold" }}>Talep #4821 · Kargo gecikmesi</span>}
    actions={<Badge tone={$sent ? "success" : "warn"}>{$sent ? "Yanıtlandı" : "Bekliyor"}</Badge>}
    foot={<span sx={{ color: $text.length > MAX ? "danger" : "muted" }}>{`${$text.length} / ${MAX}`}</span>}
    footProps={{ actions: <Button size="sm" disabled={$sent || !$text.trim() || $text.length > MAX} on:click={send}>Gönder</Button> }}>
    <textarea class="m-editor-area" rows={4} aria-label="Yanıt" readonly={$sent} value={$text}
      on:input={(e: Event) => $text = (e.target as HTMLTextAreaElement).value} />
  </EditorFrame>
}
