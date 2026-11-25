import { Oscilloscope, Button, Segmented } from "march/ui"
import { audioSource } from "march/audio"

// eski bir laboratuvar ekranı: sentezlenmiş döngü yeşil fosforlu tüpte; "XY" sol ve sağı birbirine karşı çizer
export function RetroSynth() {
  const synth = audioSource("demo", { audible: true })
  let $mode: "wave" | "xy" = "wave"
  return <div sx={{ flex: "col", gap: 2 }}>
    <Oscilloscope source={synth} look="crt" mode={$mode} persistence={0.8} height={200} label="Sentez osiloskobu" idleText="Çal'a bas" />
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button on:click={() => (synth.active() ? synth.stop() : synth.start())}>{() => (synth.active() ? "⏹ Durdur" : "▶ Çal")}</Button>
      <Segmented size="sm" bind:value={$mode} aria-label="Görünüm" options={[{ value: "wave", label: "Dalga" }, { value: "xy", label: "XY" }]} />
    </div>
  </div>
}
