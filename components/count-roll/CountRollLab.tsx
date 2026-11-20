import { CountRoll, Button } from "march/ui"

// CountRoll'un özellikleri: value, format (compact / full / kendi Intl ayarın), hideZero, duration, formatter, spoken,
// roll, stagger, class
export function CountRollLab() {
  let $n = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <CountRoll class="lab-zero" value={$n} hideZero />
    <CountRoll class="lab-own" value={$n} formatter={(n: number) => `${n} beğeni`} spoken={(n: number) => `${n} kişi beğendi`} roll={false} />
    <CountRoll class="lab-slow" value={1234567} format="compact" duration={900} stagger={60} />
    <Button size="sm" on:click={() => $n += 5}>+5</Button>
  </div>
}
