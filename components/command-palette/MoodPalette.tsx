import { CommandPalette, PaletteButton, Card } from "march/ui"
import { sun, moon, coffee, zap, heart } from "march/icons"

// ruh hâli paleti: Ctrl+K yerine düğmeyle açılır; seçilen komut kartın ikonunu ve sözünü değiştirir
const moods = [
  { id: "mood.sun", title: "Neşeli", icon: sun, word: "Bugün her şey güzel" },
  { id: "mood.coffee", title: "Uykulu", icon: coffee, word: "Önce bir kahve" },
  { id: "mood.zap", title: "Enerjik", icon: zap, word: "Hadi başlayalım!" },
  { id: "mood.heart", title: "Sevgi dolu", icon: heart, word: "Herkese selam" },
  { id: "mood.moon", title: "Sakin", icon: moon, word: "Yavaş ve derin" },
]

export function MoodPalette() {
  let $word = "Ruh hâlini seç"
  // her komutun run'ı sözü yazar; palet yalnız bu örneğe ait (shortcut={false}: sayfanın Ctrl+K'sıyla yarışmaz)
  const commands = moods.map((m) => ({ id: m.id, title: m.title, icon: m.icon, group: "Ruh hâli", run: () => $word = m.word }))
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      <span sx={{ text: ["xl", "bold"] }}>{$word}</span>
      <PaletteButton label="Ruh hâli ara…" kbd={false} />
    </div>
    <CommandPalette shortcut={false} commands={commands} placeholder="neşeli, uykulu, sakin…" />
  </Card>
}
