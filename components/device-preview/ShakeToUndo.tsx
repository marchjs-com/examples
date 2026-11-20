import { onCleanup } from "march"
import { DevicePreview } from "march/ui"

// salla, geri al: kumandadaki "Salla" düğmesi devicemotion olaylarını üretir; uygulama sert bir sarsıntıda son notu siler
export function ShakeToUndo() {
  let $notes = ["Süt al", "HADİ buluşmasına katıl", "Kodu gözden geçir", "Bisikleti tamir et"]
  let last = 0
  const onMotion = (e: DeviceMotionEvent) => {
    const a = Math.abs(e.acceleration?.x ?? 0)
    if (a > 15 && Date.now() - last > 1200 && $notes.length) { last = Date.now(); $notes = $notes.slice(0, -1) }
  }
  window.addEventListener("devicemotion", onMotion)
  onCleanup(() => window.removeEventListener("devicemotion", onMotion))
  return <DevicePreview device="iphone-15" controls time="9:41" fitHeight={500}>
    <div sx={{ flex: "col", gap: 2, p: 4 }}>
      <span sx={{ text: ["2xl", "bold"] }}>Notlar</span>
      {() => $notes.map((n) => <div class="m-card" sx={{ p: 3 }}>{n}</div>)}
      <span sx={{ text: "sm", color: "muted" }}>{() => ($notes.length ? "Sallayınca son not silinir" : "Hepsi silindi")}</span>
    </div>
  </DevicePreview>
}
