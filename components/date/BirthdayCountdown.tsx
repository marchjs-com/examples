import { DatePicker, Field, todayIso } from "march/ui"

// doğum günü sayacı: tarihi yaz ya da takvimden seç; yaşın ve bir sonraki doğum gününe kalan gün çıkar
type Day = string | null
function countdown(iso: Day): string {
  if (!iso) return "Doğum tarihini seç"
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number]
  const today = new Date(`${todayIso()}T00:00:00`)
  let next = new Date(today.getFullYear(), m - 1, d), age = today.getFullYear() - y
  if (next < today) next = new Date(today.getFullYear() + 1, m - 1, d)
  else if (next > today) age--
  const days = Math.round((next.getTime() - today.getTime()) / 864e5)
  return days === 0 ? `İyi ki doğdun! Bugün ${age} yaşındasın 🎂` : `${age} yaşındasın · doğum gününe ${days} gün var`
}

export function BirthdayCountdown() {
  let $born: Day = "1998-05-19"
  return <div sx={{ flex: "col", gap: 2 }}>
    <Field label="Doğum tarihin"><DatePicker bind:value={$born} max={todayIso()} /></Field>
    <span sx={{ text: ["lg", "bold"], color: "brand-purple" }}>{countdown($born)}</span>
  </div>
}
