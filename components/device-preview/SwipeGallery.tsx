import { DevicePreview } from "march/ui"

// gerçek hayattan: etkinlik kartları parmakla kaydırılır (touchstart / touchend), iki parmakla büyür (touchmove).
// Sürükle: kaydır · Shift + sürükle ya da kumanda › Hareketler › Aç: iki parmakla yakınlaş
const EVENTS = ["Kadıköy konseri", "Belgrad piknik", "Gece hackathonu", "Sahil koşusu"]

export function SwipeGallery() {
  let $i = 0
  let $zoom = 1
  let startX = 0
  let startD = 0
  const dist = (t: TouchList) => Math.hypot(t[0]!.clientX - t[1]!.clientX, t[0]!.clientY - t[1]!.clientY)
  const start = (e: TouchEvent) => {
    startX = e.touches[0]!.clientX
    startD = e.touches.length === 2 ? dist(e.touches) : 0
  }
  const move = (e: TouchEvent) => {
    e.preventDefault()   // the cards move, the page does not scroll
    if (e.touches.length === 2 && startD) $zoom = Math.max(0.6, Math.min(2.5, dist(e.touches) / startD))
  }
  const end = (e: TouchEvent) => {
    if (e.touches.length) return
    const dx = e.changedTouches[0]!.clientX - startX
    if (!startD && Math.abs(dx) > 40) $i = ($i + (dx < 0 ? 1 : EVENTS.length - 1)) % EVENTS.length
    startD = 0
  }
  return <DevicePreview device="pixel-8" controls fitHeight={500}>
    <div sx={{ flex: "col", gap: 3, p: 4 }} on:touchstart={start} on:touchmove={move} on:touchend={end}>
      <span sx={{ text: ["xl", "bold"] }}>Bu hafta</span>
      <div class="m-card" sx={{ p: 6, text: ["2xl", "bold"] }} style={() => ({ scale: String($zoom) })}>{() => EVENTS[$i]}</div>
      <span sx={{ text: "sm", color: "muted" }}>{() => `${$i + 1} / ${EVENTS.length} · yakınlık ${$zoom.toFixed(1)}x`}</span>
    </div>
  </DevicePreview>
}
