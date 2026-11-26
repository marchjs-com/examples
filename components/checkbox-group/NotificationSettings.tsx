// NotificationSettings: the real-life CheckboxGroup example.
//
// What it shows: notification preferences of an account page. Channels are a card-style CheckboxGroup (title, hint, icon
// and a price tag per option, one option disabled), topics are a row of chips. The Save button stays disabled until at
// least one channel is chosen, and the Field shows the error text.
// When to use this pattern: any "pick several" setting. Wrap the group in a `Field group` so the label names the
// whole group for screen readers and the error / help text is attached to it.
// Keyboard: every option is a real checkbox: Tab reaches it, Space toggles it. The box motion runs on the motion
// engine (reduced motion, global speed and "Stop all" apply; animate={false} turns it off for one group).
import { CheckboxGroup, Field, Card, Button, toast } from "march/ui"
import { mail, phone, bell, message } from "march/icons"

// Option objects for the card look: `hint` is the description, `icon` the leading mark, `meta` a small tag at the end
// and `disabled` locks a single option (WhatsApp is not available in this region).
const channels = [
  { value: "email", label: "E-posta", hint: "Haftalık özet ve faturalar", icon: mail },
  { value: "sms", label: "SMS", hint: "Yalnız güvenlik uyarıları", icon: phone, meta: "Ücretli" },
  { value: "push", label: "Anlık bildirim", hint: "Telefonda ve tarayıcıda", icon: bell },
  { value: "whatsapp", label: "WhatsApp", hint: "Bu bölgede henüz yok", icon: message, disabled: true },
]
// A plain array of strings is enough when value and label are the same text.
const topics = ["Siparişler", "Kampanyalar", "Yorumlar", "Ürün haberleri"]

export function NotificationSettings() {
  let $channels = ["email", "push"]
  let $topics = ["Siparişler", "Yorumlar"]
  // Derived values (a `$` name that is computed from other signals) re-evaluate on their own when the arrays change.
  const $empty = $channels.length === 0
  const save = () => toast(`Kaydedildi: ${$channels.length} kanal, ${$topics.length} konu`)
  return <Card title="Bildirimler" subtitle="Sana nasıl ve ne zaman ulaşalım?">
    <div sx={{ flex: "col", gap: 4 }}>
      {/* Field group: labels the whole group (role="group"). `error` replaces the help text while it is set. */}
      <Field label="Kanallar" group error={$empty ? "En az bir kanal seç" : null}>
        <CheckboxGroup bind:value={$channels} variant="card" options={channels} />
      </Field>
      <Field label="Konular" group help="Seçmediğin konularda yalnız zorunlu e-postalar gelir">
        <CheckboxGroup bind:value={$topics} variant="chip" inline options={topics} />
      </Field>
      {/* Reset puts both groups back to their defaults; Save is disabled while no channel is chosen. */}
      <div sx={{ flex: ["row", "end"], gap: 2 }}>
        <Button on:click={() => { $channels = ["email"]; $topics = [] }}>Varsayılana dön</Button>
        <Button variant="primary" disabled={$empty} on:click={save}>Kaydet</Button>
      </div>
    </div>
  </Card>
}
