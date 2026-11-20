import { StatsBand } from "march/landing"
import { Button, Card, Segmented } from "march/ui"

// StatsBand'in bütün özellikleri bir arada: rakamlar (value, label, note, format, decimals, prefix, suffix), görünüm
// (variant), sayaç (mode), süre (duration), eğri (easing), giriş (reveal) ve sınıf (class)
const VARIANTS = ["plain", "divided", "cards"] as const
const MODES = ["none", "count", "roll"] as const

export function StatsBandLab() {
  let $variant: (typeof VARIANTS)[number] = "divided"
  let $mode: (typeof MODES)[number] = "none"
  let $members = 42
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görünüm" options={VARIANTS.map((v) => ({ value: v, label: v }))} bind:value={$variant} />
        <Segmented aria-label="Sayaç" options={MODES.map((m) => ({ value: m, label: m }))} bind:value={$mode} />
        <Button variant="secondary" on:click={() => $members++}>+1 üye</Button>
      </div>
    </Card>
    {() => {
      // bu satırda okunan durumlar değişince bant yeniden çizilir; üye sayısı bir işlev, kendisi güncellenir
      const variant = $variant, mode = $mode
      return <StatsBand class="lab-stats" variant={variant} mode={mode} duration={800} easing="in-out"
        reveal={{ effect: "scale", stagger: 60 }} items={[
          { value: () => $members, label: "üye", note: "her gün artıyor" },
          { value: 2400000, label: "mesaj", format: { notation: "compact" }, suffix: "+" },
          { value: 99.5, decimals: 1, label: "çalışma süresi", suffix: "%" },
          { value: 12, label: "ortalama bilet", prefix: "€" },
        ]} />
    }}
  </div>
}
