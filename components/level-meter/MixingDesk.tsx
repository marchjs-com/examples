import { LevelMeter, Button } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// küçük bir mikser masası: demo döngüsünü başlat, stereo LED'ler müzikle oynasın; tepe ışığı bir an asılı kalır, sonra düşer
export function MixingDesk() {
  const song = audioSource("demo")
  onCleanup(() => song.stop())
  let $playing = false
  async function toggle() {
    if ($playing) song.stop()
    else await song.start()
    $playing = song.active()
  }
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
    <LevelMeter source={song} scale="db" ticks segments={28} length={180} label="Ana çıkış" channelNames={["sol", "sağ"]} labels={["1", "2"]} />
    <LevelMeter source={song} channels={1} segments={16} length={180} size="sm" colors={["brand-blue", "brand-purple", "brand-pink"]} label="Bas" />
    <div sx={{ flex: "col", gap: 2 }}>
      <Button on:click={toggle}>{$playing ? "⏹ Durdur" : "▶ Müziği başlat"}</Button>
      <span sx={{ text: "sm", color: "muted" }}>Ses kapalı çalar: yalnız ışıklar dans eder.</span>
    </div>
  </div>
}
