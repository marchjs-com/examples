import { KeyframeTimeline, CopyButton, timelineCode, type TimelineModel, CodeView } from "march/ui"

// bildirim girişi tasarımı: bildirim yukarıdan düşer ve belirir; kareleri sürükle, altta oluşan motor kodunu kopyala
const ENTRANCE: TimelineModel = { duration: 900, tracks: [
  { id: "y", target: "Bildirim", prop: "y", keys: [{ at: 0, value: -40 }, { at: 450, value: 0, easing: "back" }] },
  { id: "o", target: "Bildirim", prop: "opacity", keys: [{ at: 0, value: 0 }, { at: 300, value: 1, easing: "out" }] },
] }

export function ToastEntrance() {
  let $anim = ENTRANCE
  const $code = timelineCode($anim)
  return <div sx={{ flex: "col", gap: 2 }}>
    <KeyframeTimeline bind:value={$anim} snap={25} loop={false} transport={["play", "start", "time"]} aria-label="Bildirim girişi" />
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <CodeView code={() => $code} lang="ts" toolbar={false} />
      <CopyButton text={() => $code} />
    </div>
  </div>
}
