import { StatTile, CountRoll } from "march/ui"

// adım sayar: karoya her basış 500 adım ekler, sayı döner; 10.000'e varınca renk yeşile döner
export function StepCounter() {
  let $steps = 8500
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    <StatTile variant="card" size="xl" label="Bugünkü adım" hint={() => $steps >= 10000 ? "Hedef tamam! 🎉" : `Hedefe ${10000 - $steps} adım`}
      value={<CountRoll value={() => $steps} format="full" />} m:color={() => $steps >= 10000 ? "success" : "brand-orange"}
      onClick={() => $steps += 500} />
    <StatTile variant="tile" label="Kalori" value={() => Math.round($steps * 0.04)} hint="kcal" />
  </div>
}
