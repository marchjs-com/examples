import { LevelMeter, Button } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// LevelMeterLab: every LevelMeter prop in one place.
// LevelMeter is a studio LED meter: segments light green, amber and red as the level rises, a peak light holds for a
// moment and falls, and a clip light stays on after the signal hit the top until you press it. Feed it numbers
// (`value`) or a live sound (`source`). Use it for loudness, or for any 0–max load where the "red = too much" reading of
// a mixing desk fits (CPU, queue length). The segments are built once and a reading only moves a CSS variable and a
// class, so a meter can update 60 times a second without creating nodes.
//
// Props shown below: value (a number, or [left, right]), source, channels, min, max, orientation, segments, zones,
// colors, scale, floor, ticks, tickFormat, peakHold, clip, onClip, onClipReset, labels, label, channelNames, clipLabel,
// format, variant, size, length, gap, motion, class.
export function LevelMeterLab() {
  // Two reactive channel levels (0–1) for the stereo meter, and two counters filled by the clip callbacks.
  let $a = 0.4
  let $b = 0.6
  let $clips = 0
  let $resets = 0
  // The synthesized "demo" loop (march/audio): no file, no permission, muted. It starts from the "▶ Demo" click,
  // because browsers only let audio start from a user gesture.
  const demo = audioSource("demo")
  // Stop the source when this component goes away (for example when the IDE renders the edited example again), so no
  // audio keeps being analysed in the background.
  onCleanup(() => demo.stop())
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls; the lab-* classes are hooks for LevelMeterLab.test.tsx. "Yükselt" (louder) pushes both channels
        toward the top so the clip light latches; "Kıs" (quieter) drops them. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-up" size="sm" on:click={() => { $a = Math.min(1, $a + 0.3); $b = Math.min(1, $b + 0.3) }}>Yükselt</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $a = 0.1; $b = 0.1 }}>Kıs</Button>
      <Button class="lab-demo" size="sm" variant="ghost" on:click={() => demo.start()}>▶ Demo</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "end"], gap: 4 }}>
      {/* 1. A stereo meter driven by numbers.
          - value={[$a, $b]}: two numbers make two channels (left, right); the default range is 0–1.
          - segments: LEDs per channel. zones={[0.6, 0.85]}: amber starts at 60 % of the meter, red at 85 %.
          - peakHold: how long the peak light holds (ms) before it falls.
          - clip={0.95}: the clip light latches when a channel reaches 95 %. It is a real button (an IconButton with
            aria-pressed while lit): click it, or focus it with Tab and press Enter or Space, to reset it.
          - onClip(channel) / onClipReset: here they only count, in your app they could warn the user.
          - Accessibility: each channel is its own role="meter" named label + channel name ("Kanal, A kanalı"); the
            spoken value updates at most 4 times a second. labels are the short letters drawn under the bars
            (hidden from screen readers, which hear channelNames instead). clipLabel names the clip button. */}
      <span class="lab-stereo">
        <LevelMeter value={[$a, $b]} segments={20} zones={[0.6, 0.85]} peakHold={1200} clip={0.95}
          onClip={() => { $clips++ }} onClipReset={() => { $resets++ }} label="Kanal" channelNames={["A kanalı", "B kanalı"]}
          labels={["A", "B"]} clipLabel="Kırpılmayı söndür" />
      </span>
      {/* 2. A live audio meter in decibels.
          - source={demo}: the meter reads the sound itself (and only while it is on screen); channels={2} takes the
            source's left and right levels.
          - scale="db" with floor={-60}: the meter spans −60 dB to 0 dBFS, the way the ear and audio tools count.
          - ticks draws a scale beside the bars; tickFormat writes each mark (here the bare number).
          - colors: three theme tokens for the low / mid / high zones.
          - size (bar thickness), length (bar length in px) and gap (px between LEDs) shape it.
          - variant="console" (the default): a dark housing with glowing LEDs in every theme. */}
      <span class="lab-db">
        <LevelMeter source={demo} channels={2} scale="db" floor={-60} ticks tickFormat={(d: number) => `${d}`}
          colors={["brand-blue", "brand-gold", "brand-pink"]} size="lg" length={200} gap={3} variant="console" />
      </span>
      {/* 3. A load bar, not audio at all: a CPU percentage on a horizontal flat meter.
          - min={0} max={100}: the value's own range (it is mapped to 0–1 inside).
          - orientation="horizontal": fills from the inline start (mirrored on right-to-left pages).
          - variant="flat": the page's own surfaces instead of the dark console.
          - ticks as a list: your own marks. format writes the spoken value: it receives the level as 0–1, so it is
            multiplied by 100 here ("yüzde 40", 40 percent).
          - motion={false}: LEDs switch at once and there is no falling peak; users who ask their OS for reduced
            motion get the same. peakHold={false} and clip={false} remove the peak and clip lights entirely. */}
      <span class="lab-load" sx={{ flex: "grow" }}>
        <LevelMeter value={$a * 100} min={0} max={100} channels={1} orientation="horizontal" variant="flat" size="sm" segments={30}
          ticks={[0, 50, 100]} format={(x: number) => `yüzde ${Math.round(x * 100)}`} label="İşlemci" motion={false}
          peakHold={false} clip={false} class="lab-cpu" />
      </span>
    </div>
    {/* The callback counters: how many times a channel clipped and how many times the light was reset. */}
    <span sx={{ text: "sm" }}>Kırpılma: <span class="lab-clips">{$clips}</span> · Söndürme: <span class="lab-resets">{$resets}</span></span>
  </div>
}
