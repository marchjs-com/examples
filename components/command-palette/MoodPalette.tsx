// MoodPalette: the creative-minimal CommandPalette example.
//
// What it shows: a mood picker. A button opens a small palette of moods; choosing one changes the sentence on the card.
// When to use this pattern: a palette that belongs to one widget, not to the whole app: it has its own `commands`, its
// own button, and its keyboard shortcut is switched off (shortcut={false}) so it does not compete with the page's
// global Ctrl+K palette.
// Keyboard: inside the open palette, typing filters, arrow keys move, Enter runs the command and Esc closes it.
import { CommandPalette, PaletteButton, Card } from "march/ui"
import { sun, moon, coffee, zap, heart } from "march/icons"

const moods = [
  { id: "mood.sun", title: "Neşeli", icon: sun, word: "Bugün her şey güzel" },
  { id: "mood.coffee", title: "Uykulu", icon: coffee, word: "Önce bir kahve" },
  { id: "mood.zap", title: "Enerjik", icon: zap, word: "Hadi başlayalım!" },
  { id: "mood.heart", title: "Sevgi dolu", icon: heart, word: "Herkese selam" },
  { id: "mood.moon", title: "Sakin", icon: moon, word: "Yavaş ve derin" },
]

export function MoodPalette() {
  let $word = "Ruh hâlini seç"
  // Each command's run writes its sentence; the palette belongs to this example only (shortcut={false}: it does not
  // compete with the page's Ctrl+K).
  const commands = moods.map((m) => ({ id: m.id, title: m.title, icon: m.icon, group: "Ruh hâli", run: () => $word = m.word }))
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      <span sx={{ text: ["xl", "bold"] }}>{$word}</span>
      {/* PaletteButton opens the palette; kbd={false} hides the shortcut hint on the button, as there is no shortcut. */}
      <PaletteButton label="Ruh hâli ara…" kbd={false} />
    </div>
    <CommandPalette shortcut={false} commands={commands} placeholder="neşeli, uykulu, sakin…" />
  </Card>
}
