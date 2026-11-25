import { Spectrum, Button, Card } from "march/ui"
import { audioSource } from "march/audio"

// Spectrum'un bütün özellikleri: source (ses kaynağı, sayı, yok), variant (bars, mirror, circle, line), bars, scale (log,
// linear), minHz, maxHz, peaks, peakFall, gap, radius, gain, color, colors ("brand", liste, "single"), paint (gradient,
// segments), height, label, idleText (metin, false), draw (kendi katman), motion, class
export function SpectrumLab() {
  const song = audioSource("demo")
  let $level = 0.7
  const tone = audioSource(() => $level)
  const band = (ctx: CanvasRenderingContext2D, f: { width: number; height: number; color: string }) => {
    ctx.globalAlpha = 0.1; ctx.fillStyle = f.color; ctx.fillRect(0, 0, f.width / 3, f.height)
  }
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-play" size="sm" on:click={() => (song.active() ? song.stop() : song.start())}>{() => (song.active() ? "Durdur" : "Demo çal")}</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $level = Math.max(0, $level - 0.3) }}>Kıs</Button>
    </div>
    <div sx={{ grid: "fit", gap: 2 }}>
      <Spectrum class="lab-bars" source={song} bars={32} gap={3} radius={4} peakFall={0.8} label="Demo çubuklar" />
      <Spectrum class="lab-mirror" source={song} variant="mirror" colors="brand" paint="segments" bars={64} gap={1} radius={0} label="Ayna" />
      <Spectrum class="lab-circle" source={song} variant="circle" colors={["brand-blue", "brand-pink", "brand-gold"]} height={220} label="Halka" idleText="Demo bekleniyor" />
      <Spectrum class="lab-tone" source={tone} variant="line" color="success" scale="linear" minHz={20} maxHz={4000} gain={1.3} peaks={false} draw={band} label="Ton" />
      <Spectrum class="lab-still" source={tone} colors="single" motion={false} label="Hareketsiz" />
      <Spectrum class="lab-empty" idleText={false} height="5rem" label="Boş" />
    </div>
    <Card m:theme="night">
      <Spectrum source={song} variant="mirror" color="brand-purple" label="Koyu zeminde" idleText="Sessiz" />
    </Card>
  </div>
}
