import { Counter } from "march/landing"
import { Button, Card, Segmented } from "march/ui"

// Counter'ın bütün özellikleri bir arada: değer (value, bir işlev), başlangıç (from), biçim (format), ondalık (decimals),
// ön ek (prefix), son ek (suffix), tür (mode), süre (duration), eğri (easing), başlama anı (start) ve sınıf (class)
const MODES = ["none", "count", "roll"] as const

export function CounterLab() {
  let $mode: (typeof MODES)[number] = "none"
  let $score = 42
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Tür" options={MODES.map((m) => ({ value: m, label: m }))} bind:value={$mode} />
        <Button variant="secondary" on:click={() => $score += 8}>+8 puan</Button>
      </div>
    </Card>
    {() => {
      // tür değişince sayaç yeniden çizilir; değer bir işlev, kendisi güncellenir
      const mode = $mode
      return <div sx={{ flex: ["row", "center"], gap: 4 }}>
        <span sx={{ text: "2xl" }}>
          <Counter class="lab-counter" value={() => $score} from={0} mode={mode} start="now" duration={700} easing="bounce"
            decimals={0} format={{ useGrouping: false }} prefix="★" suffix=" puan" />
        </span>
      </div>
    }}
  </div>
}
