import { AudioReactive, Avatar, Button } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// görüntülü görüşmede konuşanın halkası: Ada'nın sesi demo döngüsü; "Sen" mikrofonun (izin yalnız düğmeyle istenir)
export function SpeakerRing() {
  const ada = audioSource("demo")
  const me = audioSource("mic")
  onCleanup(() => { ada.stop(); me.stop() })
  let $note = ""
  async function openMic() {
    await me.start()
    $note = me.error() === "denied" ? "Mikrofon izni verilmedi" : me.error() ? "Bu tarayıcıda mikrofon yok" : "Konuşunca halkan parlar"
  }
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center"], gap: 5 }}>
      <div sx={{ flex: ["col", "center"], gap: 2 }}>
        <AudioReactive source={ada} effect="ring" color="brand-green" gain={2}><Avatar name="Ada Yılmaz" size="xl" /></AudioReactive>
        <span sx={{ text: "sm" }}>Ada</span>
      </div>
      <div sx={{ flex: ["col", "center"], gap: 2 }}>
        <AudioReactive source={me} effect={["ring", "glow"]} color="brand-blue" gain={3}><Avatar name="Sen" size="xl" /></AudioReactive>
        <span sx={{ text: "sm" }}>Sen</span>
      </div>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button on:click={() => ada.start()}>▶ Ada konuşsun</Button>
      <Button variant="ghost" on:click={openMic}>🎙️ Mikrofonu aç</Button>
      <span sx={{ text: "sm", color: "muted" }}>{$note}</span>
    </div>
  </div>
}
