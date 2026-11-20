import { signal } from "march"
import { DevicePreview, Button, TextInput } from "march/ui"

// DevicePreview'un bütün özellikleri: device (katalogdan bir kimlik ya da kendi DeviceSpec'in), landscape (sinyal:
// kumanda da çevirir), touch, fit, fitHeight, label, statusBar, time, homeIndicator, camera, controls, fingers,
// keyboard, events, address, scope, onEvent, ref, class ve içerik (src ile bir adres de gösterilebilir)
const watch = { name: "Saat", width: 198, height: 242, radius: 48, kind: "screen" as const, camera: "none" as const, touch: true }

// ref'in verdiği: cihazın API'si
type DeviceApi = { shake(): void; play(gesture: string): Promise<void> }

export function DevicePreviewLab() {
  const land = signal(false)
  const fingers = signal(2)
  let $log = "henüz olay yok"
  let api: DeviceApi | null = null
  return <div sx={{ flex: ["row", "wrap"], gap: 4 }}>
    <div sx={{ flex: "col", gap: 2 }}>
      <DevicePreview class="lab-phone" device="galaxy-s24" landscape={land} label="Sohbet telefonu" touch fit fitHeight={460}
        statusBar time="10:24" homeIndicator camera controls fingers={fingers} keyboard="auto" events
        scope={(stack: string) => stack.includes("blob:")} onEvent={(n: string, d?: string) => ($log = `${n}${d ? ` · ${d}` : ""}`)} ref={(d: DeviceApi) => (api = d)}>
        <div sx={{ flex: "col", gap: 2, p: 3 }}>
          <span sx={{ text: ["lg", "bold"] }}>Elif</span>
          <TextInput placeholder="Mesaj yaz…" aria-label="Mesaj" />
        </div>
      </DevicePreview>
      <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
        <Button size="sm" on:click={() => api?.shake()}>Salla</Button>
        <Button size="sm" on:click={() => void api?.play("pinch-out")}>İki parmakla aç</Button>
        <Button size="sm" on:click={() => land.set(!land())}>Çevir</Button>
      </div>
      <span class="lab-log" sx={{ text: "sm", color: "muted" }}>{() => $log}</span>
    </div>
    <DevicePreview class="lab-desk" device="laptop-1280" address="hadi.app/etkinlikler" fitHeight={300} touch={false} keyboard={false}>
      <div sx={{ p: 4 }}><span sx={{ text: ["xl", "bold"] }}>Masaüstü penceresi</span></div>
    </DevicePreview>
    <DevicePreview class="lab-own" device={watch} fit={false} time="10:10" homeIndicator={false}>
      <span sx={{ p: 2, text: "sm" }}>Kendi cihazım</span>
    </DevicePreview>
  </div>
}
