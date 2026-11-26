// DevicePreviewLab: the full-featured DevicePreview example; it uses every prop at least once.
//
// Props shown here: device (a catalog id or your own DeviceSpec), landscape (a signal, so the rail can turn it too),
// touch, fit, fitHeight, label, statusBar, time, homeIndicator, camera, controls, fingers, keyboard, events, address,
// scope, onEvent, ref, class and the content (`src` can show an address in an iframe instead of children).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// DevicePreviewLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { signal } from "march"
import { DevicePreview, Button, TextInput } from "march/ui"

// A device of your own: { name, width, height, radius, kind, camera, touch… } in CSS pixels; here a small square watch.
const watch = { name: "Saat", width: 198, height: 242, radius: 48, kind: "screen" as const, camera: "none" as const, touch: true }

// What `ref` hands back: a small API of the device (the real one also has sensors()).
type DeviceApi = { shake(): void; play(gesture: string): Promise<void> }

// land and fingers are signals: the rail and your own buttons both change them. `api` receives the device handle.
export function DevicePreviewLab() {
  const land = signal(false)
  const fingers = signal(2)
  let $log = "henüz olay yok"
  let api: DeviceApi | null = null
  return <div sx={{ flex: ["row", "wrap"], gap: 4 }}>
    <div sx={{ flex: "col", gap: 2 }}>
      {/* First device, a phone with nearly every option:
                - device: an id from the catalog; landscape: a signal (the rail's Turn button and our own button change it).
                - label: the accessible name of the device; class: a class on the device.
                - touch: the mouse acts as fingers (default for phones and tablets), so the content gets real touch events.
                - fit / fitHeight: scale down to fit its place; fitHeight is the most height in px.
                - statusBar, time, homeIndicator, camera: the status bar, its clock text, the home line and the camera cut-out.
                - controls: the rail with turn, fingers, gestures, shake, tilt, offline, battery, background and keyboard.
                - fingers: a signal with the finger count (1 to 3) that a drag uses.
                - keyboard="auto": the on-screen keyboard opens by itself when a field gets focus.
                - events: shows each fired device event under the device.
                - scope: limits the device's values to code whose call stack matches (here code from blob: modules).
                - onEvent(name, detail): called for every device event; ref: receives { play, shake, sensors }. */}
      <DevicePreview class="lab-phone" device="galaxy-s24" landscape={land} label="Sohbet telefonu" touch fit fitHeight={460}
        statusBar time="10:24" homeIndicator camera controls fingers={fingers} keyboard="auto" events
        scope={(stack: string) => stack.includes("blob:")} onEvent={(n: string, d?: string) => ($log = `${n}${d ? ` · ${d}` : ""}`)} ref={(d: DeviceApi) => (api = d)}>
        <div sx={{ flex: "col", gap: 2, p: 3 }}>
          <span sx={{ text: ["lg", "bold"] }}>Elif</span>
          <TextInput placeholder="Mesaj yaz…" aria-label="Mesaj" />
        </div>
      </DevicePreview>
      {/* The buttons use the ref API: shake() fires a device shake, play(gesture) plays a gesture (pinch-out here). */}
      <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
        <Button size="sm" on:click={() => api?.shake()}>Salla</Button>
        <Button size="sm" on:click={() => void api?.play("pinch-out")}>İki parmakla aç</Button>
        <Button size="sm" on:click={() => land.set(!land())}>Çevir</Button>
      </div>
      <span class="lab-log" sx={{ text: "sm", color: "muted" }}>{() => $log}</span>
    </div>
    {/* A desktop device is a browser window: address sets the address text, touch={false} keeps the mouse a mouse and
            keyboard={false} turns the on-screen keyboard off. */}
    <DevicePreview class="lab-desk" device="laptop-1280" address="hadi.app/etkinlikler" fitHeight={300} touch={false} keyboard={false}>
      <div sx={{ p: 4 }}><span sx={{ text: ["xl", "bold"] }}>Masaüstü penceresi</span></div>
    </DevicePreview>
    {/* Your own device spec; fit={false} keeps its real size, homeIndicator={false} hides the home line. */}
    <DevicePreview class="lab-own" device={watch} fit={false} time="10:10" homeIndicator={false}>
      <span sx={{ p: 2, text: "sm" }}>Kendi cihazım</span>
    </DevicePreview>
  </div>
}
