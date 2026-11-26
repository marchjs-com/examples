import { LoudnessGraph, Button, Slider } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// LoudnessGraphLab: the full-featured LoudnessGraph example: every prop in one place.
// LoudnessGraph is a loudness meter's history: momentary, short-term and integrated loudness in LUFS (K-weighted, from
// march/audio loudness()) drawn on LineChart with target lines, the stereo correlation on a second LineChart and a bar,
// and readouts that tween to each new reading on the motion engine. Use it in recording, streaming, podcast and
// broadcast tools, or wherever a level must meet a target.
//
// Props shown below: source, value, span, rate, show, targets, range, height, colors, labels, label, format, paused,
// duration, motion, parts, onSample, class.
export function LoudnessGraphLab() {
  // 1. Readings fed by hand (a meter elsewhere, a server): the slider sets the short-term loudness, correlation 0.8.
  let $short = -18
  let $paused = false
  let $samples = 0
  // 2. A live source: a steady number tone (no permission, no sound, runs at once).
  const tone = audioSource(0.4)
  onCleanup(() => tone.stop())
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* 1. value instead of a source.
        - value: { momentary, shortTerm, integrated, correlation }; a missing reading is a gap in the line.
        - span / rate: 15 s of history, 5 readings a second (each one calls onSample).
        - show: which loudness lines are drawn. targets: your own target line(s) with label and theme colour.
        - range: the LUFS axis. height: the loudness graph in px. colors: theme tokens per line.
        - labels / label: every text replaced (Turkish here). format: our own LUFS text (no decimals).
        - paused: stop recording (the readouts still follow). duration: the readouts' tween length in ms.
        - class: a hook for the test (lab-fed). */}
    <LoudnessGraph class="lab-fed" value={{ momentary: $short + 2, shortTerm: $short, correlation: 0.8 }} span={15} rate={5}
      show={["momentary", "shortTerm"]} targets={[{ value: -16, label: "Podcast", color: "success" }]} range={[-40, -6]}
      height={160} colors={{ momentary: "brand-blue", shortTerm: "brand-pink", correlation: "brand-gold" }}
      labels={{ momentary: "Anlık", shortTerm: "Kısa süreli", correlation: "Korelasyon" }} label="Elle beslenen ölçer"
      format={(v: number) => (v <= -70 ? "sessiz" : `${Math.round(v)}`)} paused={$paused} duration={250}
      onSample={() => { $samples++ }} />
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* A Slider for the short-term reading (arrow keys move it), and a pause switch for the recording. */}
      <Slider aria-label="Kısa süreli LUFS" min={-40} max={-6} step={1} bind:value={$short} />
      <Button class="lab-pause" size="sm" variant="ghost" on:click={() => { $paused = !$paused }}>{$paused ? "▶ Sürdür" : "⏸ Durdur"}</Button>
      <span sx={{ text: "sm", color: "muted" }}>Okuma: <span class="lab-samples">{$samples}</span></span>
    </div>
    {/* 2. A live source with parts trimmed.
        - source={tone}: march/audio measures it while the graph is on screen.
        - show includes "integrated": the gated loudness since the start.
        - targets={false}: no target lines. parts: no legend, no correlation (graph and bar).
        - motion={false}: the readouts jump to each reading (the same as the OS reduced-motion setting). */}
    <LoudnessGraph class="lab-live" source={tone} show={["shortTerm", "integrated"]} targets={false} motion={false}
      parts={{ legend: false, correlation: false }} label="Canlı ölçer" />
    {/* 3. No loudness graph: parts loudness={false} hides the LUFS history; the readouts, the correlation bar and
        the correlation graph stay (correlation={false} would hide those too). */}
    <LoudnessGraph class="lab-readouts" value={{ momentary: -23, shortTerm: -23, correlation: -0.2 }} parts={{ loudness: false }} label="Yalnız göstergeler" />
  </div>
}
