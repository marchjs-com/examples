import { signal } from "march"
import { DevicePicker, DEVICES } from "march/ui"

// DevicePicker'ın bütün özellikleri: value (sinyal), onChange, landscape, fit (kendi metniyle), devices (kendi
// listen), group, search, create, label, class
const kiosk = { id: "lobby", name: "Lobi kiosku", width: 1080, height: 1920, kind: "screen" as const, radius: 0, touch: true }
const LIST = [DEVICES["iphone-se"], DEVICES["pixel-8"], DEVICES["ipad"], DEVICES["desktop-1920"], kiosk]

export function DevicePickerLab() {
  const device = signal("pixel-8")
  const land = signal(false)
  let $picked = "pixel-8"
  return <div sx={{ flex: "col", gap: 3 }}>
    <DevicePicker class="lab-picker" value={device} onChange={(v: string) => ($picked = v || "sığdır")} landscape={land}
      fit="Tam ekran" devices={LIST} group="all" search create label="Test cihazları" />
    <span class="lab-picked" sx={{ text: "sm", color: "muted" }}>{() => `Seçilen: ${$picked} · ${land() ? "yatay" : "dikey"}`}</span>
  </div>
}
