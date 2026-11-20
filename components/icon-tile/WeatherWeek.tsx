import { IconTile, Button } from "march/ui"
import { sun, cloud, droplet, zap, moon } from "march/icons"

// bir haftalık hava durumu şeridi: her gün renkli bir karo; seçilen gün dolu (solid) ve büyük görünür
const DAYS = [
  { day: "Pzt", icon: sun, tone: "warn", text: "Güneşli" }, { day: "Sal", icon: cloud, tone: "neutral", text: "Bulutlu" },
  { day: "Çar", icon: droplet, tone: "info", text: "Yağmurlu" }, { day: "Per", icon: zap, tone: "violet", text: "Fırtınalı" },
  { day: "Cum", icon: moon, tone: "teal", text: "Açık gece" },
] as const

export function WeatherWeek() {
  let $pick = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: "row", gap: 2 }}>
      {DAYS.map((d, i) => <Button variant="ghost" pressed={$pick === i} on:click={() => $pick = i} sx={{ flex: ["col", "center"], gap: 1, p: 2 }} aria-label={`${d.day}: ${d.text}`}>
        <IconTile icon={d.icon} tone={d.tone} shape="round" variant={() => $pick === i ? "solid" : "soft"} size={() => $pick === i ? "lg" : "md"} />
        <span sx={{ text: "xs" }}>{d.day}</span>
      </Button>)}
    </div>
    <span sx={{ text: "bold" }}>{() => `${DAYS[$pick].day}: ${DAYS[$pick].text}`}</span>
  </div>
}
