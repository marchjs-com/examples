import { Slider, Card } from "march/ui"

// acı seviyesi: 0–5 arası kaydırıcı; değer biber olarak görünür, renk rampası ısındıkça ustanın yorumu değişir
const notes = ["Hiç acı yok", "Hafif", "Tatlı sert", "Acı", "Çok acı", "Ateş! 🔥"]

export function SpiceLevel() {
  let $spice = 2
  return <Card title="Adana dürüm">
    <div sx={{ flex: "col", gap: 2 }}>
      <Slider bind:value={$spice} min={0} max={5} track m:color={$spice > 3 ? "danger" : "brand-orange"}
        format={(v: number) => (v ? "🌶️".repeat(v) : "🫑")} valueText={(v: number) => notes[v] ?? ""} aria-label="Acı seviyesi" />
      <span sx={{ text: "lg", color: $spice > 3 ? "danger" : "brand-orange" }}>{notes[$spice]}</span>
    </div>
  </Card>
}
