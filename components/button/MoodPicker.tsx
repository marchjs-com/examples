import { Button } from "march/ui"
import type { IconType } from "march/icons"

// bugünün havası: üç hap düğme, seçili olan basılı durur
// Mood'un icon'u IconType: tırnak içinde editör ikon listesini açar (March'ın adları ve paketler);
// derleyici her adı o tek ikonun import'una çevirir, pakete yalnız kullanılanlar girer
interface Mood {
  id: string
  label: string
  icon: IconType
}

const moods: Mood[] = [
  { id: "sun", label: "Enerjik", icon: "sun" },
  { id: "cloud", label: "Sakin", icon: "lucide:cloud-sun" },
  { id: "moon", label: "Uykulu", icon: "tabler:moon-stars" },
]

export function MoodPicker() {
  let $mood = "sun"
  return <div sx={{ flex: "row", gap: 2 }}>
    {moods.map((m) => <Button shape="pill" icon={m.icon} pressed={$mood === m.id} on:click={() => $mood = m.id}>{m.label}</Button>)}
  </div>
}
