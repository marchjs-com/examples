// ClinicBookings: the real-life Scheduler example.
//
// What it shows: a clinic's appointment calendar for the week. Drag on an empty slot to create an appointment, drag an
// appointment to move it, click it to see its details in the card's subtitle. When to use this pattern: booking and
// planning screens; every callback is where your app saves the change.
//
//  Keyboard and accessibility: every event is a button named with its title, day, time and place; Alt+arrows move an
// event
// and Alt+Shift+arrows resize it. Animation: sliding between periods and the spring when an event is dropped run on the
// motion engine (reduced motion applies); `animate={false}` turns them off.

import { Scheduler } from "march/components/scheduler"
import { Card } from "march/ui"

// Dates are plain local strings: "YYYY-MM-DD" for a day and "YYYY-MM-DDTHH:mm" for a time. This one formats a Date.
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
// The Monday of the current week, so the demo events always fall in the week on screen.
const monday = () => { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d }
// A date-time string a given number of days after Monday, at the given time.
const at = (dayOffset: number, time: string) => { const d = monday(); d.setDate(d.getDate() + dayOffset); return `${iso(d)}T${time}` }
// An event: id and title are needed; start and end are local date-time strings; location and color are optional.
type Booking = { id: string; title: string; start: string; end: string; location?: string; color?: "brand-blue" | "brand-green" | "brand-orange" }

export function ClinicBookings() {
  // The appointments; the calendar reads them again whenever the list is replaced.
  let $list: Booking[] = [
    { id: "b1", title: "Ayşe K. · kontrol", start: at(0, "09:00"), end: at(0, "09:30"), location: "Oda 1", color: "brand-blue" },
    { id: "b2", title: "Mehmet T. · diş taşı", start: at(1, "11:00"), end: at(1, "12:00"), location: "Oda 2", color: "brand-green" },
    { id: "b3", title: "Zeynep A. · dolgu", start: at(2, "14:30"), end: at(2, "15:30"), location: "Oda 1", color: "brand-orange" },
  ]
  // A status line shown in the card's subtitle.
  let $note = "Boş bir saate sürükleyerek randevu açın"
  // A counter for the ids of new appointments.
  let n = 0
  return <Card title="Randevular" subtitle={() => $note}>
    {/* - label: the accessible name; events: an accessor (a function), so the calendar follows $list.
        - view="week", step={30}: snap moves and resizes to 30 minutes; weekends={false}: hide Saturday and Sunday;
          startHour={8}: scroll to 8:00 first; height: the scroll height in px.
        - onCreate(range): a drag on an empty slot; add the new event to the list.
        - onChange(event, range): after a drag or keyboard move (the calendar already shows it); save the new times.
        - onSelect(event): a click or Enter on an event. */}
    <Scheduler label="Klinik randevuları" events={() => $list} view="week" step={30} weekends={false} startHour={8} height={460}
      onCreate={(r: { start: string; end: string; allDay: boolean }) => { $list = [...$list, { id: `n${++n}`, title: "Yeni randevu", start: r.start, end: r.end, color: "brand-orange" }]; $note = "Yeni randevu eklendi" }}
      onChange={(e: Booking, next: { start: string; end: string }) => { $list = $list.map((x) => (x.id === e.id ? { ...x, start: next.start, end: next.end } : x)); $note = `${e.title} taşındı` }}
      onSelect={(e: Booking) => $note = `${e.title} · ${e.location ?? "oda yok"}`} />
  </Card>
}
