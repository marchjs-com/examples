import { OverflowToolbar, Segmented } from "march/ui"

// boya kutusu: her kalem bir emoji; kutuyu daralt, önceliği düşük renkler "Daha fazla" menüsüne saklanır
const PENS = [
  { id: "red", label: "Kırmızı", icon: "🔴", priority: 6 },
  { id: "orange", label: "Turuncu", icon: "🟠", priority: 2 },
  { id: "yellow", label: "Sarı", icon: "🟡", priority: 4 },
  { id: "green", label: "Yeşil", icon: "🟢", priority: 5 },
  { id: "blue", label: "Mavi", icon: "🔵", priority: 3 },
  { id: "purple", label: "Mor", icon: "🟣", priority: 1 },
]

export function PaintBox() {
  let $pen = "red"
  let $span = 3
  return <div sx={{ flex: "col", gap: 2 }}>
    <Segmented aria-label="Kutu genişliği" value={$span} onChange={(v: unknown) => $span = Number(v)}
      options={[{ value: 1, label: "dar" }, { value: 2, label: "orta" }, { value: 3, label: "geniş" }]} />
    <div sx={{ cols: 3 }}>
      <div sx={{ span: $span }}>
        <OverflowToolbar label="Boya kutusu" size="md" items={PENS.map((p) => ({ ...p, pressed: () => $pen === p.id, onSelect: () => $pen = p.id }))} />
      </div>
    </div>
    <span sx={{ text: "sm", color: "muted" }}>Elindeki kalem: {PENS.find((p) => p.id === $pen)?.label}</span>
  </div>
}
