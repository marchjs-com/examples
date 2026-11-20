import { GradientEditor } from "march/ui"

// gökyüzü boyacısı: sabah, öğle, akşam hazırlarından birini seç ya da durakları kendin taşı; güneş gökte asılı
const SKIES = [
  { label: "Sabah", value: ["#ffd3a5", "#fd6585"] },
  { label: "Öğle", value: ["#4cc3e0", "#1d9ad6"] },
  { label: "Akşam", value: ["#f2801f", "#a3338c", "#13233a"] },
]

export function SkyPainter() {
  let $sky = "linear-gradient(180deg, #ffd3a5 0%, #fd6585 100%)"
  return <div sx={{ flex: "col", gap: 3 }}>
    <div style={{ background: $sky, height: "8rem", borderRadius: "1rem", display: "grid", placeItems: "center", fontSize: "3rem" }}>☀️</div>
    <GradientEditor bind:value={$sky} types={["linear"]} presets={SKIES} output={false} preview={false} angles={[0, 180]} aria-label="Gökyüzü" />
  </div>
}
