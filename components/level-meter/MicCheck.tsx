import { LevelMeter, Button, Card } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// MicCheck: a microphone test before a video call. Permission is asked only when the user presses the button. While
// they speak the bar should stay in the green; red means too close or too loud.
// Use this whenever your app records or streams: a visible level tells the user the right microphone works before it
// matters.
export function MicCheck() {
  // audioSource("mic") creates the source but asks for nothing yet: the browser's permission prompt appears on
  // mic.start(), which must run from a user gesture (the button below).
  const mic = audioSource("mic")
  // Release the microphone when the component goes away, so the browser's recording indicator turns off.
  onCleanup(() => mic.stop())
  // The status line under the meter: tells the user what happened, in words (not only by the meter's movement).
  let $state = "Mikrofon kapalı"
  async function open() {
    await mic.start()
    // mic.error() is null when it works, "denied" when the user refused, or another reason (no microphone, no Web Audio).
    const e = mic.error()
    $state = !e ? "Dinleniyor: bir şeyler söyleyin" : e === "denied" ? "İzin verilmedi" : "Bu tarayıcı desteklemiyor"
  }
  function close() { mic.stop(); $state = "Mikrofon kapalı" }
  return <Card title="Mikrofon testi">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* source={mic}: the meter reads the microphone directly (only while on screen). channels={1}: a microphone is
          mono, so one bar. orientation="horizontal" + variant="flat": a slim bar that sits in a form or a card in the
          page's own colors. scale="db" with floor={-60}: decibels, so quiet speech still moves the bar; ticks draws
          the dB scale; segments sets the LED count.
          Accessibility: label names the meter; clipLabel names the clip light's button (Enter or Space resets it);
          format writes the spoken value from the 0–1 level, here converted to decibels ("-12 desibel") or "sessiz"
          (silent) at zero. The spoken value changes at most 4 times a second. With reduced motion the source reads
          twice a second and the LEDs switch without fading. */}
      <LevelMeter source={mic} channels={1} orientation="horizontal" variant="flat" scale="db" floor={-60} ticks segments={40}
        label="Mikrofon düzeyi" clipLabel="Kırpılma ışığını söndür" format={(x: number) => (x <= 0 ? "sessiz" : `${Math.round(20 * Math.log10(x))} desibel`)} />
      <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
        <Button on:click={open}>🎙️ Mikrofonu aç</Button>
        <Button variant="ghost" on:click={close}>Kapat</Button>
        <span sx={{ text: "sm", color: "muted" }}>{$state}</span>
      </div>
    </div>
  </Card>
}
