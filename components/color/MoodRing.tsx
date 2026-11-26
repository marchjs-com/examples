// MoodRing: the creative-minimal ColorPicker example.
//
// What it shows: pick a colour and a ring is painted with it; the hue of the colour decides the "mood" that is printed
// below the ring.
// When to use this pattern: a colour picker that only needs the colour area and the hue slider: every extra part
// (transparency, palettes, contrast, the format switcher) is switched off, so the picker becomes a small, playful control.
// The helpers `parse` and `rgbToHsv` come from march/ui, so you can work with the colour value without writing
// your own conversion.
import { ColorPicker, parse, rgbToHsv } from "march/ui"

// The upper hue limit (in degrees) of each mood; the first limit that is above the colour's hue wins.
const MOODS = [[30, "Heyecanlı"], [70, "Neşeli"], [160, "Huzurlu"], [250, "Düşünceli"], [320, "Romantik"], [360, "Heyecanlı"]] as const
const moodOf = (color: string) => {
  // parse turns any CSS colour text into rgb (or null if it cannot); rgbToHsv gives the hue in degrees.
  const rgb = parse(color)
  const hue = rgb ? rgbToHsv(rgb).h : 0
  return MOODS.find(([max]) => hue < max)?.[1] ?? "Heyecanlı"
}

export function MoodRing() {
  let $color = "#f2801f"
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
    {/* alpha, palettes, contrast and formats are all switched off, leaving the colour area and the hue slider.
        aria-label names the picker for screen readers. */}
    <ColorPicker bind:value={$color} alpha={false} palettes={false} contrast={false} formats={false} aria-label="Yüzüğün rengi" />
    <div sx={{ flex: ["col", "center"], gap: 2 }}>
      {/* The ring is a circle with a thick border in the picked colour; moodOf reads the same value, so it follows. */}
      <div style={{ width: "6rem", height: "6rem", borderRadius: "50%", border: `0.75rem solid ${$color}` }} />
      <b sx={{ text: "lg" }}>{moodOf($color)}</b>
    </div>
  </div>
}
