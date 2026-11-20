import { KeyframeTimeline, type TimelineModel } from "march/ui"

// kalp atışı: tek iz (büyüklük), iki vuruş; sahnede hap yerine bir kalp çizilir, kendiliğinden ve döngüde atar
const BEAT: TimelineModel = { duration: 1000, tracks: [
  { id: "beat", target: "Kalp", prop: "scale", color: "danger", keys: [{ at: 0, value: 1 }, { at: 120, value: 1.35, easing: "out" }, { at: 240, value: 1 }, { at: 360, value: 1.25, easing: "out" }, { at: 600, value: 1, easing: "in-out" }] },
] }

export function Heartbeat() {
  let $beat = BEAT
  return <KeyframeTimeline bind:value={$beat} autoplay transport={["play"]} inspector={false}
    renderTarget={() => <span sx={{ text: "2xl" }}>❤️</span> as Element} aria-label="Kalp atışı" />
}
