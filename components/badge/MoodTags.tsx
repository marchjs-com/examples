import { Badge } from "march/ui"

// ruh hâli etiketleri: rozetlere basınca seçilir (basılı görünür); seçilenler alttaki cümlede toplanır
const MOODS = [
  { text: "Neşeli", tone: "success" }, { text: "Meraklı", tone: "info" },
  { text: "Uykulu", tone: "neutral" }, { text: "Heyecanlı", tone: "warn" }, { text: "Aceleci", tone: "danger" },
] as const

export function MoodTags() {
  let $picked: string[] = ["Meraklı"]
  const flip = (m: string) => $picked = $picked.includes(m) ? $picked.filter((x) => x !== m) : [...$picked, m]
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {MOODS.map((m) => <Badge tone={m.tone} pressed={() => $picked.includes(m.text)} onClick={() => flip(m.text)}>{m.text}</Badge>)}
    </div>
    <span sx={{ color: "muted" }}>{() => $picked.length ? `Bugün: ${$picked.join(", ")}` : "Bir ruh hâli seçin"}</span>
  </div>
}
