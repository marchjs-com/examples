// OrderReview: the real-life Rating example.
//
// What it shows: a review form after an order: a rating for the product and one for the delivery, an optional
// comment, and a Send button that stays disabled until both ratings are given. After sending, every field is read-only.
// When to use this pattern: forms that mix ratings with text; `readonly` turns an editable Rating into a plain display.
//
// Accessibility: each Rating is a radio group named by `label`; Field links the comment's label and help text.
// Animation: the hover growth and the fade of the marks run on the motion engine; `animate={false}` removes them.

import { Rating, Card, Field, Textarea, Button, toast } from "march/ui"
import { send } from "march/icons"

// A word for each score (index 0: nothing chosen yet). They are content, so they stay Turkish.
const words = ["Puan verin", "Hiç beğenmedim", "Beğenmedim", "Fena değil", "Beğendim", "Bayıldım"]

export function OrderReview() {
  // The product score (0 means not chosen).
  let $product = 0
  // The delivery score.
  let $delivery = 0
  // The comment text.
  let $comment = ""
  // Set after sending; it makes everything read-only.
  let $sent = false
  // A real app would send the review to a server here.
  const submit = () => { $sent = true; toast("Değerlendirmeniz için teşekkürler") }
  return <Card title="Siparişini değerlendir" subtitle="Sipariş #48213 · Seramik kupa seti">
    <div sx={{ flex: "col", gap: 3 }}>
      <div sx={{ flex: ["row", "center", "between"], gap: 2 }}>
        <span>Ürün</span>
        {/* bind:value: two-way score; readonly: shows the score without input once the review is sent. */}
        <Rating bind:value={$product} label="Ürün puanı" size="lg" readonly={$sent} />
      </div>
      <span sx={{ text: "sm", color: "muted" }}>{words[$product]}</span>
      <div sx={{ flex: ["row", "center", "between"], gap: 2 }}>
        <span>Teslimat</span>
        {/* m:color gives this Rating its own colour token. */}
        <Rating bind:value={$delivery} label="Teslimat puanı" m:color="brand-blue" readonly={$sent} />
      </div>
      <Field label="Yorumun" help="İsteğe bağlı; diğer alıcılar görür">
        <Textarea bind:value={$comment} placeholder="Kupalar sağlam geldi, renkleri fotoğraftaki gibi…" readonly={$sent} />
      </Field>
      {/* Disabled until both scores are given, and after sending. */}
      <Button variant="primary" icon={send} disabled={$sent || !$product || !$delivery} on:click={submit}>
        {$sent ? "Gönderildi" : "Gönder"}
      </Button>
    </div>
  </Card>
}
