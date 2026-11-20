import { TimeRuler, Card } from "march/ui"

// TimeRuler'ın bütün özellikleri bir arada: duration, value, onSeek, onSeekStart, step, major, minor, ticks, format,
// valueText, snap, keyStep, head (yok / kendi), headClass, labels ve class
export function TimeRulerLab() {
  let $ms = 1500
  let $starts = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <p>Konum: <b>{() => `${$ms} ms`}</b> · sürükleme / tuş: <b>{() => $starts}</b></p>
    <TimeRuler class="lab-ruler" duration={() => 4000} value={() => $ms} onSeek={(ms: number) => $ms = Math.round(ms)} onSeekStart={() => $starts++}
      step={250} major={1000} keyStep={500} snap={(ms: number) => Math.round(ms / 250) * 250}
      valueText={(ms: number) => `${ms} milisaniye`} headClass="lab-head" labels={{ ruler: "Lab cetveli", playhead: "Lab başı" }} />
    <TimeRuler duration={4000} value={() => $ms} minor={false} format={(ms: number) => `${ms / 1000} sn`} m:color="brand-purple"
      head={<span aria-hidden="true">▼</span> as Node} />
    <TimeRuler duration={3000} ticks={(d: number) => [{ at: 0, major: true, label: "başla" }, { at: d / 2, label: "yarı" }, { at: d, major: true, label: "bitir" }]} />
    <Card m:theme="night">
      <TimeRuler duration={4000} value={() => $ms} head={false} />
    </Card>
  </div>
}
