import { Rating, Card, Field, Textarea, Button, toast } from "march/ui"
import { send } from "march/icons"

// sipariş sonrası değerlendirme: ürün ve teslimat puanı, yorum; gönderince puanlar salt okunur kalır
const words = ["Puan verin", "Hiç beğenmedim", "Beğenmedim", "Fena değil", "Beğendim", "Bayıldım"]

export function OrderReview() {
  let $product = 0
  let $delivery = 0
  let $comment = ""
  let $sent = false
  const submit = () => { $sent = true; toast("Değerlendirmeniz için teşekkürler") }
  return <Card title="Siparişini değerlendir" subtitle="Sipariş #48213 · Seramik kupa seti">
    <div sx={{ flex: "col", gap: 3 }}>
      <div sx={{ flex: ["row", "center", "between"], gap: 2 }}>
        <span>Ürün</span>
        <Rating bind:value={$product} label="Ürün puanı" size="lg" readonly={$sent} />
      </div>
      <span sx={{ text: "sm", color: "muted" }}>{words[$product]}</span>
      <div sx={{ flex: ["row", "center", "between"], gap: 2 }}>
        <span>Teslimat</span>
        <Rating bind:value={$delivery} label="Teslimat puanı" m:color="brand-blue" readonly={$sent} />
      </div>
      <Field label="Yorumun" help="İsteğe bağlı; diğer alıcılar görür">
        <Textarea bind:value={$comment} placeholder="Kupalar sağlam geldi, renkleri fotoğraftaki gibi…" readonly={$sent} />
      </Field>
      <Button variant="primary" icon={send} disabled={$sent || !$product || !$delivery} on:click={submit}>
        {$sent ? "Gönderildi" : "Gönder"}
      </Button>
    </div>
  </Card>
}
