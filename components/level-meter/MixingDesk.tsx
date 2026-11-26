import { LevelMeter, Button } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// MixingDesk: a small mixer whose LEDs are played by a drum machine made of numbers. A number source needs no
// permission, makes no sound and starts at once, so the meters move the moment the example opens. The first beat of
// each bar is accented: its peak light hangs for a moment, then falls. "⏹ Durdur" (stop) silences the channels.
// Use a number source (audioSource(() => n)) to drive any meter from data: a simulation, a server metric, a game.

// hit(ms): a decaying hit that repeats every `ms` milliseconds: 1 at the start of the period, falling to 0.
const hit = (ms: number): number => { const t = (performance.now() % ms) / ms; return Math.max(0, 1 - t * 2.4) }
// accent(): one beat in four (beats are 500 ms apart) is loud (0.85), the others are soft (0.4).
const accent = (): number => (Math.floor(performance.now() / 500) % 4 === 0 ? 0.85 : 0.4)
export function MixingDesk() {
  // Two number sources: march/audio calls the function on every frame of the motion clock (only while a meter using
  // it is on screen; twice a second under reduced motion) and treats the result as the level 0–1.
  const drums = audioSource(() => 0.12 + accent() * hit(500))
  const bass = audioSource(() => 0.08 + 0.6 * hit(1000))
  // Stop both when the component goes away.
  onCleanup(() => { drums.stop(); bass.stop() })
  let $playing = true
  // Toggle: stop both, or start both again. $playing is read back from the source (active()) so the button label
  // always matches the real state.
  async function toggle() {
    if ($playing) { drums.stop(); bass.stop() }
    else { await drums.start(); await bass.start() }
    $playing = drums.active()
  }
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
    {/* Drums: a stereo meter (a mono source reads the same on both channels). scale="db" with ticks draws a dB scale;
        length is the bar length in px. channelNames are what a screen reader hears per channel ("Davul, sol" /
        "Davul, sağ"); labels are the short visible letters under the bars. */}
    <LevelMeter source={drums} scale="db" ticks segments={28} length={180} label="Davul" channelNames={["sol", "sağ"]} labels={["1", "2"]} />
    {/* Bass: channels={1} makes one bar; size="sm" a thinner one. colors replaces the green / amber / red zones with
        three theme tokens; keep the low-to-high order so the meaning survives. */}
    <LevelMeter source={bass} channels={1} segments={16} length={180} size="sm" colors={["brand-blue", "brand-purple", "brand-pink"]} label="Bas" />
    <div sx={{ flex: "col", gap: 2 }}>
      {/* The label switches between "⏹ Durdur" (stop) and "▶ Çal" (play). */}
      <Button on:click={toggle}>{$playing ? "⏹ Durdur" : "▶ Çal"}</Button>
      {/* Said in text, because there is nothing to hear: only the lights dance. */}
      <span sx={{ text: "sm", color: "muted" }}>Ses yok: yalnız ışıklar dans eder.</span>
    </div>
  </div>
}
