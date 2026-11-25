import { Oscilloscope, Button, Card } from "march/ui"
import { audioSource } from "march/audio"

// toplantıdan önce mikrofon denemesi: izin yalnız düğmeye basınca istenir; konuşunca dalga görünür
export function MicCheck() {
  const mic = audioSource("mic")
  const note = () => mic.error() === "denied" ? "Mikrofon izni verilmedi." : mic.error() ? "Bu tarayıcı mikrofonu açamıyor." : mic.active() ? "Bir şeyler söyleyin: dalga sesinizi gösterir." : "Mikrofon kapalı."
  return <Card title="Ses denemesi">
    <div sx={{ flex: "col", gap: 2 }}>
      <Oscilloscope source={mic} height={140} gain={2} label="Mikrofon" idleText="Mikrofon kapalı" />
      <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
        <Button on:click={() => (mic.active() ? mic.stop() : mic.start())}>{() => (mic.active() ? "Mikrofonu kapat" : "Mikrofonu aç")}</Button>
        <span sx={{ text: "sm", color: "muted" }}>{note}</span>
      </div>
    </div>
  </Card>
}
