import { BeforeAfter } from "march/landing"

// pazartesi sabahı: kahveden önce ve sonra; her sürüklemede kaç kez baktığını sayar
const Face = (p: { emoji: string; text: string; tone: string }) =>
  <div sx={{ flex: ["col", "center"], gap: 2, p: 6 }} style={{ minHeight: "14rem", background: p.tone }}>
    <span style={{ fontSize: "4rem" }}>{p.emoji}</span><strong sx={{ text: "lg" }}>{p.text}</strong>
  </div>

export function MondayMorning() {
  let $peeks = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <BeforeAfter beforeLabel="Kahveden önce" afterLabel="Kahveden sonra" onChange={() => $peeks++}
      before={<Face emoji="😴" text="Beş dakika daha…" tone="#cfd3dc" />}
      after={<Face emoji="🤩" text="Bugün her şeyi yaparım!" tone="#ffd27a" />} />
    <small sx={{ color: "muted" }}>{$peeks} kez kıyasladın</small>
  </div>
}
