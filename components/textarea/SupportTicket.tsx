import { Textarea, TextInput, Field, Button, Card, toast } from "march/ui"
import { send } from "march/icons"

// destek talebi: konu ve açıklama; açıklama en az 20, en fazla 500 karakter, sayaç ipucunda;
// eksikken Gönder kilitli, gönderince form temizlenir
export function SupportTicket() {
  let $subject = ""
  let $body = ""
  let $sending = false
  const $short = $body.trim().length < 20
  const submit = () => {
    $sending = true
    setTimeout(() => { $sending = false; toast(`Talebiniz alındı: "${$subject}"`); $subject = ""; $body = "" }, 900)
  }
  return <Card title="Destek talebi" subtitle="Ortalama yanıt süresi: 2 saat"
    footer={<Button variant="primary" icon={send} loading={$sending} disabled={!$subject.trim() || $short} on:click={submit}>Gönder</Button>}>
    <div sx={{ flex: "col", gap: 3 }}>
      <Field label="Konu" required><TextInput bind:value={$subject} placeholder="Ödeme sayfası açılmıyor" /></Field>
      <Field label="Ne oldu?" required help={`${$body.length} / 500 · en az 20 karakter`}
        error={$body && $short ? "Biraz daha ayrıntı yazın." : null}>
        <Textarea bind:value={$body} rows={4} maxLength={500} placeholder="Hangi adımda, hangi cihazda, ne gördünüz?" />
      </Field>
    </div>
  </Card>
}
