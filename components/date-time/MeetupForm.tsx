import { DateTimeInput, TextInput, Field, Button, Card, toast } from "march/ui"
import { calendar } from "march/icons"

// bir buluşmanın başlangıcı ve bitişi: bitiş başlangıçtan önce olamaz, süre anında hesaplanır, yayınlayınca bildirim
const START: string | null = "2026-12-05T16:00:00.000Z"
const END: string | null = "2026-12-05T18:30:00.000Z"
const length = (m: number) => `${Math.floor(m / 60)} sa ${m % 60} dk`

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
      <Field label="Başlangıç"><DateTimeInput bind:value={$start} defaultTime="19:00" timeLabel="Başlangıç saati" /></Field>
      <Field label="Bitiş" error={$bad ? "Bitiş başlangıçtan sonra olmalı" : null}>
        <DateTimeInput bind:value={$end} min={$start ? $start.slice(0, 10) : null} defaultTime="21:00" timeLabel="Bitiş saati" />
      </Field>
      <div sx={{ flex: ["row", "between", "center"], gap: 2 }}>
        <span sx={{ color: "muted" }}>Süre: {$bad ? "—" : length($mins)}</span>
        <Button icon={calendar} disabled={$bad || !$title} on:click={publish}>Yayınla</Button>
      </div>
    </div>
  </Card>
}
