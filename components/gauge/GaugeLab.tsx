import { Gauge, Button, Card } from "march/ui"
import { audioSource } from "march/audio"

// Gauge'un bütün özellikleri: value (erişimci), source (ses), min, max, zones, redline, peak, peakHold, label, unit,
// caption, format, variant (speedometer, tachometer, half, vu), size, sweep, ticks, needle, readout (true, "odometer",
// düğüm, işlev, false), parts, color, motion, onPeak, onRedline, class
export function GaugeLab() {
  let $v = 40
  let $peaks = 0
  let $red = false
  const demo = audioSource("demo")
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-up" size="sm" on:click={() => { $v = Math.min(100, $v + 25) }}>Artır</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $v = Math.max(0, $v - 30) }}>Azalt</Button>
      <Button class="lab-sound" size="sm" variant="ghost" on:click={() => demo.start()}>🔊 Demo sesi başlat</Button>
    </div>
    <p class="lab-events">{`Yeni tepe: ${$peaks} · Kırmızıda: ${$red ? "evet" : "hayır"}`}</p>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      <span class="lab-speed"><Gauge value={$v} min={0} max={100} label="Hız" unit="km/h" format={(n: number) => `${Math.round(n)}`}
        zones={[{ from: 0, to: 50, color: "success" }, { from: 50, to: 80, color: "warning" }]} redline={80}
        peak peakHold={3000} onPeak={() => $peaks++} onRedline={(on: boolean) => { $red = on }} color="brand-purple" needle="spring" /></span>
      <span class="lab-tach"><Gauge variant="tachometer" value={$v * 80} readout="odometer" caption="×1000 dev/dk" /></span>
      <span class="lab-half"><Gauge variant="half" value={$v} peak={90} size={200} sweep={200} ticks={{ step: 20, minor: 1, labels: (n: number) => `${n}%` }} needle="vu" /></span>
      <span class="lab-vu"><Gauge variant="vu" source={demo} label="Demo sesi" /></span>
      <span class="lab-own"><Gauge value={$v} readout={(n: number) => <b>{`${Math.round(n)} puan`}</b>} needle="none" motion={false} class="lab-mine"
        parts={{ ticks: false, labels: false, hub: true, glass: false, face: true, arc: true, peak: false }} /></span>
      <span class="lab-bare"><Gauge value={$v} readout={false} size={140} parts={{ face: false, caption: false }} ticks={false} /></span>
    </div>
    <Card m:theme="night">
      <Gauge value={$v} label="Koyu zeminde" unit="%" />
    </Card>
  </div>
}
