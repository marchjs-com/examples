import { KeyframeTimeline, Toggle, type TimelineModel } from "march/ui"

// KeyframeTimeline'ın bütün özellikleri: değer (bind:value) ve onChange, kendi sahne hedefin, yaslanma, kendiliğinden
// oynatma, döngü, sahne, oynatma çubuğu ve hızları, denetçi ve ipucu, eğriler, kendi metinlerin (işlevler dahil),
// sınıf, salt okunur, devre dışı ve erişilebilir ad
const SCENE: TimelineModel = { duration: 1200, tracks: [
  { id: "x", target: "Roket", prop: "x", color: "brand-orange", keys: [{ at: 0, value: -100 }, { at: 1200, value: 100, easing: "in-out" }] },
  { id: "r", target: "Roket", prop: "rotate", keys: [{ at: 0, value: -10 }, { at: 600, value: 10 }, { at: 1200, value: -10 }] },
] }
const LABELS = {
  timeline: "Roket çizelgesi", playback: "Oynatma", play: "Oynat", pause: "Duraklat", start: "Başa sar", loop: "Döngü", speed: "Hız",
  playhead: "Oynatma imleci", hint: "Bir kare seç", time: "Zaman", value: "Değer", remove: "Kareyi sil", easing: "Eğri",
  keyframe: (n: number, target: string, prop: string) => `${target} ${prop} ${n}. kare`,
  lane: (target: string, prop: string) => `${target} · ${prop} izi`,
}

export function KeyframeTimelineLab() {
  let $scene = SCENE
  let $changes = 0
  let $locked = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      <Toggle label="Kilitle" bind:value={$locked} />
      <span sx={{ text: "sm" }}>değişiklik: {$changes} · ilk x karesi: {$scene.tracks[0]!.keys[0]!.at} ms</span>
    </div>
    <KeyframeTimeline
      bind:value={$scene}
      onChange={() => $changes++}
      renderTarget={(name) => <span sx={{ text: "xl" }} aria-label={name}>🚀</span> as Element}
      snap={100}
      autoplay={false}
      loop
      stage
      transport={["play", "start", "loop", "time", "speed"]}
      speeds={[0.5, 1, 3]}
      inspector
      hint
      curves
      labels={LABELS}
      class="lab-kt"
      readonly={$locked}
      disabled={false}
      aria-label="Roket zaman çizelgesi"
    />
  </div>
}
