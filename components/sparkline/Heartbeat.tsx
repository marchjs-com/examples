import { Sparkline } from "march/charts"
import { Button } from "march/ui"

// kalp atışı: "Koş" nabzı yükseltir, "Dinlen" düşürür; çizgi son 20 ölçümü gösterir
export function Heartbeat() {
  let $beats = [72, 74, 71, 73, 75, 72, 70, 74]
  const add = (d: number) => { const last = $beats[$beats.length - 1]; $beats = [...$beats, Math.max(55, Math.min(180, last + d))].slice(-20) }
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
    <Button size="sm" on:click={() => add(14)}>🏃 Koş</Button>
    <Button size="sm" variant="secondary" on:click={() => add(-10)}>🧘 Dinlen</Button>
    <Sparkline data={() => $beats} width={160} height={40} area color={4} title="Nabız" />
    <strong>{() => `${$beats[$beats.length - 1]} bpm`}</strong>
  </div>
}
