import { LevelMeter, Button } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// LevelMeter'ın bütün özellikleri: value (sayı, [sol, sağ]), source, channels, min, max, orientation, segments, zones,
// colors, scale, floor, ticks, tickFormat, peakHold, clip, onClip, onClipReset, labels, label, channelNames, clipLabel,
// format, variant, size, length, gap, motion, class
export function LevelMeterLab() {
  let $a = 0.4
  let $b = 0.6
  let $clips = 0
  let $resets = 0
  const demo = audioSource("demo")
  onCleanup(() => demo.stop())
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-up" size="sm" on:click={() => { $a = Math.min(1, $a + 0.3); $b = Math.min(1, $b + 0.3) }}>Yükselt</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $a = 0.1; $b = 0.1 }}>Kıs</Button>
      <Button class="lab-demo" size="sm" variant="ghost" on:click={() => demo.start()}>▶ Demo</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "end"], gap: 4 }}>
      <span class="lab-stereo">
        <LevelMeter value={[$a, $b]} segments={20} zones={[0.6, 0.85]} peakHold={1200} clip={0.95}
          onClip={() => { $clips++ }} onClipReset={() => { $resets++ }} label="Kanal" channelNames={["A kanalı", "B kanalı"]}
          labels={["A", "B"]} clipLabel="Kırpılmayı söndür" />
      </span>
      <span class="lab-db">
        <LevelMeter source={demo} channels={2} scale="db" floor={-60} ticks tickFormat={(d: number) => `${d}`}
          colors={["brand-blue", "brand-gold", "brand-pink"]} size="lg" length={200} gap={3} variant="console" />
      </span>
      <span class="lab-load" sx={{ flex: "grow" }}>
        <LevelMeter value={$a * 100} min={0} max={100} channels={1} orientation="horizontal" variant="flat" size="sm" segments={30}
          ticks={[0, 50, 100]} format={(x: number) => `yüzde ${Math.round(x * 100)}`} label="İşlemci" motion={false}
          peakHold={false} clip={false} class="lab-cpu" />
      </span>
    </div>
    <span sx={{ text: "sm" }}>Kırpılma: <span class="lab-clips">{$clips}</span> · Söndürme: <span class="lab-resets">{$resets}</span></span>
  </div>
}
