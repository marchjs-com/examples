import { Timeline, Button } from "march/ui"
import { zap, check } from "march/icons"

// bir roket fırlatma geri sayımı: "Sonraki adım" her basışta bir aşama ekler; son aşamada düğme kapanır
const STEPS = [
  { title: "Yakıt dolduruldu", tone: "info" },
  { title: "Motorlar ısındı", tone: "warn" },
  { title: "Kalkış!", tone: "danger" },
  { title: "Yörüngede", tone: "success" },
] as const

export function RocketLaunch() {
  let $n = 1
  const items = () => STEPS.slice(0, $n).map((s, i) => ({ time: `T+${i * 30} sn`, title: s.title, tone: s.tone, icon: i === STEPS.length - 1 ? check : zap }))
  return <div sx={{ flex: "col", gap: 2 }}>
    <Timeline items={items} />
    <Button disabled={() => $n >= STEPS.length} on:click={() => $n++}>Sonraki adım</Button>
  </div>
}
