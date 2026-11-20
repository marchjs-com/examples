import { OptionList, Card } from "march/ui"

// bugünün modu: iki sütunlu emoji seçenekleri; seçilen mod kartın rengini ve cümlesini değiştirir
const moods = [
  { value: "happy", label: "Neşeli", icon: "😄", hint: "Her şey yolunda" },
  { value: "calm", label: "Sakin", icon: "🌿", hint: "Yavaş bir gün" },
  { value: "busy", label: "Yoğun", icon: "⚡", hint: "Toplantıdan toplantıya" },
  { value: "sleepy", label: "Uykulu", icon: "😴", hint: "Kahve lazım" },
]
const colors: Record<string, string> = { happy: "brand-orange", calm: "brand-green", busy: "brand-blue", sleepy: "brand-purple" }

export function MoodBoard() {
  let $mood = "happy"
  return <Card m:color={colors[$mood]} title="Bugün nasılsın?">
    <OptionList bind:value={$mood} options={moods} columns={2} label="Mod" />
    <p sx={{ text: "sm", color: "muted" }}>{`Seçtiğin mod: ${moods.find((m) => m.value === $mood)?.label}`}</p>
  </Card>
}
