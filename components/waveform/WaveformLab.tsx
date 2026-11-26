import { Waveform, Button, Badge, Card } from "march/ui"
import { audioSource } from "march/audio"

// WaveformLab: every Waveform prop in one place.
// Waveform draws the bars of a sound, as in a voice message or a podcast player. The bars come from `peaks` (numbers
// you already have), from `src` (an audio file, decoded once it is on screen) or live from a `source`. A playhead
// paints the played part, `regions` mark chapters, and `seekable` turns it into a slider. Use it to show and scrub
// through a recording; for "how loud right now" use LevelMeter.
//
// Props shown below: peaks, src (a short WAV generated in code), source (the demo sound), live (decorative bars),
// progress, currentTime + duration, regions, bars, barWidth, gap, rounded, align, height, color, progressColor,
// playhead, regionLabels, seekable, onSeek, onRegionClick, onLoad, label, valueText, motion, class.

// Bar heights 0–1, any length: the component resamples them to the number of bars that fit. In a real app you would
// store these with the recording (decodePeaks(url) from march/ui computes them once).
const PEAKS = Array.from({ length: 48 }, (_, i) => 0.2 + 0.8 * Math.abs(Math.sin(i * 0.4)))

// Builds a 1.5-second WAV in memory (three beeps with silence between) and returns a blob: URL, so the `src` example
// needs no file. The first lines write the standard 44-byte WAV header (PCM, mono, 16-bit, 8000 samples a second);
// the loop writes the samples: a 440 Hz sine that fades over 0.3 s, then silence until the next half second.
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
  // $p: the shared playhead (0–1). $log: the last event, shown in the badge. $len: the decoded file's duration.
  let $p = 0.3
  let $log = "—"
  let $len = "?"
  // The synthesized "demo" loop (march/audio): muted, no permission; started by a click, as browsers require.
  const demo = audioSource("demo")
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls; lab-* classes are hooks for WaveformLab.test.tsx. "İleri" (forward) moves the playhead by 20 %.
        The badge shows the last onSeek / onRegionClick event. */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button class="lab-fwd" size="sm" on:click={() => { $p = Math.min(1, $p + 0.2) }}>İleri</Button>
      <Button size="sm" variant="ghost" on:click={() => (demo.active() ? demo.stop() : demo.start())}>{() => (demo.active() ? "Demo sesi durdur" : "Demo sesi başlat")}</Button>
      <Badge class="lab-log" tone="primary">{() => $log}</Badge>
    </div>
    {/* 1. A seekable waveform: a slider you press, drag or move with the keyboard.
        - progress as a function (() => $p): the playhead follows the state without re-creating the component.
        - seekable + onSeek(progress, seconds): the waveform does not move its own playhead; you get the new position
          and decide (here: store it in $p). Keyboard: arrows ±5 %, PageUp / PageDown ±10 %, Home / End; Escape cancels
          a drag. Arrows mirror on right-to-left pages.
        - regions: bands under the bars, with labels below. Without a duration, start / end are 0–1 fractions.
          onRegionClick fires when a press without a drag lands in a region.
        - Accessibility: role="slider" named by label. valueText writes the spoken position (by default "1:05 of 4:00"
          plus the region's label); it changes at most once a second while playing. */}
    <div class="lab-seek">
      <Waveform peaks={PEAKS} progress={() => $p} seekable onSeek={(p: number) => { $p = p; $log = `konum %${Math.round(p * 100)}` }}
        regions={[{ start: 0, end: 0.4, label: "Giriş" }, { start: 0.4, end: 1, label: "Şarkı", color: "brand-pink" }]}
        onRegionClick={(r: { label?: string }) => { $log = `bölüm: ${r.label}` }}
        valueText={(s: number, d: number) => `${Math.round(s)} / ${Math.round(d)} sn`} label="Şarkı konumu" />
    </div>
    {/* 2. Time in seconds and the look, changed.
        - currentTime + duration (seconds) instead of progress; regions are then in seconds too.
        - bars: a fixed bar count (their width fills the box); gap in px; rounded={false} square ends;
          align="bottom" grows bars from the bottom instead of the centre; height of the bars in px.
        - color / progressColor: theme tokens for the bars and the played part.
        - playhead={false} hides the line, regionLabels={false} hides the labels row.
        - motion={false}: no grow-in animation; users who ask their OS for reduced motion get the same.
        Not seekable, so it is a role="img" named "<label>, <duration>". */}
    <div class="lab-time">
      <Waveform class="lab-own" peaks={PEAKS} currentTime={() => $p * 90} duration={90} bars={30} gap={3} rounded={false} align="bottom" height={36}
        color="cat-3" progressColor="brand-orange" playhead={false} regionLabels={false} regions={[{ start: 30, end: 60 }]} motion={false} />
    </div>
    {/* 3. From a file: src is fetched and decoded when the waveform comes on screen (the peaks are computed once per
        URL). onLoad reports { peaks, duration }; without a duration prop the file's own duration is used. barWidth
        sets the bar width in px. */}
    <div class="lab-src">
      <Waveform src={beeps()} progress={() => $p} onLoad={(d: { duration: number }) => { $len = `${d.duration.toFixed(1)} sn` }} height={40} barWidth={4} />
      <span sx={{ text: "xs", color: "muted" }}>{() => `dosyanın süresi: ${$len}`}</span>
    </div>
    {/* m:theme="night" switches the theme for this subtree. */}
    <Card m:theme="night" title="Canlı">
      <div sx={{ flex: "col", gap: 2 }}>
        {/* 4. Live: with a source the bars roll in from the inline end as the sound plays (start the demo above). It
            is a role="img" named by label. Under reduced motion it updates twice a second. */}
        <Waveform class="lab-live" source={demo} label="Demo ses" height={40} barWidth={2} gap={2} progressColor="brand-blue" />
        {/* 5. live without a source: the decorative "recording" motion (as in a chat composer). No audio, no
            permission, no per-frame script: the bars move on the compositor. It is hidden from screen readers, so say
            "recording" in text nearby; with reduced motion the bars stand still. */}
        <Waveform class="lab-deco" live bars={20} height={24} color="brand-pink" />
      </div>
    </Card>
  </div>
}
