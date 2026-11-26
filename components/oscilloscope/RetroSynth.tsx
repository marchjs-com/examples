import { Oscilloscope, Button, Segmented } from "march/ui"
import { audioSource } from "march/audio"

// RetroSynth: an old lab screen. The tube draws a test tone as soon as it opens; "▶ Çal" (play) brings the synthesized
// loop to the green phosphor tube, and the "XY" option draws the left channel against the right.
// The pattern to learn: show something alive at once (a number source) and switch to real audio after a click.
export function RetroSynth() {
  // The "demo" loop with { audible: true }: it is also sent to the speakers (by default the demo is silent). Like any
  // real audio it can only start from a user gesture, so the play button starts it.
  const synth = audioSource("demo", { audible: true })
  // The test tone: a number source needs no permission and no click; it starts at once.
  const tone = audioSource(() => 0.6)
  // The view, bound to the Segmented control below.
  let $mode: "wave" | "xy" = "wave"
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* A function child: it re-runs, and builds a fresh scope, when what it reads changes (synth.active() or $mode).
        That is how the scope switches from the tone to the synth and between wave and XY.
        look="crt" gives the retro tube with scanlines; persistence={0.8} a long phosphor afterglow (off with reduced
        motion); height in px. label names the image for screen readers. */}
    {() => <Oscilloscope source={synth.active() ? synth : tone} look="crt" mode={$mode} persistence={0.8} height={200} label="Sentez osiloskobu" />}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* Play / stop; the label follows synth.active(). */}
      <Button on:click={() => (synth.active() ? synth.stop() : synth.start())}>{() => (synth.active() ? "⏹ Durdur" : "▶ Çal")}</Button>
      {/* bind:value keeps $mode and the control in sync both ways. aria-label names the group for screen readers;
          arrow keys move between the options. */}
      <Segmented size="sm" bind:value={$mode} aria-label="Görünüm" options={[{ value: "wave", label: "Dalga" }, { value: "xy", label: "XY" }]} />
    </div>
  </div>
}
