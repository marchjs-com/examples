import { CheckboxGroup, Field, Card, Button, toast } from "march/ui"
import { mail, phone, bell, message } from "march/icons"

// hesap ayarlarında bildirim tercihleri: kanallar kart görünümünde, konular çip; en az bir kanal seçilmeden kaydedilmez
const channels = [
  { value: "email", label: "E-posta", hint: "Haftalık özet ve faturalar", icon: mail },
  { value: "sms", label: "SMS", hint: "Yalnız güvenlik uyarıları", icon: phone, meta: "Ücretli" },
  { value: "push", label: "Anlık bildirim", hint: "Telefonda ve tarayıcıda", icon: bell },
  { value: "whatsapp", label: "WhatsApp", hint: "Bu bölgede henüz yok", icon: message, disabled: true },
]
const topics = ["Siparişler", "Kampanyalar", "Yorumlar", "Ürün haberleri"]

export function NotificationSettings() {
  let $channels = ["email", "push"]
  let $topics = ["Siparişler", "Yorumlar"]
  const $empty = $channels.length === 0
  const save = () => toast(`Kaydedildi: ${$channels.length} kanal, ${$topics.length} konu`)
  return <Card title="Bildirimler" subtitle="Sana nasıl ve ne zaman ulaşalım?">
    <div sx={{ flex: "col", gap: 4 }}>
      <Field label="Kanallar" group error={$empty ? "En az bir kanal seç" : null}>
        <CheckboxGroup bind:value={$channels} variant="card" options={channels} />
      </Field>
      <Field label="Konular" group help="Seçmediğin konularda yalnız zorunlu e-postalar gelir">
        <CheckboxGroup bind:value={$topics} variant="chip" inline options={topics} />
      </Field>
      <div sx={{ flex: ["row", "end"], gap: 2 }}>
        <Button on:click={() => { $channels = ["email"]; $topics = [] }}>Varsayılana dön</Button>
        <Button variant="primary" disabled={$empty} on:click={save}>Kaydet</Button>
      </div>
    </div>
  </Card>
}
