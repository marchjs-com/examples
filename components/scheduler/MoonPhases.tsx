import { Scheduler } from "march/components/scheduler"

// bu ayın gökyüzü takvimi: ay evreleri ve bir meteor yağmuru, salt okunur ay görünümünde
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
const day = (n: number) => { const d = new Date(); d.setDate(n); return iso(d) }
const sky = [
  { id: "new", title: "🌑 Yeni ay", start: day(3), end: day(3), allDay: true, color: "brand-purple" as const },
  { id: "first", title: "🌓 İlk dördün", start: day(10), end: day(10), allDay: true, color: "brand-blue" as const },
  { id: "full", title: "🌕 Dolunay", start: day(17), end: day(17), allDay: true, color: "brand-gold" as const },
  { id: "last", title: "🌗 Son dördün", start: day(24), end: day(24), allDay: true, color: "brand-blue" as const },
  { id: "meteor", title: "☄️ Meteor yağmuru", start: day(12), end: day(14), allDay: true, color: "brand-pink" as const },
]

export function MoonPhases() {
  return <Scheduler label="Gökyüzü takvimi" events={sky} view="month" editable={false} help={false} height={420} views={false} />
}
