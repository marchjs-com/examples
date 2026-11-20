import { VirtualList, Card } from "march/ui"

// yıldızları saymak: 100 000 satır, ama DOM'da yalnız görünenler; her onuncu satır bir takımyıldız
const sky = Array.from({ length: 100000 }, (_, i) => ({ id: i, name: i % 10 === 0 ? `✨ Takımyıldız ${i / 10 + 1}` : `⭐ Yıldız ${i + 1}` }))

export function StarCount() {
  return <Card title="100 000 yıldız">
    <div style={{ height: "260px" }}>
      <VirtualList label="Yıldızlar" items={sky} key={(s) => s.id} estimate={32}
        render={(s) => <div sx={{ p: 1 }}>{() => s().name}</div>} />
    </div>
  </Card>
}
