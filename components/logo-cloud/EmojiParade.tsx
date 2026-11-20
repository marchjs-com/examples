import { LogoCloud } from "march/landing"
import { Button } from "march/ui"

// emoji geçit töreni: kayan şeritte meyveler; düğmeler hızı değiştirir
const FRUITS = ["🍎", "🍌", "🍇", "🍉", "🍓", "🥝", "🍍", "🥥"]
const NAMES = ["Elma", "Muz", "Üzüm", "Karpuz", "Çilek", "Kivi", "Ananas", "Hindistan cevizi"]

export function EmojiParade() {
  let $speed = 40
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button variant="secondary" on:click={() => $speed = Math.max(10, $speed - 20)}>Yavaşla</Button>
      <strong>{`${$speed} px/sn`}</strong>
      <Button variant="secondary" on:click={() => $speed = Math.min(160, $speed + 20)}>Hızlan</Button>
    </div>
    {() => {
      const speed = $speed
      return <LogoCloud variant="marquee" mono={false} speed={speed} title="Meyve geçidi"
      logos={FRUITS.map((f, i) => ({ name: NAMES[i]!, node: <span sx={{ text: "2xl" }}>{f}</span> }))} />
    }}
  </div>
}
