import { Alert, Button } from "march/ui"
import { sun, cloud, zap } from "march/icons"

// havanın ruh hâli: düğmeye her basışta uyarının tonu, ikonu ve mesajı birlikte değişir
const MOODS = [
  { tone: "success", icon: sun, title: "Güneşli", text: "Bugün yürüyüş için harika bir gün." },
  { tone: "info", icon: cloud, title: "Bulutlu", text: "Hafif bir hırka yanınızda olsun." },
  { tone: "warn", icon: zap, title: "Fırtına", text: "Akşamüstü gök gürültülü sağanak bekleniyor." },
] as const

export function MoodAlert() {
  let $i = 0
  const mood = () => MOODS[$i % MOODS.length]!
  return <div sx={{ flex: "col", gap: 2 }}>
    {() => <Alert tone={mood().tone} icon={mood().icon} title={mood().title}
      action={<Button size="sm" on:click={() => $i++}>Yarın?</Button>}>{mood().text}</Alert>}
  </div>
}
