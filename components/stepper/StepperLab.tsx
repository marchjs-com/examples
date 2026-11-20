import { Stepper, Button, Card } from "march/ui"
import { user, mail, flag, star } from "march/icons"

// Stepper'ın bütün özellikleri: steps, current, onSelect, panels (liste ya da fonksiyon), nav, finishLabel, onFinish,
// vertical, morph, highlight, counter (kendi metnin ya da false), labels (back, next, step), doneIcon, renderDot,
// connector, class, m:color
const STEPS = [
  { title: "Hesap", description: "E-posta", icon: user },
  { title: "Doğrula", description: "Kod", icon: mail },
  { title: "Başla", description: "Hazır", icon: flag },
]

export function StepperLab() {
  let $step = 0
  let $vertical = false
  let $morph = true
  let $finished = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $vertical = !$vertical}>{$vertical ? "Yatay yap" : "Dikey yap"}</Button>
      <Button size="sm" on:click={() => $morph = !$morph}>{$morph ? "Morph kapat" : "Morph aç"}</Button>
    </div>
    <Stepper steps={STEPS} current={$step} onSelect={(i: number) => $step = i} vertical={$vertical} morph={$morph}
      panels={(i: number) => <p>{["E-posta adresini yaz.", "Gelen kodu gir.", "Her şey hazır!"][i]}</p>}
      labels={{ back: "Önceki", next: "Devam", step: (i: number, n: number) => `Aşama ${i + 1} / ${n}` }}
      finishLabel="Bitir" onFinish={() => $finished++} counter={(i: number, n: number) => `${i + 1}. adım, toplam ${n}`}
      doneIcon={star} m:color="brand-purple" class="lab-main" />
    <span>{"Bitirme sayısı: " + $finished}</span>
    <Card m:theme="night">
      <Stepper steps={STEPS} current={$step} panels={["bir", "iki", "üç"]} nav={false} highlight={false} counter={false}
        connector={false} renderDot={(i: number, state: string) => (state === "done" ? "✓" : "ABC"[i])} m:color="brand-blue" class="lab-bare" />
    </Card>
  </div>
}
