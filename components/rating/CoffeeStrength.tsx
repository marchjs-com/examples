// CoffeeStrength: the creative-minimal Rating example.
//
// What it shows: coffee strength as cups instead of stars. Every level has a name, and screen readers read that name
// too. When to use this pattern: any 1-to-5 choice where a custom mark and named levels explain more than a number.
//
// Keyboard and accessibility: an editable Rating is a radio group; arrow keys move and select, Home / End jump, and
// there is one tab stop. `starLabel` sets what a screen reader says for each mark.
// Animation: the hover growth and the fade run on the motion engine; `animate={false}` removes them.

import { Rating } from "march/ui"
import { coffee } from "march/icons"

// The name of each level; index 0 is "nothing chosen". They are content, so they stay Turkish.
const levels = ["Seçilmedi", "Çok yumuşak", "Yumuşak", "Dengeli", "Sert", "Uyandırır"]

export function CoffeeStrength() {
  // The chosen level (0 to 5); bind:value keeps it in step with the Rating.
  let $cups = 3
  return <div sx={{ flex: ["row", "center", "wrap"], gap: 3 }}>
    {/* - icon: your own mark (a cup) instead of the star; m:color: the colour token; size="lg": bigger marks.
        - label: the accessible name of the group; starLabel(n): the accessible name of the n-th mark. */}
    <Rating bind:value={$cups} icon={coffee} m:color="brand-orange" size="lg" label="Kahve sertliği"
      starLabel={(n: number) => levels[n] ?? String(n)} />
    {/* The level's name, shown for sighted users as well. */}
    <span sx={{ text: ["lg", "bold"] }}>{levels[$cups]}</span>
  </div>
}
