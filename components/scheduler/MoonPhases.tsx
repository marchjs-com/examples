// MoonPhases: the creative-minimal Scheduler example.
//
//  What it shows: this month's sky calendar: moon phases and a meteor shower as all-day events in a read-only month
// view.
// When to use this pattern: a calendar that only displays dates (holidays, a season, a release schedule).
//
// Accessibility: month days are one roving tab stop (arrows move, Enter opens the day) and every event is a button with
// a full name. The month view is read-only here, so nothing can be dragged.

import { Scheduler } from "march/components/scheduler"

// Format a Date as "YYYY-MM-DD", the form all-day events use.
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
// The given day of the current month as that string.
const day = (n: number) => { const d = new Date(); d.setDate(n); return iso(d) }
// All-day events: allDay: true with date-only start and end (the end day is included, so the meteor shower spans three
// days). `color` is a colour token. The titles are content, so they stay Turkish.
const sky = [
  { id: "new", title: "🌑 Yeni ay", start: day(3), end: day(3), allDay: true, color: "brand-purple" as const },
  { id: "first", title: "🌓 İlk dördün", start: day(10), end: day(10), allDay: true, color: "brand-blue" as const },
  { id: "full", title: "🌕 Dolunay", start: day(17), end: day(17), allDay: true, color: "brand-gold" as const },
  { id: "last", title: "🌗 Son dördün", start: day(24), end: day(24), allDay: true, color: "brand-blue" as const },
  { id: "meteor", title: "☄️ Meteor yağmuru", start: day(12), end: day(14), allDay: true, color: "brand-pink" as const },
]

export function MoonPhases() {
  // - view="month": the month grid; editable={false}: no drag, resize or create; help={false}: no hint under the
  //   calendar;
  //   views={false}: hide the view switch, since there is only one view; height: px (used by the time views).
  return <Scheduler label="Gökyüzü takvimi" events={sky} view="month" editable={false} help={false} height={420} views={false} />
}
