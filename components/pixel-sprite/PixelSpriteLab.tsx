// PixelSpriteLab: every PixelSprite prop in one place, and the whole built-in set.
//
// One sprite driven by buttons (playing, frameIndex, fps), one own sprite read from `.led.json` text with parseLedJson,
// a bigger screen (cols / rows) and the full list LED_SPRITE_NAMES as small tiles.
import { PixelSprite, LED_SPRITE_NAMES, parseLedJson } from "march/led"
import { Button, Card } from "march/ui"

// `.led.json` text, as it would come from a file: parseLedJson returns the sprite (or null when the text is invalid).
const BLINKER = parseLedJson('{"fps":2,"palette":{"g":"#3ddc84"},"frames":[["g.g",".g.","g.g"],[".g.","ggg",".g."]]}')!

export function PixelSpriteLab() {
  let $playing = true
  let $frame = 0
  return <div sx={{ flex: "col", gap: 4 }}>
    <Card title="Oynatma">
      <div sx={{ flex: "row", gap: 3 }}>
        {/* playing={false} shows frameIndex; fps sets the speed; motion={false} would hold the first frame like reduced
            motion does. Every LED look prop works here too. */}
        <PixelSprite class="lab-main" sprite="rocket" playing={() => $playing} frameIndex={() => $frame} fps={6} motion
          shape="round" gap={0.18} roundness={0.3} bloom={8} ghost={0.1} scanlines={false} color="rgb" panel="dark" pitch={10} label="Roket" />
        <div sx={{ flex: "col", gap: 2 }}>
          <Button size="sm" on:click={() => { $playing = !$playing }}>{() => ($playing ? "Durdur" : "Oynat")}</Button>
          <Button size="sm" variant="secondary" on:click={() => { $frame = ($frame + 1) % 2 }}>{() => `Kare: ${$frame}`}</Button>
        </div>
        {/* an own sprite (from .led.json) on a bigger screen: cols / rows center it */}
        <PixelSprite class="lab-own" sprite={BLINKER} cols={7} rows={7} pitch={10} color="green" label="Yanıp sönen işaret" />
      </div>
    </Card>
    <Card title="Hazır çizimler">
      <div class="lab-all" sx={{ flex: "row", gap: 2 }}>
        {LED_SPRITE_NAMES.map((n) => <PixelSprite sprite={n} pitch={4} />)}
      </div>
    </Card>
  </div>
}
