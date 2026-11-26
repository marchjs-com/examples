// MenuMotionTuner: the real-life EasingCurveEditor example.
//
// What it shows: a designer tuning the opening curve of a menu. The team's three presets, a scale preview, a choice of
// duration, and the resulting CSS line, which a button announces (a demo: nothing is put on the clipboard).
// When to use this pattern: tools where people choose a motion for a design system, and need the curve as CSS.
// Animation: the preview runs on the motion engine's clock, so the global speed, "Stop all" and reduced motion apply to it.
// Keyboard: each handle is a slider; arrows move it by 0.01 (Shift: 0.1).
import { EasingCurveEditor, Button, Card, toast } from "march/ui"

// The team's own presets, replacing the engine's list: { name, label, value: [x1, y1, x2, y2] }.
const teamCurves = [
  { name: "yumusak", label: "Yumuşak", value: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  { name: "yayli", label: "Yaylı", value: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  { name: "keskin", label: "Keskin", value: [0.7, 0, 0.3, 1] as [number, number, number, number] },
]

// $curve is the cubic-bezier() text, $ms the duration; line() writes them as a CSS line.
export function MenuMotionTuner() {
  let $curve = "cubic-bezier(.25, .1, .25, 1)"
  let $ms = 240
  const line = () => `transition: transform ${$ms}ms ${$curve};`
  return <Card title="Menü açılış hareketi" subtitle="Tasarım sistemi › Hareket">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* bind:value ties the editor to $curve. presets: the team's list. preview="scale" shows the curve as a size change;
                duration follows $ms, so the preview runs at the chosen speed. name registers the curve in the motion engine as
                "menu-ac"; nameNote={false} hides the note that says so. */}
      <EasingCurveEditor bind:value={$curve} presets={teamCurves} preview="scale" duration={$ms} name="menu-ac" nameNote={false} />
      {/* The chosen duration is shown as the primary button; the last button announces the CSS line in a toast. */}
      <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
        {[160, 240, 320].map((ms) => <Button size="sm" variant={$ms === ms ? "primary" : "secondary"} on:click={() => $ms = ms}>{`${ms} ms`}</Button>)}
        <Button size="sm" variant="ghost" on:click={() => toast(`Kopyalandı: ${line()}`)}>CSS satırını kopyala</Button>
      </div>
      <code sx={{ text: "xs" }}>{line}</code>
    </div>
  </Card>
}
