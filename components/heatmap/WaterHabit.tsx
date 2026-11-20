import { Heatmap } from "march/charts"
import { Button } from "march/ui"

// su içme alışkanlığı takvimi: "Bir bardak" bugüne bir bardak ekler, bugünün hücresi koyulaşır
const TODAY = new Date(2026, 10, 20)
const start = Array.from({ length: 8 * 7 }, (_, i) => { const d = new Date(TODAY); d.setDate(TODAY.getDate() - i); return { gun: d, bardak: i === 0 ? 0 : (i * 5) % 9 } })

export function WaterHabit() {
  let $days = start
  const drink = () => { $days = $days.map((d, i) => (i === 0 ? { ...d, bardak: d.bardak + 1 } : d)) }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button on:click={drink}>💧 Bir bardak</Button>
      <span>Bugün: {() => $days[0].bardak} bardak</span>
    </div>
    <Heatmap data={() => $days} x="gun" value="bardak" calendar={{ weeks: 8 }} end={TODAY} max={8} valueLabel="Bardak" animate title="Su takvimi" />
  </div>
}
