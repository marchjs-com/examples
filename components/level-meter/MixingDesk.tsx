import { LevelMeter, Button } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// küçük bir mikser masası: bir davul makinesi (sayı kaynakları: izin yok, ses yok, hemen çalar) LED'leri oynatır; ölçünün
// ilk vuruşu vurgulu: onun tepe ışığı bir an asılı kalır, sonra düşer. "Durdur" kanalları susturur
const hit = (ms: number): number => { const t = (performance.now() % ms) / ms; return Math.max(0, 1 - t * 2.4) }
const accent = (): number => (Math.floor(performance.now() / 500) % 4 === 0 ? 0.85 : 0.4)
export function MixingDesk() {
  const drums = audioSource(() => 0.12 + accent() * hit(500))
  const bass = audioSource(() => 0.08 + 0.6 * hit(1000))
  onCleanup(() => { drums.stop(); bass.stop() })
  let $playing = true
  async function toggle() {
    if ($playing) { drums.stop(); bass.stop() }
    else { await drums.start(); await bass.start() }
    $playing = drums.active()
  }
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
    <LevelMeter source={drums} scale="db" ticks segments={28} length={180} label="Davul" channelNames={["sol", "sağ"]} labels={["1", "2"]} />
    <LevelMeter source={bass} channels={1} segments={16} length={180} size="sm" colors={["brand-blue", "brand-purple", "brand-pink"]} label="Bas" />
    <div sx={{ flex: "col", gap: 2 }}>
      <Button on:click={toggle}>{$playing ? "⏹ Durdur" : "▶ Çal"}</Button>
      <span sx={{ text: "sm", color: "muted" }}>Ses yok: yalnız ışıklar dans eder.</span>
    </div>
  </div>
}
