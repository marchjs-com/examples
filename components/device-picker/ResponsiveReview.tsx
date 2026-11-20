import { signal } from "march"
import { DevicePicker, DevicePreview, Popover, Button, deviceById } from "march/ui"

// gerçek hayattan: tasarım gözden geçirme; araç çubuğundaki düğme seçiciyi açar, sayfa seçilen cihazda (dikey ya da
// yatay) çizilir; "Panele sığdır" cihazsız gösterir
export function ResponsiveReview() {
  const device = signal("iphone-15")
  const land = signal(false)
  const page = () => <div sx={{ flex: "col", gap: 2, p: 4 }}>
    <span sx={{ text: ["xl", "bold"] }}>HADİ etkinlikleri</span>
    <span sx={{ text: "sm", color: "muted" }}>Bu hafta 12 buluşma var</span>
  </div>
  return <div sx={{ flex: "col", gap: 3 }}>
    <Popover placement="bottom-start" trigger={<Button size="sm" variant="secondary">{() => deviceById(device())?.name ?? "Panele sığdır"}</Button>}>
      <DevicePicker value={device} landscape={land} fit />
    </Popover>
    {() => (deviceById(device()) ? <DevicePreview device={device} landscape={land} controls fitHeight={460}>{page()}</DevicePreview> : <div class="m-card">{page()}</div>)}
  </div>
}
