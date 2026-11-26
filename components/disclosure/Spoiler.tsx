// Spoiler: the creative-minimal Disclosure example.
//
// What it shows: a spoiler in a film review. The ending is hidden under a Disclosure; every time a reader opens it, the
// counter goes up.
// When to use this pattern: hide a short secondary part (spoilers, answers, details) behind a line that says what is
// inside. Only onToggle is needed to react; the open state is kept by the native <details> itself.
import { Disclosure, Card } from "march/ui"

// $peeks counts how many times the spoiler was opened.
export function Spoiler() {
  let $peeks = 0
  return <Card m:theme="night">
    <p sx={{ text: "sm" }}>Film harika başlıyor, ikinci yarı ise bambaşka bir şeye dönüşüyor.</p>
    {/* title can be any node: here an orange, bold span. onToggle(open) runs on every change; we count only the openings.
            m:theme="night" on the Card draws this subtree in the dark theme. */}
    <Disclosure title={<span sx={{ color: "brand-orange", text: "bold" }}>Sonu göster (sürprizbozan!)</span>} onToggle={(o: boolean) => { if (o) $peeks++ }}>
      <p sx={{ text: "sm" }}>Kahraman baştan beri kendi rüyasındaymış.</p>
    </Disclosure>
    <span sx={{ text: "xs", color: "muted" }}>{$peeks} kez bakıldı</span>
  </Card>
}
