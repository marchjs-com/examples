// LedEyesLab: every LedEyes prop in one place.
//
// A grid of faces, one per expression, and one face driven by buttons that uses every prop: expression, look (an
// exact gaze), mouth, alive, follow, blinkEvery, size, the LED look, label and motion.
import { LedEyes } from "march/led"
import { Button, Card } from "march/ui"

const EXPRESSIONS = ["open", "look-left", "look-right", "look-up", "look-down", "surprised", "sleepy", "happy", "angry", "sad", "love", "closed"] as const

export function LedEyesLab() {
  let $i = 0
  let $x = 0
  return <div sx={{ flex: "col", gap: 4 }}>
    <Card title="Tüm özellikler">
      <div sx={{ flex: "col", gap: 3 }}>
        {/* look={{ x, y }} sets the gaze exactly (−1…1) and wins over the expression's own gaze; blinkEvery sets how
            often an alive face blinks ([min, max] ms); motion={false} would show every change at once. */}
        <LedEyes class="lab-main" expression={() => EXPRESSIONS[$i]} look={() => ($x ? { x: $x, y: 0 } : undefined)} mouth="grin"
          alive blinkEvery={[1500, 3000]} follow={false} cols={32} rows={16} motion
          shape="round" gap={0.18} roundness={0.3} bloom={6} ghost={0.1} scanlines={false} color="rgb" panel="dark" />
        <div sx={{ flex: "row", gap: 2 }}>
          <Button size="sm" on:click={() => { $i = ($i + 1) % EXPRESSIONS.length; $x = 0 }}>{() => `İfade: ${EXPRESSIONS[$i]}`}</Button>
          <Button size="sm" variant="secondary" on:click={() => { $x = $x >= 1 ? -1 : Math.round(($x + 0.5) * 10) / 10 }}>{() => `Bakış x: ${$x}`}</Button>
        </div>
      </div>
    </Card>
    <Card title="Her ifade">
      <div class="lab-grid" sx={{ flex: "row", gap: 2 }}>
        {/* alive={false} keeps each face still on its expression; square pixels and the green one-color look. */}
        {EXPRESSIONS.map((e) => <LedEyes expression={e} alive={false} cols={20} rows={9} pitch={6} shape="square" color="green" />)}
      </div>
    </Card>
  </div>
}
