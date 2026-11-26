import { StereoVu, Slider, Button } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// StereoVuLab: the full-featured StereoVu example: every prop in one place.
// StereoVu is the stereo VU-meter pair of a tape deck or a console: two Gauge VU dials (left, right) on one panel,
// each with a peak light that flashes over a level. It reads a live sound (source) or two numbers (value). Use it
// wherever left / right loudness matters: recording, mixing, streaming, a DJ deck.
//
// Props shown below: source, value, reference, peak, peakHold, redline, needle, caption, labels, channelNames, label,
// peakLabel, panel, size, color, parts, motion, onPeak, onPeakReset, class.
export function StereoVuLab() {
  // Two levels 0–1 for the number-driven pair, and counters filled by the peak callbacks.
  let $left = 0.4
  let $right = 0.3
  let $peaks = 0
  let $resets = 0
  // A steady number source for the second pair: a number is a source (no permission, it runs at once, mono).
  const tone = audioSource(0.5)
  onCleanup(() => tone.stop())
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* 1. Numbers in, every option on.
        - value={[$left, $right]}: two levels 0–1 (one number would drive both needles).
        - reference: the level that reads 0 VU (0.5 is the default, −6 dBFS).
        - peak={1}: a light comes on at +1 VU; peakHold={1500}: it stays lit 1.5 s (0 would latch it until pressed).
        - onPeak / onPeakReset(channel): here they only count; channel 0 is left, 1 right.
        - redline={-3}: the red zone starts at −3 VU. needle="spring": a springy needle instead of VU ballistics.
        - caption / labels / channelNames / label / peakLabel: every text can be replaced (Turkish here).
        - panel="metal" (default), size: each dial's width in px, color: a theme token for the needles.
        - class: a hook for the test (lab-pair). */}
    <StereoVu class="lab-pair" value={[$left, $right]} reference={0.5} peak={1} peakHold={1500} redline={-3} needle="spring"
      caption="dB" labels={["S", "Sğ"]} channelNames={["sol", "sağ"]} label="Karşılaştırma" peakLabel="Söndür"
      panel="metal" size={180} color="brand-blue" onPeak={() => { $peaks++ }} onPeakReset={() => { $resets++ }} />
    {/* Sliders for the two levels (arrow keys move them; each has an aria-label). */}
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Slider aria-label="Sol" min={0} max={1} step={0.01} bind:value={$left} />
      <Slider aria-label="Sağ" min={0} max={1} step={0.01} bind:value={$right} />
      <Button class="lab-loud" size="sm" on:click={() => { $left = 0.9; $right = 0.9 }}>Çok yüksek</Button>
    </div>
    <span sx={{ text: "sm", color: "muted" }}>Tepe: <span class="lab-peaks">{$peaks}</span> · Söndürülen: <span class="lab-resets">{$resets}</span></span>
    {/* 2. A live source with the parts trimmed.
        - source={tone}: a march/audio source (here a steady number tone; "mic", "demo" or an <audio> work the same).
        - parts: no glass, no ticks, no caption, no lights; panel="dark".
        - motion={false}: the needles stand on each reading at once (the same as the OS reduced-motion setting). */}
    <StereoVu class="lab-live" source={tone} panel="dark" size={150} motion={false}
      parts={{ glass: false, ticks: false, caption: false, lights: false }} />
    {/* 3. Bare dials: parts panel={false} removes the housing and screws; peak={false} has no lights at all. */}
    <StereoVu class="lab-bare" value={0.2} peak={false} parts={{ panel: false, labels: false }} size={140} />
  </div>
}
