// DevicePickerLab: the full-featured DevicePicker example; it uses every prop at least once.
//
// Props shown here: value (a signal), onChange, landscape, fit (with your own text), devices (your own list), group,
// search, create, label and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// DevicePickerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { signal } from "march"
import { DevicePicker, DEVICES } from "march/ui"

// A device of your own: a DeviceSpec is { id, name, width, height, kind, radius, touch… } in CSS pixels. Here a
// portrait lobby kiosk with square corners (radius 0) and a touch screen.
const kiosk = { id: "lobby", name: "Lobi kiosku", width: 1080, height: 1920, kind: "screen" as const, radius: 0, touch: true }
// The list to offer: four devices from the built-in DEVICES catalog plus the kiosk.
const LIST = [DEVICES["iphone-se"], DEVICES["pixel-8"], DEVICES["ipad"], DEVICES["desktop-1920"], kiosk]

// `value` and `landscape` are signals, so the picker and any DevicePreview can share them; "" would mean "fit the
// panel". $picked mirrors onChange so you can see the callback.
export function DevicePickerLab() {
  const device = signal("pixel-8")
  const land = signal(false)
  let $picked = "pixel-8"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The DevicePicker:
            - value: the chosen device id (a signal here; bind:value or value + onChange work too).
            - onChange: called with the new id ("" when "fit the panel" is chosen).
            - landscape: a signal; giving it shows the portrait / landscape switch and the list follows it.
            - fit="Tam ekran": adds a "fit the panel" button in the top row (true uses the default text, a string is your own).
            - devices: replaces the built-in catalog with your list.
            - group="all": the group shown first (all, phone, tablet, desktop or mine).
            - search / create: the search field and the "your own device" button (both default to true).
            - label: the accessible name of the list; class: a class on the root. */}
    <DevicePicker class="lab-picker" value={device} onChange={(v: string) => ($picked = v || "sığdır")} landscape={land}
      fit="Tam ekran" devices={LIST} group="all" search create label="Test cihazları" />
    <span class="lab-picked" sx={{ text: "sm", color: "muted" }}>{() => `Seçilen: ${$picked} · ${land() ? "yatay" : "dikey"}`}</span>
  </div>
}
