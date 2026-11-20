import { Stat } from "march/charts"
import { Button, Card } from "march/ui"
import { star } from "march/icons"

// Stat'ın bütün özellikleri: label (düğüm de olur), value (erişimci), previous, delta, format, deltaFormat, invert,
// hint, empty, class, spark (nesne listesi) ve sparkY, icon
export function StatLab() {
  let $value = 120
  let $none = false
  const rows = () => [{ g: 1, puan: 90 }, { g: 2, puan: 104 }, { g: 3, puan: 98 }, { g: 4, puan: $value }]
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-up" size="sm" on:click={() => { $value += 30 }}>Artır</Button>
      <Button class="lab-down" size="sm" on:click={() => { $value -= 60 }}>Azalt</Button>
      <Button class="lab-none" size="sm" variant="ghost" on:click={() => { $none = !$none }}>Değeri sil / geri getir</Button>
    </div>
    <Stat class="lab-main" icon={star} label={<span>Puan <span sx={{ text: "xs", color: "muted" }}>(4. hafta)</span></span>} value={$none ? null : $value} previous={100}
      format={(v: number) => `${v} puan`} deltaFormat={["percent", 0]} hint="ilk haftaya göre" empty="ölçülmedi" spark={rows()} sparkY="puan" />
    <Card m:theme="night">
      <Stat class="lab-cost" label="Gecikme" value={240} delta={0.25} invert hint="kötüleşti" />
    </Card>
  </div>
}
