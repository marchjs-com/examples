import { AudioReactive, Avatar, Button } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// SpeakerRing: the "who is speaking" ring of a video call. Ada's voice is the demo loop; "Sen" (you) is your
// microphone, and its permission is asked only when you press the button.
// In a real call, pass each participant's MediaStream: audioSource(stream).
export function SpeakerRing() {
  // Two sources. Neither does anything until start(): the demo needs a click to start audio, and the microphone asks
  // for permission on start(), which must come from a user gesture.
  const ada = audioSource("demo")
  const me = audioSource("mic")
  // Release both (and the microphone) when the component goes away.
  onCleanup(() => { ada.stop(); me.stop() })
  // A status line in words, so the result does not depend on seeing the ring.
  let $note = ""
  async function openMic() {
    await me.start()
    // error() is "denied" when the user refused, another reason when there is no microphone, null when it works.
    $note = me.error() === "denied" ? "Mikrofon izni verilmedi" : me.error() ? "Bu tarayıcıda mikrofon yok" : "Konuşunca halkan parlar"
  }
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center"], gap: 5 }}>
      {/* effect="ring" draws a ring that grows with the voice; color is its theme token; gain={2} lifts a quiet voice.
          The wrapper adds no role: it is decoration, and the name is the visible text under the avatar. With reduced
          motion the ring still follows the sound in light, without growing. */}
      <div sx={{ flex: ["col", "center"], gap: 2 }}>
        <AudioReactive source={ada} effect="ring" color="brand-green" gain={2}><Avatar name="Ada Yılmaz" size="xl" /></AudioReactive>
        <span sx={{ text: "sm" }}>Ada</span>
      </div>
      {/* Your own ring: ring + glow together, and a higher gain because a microphone usually reads quieter than the
          demo loop. */}
      <div sx={{ flex: ["col", "center"], gap: 2 }}>
        <AudioReactive source={me} effect={["ring", "glow"]} color="brand-blue" gain={3}><Avatar name="Sen" size="xl" /></AudioReactive>
        <span sx={{ text: "sm" }}>Sen</span>
      </div>
    </div>
    {/* "Ada konuşsun" (let Ada speak) starts the demo; "Mikrofonu aç" (open the microphone) asks for permission. */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button on:click={() => ada.start()}>▶ Ada konuşsun</Button>
      <Button variant="ghost" on:click={openMic}>🎙️ Mikrofonu aç</Button>
      <span sx={{ text: "sm", color: "muted" }}>{$note}</span>
    </div>
  </div>
}
