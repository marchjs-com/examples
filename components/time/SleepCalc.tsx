import { TimeInput, Field, Card } from "march/ui"

// uyku hesabı: yatış ve kalkış saatini saat kadranından seç (önce saat, sonra dakika); kaç saat uyuyacağın ve yetip
// yetmediği anında görünür
const minutes = (t: string) => { const [h, m] = t.split(":").map(Number); return (h || 0) * 60 + (m || 0) }

export function SleepCalc() {
  let $bed = "23:30"
  let $wake = "07:00"
  const $sleep = (minutes($wake) - minutes($bed) + 1440) % 1440
  const $enough = $sleep >= 7 * 60
  return <Card m:theme="night">
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Field label="Yatış"><TimeInput bind:value={$bed} picker="clock" step={300} /></Field>
      <Field label="Kalkış"><TimeInput bind:value={$wake} picker="clock" step={300} /></Field>
    </div>
    <p sx={{ text: "lg", color: $enough ? "brand-green" : "brand-orange" }}>
      {Math.floor($sleep / 60)} sa {$sleep % 60} dk uyku · {$enough ? "dinç uyanırsın" : "biraz erken yat"}
    </p>
  </Card>
}
