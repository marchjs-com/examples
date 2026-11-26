// BirthdayCountdown: the creative-minimal DatePicker example.
//
// What it shows: a birthday counter. Type a date or choose it in the calendar; the age and the days left until the
// next birthday appear underneath. A birthday in the future is not accepted because of `max`.
// When to use this pattern: one date that drives a computed message. Keyboard: Alt+Arrow Down opens the calendar.
import { DatePicker, Field, todayIso } from "march/ui"

// The picker's value is an ISO date string (YYYY-MM-DD) or null when empty.
type Day = string | null
// Computes the message from the ISO date: the age, and the days until the next birthday (or a greeting today).
function countdown(iso: Day): string {
  if (!iso) return "Doğum tarihini seç"
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number]
  const today = new Date(`${todayIso()}T00:00:00`)
  let next = new Date(today.getFullYear(), m - 1, d), age = today.getFullYear() - y
  if (next < today) next = new Date(today.getFullYear() + 1, m - 1, d)
  else if (next > today) age--
  const days = Math.round((next.getTime() - today.getTime()) / 864e5)
  return days === 0 ? `İyi ki doğdun! Bugün ${age} yaşındasın 🎂` : `${age} yaşındasın · doğum gününe ${days} gün var`
}

// $born is bound to the picker below; countdown($born) is read inside the JSX, so the message updates on each change.
export function BirthdayCountdown() {
  let $born: Day = "1998-05-19"
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* max={todayIso()}: a date after today is marked invalid, so a birth date in the future cannot be chosen. */}
    <Field label="Doğum tarihin"><DatePicker bind:value={$born} max={todayIso()} /></Field>
    <span sx={{ text: ["lg", "bold"], color: "brand-purple" }}>{countdown($born)}</span>
  </div>
}
