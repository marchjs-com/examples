import { Oscilloscope, Button, Card } from "march/ui"
import { audioSource } from "march/audio"

// Oscilloscope'un bütün özellikleri: source (ses kaynağı, sayı, yok), mode (wave, xy), trigger (true, düzey, false),
// timebase, persistence, grid (true, false, { x, y }), look (modern, crt), color, lineWidth, glow, gain, height, label,
// idleText (metin, false), draw (kendi katman), motion, class
export function OscilloscopeLab() {
  const song = audioSource("demo")
  let $level = 0.6
  const cpu = audioSource(() => $level)
  const marker = (ctx: CanvasRenderingContext2D, f: { width: number; height: number; color: string }) => {
    ctx.fillStyle = f.color; ctx.font = "11px sans-serif"; ctx.fillText("A", 8, 16)
  }
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-play" size="sm" on:click={() => (song.active() ? song.stop() : song.start())}>{() => (song.active() ? "Durdur" : "Demo çal")}</Button>
      <Button class="lab-up" size="sm" variant="ghost" on:click={() => { $level = Math.min(1, $level + 0.2) }}>Yükselt</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $level = Math.max(0, $level - 0.5) }}>Kıs</Button>
    </div>
    <div sx={{ grid: "fit", gap: 2 }}>
      <Oscilloscope class="lab-wave" source={song} trigger={0.1} timebase={15} persistence={0.6} lineWidth={2.5} glow={10} gain={1.2} label="Demo dalga" draw={marker} />
      <Oscilloscope class="lab-crt" source={song} look="crt" mode="xy" persistence={0.85} height={180} label="XY" idleText="Demo bekleniyor" />
      <Oscilloscope class="lab-cpu" source={cpu} color="brand-blue" trigger={false} grid={{ x: 6, y: 4 }} glow={false} motion={false} label="İşlemci" />
      <Oscilloscope class="lab-empty" grid={false} idleText={false} height="8rem" label="Boş ekran" />
    </div>
    <Card m:theme="night">
      <Oscilloscope source={song} color="brand-pink" persistence={0} label="Koyu zeminde" idleText="Sessiz" />
    </Card>
  </div>
}
