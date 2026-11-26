// CpuHistory: the real-life LedMatrix example.
//
// A server rack's front panel: the last 32 seconds of CPU load as columns of LEDs, green when calm, amber when busy, red
// when hot. You draw the picture yourself with ledFrame / setLed (one byte of brightness per LED and an optional color)
// and hand it to LedMatrix; it only repaints the columns that changed.
import { LedMatrix, ledFrame, setLed, ledColor } from "march/led"
import { Card } from "march/ui"
import { onFrame } from "march/motion"

const W = 32, H = 10
const GREEN = ledColor("#3ddc84"), AMBER = ledColor("#ffb020"), RED = ledColor("#ff3b45")

export function CpuHistory() {
  // the readings (0–1), newest last; a fake load that wanders, one reading per second
  let $loads: number[] = Array.from({ length: W }, () => 0.2)
  let next = 0
  onFrame((t) => {
    if (t < next) return
    next = t + 1000
    const last = $loads[$loads.length - 1]!
    $loads = [...$loads.slice(1), Math.min(1, Math.max(0.05, last + (Math.random() - 0.45) * 0.3))]
  })
  // Draw the frame from the readings: each column as tall as its load, colored by level; the top LED of a column is
  // full brightness, the ones below a little dimmer (lit 0–255), which reads as a soft gradient.
  const frame = () => {
    const f = ledFrame(W, H)
    $loads.forEach((v, x) => {
      const h = Math.round(v * H), color = v > 0.8 ? RED : v > 0.55 ? AMBER : GREEN
      for (let j = 0; j < h; j++) setLed(f, x, H - 1 - j, j === h - 1 ? 255 : 170, color)
    })
    return f
  }
  // shape="square" and a small gap: a dense bar display. The label says what the picture means in words.
  return <Card title="Sunucu 3 · İşlemci">
    <LedMatrix frame={frame} shape="square" gap={0.12} roundness={0.2} ghost={0.06} label={() => `İşlemci yükü %${Math.round($loads[$loads.length - 1]! * 100)}`} />
  </Card>
}
