// Countdown: the creative-minimal DateTimeInput example.
//
// What it shows: a New Year's Eve countdown. Choose the date and time of the party; the days and hours left appear in
// big type, and below it the moment is written in local time.
// When to use this pattern: when a single moment drives something you display (countdowns, reminders, schedules).
// Note: the remaining time is computed from the value when it changes; it does not tick on its own every second.
import { DateTimeInput, Field, Card } from "march/ui"

// An ISO timestamp in UTC, the format DateTimeInput stores.
const PARTY: string | null = "2026-12-31T21:00:00.000Z"

// $left is derived from $at (milliseconds until the party, never below 0).
export function Countdown() {
  let $at = PARTY
  const $left = $at ? Math.max(0, Date.parse($at) - Date.now()) : 0
  return <Card m:theme="night">
    {/* bind:value ties the input to $at. defaultTime="22:00" is used when someone picks a day without a time.
            The Card uses m:theme="night" (a common prop) to draw this subtree in the dark theme. */}
    <Field label="Parti ne zaman?"><DateTimeInput bind:value={$at} defaultTime="22:00" /></Field>
    <p sx={{ text: "2xl", color: "brand-gold" }}>
      {Math.floor($left / 86_400_000)} gün {Math.floor($left / 3_600_000) % 24} saat
    </p>
    <span sx={{ text: "sm", color: "muted" }}>kaldı · {$at ? new Date($at).toLocaleString("tr-TR") : "tarih seç"}</span>
  </Card>
}
