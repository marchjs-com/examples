// Booking: the real-life Calendar example.
//
// A hairdresser booking: the Calendar allows days from today up to 30 days ahead, closes Sundays, blocks full days,
// and picking a day reveals the time slots. Use this pattern for appointment and reservation flows: constrain the
// Calendar with min / max / isDisabled, then ask for the next detail only once the day is known.
import { If } from "march"
import { Calendar, ChoicePicker, Card, Button, toast, todayIso, addDays } from "march/ui"
import { check } from "march/icons"

// Dates are plain ISO strings ("2026-03-14"). todayIso() and addDays(iso, n) do the date arithmetic in UTC, so a
// daylight-saving change never shifts a day. `full` holds two days that are already booked; `sunday` tells whether an
// ISO date is a Sunday; `times` are the slots.
type Day = string | null
const today = todayIso()
const full = new Set([addDays(today, 2), addDays(today, 5)])
const sunday = (iso: string) => new Date(`${iso}T00:00:00Z`).getUTCDay() === 0
const times = ["10:00", "11:30", "14:00", "16:30"]

export function Booking() {
  // The chosen day (null until one is picked) and time (reactive state).
  let $day: Day = null
  let $time = ""
  const book = () => toast(`Randevunuz alındı: ${$day} · ${$time}`)
  return <Card title="Randevu al" subtitle="Saç kesimi · 45 dk · Moda Şubesi">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* bind:value keeps $day in sync both ways. min / max limit the pickable range; isDisabled marks any other day as
          unavailable (Sundays and full days): such days are aria-disabled and cannot be picked. firstDay={1} starts
          the week on Monday. onPick runs when a day is picked and clears the old time, because the slots belong to the
          day. labels rewords the accessible names of the month buttons. Keyboard: arrows move by day and week, Page
          Up / Down by month, Enter or Space picks. */}
      <Calendar bind:value={$day} min={today} max={addDays(today, 30)} firstDay={1}
        isDisabled={(iso: string) => sunday(iso) || full.has(iso)} onPick={() => $time = ""}
        labels={{ prevMonth: "Önceki ay", nextMonth: "Sonraki ay" }} />
      {/* If draws its content only while $day has a value, so the time slots appear after a day is picked. */}
      <If when={$day}>
        <ChoicePicker bind:value={$time} options={times} aria-label="Saat" />
      </If>
      {/* The confirm button stays disabled until both a day and a time are chosen, and its label says what is missing. */}
      <Button variant="primary" icon={check} disabled={!$day || !$time} on:click={book}>
        {$day && $time ? `${$day} · ${$time} onayla` : "Gün ve saat seçin"}
      </Button>
    </div>
  </Card>
}
