import { Menu, Card } from "march/ui"
import { smile } from "march/icons"

// ruh hâli seçici: gülen yüz düğmesi bir menü açar; tek seçimlik (radyo) öğeler, seçilen büyük harflerle sahneye çıkar
const moods = [
  { emoji: "😍", name: "Bayıldım" },
  { emoji: "😎", name: "Havalı" },
  { emoji: "🤔", name: "Düşünceli" },
  { emoji: "😴", name: "Uykulu" },
]

const start = moods[1]!

export function MoodMenu() {
  let $mood = start
  return <Card m:theme="night">
    <div sx={{ flex: ["row", "center", "between"], gap: 3 }}>
      <span sx={{ text: "2xl" }}>{`${$mood.emoji} ${$mood.name}`}</span>
      <Menu label="Ruh hâlini seç" icon={smile} m:color="brand-gold" placement="bottom-end"
        items={moods.map((m) => ({ label: `${m.emoji}  ${m.name}`, radio: true, checked: () => $mood === m, onSelect: () => $mood = m }))} />
    </div>
  </Card>
}
