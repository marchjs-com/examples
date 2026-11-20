import { Select, Card } from "march/ui"

// değerler türünü korur: her şık bir nesne; seçilen nesnenin emojisi, rengi ve sözü kartı süsler
type Mood = { emoji: string; color: "brand-orange" | "brand-blue" | "brand-green" | "brand-purple"; word: string }
const moods: { value: Mood; label: string }[] = [
  { value: { emoji: "🌞", color: "brand-orange", word: "enerjik" }, label: "🌞 Enerjik" },
  { value: { emoji: "🌊", color: "brand-blue", word: "sakin" }, label: "🌊 Sakin" },
  { value: { emoji: "🌿", color: "brand-green", word: "huzurlu" }, label: "🌿 Huzurlu" },
  { value: { emoji: "🔮", color: "brand-purple", word: "meraklı" }, label: "🔮 Meraklı" },
]

export function MoodSelect() {
  let $mood = moods[0]!.value
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      <Select bind:value={$mood} options={moods} placeholder={false} aria-label="Bugünkü ruh halin" />
      <span sx={{ text: ["2xl", "bold"], color: $mood.color }}>{$mood.emoji} Bugün {$mood.word} hissediyorsun</span>
    </div>
  </Card>
}
