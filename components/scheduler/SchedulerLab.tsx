// SchedulerLab: the full-featured Scheduler example; it uses every prop at least once.
//
// Props shown here: events, view + onView, date + onDate, onChange, onCreate, onSelect, step, hourHeight, startHour,
//  weekends, editable, height, locale, toolbar, views, todayButton, nowLine, help, renderEvent, labels, animate, label,
// class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// SchedulerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { Scheduler } from "march/components/scheduler"
import { Button } from "march/ui"

// Dates are plain local strings: "YYYY-MM-DD" for a day and "YYYY-MM-DDTHH:mm" for a time. This one formats a Date.
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
// Today as a date string.
const today = iso(new Date())
// An event: id, title, start and end; allDay, location and color are optional.
type Ev = { id: string; title: string; start: string; end: string; allDay?: boolean; location?: string; color?: "brand-purple" | "brand-gold" }

export function SchedulerLab() {
  // The view in use (week or day), controlled from here.
  let $view = "week"
  // The date in view, controlled from here.
  let $date = today
  // The locale of the calendar (names, first weekday, clock).
  let $locale = "tr"
  // The last event as text.
  let $log = "—"
  // The events: one timed (with a place) and one all-day.
  let $events: Ev[] = [
    { id: "a", title: "Tasarım incelemesi", start: `${today}T10:00`, end: `${today}T11:00`, location: "Stüdyo", color: "brand-purple" },
    { id: "b", title: "Yayın günü", start: today, end: today, allDay: true, color: "brand-gold" },
  ]
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* Buttons that change the controlled props: view, locale and date. */}
      <Button size="sm" on:click={() => $view = $view === "week" ? "day" : "week"}>{() => `Görünüm: ${$view}`}</Button>
      <Button size="sm" on:click={() => $locale = $locale === "tr" ? "en-US" : "tr"}>{() => `Dil: ${$locale}`}</Button>
      <Button size="sm" on:click={() => $date = today}>Bugüne dön</Button>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{() => `Tarih: ${$date} · Son olay: ${$log}`}</p>
    {/* - events: an accessor, so the calendar follows $events. view + onView and date + onDate: the controlled pairs.
        - step: minutes to snap to; hourHeight: px per hour; startHour: scrolled into view first; weekends; height in
          px;
          editable: drag, resize and create; locale: names, first weekday, clock and reading direction.
        - toolbar, views (the views offered), todayButton, nowLine (a line at the current time): parts of the bar and
          grid.
        - help: the hint under the calendar (a text, false, or your node); labels: texts the calendar writes itself,
          with
          more(n) a function; animate: slide and settle animations (on the motion engine, so reduced motion applies).
        - renderEvent(event, info): your own content for an event; info.time is the formatted time.
        - onCreate(range), onChange(event, range), onSelect(event): create, move or resize, and select; label: the
          accessible
          name; class: on the root (the tests use it). */}
    <Scheduler label="Laboratuvar takvimi" class="lab-sch" events={() => $events}
      view={() => $view as "week"} onView={(v: string) => $view = v}
      date={() => $date} onDate={(d: string) => $date = d}
      step={15} hourHeight={44} startHour={9} weekends editable height={380} locale={() => $locale}
      toolbar views={["week", "day"]} todayButton nowLine animate
      help="Sürükleyin, kenarından boyutlandırın, boş saate sürükleyip ekleyin."
      labels={{ allDay: "Gün boyu", today: "Bugün", more: (n: number) => `+${n} tane` }}
      renderEvent={(e: Ev, info: { time: string }) => <span><b>{e.title}</b><br /><small>{info.time}{e.location ? ` · ${e.location}` : ""}</small></span>}
      onCreate={(r: { start: string; end: string }) => { $events = [...$events, { id: `n${$events.length}`, title: "Yeni", start: r.start, end: r.end }]; $log = "eklendi" }}
      onChange={(e: Ev, r: { start: string; end: string }) => { $events = $events.map((x) => (x.id === e.id ? { ...x, ...r } : x)); $log = `${e.title} taşındı` }}
      onSelect={(e: Ev) => $log = `${e.title} seçildi`} />
  </div>
}
