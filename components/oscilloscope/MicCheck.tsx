import { Oscilloscope, Button, Card } from "march/ui"
import { audioSource } from "march/audio"

// MicCheck: a microphone test before a meeting. Permission is asked only when the user presses the button; once they
// speak, the wave shows their voice.
// Use an oscilloscope here when you want the check to feel alive; use LevelMeter (see level-meter/MicCheck.tsx) when
// the user needs to judge "too loud / too quiet".
export function MicCheck() {
  // audioSource("mic") asks for nothing yet: the browser's permission prompt appears on mic.start(), which must run
  // from a user gesture (the button below). The microphone is not sent to the speakers (no echo).
  const mic = audioSource("mic")
  // The status line, derived from the source: a function, so it updates when error() or active() changes.
  // error() is "denied" when the user refused, another reason when the browser cannot open a microphone, null when fine.
  const note = () => mic.error() === "denied" ? "Mikrofon izni verilmedi." : mic.error() ? "Bu tarayıcı mikrofonu açamıyor." : mic.active() ? "Bir şeyler söyleyin: dalga sesinizi gösterir." : "Mikrofon kapalı."
  return <Card title="Ses denemesi">
    <div sx={{ flex: "col", gap: 2 }}>
      {/* source={mic}: the scope reads the microphone (only while on screen; it draws nothing off screen). gain={2}
          doubles the trace's height, since speech is often quiet. idleText is shown before the microphone is on.
          Accessibility: the scope is a role="img" named label + the level in words, updated at most once a second;
          the status text beside it tells the same in words. With reduced motion there is no afterglow. */}
      <Oscilloscope source={mic} height={140} gain={2} label="Mikrofon" idleText="Mikrofon kapalı" />
      <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
        {/* One button toggles the microphone; its label is a function, so it follows mic.active(). */}
        <Button on:click={() => (mic.active() ? mic.stop() : mic.start())}>{() => (mic.active() ? "Mikrofonu kapat" : "Mikrofonu aç")}</Button>
        <span sx={{ text: "sm", color: "muted" }}>{note}</span>
      </div>
    </div>
  </Card>
}
