// TypingCode: the creative-minimal CodeView example.
//
// What it shows: code that types itself. `code` is a function that returns a growing slice of the source, so the lines
// and the syntax colours appear as the letters are typed.
// When to use this pattern: any code that changes over time (a live preview, a step-by-step tutorial). Give `code` a
// function and the block re-renders when the signal it reads changes.
// Animation: the typing is a plain timer here (setInterval), not the motion engine, so reduced motion, the global
// speed and "Stop all" do not control it. For app code that must respect them, drive the value with `animate` or `onFrame`
// from march/motion instead. The timer is cleared with onCleanup when the example is removed.
import { CodeView, Button } from "march/ui"
import { onCleanup } from "march"
import { rotateCcw } from "march/icons"

const SRC = `export function Merhaba() {
  let $ad = "March"
  return <h1>Merhaba, {$ad}!</h1>
}`

export function TypingCode() {
  // The number of letters typed so far; one more every 45 ms until the whole source is shown.
  let $n = 0
  const timer = setInterval(() => { if ($n < SRC.length) $n++ }, 45)
  onCleanup(() => clearInterval(timer))
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* copy={false} and wrapButton={false} remove the buttons that would be of no use while the code is typing. */}
    <CodeView code={() => SRC.slice(0, $n)} lang="tsx" langLabel="Merhaba.tsx" copy={false} wrapButton={false} label="Kendini yazan kod" />
    <div sx={{ flex: ["row", "between"], gap: 2 }}>
      <span sx={{ text: "sm", color: "muted" }}>{$n} / {SRC.length} harf</span>
      <Button variant="ghost" size="sm" icon={rotateCcw} disabled={$n < SRC.length} on:click={() => $n = 0}>Baştan yaz</Button>
    </div>
  </div>
}
