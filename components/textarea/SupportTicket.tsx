// SupportTicket: the real-life Textarea example.
//
// What it shows: a support request form. A subject (TextInput) and a description (Textarea) inside <Field>s; the description
// needs at least 20 and at most 500 characters, with a live counter in the help line; the send button is locked until both
// fields are valid, shows a loading state while "sending", and the form is cleared afterwards.
// When to use this pattern: a longer message with limits. <Field> wires the Textarea's id, aria-invalid and aria-describedby,
// and gives it a label, a help line and an error line; `maxLength` stops typing at the limit.
//
// Animation: the Button's loading state is its own; the Textarea grows with the text (`autosize={false}` would keep the
// height fixed).
// Accessibility: a native <textarea> labelled by its Field (<label for>); `required` marks it; the error is linked with
// aria-describedby and aria-invalid; growing never moves the focus or the caret.
import { Textarea, TextInput, Field, Button, Card, toast } from "march/ui"
import { send } from "march/icons"

export function SupportTicket() {
  // Reactive state: the two fields, whether a send is running, and a derived value (a `const $x` is recomputed when $body
  // changes): is the description too short?
  let $subject = ""
  let $body = ""
  let $sending = false
  const $short = $body.trim().length < 20
  // Fakes a server call: after 900 ms it shows a confirmation toast and clears the form.
  const submit = () => {
    $sending = true
    setTimeout(() => { $sending = false; toast(`Talebiniz alındı: "${$subject}"`); $subject = ""; $body = "" }, 900)
  }
  // Card's `footer` slot holds the button: `loading` shows its busy state and disabled keeps it off until both fields are valid.
  return <Card title="Destek talebi" subtitle="Ortalama yanıt süresi: 2 saat"
    footer={<Button variant="primary" icon={send} loading={$sending} disabled={!$subject.trim() || $short} on:click={submit}>Gönder</Button>}>
    <div sx={{ flex: "col", gap: 3 }}>
      <Field label="Konu" required><TextInput bind:value={$subject} placeholder="Ödeme sayfası açılmıyor" /></Field>
      {/* help: the line under the field, here a live character counter. error: shown (and the field marked invalid) only
          once something is typed and it is still too short. */}
      <Field label="Ne oldu?" required help={`${$body.length} / 500 · en az 20 karakter`}
        error={$body && $short ? "Biraz daha ayrıntı yazın." : null}>
        {/* rows={4}: the starting height. maxLength={500}: typing stops at 500 characters. */}
        <Textarea bind:value={$body} rows={4} maxLength={500} placeholder="Hangi adımda, hangi cihazda, ne gördünüz?" />
      </Field>
    </div>
  </Card>
}
