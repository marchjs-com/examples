import { ProgressRing } from "march/charts"
import { Button, Card } from "march/ui"

// ProgressRing'in bütün özellikleri: value (erişimci), max, size, thickness, thresholds, format, label, color, colors
// ("brand", liste, "single"), paint (gradient, segments, cycle)
export function ProgressRingLab() {
  let $v = 40
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-up" size="sm" on:click={() => { $v = Math.min(100, $v + 40) }}>Artır</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $v = Math.max(0, $v - 30) }}>Azalt</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      <span class="lab-score"><ProgressRing value={$v / 10} max={10} thresholds={[40, 70]} size={88} thickness={10} label="Puan" format={(v: number) => `${v}/10`} /></span>
      <span class="lab-color"><ProgressRing value={$v} color="brand-blue" label="Mavi" /></span>
      <span class="lab-brand"><ProgressRing value={$v} colors="brand" paint="segments" label="HADİ" /></span>
      <ProgressRing value={$v} colors={["brand-orange", "brand-pink"]} paint="gradient" label="İki renk" />
      <ProgressRing value={100} colors="brand" paint="cycle" label="Akan" />
      <ProgressRing value={$v} colors="single" label="Tek renk" />
    </div>
    <Card m:theme="night">
      <ProgressRing value={$v} size={72} label="Koyu zeminde" />
    </Card>
  </div>
}
