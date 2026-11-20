import { TimeInput, Field, Toggle, Button, Card, toast } from "march/ui"
import { save } from "march/icons"

// bir kahvecinin çalışma saatleri: hafta içi ve cumartesi açılış / kapanış, pazar isteğe bağlı; kapanış açılıştan önce olamaz
export function OpeningHours() {
  let $open = "08:00"
  let $close = "20:00"
  let $satOpen = "09:30"
  let $satClose = "17:00"
  let $sunday = false
  const $weekBad = $close <= $open
  const $satBad = $satClose <= $satOpen
  const store = () => toast(`Kaydedildi: hafta içi ${$open}–${$close}, cumartesi ${$satOpen}–${$satClose}${$sunday ? ", pazar açık" : ""}`)
  return <Card title="Çalışma saatleri" subtitle="Kahve Durağı · Kadıköy">
    <div sx={{ cols: 2, gap: 3 }}>
      <Field label="Hafta içi açılış"><TimeInput bind:value={$open} min="06:00" max="12:00" required /></Field>
      <Field label="Hafta içi kapanış" error={$weekBad ? "Kapanış açılıştan sonra olmalı" : null}>
        <TimeInput bind:value={$close} min={$open} max="23:30" required />
      </Field>
      <Field label="Cumartesi açılış"><TimeInput bind:value={$satOpen} /></Field>
      <Field label="Cumartesi kapanış" error={$satBad ? "Kapanış açılıştan sonra olmalı" : null}>
        <TimeInput bind:value={$satClose} min={$satOpen} />
      </Field>
    </div>
    <div sx={{ flex: ["row", "between"], gap: 2, mt: 3 }}>
      <Toggle bind:value={$sunday} label="Pazar da açık" />
      <Button icon={save} disabled={$weekBad || $satBad} on:click={store}>Kaydet</Button>
    </div>
  </Card>
}
