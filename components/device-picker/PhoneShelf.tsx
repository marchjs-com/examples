import { DevicePicker, deviceById, deviceSilhouette } from "march/ui"

// telefon rafı: yalnız telefonlar, aramasız; seçilen telefonun silüeti ve ekranı büyük gösterilir
export function PhoneShelf() {
  let $id = "pixel-8"
  return <div sx={{ flex: ["row", "wrap"], gap: 4 }}>
    <DevicePicker value={$id} onChange={(v: string) => ($id = v)} group="phone" search={false} create={false} label="Telefonlar" />
    <div class="m-card" sx={{ flex: ["col", "center"], gap: 2, p: 5 }}>
      {() => { const d = deviceById($id); return d ? [deviceSilhouette(d), <span sx={{ text: ["lg", "bold"] }}>{d.name}</span>, <span sx={{ text: "sm", color: "muted" }}>{`${d.width} × ${d.height} CSS piksel · ${d.dpr}x`}</span>] : "Bir telefon seç" }}
    </div>
  </div>
}
