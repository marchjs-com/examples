import { Waveform, Button, Badge, Card } from "march/ui"
import { audioSource } from "march/audio"

// Waveform'un bütün özellikleri: peaks, src (kodda üretilen kısa bir WAV), source (demo ses), live (süs çubukları), progress,
// currentTime + duration, regions, bars, barWidth, gap, rounded, align, height, color, progressColor, playhead,
// regionLabels, seekable, onSeek, onRegionClick, onLoad, label, valueText, motion, class
const PEAKS = Array.from({ length: 48 }, (_, i) => 0.2 + 0.8 * Math.abs(Math.sin(i * 0.4)))

// 1,5 saniyelik bir WAV: üç bip, aralarında sessizlik (dosya gerekmez)
function beeps(): string {
  const rate = 8000, n = rate * 1.5, data = new DataView(new ArrayBuffer(44 + n * 2))
  const str = (o: number, s: string) => { for (let i = 0; i < s.length; i++) data.setUint8(o + i, s.charCodeAt(i)) }
  str(0, "RIFF"); data.setUint32(4, 36 + n * 2, true); str(8, "WAVEfmt "); data.setUint32(16, 16, true); data.setUint16(20, 1, true)
  data.setUint16(22, 1, true); data.setUint32(24, rate, true); data.setUint32(28, rate * 2, true); data.setUint16(32, 2, true)
  data.setUint16(34, 16, true); str(36, "data"); data.setUint32(40, n * 2, true)
  for (let i = 0; i < n; i++) {
    const t = i / rate, k = t % 0.5
    data.setInt16(44 + i * 2, k < 0.3 ? Math.round(Math.sin(t * 2 * Math.PI * 440) * 20000 * (1 - k / 0.3)) : 0, true)
  }
  return URL.createObjectURL(new Blob([data.buffer], { type: "audio/wav" }))
}

export function WaveformLab() {
  let $p = 0.3
  let $log = "—"
  let $len = "?"
  const demo = audioSource("demo")
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-fwd" size="sm" on:click={() => { $p = Math.min(1, $p + 0.2) }}>İleri</Button>
      <Button size="sm" variant="ghost" on:click={() => (demo.active() ? demo.stop() : demo.start())}>{() => (demo.active() ? "Demo sesi durdur" : "Demo sesi başlat")}</Button>
      <Badge class="lab-log" tone="primary">{() => $log}</Badge>
    </div>
    <div class="lab-seek">
      <Waveform peaks={PEAKS} progress={() => $p} seekable onSeek={(p: number) => { $p = p; $log = `konum %${Math.round(p * 100)}` }}
        regions={[{ start: 0, end: 0.4, label: "Giriş" }, { start: 0.4, end: 1, label: "Şarkı", color: "brand-pink" }]}
        onRegionClick={(r: { label?: string }) => { $log = `bölüm: ${r.label}` }}
        valueText={(s: number, d: number) => `${Math.round(s)} / ${Math.round(d)} sn`} label="Şarkı konumu" />
    </div>
    <div class="lab-time">
      <Waveform class="lab-own" peaks={PEAKS} currentTime={() => $p * 90} duration={90} bars={30} gap={3} rounded={false} align="bottom" height={36}
        color="cat-3" progressColor="brand-orange" playhead={false} regionLabels={false} regions={[{ start: 30, end: 60 }]} motion={false} />
    </div>
    <div class="lab-src">
      <Waveform src={beeps()} progress={() => $p} onLoad={(d: { duration: number }) => { $len = `${d.duration.toFixed(1)} sn` }} height={40} barWidth={4} />
      <span sx={{ text: "xs", color: "muted" }}>{() => `dosyanın süresi: ${$len}`}</span>
    </div>
    <Card m:theme="night" title="Canlı">
      <div sx={{ flex: "col", gap: 2 }}>
        <Waveform class="lab-live" source={demo} label="Demo ses" height={40} barWidth={2} gap={2} progressColor="brand-blue" />
        <Waveform class="lab-deco" live bars={20} height={24} color="brand-pink" />
      </div>
    </Card>
  </div>
}
