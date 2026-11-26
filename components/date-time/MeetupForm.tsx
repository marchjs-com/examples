// MeetupForm: the real-life DateTimeInput example.
//
// What it shows: the start and end of a meetup. The end cannot be before the start, the duration is computed at once,
// and publishing shows a toast. It reads like a form field: a Field gives the label and the error.
// When to use this pattern: events, bookings, deadlines: anywhere one moment (date + time) is chosen.
// Keyboard: the date part is a typed field (Alt+Arrow Down opens the calendar), the time part is a normal input;
// both are in the Tab order.
import { DateTimeInput, TextInput, Field, Button, Card, toast } from "march/ui"
import { calendar } from "march/icons"

// The values are ISO timestamps in UTC (or null when empty); the inputs show them in local time.
const START: string | null = "2026-12-05T16:00:00.000Z"
const END: string | null = "2026-12-05T18:30:00.000Z"
// Writes a number of minutes as hours and minutes.
const length = (m: number) => `${Math.floor(m / 60)} sa ${m % 60} dk`

// $mins and $bad are derived: they are recomputed whenever $start or $end change, so the error and the duration
// need no extra code.
export function MeetupForm() {
  let $title = "Sinyallerle tanışma atölyesi"
  let $start = START
  let $end = END
  const $mins = $start && $end ? Math.round((Date.parse($end) - Date.parse($start)) / 60_000) : 0
  const $bad = $mins <= 0
  const publish = () => toast(`“${$title}” yayında · ${length($mins)}`)
  return <Card title="Etkinlik oluştur" subtitle="Kadıköy Kod Kulübü">
    <div sx={{ flex: "col", gap: 3 }}>
      <Field label="Başlık"><TextInput bind:value={$title} required /></Field>
      {/* defaultTime is used when the user picks only a date; timeLabel names the time field for screen readers. */}
      <Field label="Başlangıç"><DateTimeInput bind:value={$start} defaultTime="19:00" timeLabel="Başlangıç saati" /></Field>
      {/* Field's `error` shows the message (and marks the field) when the end is not after the start. min on the end input
              is the date of the start, so the calendar greys out earlier days; it takes a date only, so a same-day end can
              still be earlier by time, which the $bad check above catches. */}
      <Field label="Bitiş" error={$bad ? "Bitiş başlangıçtan sonra olmalı" : null}>
        <DateTimeInput bind:value={$end} min={$start ? $start.slice(0, 10) : null} defaultTime="21:00" timeLabel="Bitiş saati" />
      </Field>
      <div sx={{ flex: ["row", "between", "center"], gap: 2 }}>
        <span sx={{ color: "muted" }}>Süre: {$bad ? "—" : length($mins)}</span>
        {/* Publishing is disabled while the range is wrong or the title is empty. */}
        <Button icon={calendar} disabled={$bad || !$title} on:click={publish}>Yayınla</Button>
      </div>
    </div>
  </Card>
}
