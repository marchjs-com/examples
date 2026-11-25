import { LevelMeter, Button, Card } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// görüntülü görüşmeden önce mikrofon testi: izin yalnız düğmeyle istenir; konuşurken çubuk yeşilde kalmalı, kırmızı = çok yakın
export function MicCheck() {
  const mic = audioSource("mic")
  onCleanup(() => mic.stop())
  let $state = "Mikrofon kapalı"
  async function open() {
    await mic.start()
    const e = mic.error()
    $state = !e ? "Dinleniyor: bir şeyler söyleyin" : e === "denied" ? "İzin verilmedi" : "Bu tarayıcı desteklemiyor"
  }
  function close() { mic.stop(); $state = "Mikrofon kapalı" }
  return <Card title="Mikrofon testi">
    <div sx={{ flex: "col", gap: 3 }}>
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
