import { IconPicker, Card } from "march/ui"
import { Icon, zap, star, heart, music, coffee, gamepad, compass, trophy, palette, smile } from "march/icons"

// uygulama ikonu atölyesi: küçük bir seçkiden ikon seç, koyu karoda kocaman görünsün
const studio = { zap, star, heart, music, coffee, gamepad, compass, trophy, palette, smile }

export function AppIconStudio() {
  let $name: string | null = "zap"
  return <div sx={{ flex: ["row", "center"], gap: 4 }}>
    <IconPicker icons={studio} value={$name} onChange={(n: string | null) => $name = n} label="Uygulama ikonu" setLabel="Atölye" />
    <Card m:theme="night">
      <div sx={{ flex: ["col", "center"], gap: 1 }}>
        <span sx={{ text: "2xl", color: "brand-gold" }}>{$name ? <Icon of={studio[$name as keyof typeof studio]} /> : "?"}</span>
        <span sx={{ text: "xs", color: "muted" }}>{$name ?? "ikonsuz"}</span>
      </div>
    </Card>
  </div>
}
