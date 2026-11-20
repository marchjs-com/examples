import { Gantt } from "march/components/gantt"

// bir bahçenin mevsimi: ekim, filizlenme, hasat; her biri bir öncekinden sonra gelir, hasat bir dönüm noktası
const iso = (offset: number) => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` }
const garden = [
  { id: "soil", name: "🪱 Toprağı hazırla", start: iso(-6), end: iso(-3), progress: 1, color: "brand-gold" as const },
  { id: "seed", name: "🌱 Tohum ek", start: iso(-2), end: iso(0), progress: 0.7, deps: ["soil"], color: "brand-green" as const },
  { id: "water", name: "💧 Düzenli sula", start: iso(1), end: iso(20), progress: 0, deps: ["seed"], color: "brand-blue" as const },
  { id: "harvest", name: "🍅 Hasat", start: iso(21), end: iso(21), milestone: true, deps: ["water"], color: "brand-orange" as const },
]

export function GardenPlan() {
  return <Gantt label="Bahçe planı" tasks={garden} editable={false} height={220} help={false} />
}
