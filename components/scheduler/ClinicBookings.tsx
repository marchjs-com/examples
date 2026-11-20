import { Scheduler } from "march/components/scheduler"
import { Card } from "march/ui"

// bir kliniğin randevu takvimi: boş saate sürükleyince randevu açılır, sürükleyerek taşınır, tıklayınca ayrıntısı yazılır
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
const monday = () => { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d }
const at = (dayOffset: number, time: string) => { const d = monday(); d.setDate(d.getDate() + dayOffset); return `${iso(d)}T${time}` }
type Booking = { id: string; title: string; start: string; end: string; location?: string; color?: "brand-blue" | "brand-green" | "brand-orange" }

export function ClinicBookings() {
  let $list: Booking[] = [
    { id: "b1", title: "Ayşe K. · kontrol", start: at(0, "09:00"), end: at(0, "09:30"), location: "Oda 1", color: "brand-blue" },
    { id: "b2", title: "Mehmet T. · diş taşı", start: at(1, "11:00"), end: at(1, "12:00"), location: "Oda 2", color: "brand-green" },
    { id: "b3", title: "Zeynep A. · dolgu", start: at(2, "14:30"), end: at(2, "15:30"), location: "Oda 1", color: "brand-orange" },
  ]
  let $note = "Boş bir saate sürükleyerek randevu açın"
  let n = 0
  return <Card title="Randevular" subtitle={() => $note}>
    <Scheduler label="Klinik randevuları" events={() => $list} view="week" step={30} weekends={false} startHour={8} height={460}
      onCreate={(r: { start: string; end: string; allDay: boolean }) => { $list = [...$list, { id: `n${++n}`, title: "Yeni randevu", start: r.start, end: r.end, color: "brand-orange" }]; $note = "Yeni randevu eklendi" }}
      onChange={(e: Booking, next: { start: string; end: string }) => { $list = $list.map((x) => (x.id === e.id ? { ...x, start: next.start, end: next.end } : x)); $note = `${e.title} taşındı` }}
      onSelect={(e: Booking) => $note = `${e.title} · ${e.location ?? "oda yok"}`} />
  </Card>
}
