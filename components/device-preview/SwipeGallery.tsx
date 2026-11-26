// SwipeGallery: the real-life DevicePreview example.
//
// What it shows: event cards you swipe with a finger (touchstart / touchend) and enlarge with two fingers (touchmove).
// Drag to swipe; Shift + drag, or the rail's hand and gestures buttons, make two fingers for the pinch.
// When to use this pattern: touch interactions written with real TouchEvents: the preview turns the mouse into fingers
// and sends the same events a phone would, so you can build and test gestures on a desktop.
import { DevicePreview } from "march/ui"

// The cards to flip through.
const EVENTS = ["Kadıköy konseri", "Belgrad piknik", "Gece hackathonu", "Sahil koşusu"]

// $i is the card shown, $zoom its scale; startX / startD remember where the gesture began (x, and finger distance).
export function SwipeGallery() {
  let $i = 0
  let $zoom = 1
  let startX = 0
  let startD = 0
  // Distance between the first two fingers.
  const dist = (t: TouchList) => Math.hypot(t[0]!.clientX - t[1]!.clientX, t[0]!.clientY - t[1]!.clientY)
  // touchstart: remember the start x; with two fingers also the start distance (a pinch).
  const start = (e: TouchEvent) => {
    startX = e.touches[0]!.clientX
    startD = e.touches.length === 2 ? dist(e.touches) : 0
  }
  // touchmove: with two fingers, scale by how far the distance changed (clamped to 0.6 to 2.5).
  const move = (e: TouchEvent) => {
    e.preventDefault()   // the cards move, the page does not scroll
    if (e.touches.length === 2 && startD) $zoom = Math.max(0.6, Math.min(2.5, dist(e.touches) / startD))
  }
  // touchend: when the last finger lifts, a one-finger drag of more than 40 px changes the card (left: next, right:
  // previous, wrapping around).
  const end = (e: TouchEvent) => {
    if (e.touches.length) return
    const dx = e.changedTouches[0]!.clientX - startX
    if (!startD && Math.abs(dx) > 40) $i = ($i + (dx < 0 ? 1 : EVENTS.length - 1)) % EVENTS.length
    startD = 0
  }
  // controls adds the rail (fingers, gestures and more); fitHeight is the most height in px.
  return <DevicePreview device="pixel-8" controls fitHeight={500}>
    {/* on:touchstart / on:touchmove / on:touchend receive TouchEvents, as on a phone. */}
    <div sx={{ flex: "col", gap: 3, p: 4 }} on:touchstart={start} on:touchmove={move} on:touchend={end}>
      <span sx={{ text: ["xl", "bold"] }}>Bu hafta</span>
      <div class="m-card" sx={{ p: 6, text: ["2xl", "bold"] }} style={() => ({ scale: String($zoom) })}>{() => EVENTS[$i]}</div>
      <span sx={{ text: "sm", color: "muted" }}>{() => `${$i + 1} / ${EVENTS.length} · yakınlık ${$zoom.toFixed(1)}x`}</span>
    </div>
  </DevicePreview>
}
