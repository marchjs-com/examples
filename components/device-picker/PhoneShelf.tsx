// PhoneShelf: the creative-minimal DevicePicker example.
//
// What it shows: a shelf of phones. Only phones are listed, without a search box or the "make your own" form; the chosen
// phone is drawn large with its silhouette, its name and its size in CSS pixels and pixel ratio.
// When to use this pattern: the picker as a plain product / device chooser, not a toolbar. Narrow it with `group`,
// and turn off `search` and `create` to keep it small.
// Accessibility: each device is a button in a named list (the chosen one is marked selected).
import { DevicePicker, deviceById, deviceSilhouette } from "march/ui"

// $id is the chosen device id; deviceById() turns it back into the device (its name, width, height and pixel ratio).
export function PhoneShelf() {
  let $id = "pixel-8"
  return <div sx={{ flex: ["row", "wrap"], gap: 4 }}>
    {/* group="phone" shows phones first; search={false} and create={false} remove the search field and the own-device form; label names the list. */}
    <DevicePicker value={$id} onChange={(v: string) => ($id = v)} group="phone" search={false} create={false} label="Telefonlar" />
    {/* The detail card: deviceSilhouette(device) draws the small device shape on its own, in the device's proportions. */}
    <div class="m-card" sx={{ flex: ["col", "center"], gap: 2, p: 5 }}>
      {() => { const d = deviceById($id); return d ? [deviceSilhouette(d), <span sx={{ text: ["lg", "bold"] }}>{d.name}</span>, <span sx={{ text: "sm", color: "muted" }}>{`${d.width} × ${d.height} CSS piksel · ${d.dpr}x`}</span>] : "Bir telefon seç" }}
    </div>
  </div>
}
