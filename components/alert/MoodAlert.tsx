// MoodAlert: the creative-minimal Alert example.
//
// One alert whose tone, icon, title and message change together each time you press the button, like a tiny weather
// report. It shows that an Alert is just a function of data: the tone chooses colour and ARIA role, so changing it is
// enough to change how the message looks and how assistive technology announces it. Use the pattern for status
// messages that change over time.
import { Alert, Button } from "march/ui"
import { sun, cloud, zap } from "march/icons"

// The data: one row per mood. `as const` keeps the tone names exact so they type-check against Alert's `tone` prop.
const MOODS = [
  { tone: "success", icon: sun, title: "Güneşli", text: "Bugün yürüyüş için harika bir gün." },
  { tone: "info", icon: cloud, title: "Bulutlu", text: "Hafif bir hırka yanınızda olsun." },
  { tone: "warn", icon: zap, title: "Fırtına", text: "Akşamüstü gök gürültülü sağanak bekleniyor." },
] as const

export function MoodAlert() {
  // $i counts the presses; mood() picks the row with a modulo, so the list loops forever.
  let $i = 0
  const mood = () => MOODS[$i % MOODS.length]!
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The function child re-renders the Alert when $i changes. `icon` replaces the tone's default icon and `action`
        puts the button inside the alert. The "warn" mood is announced as role="alert" (immediately), the others
        politely as a status. */}
    {() => <Alert tone={mood().tone} icon={mood().icon} title={mood().title}
      action={<Button size="sm" on:click={() => $i++}>Yarın?</Button>}>{mood().text}</Alert>}
  </div>
}
