import { Steps, Button, Card } from "march/ui"
import { zap, coffee, clock, smile } from "march/icons"

// bir bardak çay, dört adım: her basışta bir sonraki adım; sonunda afiyet olsun
const TEA = [
  { title: "Su kaynasın", icon: zap },
  { title: "Demle", icon: coffee },
  { title: "Beklet", icon: clock },
  { title: "Afiyet", icon: smile },
]

export function TeaSteps() {
  let $step = 0
  const $ready = $step >= TEA.length
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      <Steps steps={TEA} current={$step} onSelect={(i: number) => $step = i} m:color="brand-orange" />
      <div sx={{ flex: ["row", "between"], gap: 2 }}>
        <span sx={{ text: "lg", color: $ready ? "success" : "muted" }}>{$ready ? "Çay hazır, afiyet olsun!" : "Sıradaki: " + TEA[$step]?.title}</span>
        <Button variant="primary" on:click={() => $step = $ready ? 0 : $step + 1}>{$ready ? "Bir bardak daha" : "Sonraki adım"}</Button>
      </div>
    </div>
  </Card>
}
