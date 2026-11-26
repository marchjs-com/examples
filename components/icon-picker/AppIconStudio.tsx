// AppIconStudio: the creative-minimal IconPicker example.
//
// What it shows: an app-icon studio. A button opens a small set of ten icons; the chosen one is shown large on a dark tile.
// When to use this pattern: when the choice is a short list that you control. `icons` replaces the built-in catalogue, so
// the panel is small and the names you store are only the ones you allow.
// Keyboard: Tab reaches the search, the chips and the grid; Enter or Space chooses; Escape closes the panel and returns
// focus to the button.
import { IconPicker, Card } from "march/ui"
import { Icon, zap, star, heart, music, coffee, gamepad, compass, trophy, palette, smile } from "march/icons"

// The icons on offer: an object of name -> icon. The name is what the picker's value holds.
const studio = { zap, star, heart, music, coffee, gamepad, compass, trophy, palette, smile }

export function AppIconStudio() {
  // The chosen icon's name, or null when none is chosen.
  let $name: string | null = "zap"
  return <div sx={{ flex: ["row", "center"], gap: 4 }}>
    {/* - icons: our own set instead of every built-in icon. value / onChange: the chosen name (null: none).
        - label: the accessible name of the button and the panel. setLabel: the name of our set in the set list. */}
    <IconPicker icons={studio} value={$name} onChange={(n: string | null) => $name = n} label="Uygulama ikonu" setLabel="Atölye" />
    {/* A dark tile that shows the chosen icon large; with no choice it shows a question mark. */}
    <Card m:theme="night">
      <div sx={{ flex: ["col", "center"], gap: 1 }}>
        <span sx={{ text: "2xl", color: "brand-gold" }}>{$name ? <Icon of={studio[$name as keyof typeof studio]} /> : "?"}</span>
        <span sx={{ text: "xs", color: "muted" }}>{$name ?? "ikonsuz"}</span>
      </div>
    </Card>
  </div>
}
