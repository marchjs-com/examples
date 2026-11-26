import { Spectrum, Button, Card } from "march/ui"
import { audioSource } from "march/audio"

// SpectrumLab: every Spectrum prop in one place.
// Spectrum shows the frequencies of a sound, live: bass on one side, treble on the other, with peak caps that fall
// slowly. Use it for music players, visualizers and "the room is noisy / bass-heavy" displays. For loudness alone use
// LevelMeter; for the wave's shape use Oscilloscope.
//
// Props shown below: source (an audio source, a number, none), variant (bars, mirror, circle, line), bars, scale (log,
// linear), minHz, maxHz, peaks, peakFall, gap, radius, gain, color, colors ("brand", a list, "single"), paint
// (gradient, segments), height, label, idleText (text, false), draw (your own layer), motion, class.
export function SpectrumLab() {
  // The synthesized "demo" loop (march/audio): no file, no permission, muted by default. It starts from the
  // "Demo çal" click, because browsers only let audio start from a user gesture.
  const song = audioSource("demo")
  // A number source: the number (0–1) becomes a synthetic tone with harmonics, so the spectrum has a shape. It needs
  // no permission and starts at once. "Kıs" (quieter) lowers it.
  let $level = 0.7
  const tone = audioSource(() => $level)
  // A `draw` layer runs after each frame with the canvas context and the frame's size and color. Here it shades the
  // lowest third (the bass side); use it for a target band, a label or a threshold line.
  const band = (ctx: CanvasRenderingContext2D, f: { width: number; height: number; color: string }) => {
    ctx.globalAlpha = 0.1; ctx.fillStyle = f.color; ctx.fillRect(0, 0, f.width / 3, f.height)
  }
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls; the lab-* classes are hooks for SpectrumLab.test.tsx. The play button's label is a function, so
        it follows song.active(). */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-play" size="sm" on:click={() => (song.active() ? song.stop() : song.start())}>{() => (song.active() ? "Durdur" : "Demo çal")}</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $level = Math.max(0, $level - 0.3) }}>Kıs</Button>
    </div>
    <div sx={{ grid: "fit", gap: 2 }}>
      {/* 1. Bars (the default variant), tuned: bars is the bar count, gap and radius are in px, peakFall is how fast
          the peak caps fall (screen heights per second). */}
      <Spectrum class="lab-bars" source={song} bars={32} gap={3} radius={4} peakFall={0.8} label="Demo çubuklar" />
      {/* 2. variant="mirror": bars around the middle line. colors="brand" paints low to high with the four HADİ colors;
          paint="segments" uses hard-edged parts instead of the default gradient. Many thin bars (64, gap 1, square
          corners) read as a dense equalizer. */}
      <Spectrum class="lab-mirror" source={song} variant="mirror" colors="brand" paint="segments" bars={64} gap={1} radius={0} label="Ayna" />
      {/* 3. variant="circle": bars around a ring, bass at the top. colors as a list: your own theme tokens, low to high.
          A circle needs height (default 240px). idleText is shown while the demo is not playing. */}
      <Spectrum class="lab-circle" source={song} variant="circle" colors={["brand-blue", "brand-pink", "brand-gold"]} height={220} label="Halka" idleText="Demo bekleniyor" />
      {/* 4. variant="line": a curve with a soft fill, here fed by the number source so it draws at once.
          scale="linear" spaces frequencies evenly (the default "log" gives low notes as much room as high ones, as the
          ear hears). minHz / maxHz set the range; gain amplifies; peaks={false} removes the caps; draw adds the
          shaded band from above. */}
      <Spectrum class="lab-tone" source={tone} variant="line" color="success" scale="linear" minHz={20} maxHz={4000} gain={1.3} peaks={false} draw={band} label="Ton" />
      {/* 5. colors="single": one color only. motion={false} removes the falling caps; users who ask their OS for
          reduced motion get the same, and the source then reads only twice a second. */}
      <Spectrum class="lab-still" source={tone} colors="single" motion={false} label="Hareketsiz" />
      {/* 6. No source: empty bars. idleText={false} hides the "No signal" text; height takes any CSS length.
          Accessibility: every spectrum is one role="img" named label + the level in words and where it is loudest
          ("loud, loudest near 220 Hz"), updated at most once a second. Quiet bars are dimmer as well as shorter, so
          the shape never depends on color alone. */}
      <Spectrum class="lab-empty" idleText={false} height="5rem" label="Boş" />
    </div>
    {/* m:theme="night" switches the theme for this subtree; the spectrum re-reads its theme colors on the change. */}
    <Card m:theme="night">
      <Spectrum source={song} variant="mirror" color="brand-purple" label="Koyu zeminde" idleText="Sessiz" />
    </Card>
  </div>
}
