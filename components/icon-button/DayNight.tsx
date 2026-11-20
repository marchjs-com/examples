import { IconButton, Card } from "march/ui"
import { sun, moon } from "march/icons"

// gece / gündüz anahtarı: tek yuvarlak düğme; basınca ikon, ad ve kartın teması birlikte döner
export function DayNight() {
  let $night = false
  return <Card m:theme={$night ? "night" : "hadi"}>
    <div sx={{ flex: ["row", "center"], gap: 3 }}>
      <IconButton shape="round" variant="raised" size="lg" icon={$night ? moon : sun}
        label={$night ? "Gündüze geç" : "Geceye geç"} pressed={$night} on:click={() => $night = !$night} />
      <span sx={{ text: "lg", color: $night ? "brand-blue" : "brand-orange" }}>{$night ? "İyi geceler" : "Günaydın"}</span>
    </div>
  </Card>
}
