import { Oscilloscope, Button, Card } from "march/ui"
import { audioSource } from "march/audio"

// OscilloscopeLab: every Oscilloscope prop in one place.
// Oscilloscope draws the shape of a sound, live: a trace over a graticule, triggered so the picture stands still, with
// a soft glow and a phosphor afterglow. Use it where the sound itself is the subject (a synth, a tuner, a recording
// screen, a "your microphone works" check) or as a lively decoration fed by any number. For "how loud" use LevelMeter;
// for "which frequencies" use Spectrum.
//
// Props shown below: source (an audio source, a number, none), mode (wave, xy), trigger (true, a level, false),
// timebase, persistence, grid (true, false, { x, y }), look (modern, crt), color, lineWidth, glow, gain, height, label,
// idleText (text, false), draw (your own layer), motion, class.
export function OscilloscopeLab() {
  // The synthesized "demo" loop (march/audio): no file, no permission, muted by default. It starts from a click
  // ("Demo çal"), because browsers only let audio start from a user gesture.
  const song = audioSource("demo")
  // A number source: march/audio turns the number (0–1) into a synthetic tone of that loudness. It needs no permission
  // and starts at once, so this scope draws immediately. Any reactive value works: a CPU load, a game's energy…
  let $level = 0.6
  const cpu = audioSource(() => $level)
  // A `draw` layer runs after each trace with the canvas context and the frame's size and color. Here it writes a
  // channel letter in the corner; use it for markers, a threshold line, a label.
  const marker = (ctx: CanvasRenderingContext2D, f: { width: number; height: number; color: string }) => {
    ctx.fillStyle = f.color; ctx.font = "11px sans-serif"; ctx.fillText("A", 8, 16)
  }
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls; the lab-* classes are hooks for OscilloscopeLab.test.tsx. The play button's label is a function,
        so it follows song.active() and reads "Durdur" (stop) while the demo plays. "Yükselt" / "Kıs" (louder /
        quieter) change the number source. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-play" size="sm" on:click={() => (song.active() ? song.stop() : song.start())}>{() => (song.active() ? "Durdur" : "Demo çal")}</Button>
      <Button class="lab-up" size="sm" variant="ghost" on:click={() => { $level = Math.min(1, $level + 0.2) }}>Yükselt</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $level = Math.max(0, $level - 0.5) }}>Kıs</Button>
    </div>
    <div sx={{ grid: "fit", gap: 2 }}>
      {/* 1. The wave mode, tuned.
          - trigger={0.1}: start each trace where the signal rises through 0.1, so the picture stands still (true =
            rising through 0, false = free running).
          - timebase: the time across the screen in ms; smaller zooms in on fewer cycles.
          - persistence 0–0.95: how long old traces glow after (the phosphor afterglow).
          - lineWidth and glow are in px; gain amplifies the trace vertically.
          - draw={marker}: your own canvas layer, drawn after each trace. */}
      <Oscilloscope class="lab-wave" source={song} trigger={0.1} timebase={15} persistence={0.6} lineWidth={2.5} glow={10} gain={1.2} label="Demo dalga" draw={marker} />
      {/* 2. look="crt": a retro tube with scanlines and phosphor green. mode="xy" draws the left channel against the
          right (a Lissajous figure). height in px; idleText is shown while there is no signal (before the demo plays). */}
      <Oscilloscope class="lab-crt" source={song} look="crt" mode="xy" persistence={0.85} height={180} label="XY" idleText="Demo bekleniyor" />
      {/* 3. A number source, drawn at once. color is a theme token for the trace; trigger={false} lets it run free;
          grid={{ x: 6, y: 4 }} sets the graticule's divisions; glow={false} turns the glow off; motion={false} turns
          the afterglow off. Users who ask their OS for reduced motion get no afterglow automatically, and the source
          then reads only twice a second. */}
      <Oscilloscope class="lab-cpu" source={cpu} color="brand-blue" trigger={false} grid={{ x: 6, y: 4 }} glow={false} motion={false} label="İşlemci" />
      {/* 4. No source at all: a quiet flat line. grid={false} hides the graticule, idleText={false} hides the
          "No signal" text, and height accepts any CSS length. Accessibility: every scope is one role="img" named
          label + the level in words (silent, quiet, loud…), updated at most once a second; with no signal the name
          says so. */}
      <Oscilloscope class="lab-empty" grid={false} idleText={false} height="8rem" label="Boş ekran" />
    </div>
    {/* m:theme="night" switches the theme for this subtree; the scope re-reads its theme colors. persistence={0}
        draws each trace alone, with no afterglow. */}
    <Card m:theme="night">
      <Oscilloscope source={song} color="brand-pink" persistence={0} label="Koyu zeminde" idleText="Sessiz" />
    </Card>
  </div>
}
