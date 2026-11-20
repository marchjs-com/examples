import { Scheduler } from "march/components/scheduler"
import { Button } from "march/ui"

// Scheduler'ın bütün özellikleri bir arada: events, view + onView, date + onDate, onChange, onCreate, onSelect, step,
// hourHeight, startHour, weekends, editable, height, locale, toolbar, views, todayButton, nowLine, help, renderEvent,
// labels, animate, label, class
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
const today = iso(new Date())
type Ev = { id: string; title: string; start: string; end: string; allDay?: boolean; location?: string; color?: "brand-purple" | "brand-gold" }

export function SchedulerLab() {
  let $view = "week"
  let $date = today
  let $locale = "tr"
  let $log = "—"
  let $events: Ev[] = [
    { id: "a", title: "Tasarım incelemesi", start: `${today}T10:00`, end: `${today}T11:00`, location: "Stüdyo", color: "brand-purple" },
    { id: "b", title: "Yayın günü", start: today, end: today, allDay: true, color: "brand-gold" },
  ]
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $view = $view === "week" ? "day" : "week"}>{() => `Görünüm: ${$view}`}</Button>
      <Button size="sm" on:click={() => $locale = $locale === "tr" ? "en-US" : "tr"}>{() => `Dil: ${$locale}`}</Button>
      <Button size="sm" on:click={() => $date = today}>Bugüne dön</Button>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{() => `Tarih: ${$date} · Son olay: ${$log}`}</p>
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
