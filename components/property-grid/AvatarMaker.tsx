import { PropertyGrid, Card } from "march/ui"

// emoji avatar yapıcı: soldaki avatar, sağdaki ızgaranın değerleriyle çizilir (bind:value)
const ROWS = [
  { key: "face", label: "Yüz", type: "segmented" as const, options: ["😀", "😎", "🤖", "🦊"], group: "Avatar" },
  { key: "size", label: "Boyut", type: "slider" as const, min: 32, max: 96, unit: "px", group: "Avatar" },
  { key: "round", label: "Yuvarlak", type: "switch" as const, group: "Çerçeve" },
  { key: "ring", label: "Halka rengi", type: "color" as const, group: "Çerçeve" },
]

export function AvatarMaker() {
  let $look: Record<string, unknown> = { face: "🦊", size: 64, round: true, ring: "#f2801f" }
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "center"] }} style={{
        width: `${Number($look.size) + 24}px`, height: `${Number($look.size) + 24}px`, fontSize: `${Number($look.size) * 0.6}px`,
        borderRadius: $look.round ? "50%" : "12px", border: `4px solid ${String($look.ring)}`,
      }}>{String($look.face)}</div>
    </Card>
    <PropertyGrid properties={ROWS} bind:value={$look} label="Avatar" search={false} footer={false} history={false} dirty={false} />
  </div>
}
