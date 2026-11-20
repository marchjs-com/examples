import { BottomNav, Card } from "march/ui"

// bugünün havası: her sekme bir ruh hâli, kendi rengiyle; seçilen sekmenin baloncuğu o renge boyanır
const MOODS = [
  { id: "sunny", label: "Neşeli", icon: "😄", color: "brand-gold" as const, text: "Bugün her şey yolunda!" },
  { id: "calm", label: "Sakin", icon: "😌", color: "brand-blue" as const, text: "Bir çay, bir kitap." },
  { id: "busy", label: "Yoğun", icon: "🤯", color: "brand-orange" as const, text: "Kahve takviyesi gerekiyor." },
  { id: "sleepy", label: "Uykulu", icon: "😴", color: "brand-purple" as const, text: "Erken yatma zamanı." },
]

export function MoodBar() {
  let $mood = "sunny"
  return <Card>
    <p sx={{ text: ["xl", "center"], p: 3 }}>{MOODS.find((m) => m.id === $mood)?.text}</p>
    <BottomNav items={MOODS} value={$mood} onChange={(id) => $mood = id} label="Ruh hâli" />
  </Card>
}
