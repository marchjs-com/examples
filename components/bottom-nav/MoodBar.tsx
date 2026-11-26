// MoodBar: the creative-minimal BottomNav example.
//
// Today's weather in the head: every tab is a mood with its own colour, and the bubble behind the chosen tab takes
// that colour while a line of text changes. It shows the smallest BottomNav (items, value, onChange, label) and that
// an item can carry its own colour and an emoji as its icon. Use the pattern for a tab bar that is also a choice.
import { BottomNav, Card } from "march/ui"

// One row per mood: `id` is the tab id, `label` its name, `icon` an emoji, `color` the tab's colour token (the bubble
// and the icon take it) and `text` the sentence shown for it. `as const` on the colours keeps them type-checked.
const MOODS = [
  { id: "sunny", label: "Neşeli", icon: "😄", color: "brand-gold" as const, text: "Bugün her şey yolunda!" },
  { id: "calm", label: "Sakin", icon: "😌", color: "brand-blue" as const, text: "Bir çay, bir kitap." },
  { id: "busy", label: "Yoğun", icon: "🤯", color: "brand-orange" as const, text: "Kahve takviyesi gerekiyor." },
  { id: "sleepy", label: "Uykulu", icon: "😴", color: "brand-purple" as const, text: "Erken yatma zamanı." },
]

export function MoodBar() {
  // The active mood id (reactive state).
  let $mood = "sunny"
  // The data rows are passed straight in as `items`. value + onChange make the active tab controlled; `label` names
  // the navigation landmark for screen readers. The bubble slide follows reduced motion and the global speed / "Stop
  // all" settings (motion={false} would switch it off). The paragraph is a function child over $mood, so it updates
  // with the tab.
  return <Card>
    <p sx={{ text: ["xl", "center"], p: 3 }}>{MOODS.find((m) => m.id === $mood)?.text}</p>
    <BottomNav items={MOODS} value={$mood} onChange={(id) => $mood = id} label="Ruh hâli" />
  </Card>
}
