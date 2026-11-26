// ShakeToUndo: the creative-minimal DevicePreview example.
//
// What it shows: shake to undo. The rail's Shake button fires devicemotion events; the notes app listens for them and
// deletes the last note on a hard shake, as a phone app would.
// When to use this pattern: testing web code that reads device sensors (motion, orientation, battery, online / offline)
// without a real phone: the preview delivers the same events a device would.
// Animation: the shake of the device body runs on the motion engine, so global speed and reduced motion apply.
import { onCleanup } from "march"
import { DevicePreview } from "march/ui"

// The notes live in a signal; replacing the array (slice) is what updates the list.
export function ShakeToUndo() {
  let $notes = ["Süt al", "HADİ buluşmasına katıl", "Kodu gözden geçir", "Bisikleti tamir et"]
  let last = 0
  // A hard shake means a large acceleration; the 1200 ms check ignores the rest of the same shake, so one shake removes
  // one note.
  const onMotion = (e: DeviceMotionEvent) => {
    const a = Math.abs(e.acceleration?.x ?? 0)
    if (a > 15 && Date.now() - last > 1200 && $notes.length) { last = Date.now(); $notes = $notes.slice(0, -1) }
  }
  // The code listens on `window`, as a page on a real phone would; onCleanup removes the listener when the component goes away.
  window.addEventListener("devicemotion", onMotion)
  onCleanup(() => window.removeEventListener("devicemotion", onMotion))
  // controls adds the rail (it has the Shake button); time sets the clock text of the status bar; fitHeight is the most
  // height in px the fitted device may take.
  return <DevicePreview device="iphone-15" controls time="9:41" fitHeight={500}>
    <div sx={{ flex: "col", gap: 2, p: 4 }}>
      <span sx={{ text: ["2xl", "bold"] }}>Notlar</span>
      {() => $notes.map((n) => <div class="m-card" sx={{ p: 3 }}>{n}</div>)}
      <span sx={{ text: "sm", color: "muted" }}>{() => ($notes.length ? "Sallayınca son not silinir" : "Hepsi silindi")}</span>
    </div>
  </DevicePreview>
}
