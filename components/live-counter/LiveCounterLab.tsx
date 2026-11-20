import { LiveCounter } from "march/landing"
import { animate } from "march/motion"
import { Toggle, Button, Card } from "march/ui"

// LiveCounter'ın bütün özellikleri bir arada: canlı değer (value) ya da taklit edilen büyüme (from, rate, pause,
// random), etiket, ön ve son ek, sayı biçimi, kendi rakam animasyonun (effect) ve seçenekleri, canlı nokta ve rengi,
// +N balonu ve rengi, vuruş ve sınıf
const flash = (el: HTMLElement, o?: { duration?: number }) => {
  const p = animate(el, { opacity: [0.2, 1], transform: ["translateY(6px)", "translateY(0)"] }, { duration: o?.duration ?? 400 })
  return { stop: () => p.cancel() }
}

export function LiveCounterLab() {
  let $n = 120
  let $sim = false
  let $dot = true
  let $bubble = true
  let seed = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Toggle label="Taklit büyüme" bind:value={$sim} />
        <Toggle label="Canlı nokta" bind:value={$dot} />
        <Toggle label="Balon" bind:value={$bubble} />
        <Button on:click={() => $n += 5}>+5 kişi</Button>
      </div>
    </Card>
    {() => { const sim = $sim, dot = $dot, bubble = $bubble; return <LiveCounter class="lab-lc"
      value={sim ? undefined : () => $n} from={500} rate={120} pause={[600, 1400]} random={() => ((seed = (seed * 9301 + 49297) % 233280) / 233280)}
      label="kişi sırada" prefix="👥 " suffix=" kişi" format={{ maximumFractionDigits: 0 }}
      effect={flash as never} effectOptions={{ duration: 300 }}
      dot={dot ? <span class="lab-dot">🔴</span> as Node : false} dotColor="danger"
      bubble={bubble ? (d: number) => <b class="lab-bubble">+{d}</b> : false} bubbleColor="brand-purple" beat /> }}
  </div>
}
