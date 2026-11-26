// ResponsiveReview: the real-life DevicePicker example.
//
// What it shows: a design review. The button in the toolbar opens the picker in a Popover; the page below is drawn in
// the chosen device (portrait or landscape), and "fit the panel" shows it without any device frame.
// When to use this pattern: the picker is a panel, so put it in a Popover for a toolbar and share the same signals
// with a DevicePreview (this is how MarchIDE's preview does it).
import { signal } from "march"
import { DevicePicker, DevicePreview, Popover, Button, deviceById } from "march/ui"

// Two signals shared by the picker and the preview: the device id ("" means fit the panel) and the orientation.
export function ResponsiveReview() {
  const device = signal("iphone-15")
  const land = signal(false)
  // The page under review: any content works, here a small heading and a line of text.
  const page = () => <div sx={{ flex: "col", gap: 2, p: 4 }}>
    <span sx={{ text: ["xl", "bold"] }}>HADİ etkinlikleri</span>
    <span sx={{ text: "sm", color: "muted" }}>Bu hafta 12 buluşma var</span>
  </div>
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The button's text follows the chosen device (or says fit the panel); the Popover holds the picker.
            The picker's `fit` adds the fit-the-panel choice, and `landscape` adds the orientation switch. */}
    <Popover placement="bottom-start" trigger={<Button size="sm" variant="secondary">{() => deviceById(device())?.name ?? "Panele sığdır"}</Button>}>
      <DevicePicker value={device} landscape={land} fit />
    </Popover>
    {/* With a device chosen the page is wrapped in a DevicePreview (controls adds the rail with turn, shake and more;
            fitHeight limits its height in px); with "" it is a plain card. */}
    {() => (deviceById(device()) ? <DevicePreview device={device} landscape={land} controls fitHeight={460}>{page()}</DevicePreview> : <div class="m-card">{page()}</div>)}
  </div>
}
