import { Sparkline } from "march/charts"
import { Button } from "march/ui"

// A heart rate monitor: a playful, minimal Sparkline.
// The run button pushes the pulse up, the rest button brings it down; the tiny line shows the last 20 readings and the
// number next to it the current one. Once the window is full, every new reading slides the line to the left.
// Use a sparkline when a trend should sit inline next to a number (a KPI, a table cell, a list row) without axes.

export function Heartbeat() {
  // Heart rate readings (bpm). A signal: replacing the array redraws the line.
  let $beats = [72, 74, 71, 73, 75, 72, 70, 74]
  // Adds a reading `d` away from the last one, clamped to 55–180 bpm, and keeps only the last 20 (a moving window).
  // A new array is assigned, so the signal notices the change.
  const add = (d: number) => { const last = $beats[$beats.length - 1]; $beats = [...$beats, Math.max(55, Math.min(180, last + d))].slice(-20) }
  // Sparkline props:
  // - data={() => $beats}: a function reading the signal, so the line follows every new reading.
  // - width / height: 160 × 40 px (default 120 × 32).
  // - area: fills under the line; color={4}: palette slot 4 (0-based) for the line and area.
  // - title: the accessible name, read before the summary (how many values, first and last, min and max).
  // - No `animate` prop: the default spring. An appended point grows out of the last one; when the window moves on
  //   (first reading dropped, one appended) the line slides left, and the last dot glides with it. Use animate={false}
  //   to draw at once, or an easing name like "out"; reduced motion is honoured automatically.
  // Accessibility: the line is an image with a spoken summary and nothing to focus, so the current number is also
  // written as text next to it.
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
    <Button size="sm" on:click={() => add(14)}>🏃 Koş</Button>
    <Button size="sm" variant="secondary" on:click={() => add(-10)}>🧘 Dinlen</Button>
    <Sparkline data={() => $beats} width={160} height={40} area color={4} title="Nabız" />
    {/* The latest reading as text, read reactively through a function child. */}
    <strong>{() => `${$beats[$beats.length - 1]} bpm`}</strong>
  </div>
}
