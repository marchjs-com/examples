import { ColorPicker, parse, rgbToHsv } from "march/ui"

// ruh hâli yüzüğü: bir renk seç, yüzük o renge boyanır ve tonuna göre bir ruh hâli söyler
const MOODS = [[30, "Heyecanlı"], [70, "Neşeli"], [160, "Huzurlu"], [250, "Düşünceli"], [320, "Romantik"], [360, "Heyecanlı"]] as const
const moodOf = (color: string) => {
  const rgb = parse(color)
  const hue = rgb ? rgbToHsv(rgb).h : 0
  return MOODS.find(([max]) => hue < max)?.[1] ?? "Heyecanlı"
}

export function MoodRing() {
  let $color = "#f2801f"
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
    <ColorPicker bind:value={$color} alpha={false} palettes={false} contrast={false} formats={false} aria-label="Yüzüğün rengi" />
    <div sx={{ flex: ["col", "center"], gap: 2 }}>
      <div style={{ width: "6rem", height: "6rem", borderRadius: "50%", border: `0.75rem solid ${$color}` }} />
      <b sx={{ text: "lg" }}>{moodOf($color)}</b>
    </div>
  </div>
}
