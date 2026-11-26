// MoodTags: the creative-minimal Badge example.
//
// Mood tags: press a badge to pick it (it looks pressed) and the picked moods are gathered in the sentence below. It
// shows badges used as toggle buttons: onClick makes a badge a real <button>, and `pressed` adds aria-pressed. Use the
// pattern for tag pickers and filter chips.
import { Badge } from "march/ui"

// One row per mood: the text and the tone (colour family) of its badge.
const MOODS = [
  { text: "Neşeli", tone: "success" }, { text: "Meraklı", tone: "info" },
  { text: "Uykulu", tone: "neutral" }, { text: "Heyecanlı", tone: "warn" }, { text: "Aceleci", tone: "danger" },
] as const

export function MoodTags() {
  // The picked mood names (one starts picked), and a function that adds or removes one by building a new list.
  let $picked: string[] = ["Meraklı"]
  const flip = (m: string) => $picked = $picked.includes(m) ? $picked.filter((x) => x !== m) : [...$picked, m]
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* pressed as a function stays live and sets aria-pressed, so screen readers hear "pressed / not pressed";
          Tab reaches each badge and Enter or Space toggles it, because it is a real button. */}
      {MOODS.map((m) => <Badge tone={m.tone} pressed={() => $picked.includes(m.text)} onClick={() => flip(m.text)}>{m.text}</Badge>)}
    </div>
    <span sx={{ color: "muted" }}>{() => $picked.length ? `Bugün: ${$picked.join(", ")}` : "Bir ruh hâli seçin"}</span>
  </div>
}
