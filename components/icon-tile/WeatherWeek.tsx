// WeatherWeek: the creative-minimal IconTile example.
//
// What it shows: a week of weather as a row of round coloured tiles, one per day. The selected day's tile turns solid and grows.
// When to use this pattern: a tile whose look reflects state. `variant` and `size` accept functions, so the tile updates by
// itself when the selection changes.
// Accessibility: the tile is decorative (aria-hidden) when it has no `label`, so the real button around it carries the name
// (day and weather), and the pressed state says which day is chosen.
import { IconTile, Button } from "march/ui"
import { sun, cloud, droplet, zap, moon } from "march/icons"

// The days: a short name, an icon, a tone (one of IconTile's nine) and a description. `as const` keeps the tones literal.
const DAYS = [
  { day: "Pzt", icon: sun, tone: "warn", text: "Güneşli" }, { day: "Sal", icon: cloud, tone: "neutral", text: "Bulutlu" },
  { day: "Çar", icon: droplet, tone: "info", text: "Yağmurlu" }, { day: "Per", icon: zap, tone: "violet", text: "Fırtınalı" },
  { day: "Cum", icon: moon, tone: "teal", text: "Açık gece" },
] as const

export function WeatherWeek() {
  // The index of the selected day.
  let $pick = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: "row", gap: 2 }}>
      {/* Each day is a ghost Button: pressed marks the selected one (aria-pressed), and aria-label gives the name (day and weather)
          since the tile inside is decorative.
          IconTile: icon and tone pick the picture and colour, shape="round" makes a circle, variant and size are functions so the
          selected tile becomes "solid" and "lg" while the others stay "soft" and "md". */}
      {DAYS.map((d, i) => <Button variant="ghost" pressed={$pick === i} on:click={() => $pick = i} sx={{ flex: ["col", "center"], gap: 1, p: 2 }} aria-label={`${d.day}: ${d.text}`}>
        <IconTile icon={d.icon} tone={d.tone} shape="round" variant={() => $pick === i ? "solid" : "soft"} size={() => $pick === i ? "lg" : "md"} />
        <span sx={{ text: "xs" }}>{d.day}</span>
      </Button>)}
    </div>
    {/* The description of the selected day. */}
    <span sx={{ text: "bold" }}>{() => `${DAYS[$pick].day}: ${DAYS[$pick].text}`}</span>
  </div>
}
