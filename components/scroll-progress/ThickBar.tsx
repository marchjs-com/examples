// ThickBar: the creative-minimal ScrollProgress example.
//
// What it shows: the bar's `size` (its height in px) and `color` driven by a signal. Each press of the button makes the
// bar thicker and gives it the next brand colour; after 12 px it starts again at 3 px.
// When to use this pattern: when the bar's look must follow state (a theme switch, a user preference, a section's
// colour): read the signal inside a function and pass the result into the props.
import { ScrollProgress } from "march/landing"
import { Button } from "march/ui"

// One colour token per thickness step (3, 6, 9, 12 px). `color` takes a token name and wins over `paint`.
const COLORS = ["brand-orange", "brand-purple", "brand-blue", "brand-green"] as const

export function ThickBar() {
  // A `let $name` variable is a March signal: assigning it redraws whatever read it.
  let $size = 3
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The button's label reads $size, so the number updates by itself. */}
    <Button variant="secondary" on:click={() => $size = $size >= 12 ? 3 : $size + 3}>Kalınlaştır ({$size} px)</Button>
    {() => {
      // The signal is read inside this function, so the bar is redrawn with the new props after every press.
      // - position="inline": the bar sits here instead of being pinned to the top of the screen.
      // - size: height in px. color: the token for this step (size / 3 - 1 is 0..3 for 3..12 px).
      // - label: the accessible name of the progressbar. Without a `target` the whole page is measured.
      const size = $size
      return <ScrollProgress position="inline" size={size} color={COLORS[(size / 3 - 1) % COLORS.length]} label={`${size} piksellik çubuk`} />
    }}
    <p sx={{ color: "muted" }}>Sayfayı kaydır: çubuk okunan kısmı gösterir.</p>
  </div>
}
