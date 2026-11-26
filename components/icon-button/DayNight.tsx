// DayNight: the creative-minimal IconButton example.
//
// What it shows: a day / night switch. One round button; pressing it swaps the icon (sun / moon), the accessible name and
// the theme of the card, and a greeting changes colour.
// When to use this pattern: a toggle with an icon only. `label` is required and becomes both the accessible name and the
// tooltip, and it says what pressing will do (not the current state). `pressed` adds aria-pressed and the pressed look.
// Keyboard: it is a real button (Tab, then Enter or Space).
import { IconButton, Card } from "march/ui"
import { sun, moon } from "march/icons"

export function DayNight() {
  // One boolean drives the icon, the label, the theme and the greeting.
  let $night = false
  // m:theme draws the card and everything inside it in the "night" or the default theme; it follows $night.
  return <Card m:theme={$night ? "night" : "hadi"}>
    <div sx={{ flex: ["row", "center"], gap: 3 }}>
      {/* - shape="round": a circle. variant="raised": a surface with border and shadow. size="lg": the largest size.
          - icon: the icon to draw (a different one for each state).
          - label: the accessible name and tooltip; it describes the action that will happen on press.
          - pressed: toggle state (aria-pressed). on:click flips the state. */}
      <IconButton shape="round" variant="raised" size="lg" icon={$night ? moon : sun}
        label={$night ? "Gündüze geç" : "Geceye geç"} pressed={$night} on:click={() => $night = !$night} />
      {/* The greeting: its text and colour follow the same state. */}
      <span sx={{ text: "lg", color: $night ? "brand-blue" : "brand-orange" }}>{$night ? "İyi geceler" : "Günaydın"}</span>
    </div>
  </Card>
}
