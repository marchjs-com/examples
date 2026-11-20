import { PeriodNav, Card } from "march/ui"

// ayın evreleri: oklar bir evre ilerler ya da geri gider, ortada evrenin kendisi (title bir işlev: canlı okunur);
// "Bu gece" bugünkü evreye döner
const phases = ["🌑 Yeni ay", "🌒 Hilal", "🌓 İlk dördün", "🌔 Şişkin ay", "🌕 Dolunay", "🌖 Azalan ay", "🌗 Son dördün", "🌘 Son hilal"]
const tonight = 4

export function MoonPhases() {
  let $phase = tonight
  const step = (d: number) => $phase = ($phase + d + phases.length) % phases.length
  return <Card m:theme="night">
    <div sx={{ flex: ["col", "center"], gap: 3 }}>
      <PeriodNav title={() => phases[$phase]} onPrev={() => step(-1)} onNext={() => step(1)} onToday={() => $phase = tonight}
        today="Bu gece" m:color="brand-purple" labels={{ group: "Ay evresi", previous: "Önceki evre", next: "Sonraki evre" }} />
      <span sx={{ text: "sm", color: "muted" }}>{$phase === tonight ? "Bu gece gökyüzünde" : `Bu geceden ${($phase - tonight + phases.length) % phases.length} evre sonra`}</span>
    </div>
  </Card>
}
