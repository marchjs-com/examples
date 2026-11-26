// LedBoardLab: every LedBoard prop in one place.
//
// The first board is driven by the controls (direction, speed, effect, transition, font, scale, look) and plays every
// kind of scene: text, emoji, eyes with a mouth, pixel art, a live score, the clock, a countdown, a ticker and audio bars.
// The smaller boards below show the props that are easier to see on their own (loop, playing, live text, motion off).
// Read it as a reference: each prop is commented where it is used.
import { LedBoard, Button, Card } from "march/ui"
import { audioSource } from "march/audio"

// a synthesized sound for the bars scene: no file, no permission; it starts from a click (browsers require a gesture)
const demo = audioSource("demo")

export function LedBoardLab() {
  // Live values: a score that the buttons change (its changed digits roll), and the options of the first board.
  let $score: [number, number] = [0, 0]
  let $direction: "left" | "right" | "up" | "down" = "left"
  let $effect: "none" | "typewriter" | "blink" | "wave" | "rainbow" = "none"
  let $transition: "wipe" | "dissolve" | "rain" | "iris" | "cut" = "wipe"
  let $playing = true
  let $scene = 0

  const scenes = [
    { text: "Merhaba March :sparkle:" },                                   // text with an animated emoji
    { emoji: "rocket" },                                                    // an animated sprite, scaled up to the board
    { eye: "surprised", mouth: "o", duration: 1800 },                       // eyes and a mouth
    { pixels: ["..yy..", ".y..y.", "y.yy.y", ".y..y.", "..yy.."], palette: { y: "#ffd23f" }, duration: 1500 }, // pixel art
    { score: () => $score, teams: ["EV", "DEP"] as [string, string], duration: 5000 }, // live data: the digits roll
    { clock: true, duration: 3000 },                                        // HH:mm:ss, or HH:mm when it does not fit
    { countdown: Date.now() + 90_000, done: "BİTTİ", duration: 3000 },
    { ticker: ["BIST +1,2%", "USD 34,10", "EUR 36,80"] },                  // items run past one after another
    { bars: demo, duration: 5000, label: "Ses çubukları" },                 // an audio source drives the bars
  ]

  const pick = <T,>(list: readonly T[], now: T): T => list[(list.indexOf(now) + 1) % list.length]!
  return <div sx={{ flex: "col", gap: 4 }}>
    <Card title="Tüm sahneler">
      <div sx={{ flex: "col", gap: 3 }}>
        {/* Every prop of the board. Functions (() => $x) are read live, so the board follows the controls without
            being rebuilt. onScene reports the scene that starts (index and scene). */}
        <LedBoard class="lab-main" scenes={scenes} cols={64} rows={16}
          direction={() => $direction} speed={30} pause={1400} effect={() => $effect}
          font="5x7" spacing={1} scale="auto"
          transition={() => $transition} transitionDuration={650} loop playing={() => $playing} pauseOnHover={false}
          alive follow={false} label="Laboratuvar panosu" live="polite"
          shape="round" gap={0.18} roundness={0.3} bloom={6} ghost={0.1} scanlines={false} color="rgb" panel="dark"
          onScene={(i) => { $scene = i }} />
        <div sx={{ flex: "row", gap: 2 }}>
          <Button size="sm" on:click={() => { $score = [$score[0] + 1, $score[1]] }}>Gol: EV</Button>
          <Button size="sm" on:click={() => { $score = [$score[0], $score[1] + 1] }}>Gol: DEP</Button>
          <Button size="sm" variant="secondary" on:click={() => { $direction = pick(["left", "right", "up", "down"] as const, $direction) }}>{() => `Yön: ${$direction}`}</Button>
          <Button size="sm" variant="secondary" on:click={() => { $effect = pick(["none", "typewriter", "blink", "wave", "rainbow"] as const, $effect) }}>{() => `Efekt: ${$effect}`}</Button>
          <Button size="sm" variant="secondary" on:click={() => { $transition = pick(["wipe", "dissolve", "rain", "iris", "cut"] as const, $transition) }}>{() => `Geçiş: ${$transition}`}</Button>
          <Button size="sm" variant="secondary" on:click={() => { $playing = !$playing }}>{() => ($playing ? "Durdur" : "Oynat")}</Button>
          <Button size="sm" variant="ghost" on:click={() => demo.start()}>Sesi başlat</Button>
        </div>
        <span class="lab-scene">{() => `Sahne: ${$scene + 1} / ${scenes.length}`}</span>
      </div>
    </Card>

    <Card title="Tek başına özellikler">
      <div sx={{ flex: "col", gap: 3 }}>
        {/* text= is the short form of one text scene. 8x8 is the bolder font; ink colors the letters; square pixels. */}
        <LedBoard class="lab-text" text="8x8 :star:" font="8x8" ink="#3ddc84" shape="square" cols={40} rows={8} scale={1} />
        {/* loop={false}: stays on the last scene. live="off": screen readers are not told about each scene. */}
        <LedBoard class="lab-once" scenes={[{ text: "1", duration: 400 }, { text: "2", duration: 400 }, { text: "SON" }]} loop={false} live="off" cols={24} rows={8} color="red" />
        {/* motion={false} (like reduced motion): long text pages instead of scrolling; no effects or transitions. */}
        <LedBoard class="lab-still" text="Hareket kapalı: metin sayfa sayfa gösterilir" motion={false} cols={40} rows={8} color="green" panel="theme" />
      </div>
    </Card>
  </div>
}
