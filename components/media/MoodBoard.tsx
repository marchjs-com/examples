import { Media, Card, Segmented } from "march/ui"

// ruh hâli panosu: aynı yuvada resim ya da video; tür uzantıdan anlaşılır (kind="auto")
const moods = [
  { value: "calm", label: "Sakin", src: "/media/dusk.jpg" },
  { value: "flow", label: "Akış", src: "/media/hadi-waves.webm" },
  { value: "lost", label: "Kayıp", src: "/media/yok.jpg" },
]

export function MoodBoard() {
  let $mood = "calm"
  const now = () => moods.find((m) => m.value === $mood) ?? moods[0]!
  return <Card title="Bugünün havası">
    <div sx={{ flex: "col", gap: 3 }}>
      <Segmented aria-label="Hava" options={moods.map((m) => ({ value: m.value, label: m.label }))} bind:value={$mood} />
      <Media src={() => now().src} kind="auto" alt={() => now().label} poster="/media/hadi-waves.jpg" muted loop fallback="Bu hava kaybolmuş, başka birini seçin" />
    </div>
  </Card>
}
