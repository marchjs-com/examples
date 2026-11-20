import { Gantt } from "march/components/gantt"
import { Card, Segmented } from "march/ui"

// bir konferansın hazırlık planı: ölçek seçilir, çubuklar sürüklenir, ardıl görevler kendiliğinden kayar
const iso = (offset: number) => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` }
type Task = { id: string; name: string; start: string; end: string; progress?: number; deps?: string[]; milestone?: boolean; color?: "brand-blue" | "brand-purple" | "brand-orange" | "brand-green" }

export function EventPlanning() {
  let $scale = "day"
  let $note = "Bir çubuğu sürükleyin"
  let $tasks: Task[] = [
    { id: "venue", name: "Mekân sözleşmesi", start: iso(-10), end: iso(-4), progress: 1, color: "brand-purple" },
    { id: "speakers", name: "Konuşmacı davetleri", start: iso(-5), end: iso(6), progress: 0.5, deps: ["venue"], color: "brand-blue" },
    { id: "tickets", name: "Bilet satışı", start: iso(0), end: iso(25), progress: 0.2, deps: ["venue"], color: "brand-green" },
    { id: "program", name: "Program yayını", start: iso(8), end: iso(8), milestone: true, deps: ["speakers"], color: "brand-orange" },
    { id: "day", name: "Konferans günü", start: iso(30), end: iso(30), milestone: true, deps: ["tickets", "program"], color: "brand-orange" },
  ]
  return <Card title="Konferans hazırlığı" subtitle={() => $note}>
    <Segmented aria-label="Ölçek" bind:value={$scale}
      options={[{ value: "day", label: "Gün" }, { value: "week", label: "Hafta" }, { value: "month", label: "Ay" }]} />
    <Gantt label="Konferans planı" tasks={() => $tasks} scale={() => $scale as "day"} cascade height={300}
      onChange={(t: Task) => { $tasks = $tasks.map((x) => (x.id === t.id ? t : x)); $note = `${t.name}: ${t.start} – ${t.end}` }}
      onSelect={(t: Task) => $note = `Seçildi: ${t.name}`} />
  </Card>
}
