// MondayMorning: the creative-minimal BeforeAfter example.
//
// Monday morning, before and after coffee: drag the divider to compare two moods, and a counter tells how many times
// you looked. It shows the smallest BeforeAfter (two layers, two labels) and that the layers can be any markup, not
// only pictures. Use the pattern for playful comparisons and product "old versus new" teasers.
import { BeforeAfter } from "march/landing"

// One mood: a big emoji and a line of text on a coloured background. Used for both layers.
const Face = (p: { emoji: string; text: string; tone: string }) =>
  <div sx={{ flex: ["col", "center"], gap: 2, p: 6 }} style={{ minHeight: "14rem", background: p.tone }}>
    <span style={{ fontSize: "4rem" }}>{p.emoji}</span><strong sx={{ text: "lg" }}>{p.text}</strong>
  </div>

export function MondayMorning() {
  // How often the divider was moved (reactive state; the counter text redraws).
  let $peeks = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* before / after are the two layers; beforeLabel / afterLabel are the corner chips. onChange runs after every drag
        or key press, which is what the counter uses (no `value` is given, so the component keeps the position itself,
        starting at 50). The handle is a slider, so the arrow keys work too, and the first-view sway is skipped with
        reduced motion. */}
    <BeforeAfter beforeLabel="Kahveden önce" afterLabel="Kahveden sonra" onChange={() => $peeks++}
      before={<Face emoji="😴" text="Beş dakika daha…" tone="#cfd3dc" />}
      after={<Face emoji="🤩" text="Bugün her şeyi yaparım!" tone="#ffd27a" />} />
    <small sx={{ color: "muted" }}>{$peeks} kez kıyasladın</small>
  </div>
}
