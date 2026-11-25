import { Gauge, Button, Card } from "march/ui"

// sunucu panosu: işlemci yükü (yeşil / sarı / kırmızı bölge, 85'te kırmızı çizgi, en yüksek değer işaretli) ve indirme
// hızı (sayı çarkları göstergede). "Yenile" yeni bir ölçüm getirir
export function ServerHealth() {
  let $cpu = 38
  let $mbps = 412
  const refresh = () => { $cpu = Math.round(10 + Math.random() * 88); $mbps = Math.round(80 + Math.random() * 900) }
  return <Card title="api-eu-1" subtitle="Canlı durum">
    <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
      <Gauge variant="half" value={$cpu} unit="%" label="İşlemci yükü" peak redline={85}
        zones={[{ from: 0, to: 60, color: "success" }, { from: 60, to: 85, color: "warning" }]} />
      <Gauge value={$mbps} max={1000} unit="Mbps" label="İndirme hızı" readout="odometer" color="brand-blue" />
    </div>
    <Button on:click={refresh}>Yenile</Button>
  </Card>
}
