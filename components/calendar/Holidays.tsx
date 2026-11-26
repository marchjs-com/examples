// Holidays: the creative-minimal Calendar example.
//
// A public-holiday calendar: holiday days get a bullet, and picking a day writes its name below. It shows `renderDay`,
// which replaces the content of a day cell, so a Calendar can carry extra information without any other component.
// Use the pattern for event, availability and "busy day" markers.
import { Calendar } from "march/ui"

// Dates are plain ISO strings; null means "no day chosen".
type Day = string | null
// The holidays, keyed by month-day ("MM-DD") so they repeat every year; the value is the holiday's name.
const holidays: Record<string, string> = {
  "01-01": "Yılbaşı", "04-23": "Ulusal Egemenlik ve Çocuk Bayramı", "05-01": "Emek ve Dayanışma Günü",
  "05-19": "Gençlik ve Spor Bayramı", "07-15": "Demokrasi ve Milli Birlik Günü", "08-30": "Zafer Bayramı", "10-29": "Cumhuriyet Bayramı",
}
// The name for an ISO date: iso.slice(5) cuts the "MM-DD" part; other days read as an ordinary day.
const nameOf = (iso: Day) => (iso && holidays[iso.slice(5)]) || "sıradan bir gün"

export function Holidays() {
  // The chosen day (reactive state); it starts on a holiday so the caption has something to show.
  let $day: Day = "2026-10-29"
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* bind:value keeps $day in sync. firstDay={1} starts the week on Monday. m:color (a common prop) sets the colour
        token of the selection and today's ring. renderDay(iso, day) draws each cell: holidays get a bold number with a
        bullet, other days the plain number. The grid's keyboard support (arrows, Page Up / Down, Enter) is unchanged. */}
    <Calendar bind:value={$day} firstDay={1} m:color="brand-orange"
      renderDay={(iso: string, d: number) => (holidays[iso.slice(5)] ? <b>{`${d}•`}</b> : d)} />
    <span sx={{ text: "bold" }}>{$day}: {nameOf($day)}</span>
  </div>
}
