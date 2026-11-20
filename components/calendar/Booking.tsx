import { If } from "march"
import { Calendar, ChoicePicker, Card, Button, toast, todayIso, addDays } from "march/ui"
import { check } from "march/icons"

// kuaför randevusu: bugünden 30 gün ileriye kadar, pazar kapalı, dolu günler seçilemez; gün seçilince saatler açılır
type Day = string | null
const today = todayIso()
const full = new Set([addDays(today, 2), addDays(today, 5)])
const sunday = (iso: string) => new Date(`${iso}T00:00:00Z`).getUTCDay() === 0
const times = ["10:00", "11:30", "14:00", "16:30"]

export function Booking() {
  let $day: Day = null
  let $time = ""
  const book = () => toast(`Randevunuz alındı: ${$day} · ${$time}`)
  return <Card title="Randevu al" subtitle="Saç kesimi · 45 dk · Moda Şubesi">
    <div sx={{ flex: "col", gap: 3 }}>
      <Calendar bind:value={$day} min={today} max={addDays(today, 30)} firstDay={1}
        isDisabled={(iso: string) => sunday(iso) || full.has(iso)} onPick={() => $time = ""}
        labels={{ prevMonth: "Önceki ay", nextMonth: "Sonraki ay" }} />
      <If when={$day}>
        <ChoicePicker bind:value={$time} options={times} aria-label="Saat" />
      </If>
      <Button variant="primary" icon={check} disabled={!$day || !$time} on:click={book}>
        {$day && $time ? `${$day} · ${$time} onayla` : "Gün ve saat seçin"}
      </Button>
    </div>
  </Card>
}
