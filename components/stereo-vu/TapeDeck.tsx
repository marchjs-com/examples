import { StereoVu, Button } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// TapeDeck: the creative-minimal StereoVu example.
// A vintage tape deck: a walnut panel with two needle VU meters that dance to a little synthesized song. Press
// the play button and you hear the music the needles show. Use this pattern to give any audio player a warm, physical
// level display.
export function TapeDeck() {
  // The "demo" input of march/audio: a soft chord loop with a bass and a hi-hat, made in the browser (no file, no
  // permission). audible: true sends it to the speakers too (the demo is silent by default). Browsers only let audio
  // start from a user gesture, so it starts from the button below.
  const song = audioSource("demo", { audible: true })
  // Stop the song when the example goes away (the IDE renders it again on every save).
  onCleanup(() => song.stop())
  let $playing = false
  // Toggle: stop, or start again. $playing is read back from the source (active()) so the label matches the truth.
  async function toggle() {
    if ($playing) song.stop()
    else await song.start()
    $playing = song.active()
  }
  return <div sx={{ flex: ["col", "center"], gap: 3 }}>
    {/* The meter pair.
        - source={song}: the left needle follows the song's left channel, the right needle its right channel. The
          meters read the source only while the panel is on screen.
        - panel="wood": the walnut cabinet ("metal" and "dark" are the others). size: each dial's width in px.
        - The needles move with VU ballistics (300 ms) on the motion engine; under the OS reduced-motion setting they
          stand on each reading instead, and the readings come twice a second.
        - Each dial is a meter for screen readers ("Stereo VU, left: -3 dB", at most four updates a second); each red
          peak light is a button that turns it off. */}
    <StereoVu source={song} panel="wood" size={200} />
    {/* An ordinary Button: Tab to reach it, Enter or Space to press it. */}
    <Button on:click={toggle}>{$playing ? "⏹ Durdur" : "▶ Çal"}</Button>
  </div>
}
