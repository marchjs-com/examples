// MoonPhases: the creative-minimal PeriodNav example.
//
// The phases of the moon: the arrows go one phase forward or back (and wrap around), the phase itself sits in the middle,
// and a "tonight" button returns to tonight's phase. Use this pattern to step through any short cycle (phases, seasons,
// weekdays) with a "back to now" button.
import { PeriodNav, Card } from "march/ui"

const phases = ["🌑 Yeni ay", "🌒 Hilal", "🌓 İlk dördün", "🌔 Şişkin ay", "🌕 Dolunay", "🌖 Azalan ay", "🌗 Son dördün", "🌘 Son hilal"]
const tonight = 4

export function MoonPhases() {
  // The index of the shown phase. `step` moves by one in either direction and wraps around at both ends.
  let $phase = tonight
  const step = (d: number) => $phase = ($phase + d + phases.length) % phases.length
  // m:theme="night" on the Card makes the card and everything inside use the dark theme tokens.
  return <Card m:theme="night">
    <div sx={{ flex: ["col", "center"], gap: 3 }}>
      {/* title as a function: read live, so the phase between the arrows follows $phase. onPrev / onNext move the
          phase; onToday + today show a button with our own text that returns to tonight. m:color (the common colour
          token prop) colours the group. labels.group names the group, labels.previous / next name the icon arrows for
          screen readers. */}
      <PeriodNav title={() => phases[$phase]} onPrev={() => step(-1)} onNext={() => step(1)} onToday={() => $phase = tonight}
        today="Bu gece" m:color="brand-purple" labels={{ group: "Ay evresi", previous: "Önceki evre", next: "Sonraki evre" }} />
      <span sx={{ text: "sm", color: "muted" }}>{$phase === tonight ? "Bu gece gökyüzünde" : `Bu geceden ${($phase - tonight + phases.length) % phases.length} evre sonra`}</span>
    </div>
  </Card>
}
