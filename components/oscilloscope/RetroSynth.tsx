import { Oscilloscope, Button, Segmented } from "march/ui"
import { audioSource } from "march/audio"

// eski bir laboratuvar ekranı: tüp açılır açılmaz bir test tonu çizer; "Çal" sentezlenmiş döngüyü yeşil fosforlu tüpe
// getirir; "XY" sol ve sağı birbirine karşı çizer
export function RetroSynth() {
  const synth = audioSource("demo", { audible: true })
  // test tonu: bir sayı kaynağı izin ve tıklama istemez, hemen başlar
  const tone = audioSource(() => 0.6)
  let $mode: "wave" | "xy" = "wave"
  return <div sx={{ flex: "col", gap: 2 }}>
    {() => <Oscilloscope source={synth.active() ? synth : tone} look="crt" mode={$mode} persistence={0.8} height={200} label="Sentez osiloskobu" />}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button on:click={() => (synth.active() ? synth.stop() : synth.start())}>{() => (synth.active() ? "⏹ Durdur" : "▶ Çal")}</Button>
      <Segmented size="sm" bind:value={$mode} aria-label="Görünüm" options={[{ value: "wave", label: "Dalga" }, { value: "xy", label: "XY" }]} />
    </div>
  </div>
}
